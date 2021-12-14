const express = require('express');

const app = express();

app.use(express.json());  // Faz as reqs do express trabalhar em json


// ==============================================

//Conexão local com mongodb
const Conn = require('./models/conn/conn');

Conn("localhost", 27017, "filmes")

const port = 3000;

// ==============================================


// Rotas ===================
const filmesRouter = require('./routers/filmes.routes');
app.use('/filmes', filmesRouter);


app.get('/', (req, res) => {
    res.send('Bem vindo');
});



// ==============================================


app.listen(process.env.PORT || port, () => {
    console.info(`Rodando na porta http://localhost:${port}/`);
});

