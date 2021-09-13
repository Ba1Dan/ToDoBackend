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

app.post("/sum", function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let num1 = request.body.num1;
    let num2 = request.body.num2;
    let sum = num1 + num2;
    console.log(sum);
    response.status(200).json({sum: sum})
});

app.post("/reverseArray", function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let arr = request.body.array;
    arr.reverse()
    console.log(arr)
    response.status(200).json({reverseArr: arr})
});

app.post("/reverseCase", function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let str = request.body.str;
    var result = ""
    for (var i = 0; i < str.length; i++) {
        result += toOppositeCase(str[i]);
     }
    console.log(result)
    response.status(200).json({reverseCase: result})
});

app.get('/test', (request, response) => {
    response.status(200).json({message: 'Good job men'});
})

app.put('/test1',function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.status(200).json({message: 'Ok'});
});

http.createServer(app).listen( 3000, () => {
    console.log("Server is working on port")
})

function toOppositeCase(char) {
    return (/[a-z]/).test(char) ? char.toUpperCase() : char.toLowerCase();
}