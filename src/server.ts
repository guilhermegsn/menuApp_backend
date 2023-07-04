import express from "express"
import mongoose from "mongoose";
import routes from "./routes";
import connectTimeout from 'connect-timeout';
import cors from 'cors'

const app = express()

mongoose.connect("mongodb://localhost/menuApp")

app.use(cors());
//app.use(cors({ origin: 'https://seu-dominio.com' }));
app.use(express.json())

const timeoutMs = 5000;
app.use(connectTimeout(timeoutMs));

app.use(routes)

app.listen(3001, () => {
    console.log("Server on port: 3001")
})