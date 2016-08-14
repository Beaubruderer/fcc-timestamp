var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');


//sample output:  { "unix": 1450137600, "natural": "December 15, 2015" }

const months = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];



    //December%2015,%202015
    //1450137600
    

app.use('/', (req, res) => {
    
    console.log(req.method + ' request for: ' + res.url);
    
    if (req.url == '/favico.ico'){
        
            res.writeHead(200, { 'Content-Type': 'image/x-icon' } );
            res.end();
            console.log('favicon requested');
    }
    
    
    if (req.url == '/') { //load homepage if only goes to '/'
    
        fs.readFile('./index.html', 'UTF-8', (err, html) => {
            
            if (err) throw err;
            
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
            console.log(req.method + ' request for: ' + req.url);
            
            })
            
        }
         else {
        
        var urlStr = req.url.slice(1);
    
        var payload = {
            "unix": null,
            "natural": null
        };
        // check if url passed is a natural date string 
        if ((new Date(urlStr.replace(/%20/g, ' '))).getTime() > 0) {
            payload.natural = urlStr.replace(/%20/g, ' ');
            payload.unix = ((new Date(urlStr.replace(/%20/g, ' '))).getTime()) / 1000;
        } else if (!isNaN(Number(urlStr))) {
            
            var unix = Number(urlStr); 
            var date = new Date(unix  * 1000);
            var dateStr = months[date.getMonth()];
            dateStr += ' ' + date.getDate() + ', ' + date.getFullYear();
            console.log(dateStr);
            
            
            payload.unix = unix;
            payload.natural = dateStr;
            
        }
    
        console.log(payload);
        
        
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(JSON.stringify(payload));
        console.log(req.method + ' request for: ' + req.url);
    }
 
})


var port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log('Example app listening on port 8080');
    
})
