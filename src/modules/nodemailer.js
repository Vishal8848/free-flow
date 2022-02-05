import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.REACT_APP_EMAIL,
        pass: process.env.REACT_APP_WORD
    }
})

export const checkMailer = () => {
    transporter.verify((err, success) => { console.log(err ? err : "Nodemailer Ready: " + success) })
}