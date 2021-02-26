import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { resolve } from 'path'
import SurveyRepository from "../repositories/SurveyRepository"
import SurveyUserRepository from "../repositories/SurveyUserRepository"
import UserRepository from "../repositories/UserRepository"
import SendMailService from "../services/SendMailService"

export default {
    async execute(req: Request, res: Response) {

        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const userAlreadyExists = await usersRepository.findOne({ email })

        if(!userAlreadyExists) {
            return res.status(500).json({ msg: 'User does not exist!' })
        }

        const surveyAlreadyExists = await surveysRepository.findOne(survey_id)

        if(!surveyAlreadyExists) {
            return res.status(500).json({ msg: 'Survey does not exist!' })
        }

        const surveyUserAlreadyExist = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null},
            relations: ['user', 'survey']
        })

        const { title, description } = surveyAlreadyExists

        const variables = {
            name: userAlreadyExists.name,
            title,
            description,
            id: "",
            link: process.env.URL_MAIL
        }
        
        const npsPath = resolve(__dirname, '..', 'views', 'email', 'NPSMail.hbs')

        if(surveyUserAlreadyExist) {
            variables.id = surveyAlreadyExists.id
            await SendMailService.execute(email, title, variables, npsPath)
            return res.json(surveyUserAlreadyExist)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        variables.id = surveyUser.id

        await SendMailService.execute(email, title, variables, npsPath)

        return res.json(surveyUser)
    }
}