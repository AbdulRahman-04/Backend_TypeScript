import twilio from "twilio"
import config from "config"
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

const sid: string = config.get<string>("SID");
const token: string = config.get<string>("TOKEN");
const phone: string = config.get<string>("PHONE");

let client = new twilio.Twilio(sid, token)

interface smsDataInterface{
    body: string,
    from : string,
    to: string
}

async function sendSMS(smsData: smsDataInterface) {
    try {

       await client.messages.create({
        body: smsData.body,
        to: smsData.to,
        from: smsData.from
       })
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export default sendSMS;