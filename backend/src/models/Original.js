const { Schema, model } = require('mongoose');

const originalSchema = new Schema({
    id_usuario: String,
    nombre: String,
    listoMinutos: String,
    descripcion: String, 
    ingredientes: String,
    instrucciones: String,
    image: String
}, {
    timestamps: true
});

module.exports = model('Original', originalSchema, 'Originals');
