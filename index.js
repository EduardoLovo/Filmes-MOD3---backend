const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());  // Faz as reqs do express trabalhar em json


// ==============================================

//Conexão local com mongodb
const Conn = require('./models/conn/conn');

Conn("localhost", 27017, "filmes")

// ==============================================


// Rotas ===================
app.get('/', (req, res) => {
    res.send('Bem vindo');
});

const filmesRouter = require('./routers/filmes.routes');
app.use('/filmes', filmesRouter);

// ==============================================


app.listen(process.env.PORT || port, () => {
    console.info(`Rodando na porta http://localhost:${port}/`);
});

