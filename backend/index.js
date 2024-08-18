import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './DB/db.js';
connectDB();
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req,res) => {
    res.send("Hello World 123");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    )
})