const mongoose = require('../back-end/conexaoBD');

const EmpresaShema = new mongoose.Schema({
    nameEmpresa: {
        type: String,
        required: true,
    },
    emailEmpresa: {
        type: String,
        required: true,
    },
    telefoneEmpresa: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    ramo: {
        type: String,
        required: true,
    },
    org: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    tipoLoja: {
        type: String,
        required: true,
    },
});

const Empresa = mongoose.model('Empresa', EmpresaShema);

module.exports = Empresa;