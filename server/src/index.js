import express from 'express'
import cors from 'cors'
import {CohereClientV2} from 'cohere-ai'
import dotenv from 'dotenv'
import mainRoutes from './routes/main.route.js'
const app = express()
const PORT = 5000
dotenv.config()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(express.json({limit:'10mb'}))

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY
})

app.use('/api',mainRoutes)
// app.post('/check',async (req,res)=>{
//     const{text} = req.body
//     try {
//         const response = await cohere.chat({
//             model:'command-a-03-2025',
//             messages:[{
//                 role:'user',
//                 content: `Correct the grammer of the following test: /n/n${text}`
//             }]
//         })
//         return res.status(200).json(response.message.content)
//     } catch (error) {
//         console.log(error)
//     }
// })


app.get('/', (_,res)=>{
    try {
        return res.status(200).json({status:'Healthy'})
    } catch (error) {
        console.log(error)
    }
})
app.listen(PORT,(req,res)=>{
    try {
        console.log("Connected to Server")
    } catch (error) {
        console.log(error)
    }
})