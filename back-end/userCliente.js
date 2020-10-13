const mongoose = require('../back-end/conexaoBD');

const ClienteShema = new mongoose.Schema({
    name: {
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
    telefone: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
});

const Cliente = mongoose.model('Cliente', ClienteShema);

module.exports = Cliente;