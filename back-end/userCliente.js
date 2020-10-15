const mongoose = require('../back-end/conexaoBD');

const ClienteShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
});

const Cliente = mongoose.model('Cliente', ClienteShema);

module.exports = Cliente;