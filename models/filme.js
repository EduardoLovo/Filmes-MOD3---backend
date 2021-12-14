// Importa o mongoose
const mongoose = require('mongoose');

// ========================================================


// Model para criar novo filme
const filmeModel = new mongoose.Schema({
    nome: { type: String, required: true },
    img: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
})


const Filme = mongoose.model("filme", filmeModel);

module.exports = Filme;