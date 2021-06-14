const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    id_usuario: String,
    id_recipe: String,
    title: String,
    creditsText: String, 
    image: String
}, {
    timestamps: true
});

module.exports = model('Recipe', recipeSchema, 'Recipes');