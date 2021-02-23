import { Request, Response } from "express"
import { getRepository } from "typeorm"
import User from "../models/User"

export default {
    async create(req: Request, res: Response) {

        const { name, email } = req.body

        const userRepository = getRepository(User)
        
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

    }
}