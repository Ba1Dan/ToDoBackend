const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require("fs")

const app = express();
let arr = []

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());




http.createServer(app).listen(3000, () => {
    console.log("Server is working on port")
})