const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    id_usuario: String,
    id_ingredient: String,
    name: String,
    image: String, 
    categoryPath: []
}, {
    timestamps: true
});

module.exports = model('Ingredient', ingredientSchema, 'Ingredients');