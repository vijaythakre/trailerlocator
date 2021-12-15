import express from 'express';
import dotenv from 'dotenv';
import winston from 'winston';
import routes from './routes.js';
const app = express();

dotenv.config();

winston.add(new winston.transports.File({ filename: 'app.log' }));

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
})

process.on('unhandeledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
})

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
