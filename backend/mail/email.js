
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate.js"
import { client, sender } from "./mailconfig.js"


export const sendVerificationEmail = async (email, Token) => {
    const recepient = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recepient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", Token),
            category: "Email Verification"
        })
        console.log(response)

    } catch (error) {
        console.error(error)


    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recepient = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recepient,
            template_uuid: "1e3ae21e-c257-4ff7-920e-78835b3c4ff4",
            template_variables: {
                "name": name
            }
        }
        )
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }
}

