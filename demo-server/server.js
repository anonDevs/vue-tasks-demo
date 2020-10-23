const express = require('express');
const app = express();

// VARIABLES
const JWT_SECRET = 'whoifosijdofjoi';

// NPM imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Connect Database
mongoose.connect('mongodb://anondevs:p%40ssw0rd@10.7.1.13/vue-demo?authSource=admin', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Model imports
const User = require('./models/User.model');
const Task = require('./models/Task.model');
const { translateAliases } = require('./models/User.model');

// Express app setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define middleware functions and init function 
//  The init function will create a user in the DB if there is no existing user
const init = async () => {
    try {
        const users = await User.find();
        if (users.length == 0) {
            const user = await User.create({
                username: 'admin',
                password: 'password'
            });
            console.log(user);
        } else {
            console.log('User is admin password is password (Case sensitive)');
        }
    } catch (e) {
        console.log(e);
    }
};
init();

const checkIfLoggedIn = async (req, res, next) => {
    try {
        token = req.headers.authorization.split(' ')[1];
        const verified = await jwt.verify(token, JWT_SECRET);
        if (!verified) {
            res.status(403).json('Please log in!');
            return;
        }
        next();
    } catch (e) {
        console.log(e);
    }
};

// Authentication route
app.post('/api/auth', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) throw new Error('User not found!');

        if (user.password === password) {
            const token = await jwt.sign(user.username, JWT_SECRET);
            res.status(200).json({
                token
            });
        }

    } catch (e) {
        console.log(e);
    }
});

// Add Task route
app.post('/api/tasks', checkIfLoggedIn, async (req, res) => {
    try {
        const task = await Task.create({
            name: req.body.name
        });

        res.status(201).json({
            task
        });
    } catch (e) {
        console.log(e);
    }
});

// Get all tasks
app.get('/api/tasks', checkIfLoggedIn, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            tasks
        });
    } catch (e) {
        console.log(e);
    }
});

// Edit task
app.patch('/api/tasks/:id', checkIfLoggedIn, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) throw new Error('Task not found!');

        await Task.findByIdAndUpdate(req.params.id, { name: req.body.name });

        res.status(200).json({
            status: 'success'
        });

    } catch (e) {
        console.log(e);
    }
});

// Delete Tasks
app.delete('/api/tasks/:id', checkIfLoggedIn, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success'
        });
    } catch (e) {
        console.log(e);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});