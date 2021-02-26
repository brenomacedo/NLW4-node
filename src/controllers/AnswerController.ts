import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import SurveyUserRepository from "../repositories/SurveyUserRepository"

export default {
    async execute(req: Request, res: Response) {
        const { u } = req.query
        const { value } = req.params

        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            return res.status(400).json({ msg: "Survey User does not exist!" })
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return res.status(200).json(surveyUser)
    }
}