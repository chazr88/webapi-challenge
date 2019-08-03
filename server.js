const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();

server.use(express.json())
server.use('/api/project', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send("<h1>WEB API SPRINT!</h1>")
})


module.exports = server;
