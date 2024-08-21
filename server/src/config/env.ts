import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  cors: process.env.CORS,
  mongoDbConnectionUrl: process.env.MONGO_URL,
  accessKeySecret: process.env.ACCESS_KEY || 'access',
  refreshKeySecret: process.env.REFRESH_KEY || 'refresh',

  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  baseUrl: process.env.BASE_URL || 'http://localhost:5000/',
};
