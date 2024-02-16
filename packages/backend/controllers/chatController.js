import  OpenAI  from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY })
const markdownPrompt = `You are an AI capable of creating comprehensive and detailed educational content. You will generate a lesson plan that will always have a title, a table of contents, and subtopics which will provide a description of what we will learn. The lesson plan is a guide and it doesn't have to be too detailed. The plan must always be in markdown format, specifically react-markdown. The table of contents should link to the subtopics. The lesson plan should start with Topic: . And the subtopics should start with ##.`;


export const postChat = async (req, res) => {
    const userMessage = req.body.message
    console.log(req.body);
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: markdownPrompt
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