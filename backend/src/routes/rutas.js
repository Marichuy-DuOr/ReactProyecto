const { Router } = require('express');
const router = Router();

const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');
const Original = require('../models/Original');

const middleware = require('./middleware');

router.use(middleware.verifyToken);

// CRUD básico de ingredientes
router.get('/ingredients', (req, res) => {
    const id_usuario = req.userId;
    Ingredient.find({id_usuario: id_usuario})
    .then(doc => {
        res.json({data:doc});
    })
    .catch(err =>{
        console.log("Un error al consultar ingredientes", err.message);
    })
});

router.get('/ingredient/:id_ingredient', (req, res) => {
    const id_ingredient = req.params.id_ingredient;
    const id_usuario = req.userId;
    Ingredient.find({id_ingredient:id_ingredient, id_usuario: id_usuario})
    .then(doc => {
        res.json({data:doc});
    })
    .catch(err =>{
        console.log("Un error al consultar ingrediente", err.message);
    })
});

router.post('/ingredient', (req, res) => {
    const ingredient = new Ingredient(
        {
            id_usuario: req.userId,
            id_ingredient: req.body.id_ingredient,
            name: req.body.name,
            image: req.body.image, 
            categoryPath: req.body.categoryPath
        }
    );
    ingredient.save()
    .then(doc => {
        console.log('Ingrediente insertado', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al insertar ingrediente", err.message);
    })
});

/* router.put('/ingredient/:id',(req,res) => {
    const id = req.params.id;
    const ingredient = new Ingredient(
        {
            id_usuario: req.userId,
            id_ingredient: req.body.id_ingredient,
            name: req.body.name,
            image: req.body.image, 
            categoryPath: req.body.categoryPath
        }
    );
    Ingredient.update({_id:id},{
        id_usuario: ingredient.id_usuario,
        id_ingredient: ingredient.id_ingredient,
        name: ingredient.name,
        image: ingredient.image, 
        categoryPath: ingredient.categoryPath
    })
    .then(doc => {
        console.log('Ingrediente actualizado', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al actualizar ingrediente", err.message);
    })
}); */

router.delete('/ingredient/:id',(req,res) => {
    const id = req.params.id;
    Ingredient.findByIdAndDelete({_id:id})
    .then(doc => {
        console.log('Ingrediente eliminado', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al eliminar ingrediente ", err.message);
    })
});

// CRUD básico de recetas
router.get('/recipes', (req, res) => {
    const id_usuario = req.userId;
    Recipe.find({id_usuario: id_usuario})
    .then(doc => {
        res.json({data:doc});
    })
    .catch(err =>{
        console.log("Un error al consultar recetas", err.message);
    })
});

router.get('/recipe/:id_recipe', (req, res) => {
    const id_recipe = req.params.id_recipe;
    const id_usuario = req.userId;
    Recipe.find({id_recipe:id_recipe, id_usuario: id_usuario})
    .then(doc => {
        res.json({data:doc});
    })
    .catch(err =>{
        console.log("Un error al consultar receta", err.message);
    })
});

router.post('/recipe', (req, res) => {
    const recipe = new Recipe(
        {
            id_usuario: req.userId,
            id_recipe: req.body.id_recipe,
            title: req.body.title,
            image: req.body.image, 
            creditsText: req.body.creditsText
        }
    );
    //mongoose
    recipe.save()
    .then(doc => {
        console.log('Receta insertada', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al insertar receta", err.message);
    })
});

/* router.put('/recipe/:id',(req,res) => {
    const id = req.params.id;
    const recipe = new Recipe(
        {
            id_usuario: req.userId,
            id_recipe: req.body.id_recipe,
            title: req.body.title,
            image: req.body.image, 
            creditsText: req.body.creditsText
        }
    );
    Recipe.update({_id:id},{
        id_usuario: recipe.id_usuario,
        id_recipe: recipe.id_recipe,
        title: recipe.title,
        image: recipe.image, 
        creditsText: recipe.creditsText
    })
    .then(doc => {
        console.log('Receta actualizada', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al actualizar receta", err.message);
    })
}); */

router.delete('/recipe/:id',(req,res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete({_id:id})
    .then(doc => {
        console.log('Receta eliminado', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al eliminar receta ", err.message);
    })
});

// CRUD básico de originales

router.get('/originals', (req, res) => {
    const id_usuario = req.userId;
    Original.find({id_usuario: id_usuario})
    .then(doc => {
        res.json({data:doc});
        console.log(data);
    })
    .catch(err =>{
        console.log("Un error al consultar originales", err.message);
    })
});

router.get('/original/:id', (req, res) => {
    const id = req.params.id;
    Original.find({_id:id})
    .then(doc => {
        res.json({data:doc});
    })
    .catch(err =>{
        console.log("Un error al consultar original", err.message);
    })
});

router.post('/original', (req, res) => {
    const original = new Original(
        {
            id_usuario: req.userId,
            nombre: req.body.nombre,
            listoMinutos: req.body.listoMinutos,
            descripcion: req.body.descripcion, 
            ingredientes: req.body.ingredientes,
            instrucciones: req.body.instrucciones,
            image: req.body.instrucciones
        }
    );
    //mongoose
    original.save()
    .then(doc => {
        console.log('Original insertada', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al insertar original", err.message);
    })
});

router.put('/original/:id',(req,res) => {
    const id = req.params.id;
    const original = new Original(
        {
            // id_usuario: req.userId,
            nombre: req.body.nombre,
            listoMinutos: req.body.listoMinutos,
            descripcion: req.body.descripcion, 
            ingredientes: req.body.ingredientes,
            instrucciones: req.body.instrucciones,
            image: req.body.image
        }
    );
    Original.update({_id:id},{
        // id_usuario: original.id_usuario,
        nombre: original.nombre,
        listoMinutos: original.listoMinutos,
        descripcion: original.descripcion, 
        ingredientes: original.ingredientes,
        instrucciones: original.instrucciones,
        image: original.image
    })
    .then(doc => {
        console.log('Original actualizada', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al actualizar original", err.message);
    })
});

router.delete('/original/:id',(req,res) => {
    const id = req.params.id;
    Original.findByIdAndDelete({_id:id})
    .then(doc => {
        console.log('Original eliminado', doc)
        res.json({response:'exito'});
    })
    .catch(err =>{
        console.log("Un error al eliminar original ", err.message);
    })
});

module.exports = router;