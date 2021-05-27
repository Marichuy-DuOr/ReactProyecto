const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    nombre: String,
    apepat: String, 
    apemat: String
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'usuarios');