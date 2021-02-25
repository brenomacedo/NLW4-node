import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";

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

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        return res.json(surveyUser)
    }
}