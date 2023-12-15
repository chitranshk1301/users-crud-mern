const mongoose = require('../db');
require('dotenv').config();

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
        },
        phone: {
            type: Number,
            required: [true, 'email is required'],
            unique: true,
        },
        age: {
            type: Number,
            required: [true, 'age is required']
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
        },
        position: {
            type: String,
            required: [true, 'Position is required'],
        },
        salary: {
            type: Number,
            required: [true, 'Salary is required'],
        },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;