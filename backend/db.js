// backend/db.js
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/paytm').then(() => {
//     console.log("Connected to MongoDB");
// }).catch((err) => {
//     console.log("Error connecting to MongoDB");
//     console.log('And the error is =>'+err);
// })
const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/paytm');
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB");
        console.log('And the error is =>' + err);
    }
}

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
  Account,
  connect
};