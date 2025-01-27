import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import markdownItAttrs from 'markdown-it-attrs'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typography: true
})

md.use(markdownItContainer, 'vue')
md.use(markdownItAttrs)

export default (context, inject) => {
  inject('md', md)
}