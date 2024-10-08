import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/db.js';
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); 
app.use(cookieParser());




app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    )
})