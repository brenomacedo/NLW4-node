import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

export default {
    async execute(req: Request, res: Response) {

        const { survey_id } = req.params

        const suryveysUserRepository = getCustomRepository(SurveyUserRepository)

        const surveyUsers = await suryveysUserRepository.find({
            where: {
                survey_id,
                value: Not(IsNull())
            }
        })

        const detractor = surveyUsers.filter(survey => {
            return (survey.value >= 0 && survey.value <=6)
        }).length

        const promoter = surveyUsers.filter(survey => {
            return (survey.value >= 9 && survey.value <=10)
        }).length

        const passive = surveyUsers.filter(survey => {
            return (survey.value >= 7 && survey.value <=8)
        }).length

        const totalAnswers = surveyUsers.length

        const calculate = Number(((promoter - detractor)*100/totalAnswers).toFixed(2))

        return res.status(200).json({
            promoter, detractor, passive, totalAnswers, nps: calculate
        })
    }
}