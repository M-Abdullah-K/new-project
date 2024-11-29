const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    CustomerName: {
        type: String,
        required: true
    },
    CustomerEmail: {
        type: String,
        required: true,
        unique: true
    },
    CustomerPhone: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
