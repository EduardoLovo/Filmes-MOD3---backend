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
const filmesRouter = require('./routers/filmes.routes');
app.use('/filmes', filmesRouter);


app.get('/', (req, res) => {
    res.send('Bem vindo');
});



// ==============================================


app.listen(process.env.PORT || port, () => {
    if (port == true) {
        console.info(`Rodando na porta http://localhost:${port}/`);
    } else {
        console.log("Rodando na porta do Heroku");
    }
});

