const axios = require('axios')
module.exports = {

    getRandomSpoonacular: async() => {
        return await axios.get(`https://api.spoonacular.com/recipes/random?number=12&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getRecipeSpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/recipes/${req}/information?includeNutrition=true&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getIngredientsSpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${req}&number=12&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getIngredientSpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/food/ingredients/${req}/information?amount=1&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getRecipeQuerySpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${req}&number=12&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getRecipesSpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f&ids=${req}`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

    getSimilarSpoonacular: async(req) => {
        return await axios.get(`https://api.spoonacular.com/recipes/${req}/similar?number=12&apiKey=0ee5f89c8bb54cfe9dc6fa23c96f8e1f`)
            .then(data => data)
            .catch(err => { console.log(err); return err })

    },

}