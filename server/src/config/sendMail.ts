import nodeMailer from 'nodemailer';
import logger from './logger';
import InputValidation from '../utils/InputValidation';
import CustomError from '../utils/Error';
import { messages } from '../utils/Messages';

export const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const sendMail = async (email: string, subject: string, text: string) => {
    try {
        InputValidation.validateEmail(email)

        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error(error);
        throw new CustomError(messages.error.mail_not_enabled_error, 500, { originalError: error });
    }
};