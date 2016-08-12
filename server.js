var express = require('express');
var app = express();

app.get('/', (req, res) => {
    
   //res.writeHead(200, { "Content-Type": "text/html" });
   res.send('Hello World!');
   
   
    
}).listen(8080, ()=> {
    console.log('Example app listening on port 8080');
    
})
