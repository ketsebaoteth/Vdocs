import { codeToHtml, getHighlighter } from 'shiki'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'

export default defineEventHandler(async (event) => {

    if (event.req.method !== 'POST') {
        console.warn('Ignoring non-POST request:', {
            method: event.req.method,
            url: event.req.url
        })
        return
    }

    console.log("Highlighting code Request Recived");

    const body = await readBody(event)

    const { content, lang } = body


    try {
        const html = await codeToHtml(content, {
            lang: lang,
            themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
            },
            transformers: [
                transformerTwoslash({
                    renderer: rendererRich(),
                }), // <-- here
                // ...
            ],
        })

        console.log("Highlighting sucess");

        return { html }
    } catch (error: any) {
        console.error('Error highlighting code:', error)
        event.res.statusCode = 500
        return { error: 'Internal Server Error', message: error.message }
    }
})