import { compile } from "@mdx-js/mdx"
import fs from "fs-extra"

export default defineEventHandler(async (event) => {
    if(event.req.method !== 'POST'){
        console.warn('Ignoring non-POST request:', {
            method: event.req.method,
            url: event.req.url
        })
        return
    }
    try{
        const {path} = readBody(event);
        if(!path){
            console.warn("Path Not Provided Request Made For FrontMatter")
            return
        }
        const file = await fs.readFile(path);
        const fileText = file.toString();
        console.log("fileText", fileText)
        const mdx = await compile(fileText);
        console.log("mdx", mdx)
        return { mdx }
    }catch(error){
        console.error('Error getting font matter :', error)
        event.res.statusCode = 500
        return { error: 'Internal Server Error', message: error.message }
    }
    
})