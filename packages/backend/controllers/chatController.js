import  OpenAI  from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({ apikey: process.env.OPENAI_API_KEY })
const markdownPrompt = `You are an AI capable of creating comprehensive and detailed educational content. You will generate a lesson plan that will always have a title, a table of contents, and subtopics which will provide a description of what we will learn. The lesson plan is a guide and it doesn't have to be too detailed. The plan must always be in markdown format, specifically react-markdown. The table of contents should link to the subtopics. The lesson plan should start with Topic: . And the subtopics should start with ##. Here is an example of a lesson plan:
# Topic: Asteroids

## Table of Contents
- [Introduction](#introduction)
- [Formation of Asteroids](#formation-of-asteroids)
- [Classification of Asteroids](#classification-of-asteroids)
- [Interesting Facts](#interesting-facts)
- [Impact and Importance](#impact-and-importance)

## Introduction
In this lesson, we will explore the fascinating world of asteroids, the rocky remnants of the early solar system. 

## Formation of Asteroids
We will learn about how asteroids are formed from the leftover material of the early solar system and the role they play in our understanding of the universe.

## Classification of Asteroids
We will delve into the different types of asteroids based on their composition, size, and location within the solar system.

## Interesting Facts
Discover some intriguing facts about asteroids, including their impact on Earth, their composition, and the possibility of mining them for valuable resources.

## Impact and Importance
Understand the significance of studying asteroids, including their potential impact on Earth, their role in the formation of planets, and their importance in providing insights into the history of our solar system.`;

const sectionPrompt = `You are an AI that will take a lesson plan to use as context, and the section title and content to generate new sections to fill in the lesson. Make sure to include examples and explanations to make the content comprehensive.
The response should be in markdown format`

const quizPrompt = "You are an AI programmed to utilize a provided lesson plan as context. Your task is to generate new pages to supplement the lesson using the given page title and content. Your output should include comprehensive quiz questions and answers. Avoid oversimplification and strive for diversity in problem creation to ensure a thorough understanding of the content for the student. The generated content should be formatted in Markdown."


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

export const postSectionChat = async (req, res) => {
    const {sectionInfo, section } = req.body
    const userMessage =`I want to add content to this section: ${section} with context from ${sectionInfo}. Please explain the concepts and provide examples to make the content comprehensive. I am looking for a detailed explanation in markdown format.`

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: sectionPrompt
            },
            {
                role: 'user',
                content: userMessage
            }
        ],

    }) 
    console.log(response['usage']['total_tokens']);
    res.json(response['choices'][0]['message']['content'])
}

export const postQuizChat = async (req, res) => {
    const {pageInfo, page} = req.body
    const userMessage = `I want to add a quiz to this page: ${page} with context from ${pageInfo}. Please provide questions and answers to make the quiz comprehensive. Do not make the quiz too simple. Create diverse problems and ensure that I am going to fully understand the content once I am done. I am looking for a detailed explanation in markdown format.`
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: quizPrompt
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