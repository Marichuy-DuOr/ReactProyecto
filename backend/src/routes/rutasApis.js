const express = require('express');
const apis = require('./../models/apis');
var router = express.Router();
const middleware = require('./middleware');

router.get('/randomSpoonacular', async(req, res) => {
    const data = await apis.getRandomSpoonacular();
    // console.log("----->", data); //tiene mucha mas informacion que la que necesito
    // console.log("----->", data.data);
    res.json(data.data); //la respuesta del servidor se genera aqui
});

router.get('/recipeSpoonacular/:id', async(req, res) => {
    const data = await apis.getRecipeSpoonacular(req.params.id);
    res.json(data.data);
});

router.get('/recipesSpoonacular/:recetas', async(req, res) => {
    const data = await apis.getRecipesSpoonacular(req.params.recetas);
    res.json(data.data);
});

router.get('/buscarSpoonacular/:busqueda', async(req, res) => {
    const data = await apis.getRecipeQuerySpoonacular(req.params.busqueda);
    res.json(data.data);
});

router.get('/ingredientsSpoonacular/:busqueda', async(req, res) => {
    const data = await apis.getIngredientsSpoonacular(req.params.busqueda);
    res.json(data.data);
});

router.get('/ingredientSpoonacular/:id', async(req, res) => {
    const data = await apis.getIngredientSpoonacular(req.params.id);
    res.json(data.data);
});

router.get('/similarSpoonacular/:id', async(req, res) => {
    const data = await apis.getSimilarSpoonacular(req.params.id);
    res.json(data.data);
});

module.exports = router;