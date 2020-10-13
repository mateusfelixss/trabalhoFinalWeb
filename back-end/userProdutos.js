const mongoose = require('../back-end/conexaoBD');

const ProdutoShema = new mongoose.Schema({
    nameProduto: {
        type: String,
        required: true,
    },
    tipoProduto: {
        type: String,
        required: true,
    },
    valorProduto: {
        type: Number,
        required: true,
    },
    qtdProduto: {
        type: Number,
        required: true,
    },
    descricaoProduto: {
        type: String,
        required: true,
    },
    // empresa: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Empresa',
    //     required: true,
    // },
});

const Produto = mongoose.model('Produto', ProdutoShema);

module.exports = Produto;