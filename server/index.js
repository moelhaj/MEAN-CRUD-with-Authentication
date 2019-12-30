const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
dotenv.config();

// Database
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database Error', err));
mongoose.set('useFindAndModify', false);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


// Routing
const project = require('./routes/project');
const tickets = require('./routes/tickets');
const users = require('./routes/users');

app.use('/api/projects', project);
app.use('/api/tickets', tickets);
app.use('/users', users);
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Start the application
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running at ${port}`);
});