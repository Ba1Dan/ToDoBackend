const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original URL = ', req.originalUrl);
    console.log('method = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY = ', req.body);
    console.log('QUERY = ', req.query);

    next();
})

app.post("/test", function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(request.body);
});

app.get('/test', (req, res) => {
    res.status(200).json({message: 'Good job'});
})

app.put('/test',function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(request.body);
});

http.createServer(app).listen( 3000, () => {
    console.log("Server is working on port")
})