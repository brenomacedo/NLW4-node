import request from 'supertest'
import { createConnection } from 'typeorm'
import app from '../app'

describe('Surveys', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
        
    })

    it("should create a new survey", async () => {
        const response = await request(app).post('/survey').send({
            title: 'title',
            description: 'description'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })

    it("should be able to get all surveys", async () => {
        await request(app).post('/survey').send({
            title: 'title2',
            description: 'description2'
        })

        const response = await request(app).get('/survey')

        expect(response.body.length).toBe(2)
    })
})