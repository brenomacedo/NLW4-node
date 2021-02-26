import request from 'supertest'
import { createConnection } from 'typeorm'
import app from '../app'

describe('Users', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = await createConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("should create a new user", async () => {
        const response = await request(app).post('/users').send({
            email: 'user',
            name: 'user'
        })

        expect(response.status).toBe(201)
    })

    it("should not be able to create a user", async () => {
        const response = await request(app).post('/users').send({
            email: 'user',
            name: 'user'
        })

        expect(response.status).toBe(500)
    })
})