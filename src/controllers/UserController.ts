import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"

export default {
    async create(req: Request, res: Response) {

        const { name, email } = req.body

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