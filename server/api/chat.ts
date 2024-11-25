import { OpenAI } from 'openai'
import companyData from '../../data/companyData.json'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      message: 'OpenAI API key is not configured'
    })
  }

  const openai = new OpenAI({
    apiKey: config.openaiApiKey
  })

  try {
    const { question } = await readBody(event)

    if (!question) {
      throw createError({
        statusCode: 400,
        message: 'Question is required'
      })
    }

    const systemPrompt = `Du bist ein hilfreicher Assistent für ein Unternehmen. 
Nutze die folgenden Unternehmensinformationen, um Fragen zu beantworten:

${JSON.stringify(companyData, null, 2)}

Antworte freundlich und professionell. Wenn eine Frage nicht mit den verfügbaren 
Informationen beantwortet werden kann, sage das ehrlich.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return {
      answer: completion.choices[0].message.content
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error)

    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Fehler bei der Verarbeitung der Anfrage'
    })
  }
})