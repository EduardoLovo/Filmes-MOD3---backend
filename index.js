require('dotenv').config();
const express = require('express');

// cors para integração com front
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
}

// ==============================================

const app = express();

app.use(express.json());  // Faz as reqs do express trabalhar em json
app.use(cors(corsOptions));

// ==============================================

//Conexão local com mongodb
const Conn = require('./models/conn/conn');

const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_data = process.env.DB_DATA;

Conn(db_url, db_user, db_pass, db_data)

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

