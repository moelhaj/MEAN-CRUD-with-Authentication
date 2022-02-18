require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

const app = express();
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// routing
const project = require('./src/routes/project');
const tickets = require('./src/routes/tickets');
const users = require('./src/routes/users');

app.use('/api/projects', project);
app.use('/api/tickets', tickets);
app.use('/users', users);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

const port = process.env.PORT || 5000;
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to database");
        // Start the application
        console.log("Starting Server");
        app.listen(port, () => {
            console.log(`Server Running at ${port}`);
        });
    })
    .catch(error => {
        console.error("Unable to connect to database");
        console.error(error);
    });

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    app.close(() => process.exit(1));
});
