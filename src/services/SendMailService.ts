import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

export default {
    async execute(to: string, subject: string, variables: object, path: string) {
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

        const templateFileContent = fs.readFileSync(path).toString('utf-8')

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse(variables)


        const message = await transporter.sendMail({
            to, subject, html, from: 'NPS <noreply@gmail.com>'
        })

        console.log(message)
    }
}