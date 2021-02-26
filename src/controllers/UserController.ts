import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"
import * as yup from 'yup'

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
            return res.status(400).json({
                error: e.errors
            })
        }

        const userRepository = getCustomRepository(UserRepository)
        
        const userExists = await userRepository.findOne({
            email
        })

        if(userExists) {
            return res.status(500).json({
                error: "Usuário já existe!"
            })
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