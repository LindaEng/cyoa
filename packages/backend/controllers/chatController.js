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
                content: 'You are an AI assistant that can generate detailed learning plans. Your task is to create a learning plan that always includes a title, broad topics, and subtopics under each broad topic. The format must absolutely start with Title: and then numbered topics, with dashes for subtopics. Always follow this format.'
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