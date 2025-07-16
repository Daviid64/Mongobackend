import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'

dotenv.config()


connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.get("/",(req , res)=>{
    res.send(`<h1>Bonjour du serveur</h1>`)
})

app.use('/auth',authRoutes)

app.listen(PORT,()=>{
    console.log(`serveur tourne sur http://localhost${PORT}`)
})