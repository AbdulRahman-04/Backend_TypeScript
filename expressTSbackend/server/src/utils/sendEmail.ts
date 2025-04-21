import nodemailer from "nodemailer"
import config from "config"

const USER: string = config.get<string>("EMAIL");
const PASS: string = config.get<string>("PASS");

interface emailDataInterface {
    from : string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}

async function sendEmail(emailData: emailDataInterface) {

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: USER,
                pass: PASS
            }
        })
        
        let sender = await transporter.sendMail({
            from: USER,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html
        })

        console.log("EMAIL SENT SUCCESSFULLY!✅", `${sender.messageId}`);
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export default sendEmail;