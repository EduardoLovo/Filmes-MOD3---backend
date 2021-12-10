const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const filmes = [
    'Matrix',
    'Vingadores',
    'Velozes e Furiosos'
];


// Rotas
app.get('/',(req, res) => {
    res.send('Ola');
});

// ==============================================


// Mostra todos os filmes
app.get('/filmes', (req, res) => {
    res.send(filmes);
});

// ==============================================


// Mostra apenas o filme do id selecionado
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id - 1;
    const filme = filmes[id];

    if(!filme) {
        res.send('Filme não encontrado');
    }

    res.send(filme);
});

// ==============================================


// Adiciona um novo filme
app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    const id = filmes.length;

    if(!filme) {
        res.send('Erro ao adicionar filme, tente novamente')
    }

    filmes.push(filme);

    res.send(`Filme "${filme}" adicionado com sucesso`);
});

// ==============================================


// Atualiza filme
app.put('/filmes/:id', (req, res) => {
    const id = req.params.id - 1;
    const filme = req.body.filme;

    filmes[id] = filme;

    res.send(`Filme atualizando com sucesso: ${filme}`)
});

// ==============================================


// Deleta filme
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id - 1;
    const filme = filmes[id]

    if(!filme){
        res.send('Filme não encontrado');
    }

    delete filmes[id];

    res.send('Filme excluido com sucesso')

})

// ==============================================


app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});

