import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT

export const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Auth Company",
};



