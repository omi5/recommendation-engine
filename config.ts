import dotenv from 'dotenv';
dotenv.config();

const config = {
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,

  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  SKELETON_URL: process.env.SKELETON_URL ?? 'http://localhost:4000',
  RIDER_HUB_URL: process.env.RIDER_HUB_URL ?? 'http://localhost:5000',

  MARKETPLACE_BE_BASE_URL: process.env.MARKETPLACE_BE_BASE_URL ?? 'http://localhost:4040',
  MARKETPLACE_FE_BASE_URL: process.env.MARKETPLACE_FE_BASE_URL ?? 'http://localhost:4041',
};

export default config;