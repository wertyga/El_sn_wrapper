import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';


export default (req, Component, state) => {
    const html = renderToString(
        <StaticRouter context={{}} location={req.url}>
                {Component}
        </StaticRouter>
    );

    return (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Crypto Signer</title>
                <link rel="stylesheet" href="/css/main.css">
              
               <script src="/bundle.js" defer></script>
            </head>
            <body>
            
                <div id="app">${html}</div>
            
            </body>
            </html>
        `);
};