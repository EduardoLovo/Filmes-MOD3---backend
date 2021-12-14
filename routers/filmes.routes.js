const express = require('express');
const router = express.Router();

const Filme = require('../models/filme');


// Retorna todos os filmes
router.get('/', async (req, res) => {
    await Filme.find({})
        .then((filme) => {
            res.status(200).send(filme);
        })
        .catch((err) => {
            res.status(400).send("Algo deu errado, tente novamente!")
            console.error(err);
        })
});


// ==============================================

// Retorna apenas o filme do id selecionado
router.get('/:id', async (req, res) => {
    await Filme.find({ _id: req.params.id })
        .then((filme) => {
            res.status(200).send(filme);
        })
        .catch((err) => {
            res.status(400).send("Algo deu errado, tente novamente!");
            console.error(err);
        })
});


// ==============================================

// Adiciona um novo filme
router.post('/add', async (req, res) => {
    await Filme.create(req.body)
        .then(() => {
            res.status(200).send("Filme adicionado com sucesso!");
        })
        .catch((err) => {
            res.status(400).send("Algo deu errado, tente novamente!");
            console.error(err);
        })
});


// ==============================================

// Atualiza filme
router.put('/update/:id', async (req, res) => {
    await Filme.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.status(200).send("Filme atualizado com sucesso!");
        })
        .catch((err) => {
            res.status(400).send("Algo deu errado, tente novamente!");
            console.error(err);
        })
});


// ==============================================

// Deleta um filme
router.delete('/delete/:id', async (req, res) => {
    await Filme.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).send("Filme excluido com sucesso!");
        })
        .catch((err) => {
            res.status(400).send("Algo deu errado, tente novamente!");
            console.error(err);
        })
});

module.exports = router;