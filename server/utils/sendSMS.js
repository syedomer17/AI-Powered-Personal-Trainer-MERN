import config from "config";
import twilio from "twilio";

const accountSid = config.get("TWILIO_SID");
const authToken = config.get("TWILIO_TOKEN");
const phone = config.get("TWILIO_NUMBER");
const client = new twilio(accountSid, authToken);

async function sendSMS(smsData) {
  try {
    await client.messages.create({
      body: smsData.body,
      to: smsData.to,
      from: phone,
    });
    console.log("SMS sent successfully ✅");
  } catch (error) {
    console.error("SMS sending failed:", error);
  }
}

export default sendSMS;
