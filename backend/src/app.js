import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload.js';

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use('/upload', uploadRouter);

export default app;
