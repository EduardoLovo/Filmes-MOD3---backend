const express = require('express');
const { fileURLToPath } = require('url');
const app = express();

const port = 3000;

app.use(express.json());  // Faz as reqs do express trabalhar em json

const filmes = [
    {
        id: 1,
        nome: "Matrix",
        img: "https://conteudo.imguol.com.br/c/splash/d5/2021/12/07/cartaz-de-matrix-resurrections-1638902188140_v2_600x800.jpg.webp"
    },
    {
        id: 2,
        nome: "Clube da Luta",
        img: "http://vortexcultural.com.br/images/2016/03/Clube-da-Luta-1.jpg"
    },
    {
        id: 3,
        nome: "Toy Story 4",
        img: "https://br.web.img3.acsta.net/pictures/19/03/27/21/03/0464387.jpg"
    },
    {
        id: 4,
        nome: "Homem Aranha",
        img: "https://sm.ign.com/ign_br/screenshot/default/hasvc-cartazposted-1080x1350px-data_ydrv.jpg"
    },
    {
        id: 5,
        nome: "Vanilla Sky",
        img: "http://www.heuvi.com.br/wp-content/uploads/2015/05/vanilla_sky.jpeg"
    },
];


// ==============================================

// VALIDÇÕES

// Filter para não mostrar "null" depois de excluir um filme.
const getFilmesValidos = () => filmes.filter(Boolean)

// Validação para retornar filme por id
const getFilmesById = (id) => {
    return getFilmesValidos().find((filme) => filme.id === id)

}

// Validação para retornar filme por indice
const getIndexByFilme = (id) => getFilmesValidos().findIndex((filme) => filme.id === id);

// ==============================================



// Rotas ===================
app.get('/', (req, res) => {
    res.send('Bem vindo');
});

// ==============================================

// Retorna todos os filmes
app.get('/filmes', (req, res) => {
    res.send(getFilmesValidos());
});


// ==============================================

// Retorna apenas o filme do id selecionado
app.get('/filmes/:id', (req, res) => {
    const id = +req.params.id;
    const filme = getFilmesById(id);

    if (!filme) {
        res.send('Filme não encontrado');
    }

    res.send(filme);
});


// ==============================================

// Adiciona um novo filme
app.post('/filmes', (req, res) => {
    const filme = req.body;

    if (!filme || !filme.nome || !filme.img) {
        res.status(400).send({
            message: "Filme invalido, tente novamente"
        });
        return;
    }

    const ultimoFilme = filmes[filmes.length - 1];

    if (filmes.length) {
        filme.id = ultimoFilme.id + 1;
        filmes.push(filme);
    } else {
        filme.id = 1;
        filmes.push(filme);
    }

    res.send(`Filme "${filme.nome}" adicionado com sucesso`);
});


// ==============================================

// Atualiza filme
app.put('/filmes/:id', (req, res) => {
    const id = +req.params.id;

    const filmeIndex = getIndexByFilme(id);

    if (filmeIndex < 0) {
        res.status(404).send({
            message: "Filme não encontrado, tente novamente"
        });
        return;
    }

    const novoFilme = req.body;

    if (!Object.keys(novoFilme).length) {
        res.status(400).send({
            message: "Faltando dados, tente novamente"
        });
        return;
    }

    if (!novoFilme || !novoFilme.nome || !novoFilme.img) {
        res.status(400).send({
            message: "Filme invalido, tente novamente"
        });
        return;
    }

    const filme = getFilmesById(id);

    console.log(filmeIndex);
    filmes[filmeIndex] = {
        ...filme,
        ...novoFilme
    };

    res.send(filmes[filmeIndex]);
});


// ==============================================

// Deleta um filme
app.delete('/filmes/:id', (req, res) => {
    const id = +req.params.id;

    const filmeIndex = getIndexByFilme(id)

    if (filmeIndex < 0) {
        res.status(404).send({
            message: "Filme não encontrado, tente novamente."
        });
        return;
    }

    filmes.splice(filmeIndex, 1);

    res.send({
        message: 'Filme excluido com sucesso'
    });
});

// ==============================================


app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});

