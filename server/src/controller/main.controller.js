import { cohere } from "../utils/cohere.js";

export const checkGrammer =async (req,res)=>{
    const{text} = req.body
    if(!text || text ===''){
        return res.status(404).json({message:'No input'})
    }
    try {
        const response = await cohere.chat({
            model:'command-a-03-2025',
            messages:[{
                role:'user',
                content: `Correct the grammer of the following text and just give the response in a normal grammer : /n/n${text}`
            }]
        })
        return res.status(200).json(response.message.content[0].text)

    } catch (error) {
        return res.status(500).json({message:'Internal Error'})
    }
}

export const paraphrase =async (req,res)=>{
    const{text} = req.body
    if(!text || text ===''){
        return res.status(404).json({message:'No input'})
    }
    try {
        const response = await cohere.chat({
            model:'command-a-03-2025',
            messages:[{
                role:'user',
                content: `paraphrase the following text and just give the response in a normal grammer : /n/n${text}`
            }]
        })
        return res.status(200).json(response.message.content[0].text)

    } catch (error) {
        return res.status(500).json({message:'Internal Error'})
    }
}