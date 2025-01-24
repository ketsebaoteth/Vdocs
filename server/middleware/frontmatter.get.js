import {read} from "to-vfile"
import { VFile } from "vfile"
import { matter } from "vfile-matter"

export default defineEventHandler(async (event) => {
    if(event.req.method !== 'POST'){
        console.warn('Ignoring non-POST request:', {
            method: event.req.method,
            url: event.req.url
        })
        return
    }
    try{
        const body = await readBody(event);
        const { path } = body;
        if(!path){
            console.warn("Path Not Provided Request Made For FrontMatter")
            return
        }
        const file = await read(path);
        const fileText = file.toString();
        const vfile = new VFile({value: fileText});
        matter(vfile);
        const frontMatter = vfile.data;
        return { frontMatter}
    } catch (error) {
        console.error('Error getting font matter :', error)
        event.res.statusCode = 500
        return { error: 'Internal Server Error', message: error.message }
      }
    
})