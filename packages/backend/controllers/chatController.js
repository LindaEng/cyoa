import  OpenAI  from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY })


export const postChat = async (req, res) => {
    const userMessage = req.body.message
    console.log(req.body);
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a brilliant source of knowledge that can breakdown complex topics into simple explanations... I am a chatbot that can help you with your questions. Ask me anything!'
            },
            {
                role: 'user',
                content: userMessage
            }
        ]

    }) 
    console.log(response['usage']['total_tokens']);
    res.json(response['choices'][0]['message']['content'])
}