const mongoose = require('../back-end/conexaoBD');

const ProdutoShema = new mongoose.Schema({
    nameProduto: {
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
    //     required: true
    // },
});

const Produto = mongoose.model('Produto', ProdutoShema);

//module.exports = ProdutoShema;
module.exports = Produto;
/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('posts', Post)
*/