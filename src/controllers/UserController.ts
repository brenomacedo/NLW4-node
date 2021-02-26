import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"
import * as yup from 'yup'
import AppError from "../errors/AppError"

export default {
    async create(req: Request, res: Response) {

        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email('Email inválido').required('Email é obrigatório')
        })

        try {
            await schema.validate(req.body, {
                abortEarly: false
            })
        } catch (e) {
            throw new AppError("Validation error")
        }

        const userRepository = getCustomRepository(UserRepository)
        
        const userExists = await userRepository.findOne({
            email
        })

        if(userExists) {
            throw new AppError('User already exists!')
        }

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user)

        return res.status(201).json(user)

    },

    async show(req: Request, res: Response) {
        
    }
}