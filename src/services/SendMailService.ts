import nodemailer from 'nodemailer'
import { resolve } from 'path'
import handlebars from 'handlebars'
import fs from 'fs'

export default {
    async execute(to: string, subject: string, body: string) {
        const account = await nodemailer.createTestAccount()
        const transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })

        const npsPath = resolve(__dirname, '..', 'views', 'email', 'NPSMail.hbs')
        const templateFileContent = fs.readFileSync(npsPath).toString('utf-8')

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse({
            name: to,
            title: subject,
            description: body
        })


        const message = await transporter.sendMail({
            to, subject, html, from: 'NPS <noreply@gmail.com>'
        })

        console.log(message)
    }
}