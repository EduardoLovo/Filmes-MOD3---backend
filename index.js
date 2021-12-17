if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

// cors para integração com front
const cors = require('cors');

const Conn = require('./models/conn/conn');

const filmesRouter = require('./routers/filmes.routes');

// ==============================================

const app = express();

app.use(express.json());  // Faz as reqs do express trabalhar em json

app.use(cors());


// ==============================================

// Rotas ===================

app.use('/filmes', filmesRouter);

app.get('/', (req, res) => {
    res.send('Bem vindo');
});

// ==============================================


//Conexão local com mongodb

const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_data = process.env.DB_DATA;

Conn(db_url, db_user, db_pass, db_data);


// ==============================================


app.listen(process.env.PORT, () => {
    console.log('Rodando com Banco');
});

