export default function installScript(hljs) {
    return {
        keywords: 'npx npm bun yarn',
        literal: 'create',
        contains: [
          {
            scope: 'string',
            begin: '"', end: '"'
          },
          {
            className: 'built_in',
            begin: /\b(?:npx|npm|yarn|bun)\b/,
            end: /\s/,
          },
          // Highlight CLI options starting with --
          {
            className: 'symbol', // or 'params'
            begin: /--[^\s]+/,
            end: /\s/,
          },
          // Highlight some keywords (e.g., create, install)
          {
            className: 'keyword',
            begin: /\b(?:create|install|update|init|remove)\b/,
            end: /\s/,
          },
          // Simple support for numbers (versions, etc.)
          {
            className: 'number',
            begin: /\b\d+(\.\d+)*\b/,
            end: /\s/,
          },
          //simple support for coments everything after //
            {
                className: 'comment',
                begin: /\/\/.*$/,
                end: /$/
            }
          
        ]
      }
  }