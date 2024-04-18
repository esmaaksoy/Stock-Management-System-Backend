"use strict"

const express = require('express')
const app = express()

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
const path=require("path")

// asyncErrors to errorHandler:
require('express-async-errors')

app.use(express.static(path.join(__dirname, "public")));

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()


const cors = require("cors");
app.use(cors());

// Accept JSON:
app.use(express.json())

// Call static uploadFile:
app.use('/upload', express.static('./upload'))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/queryHandler'))


// HomePath:
app.all('/api/v1', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Stock Management API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

// Routes:
app.use("/api/v1",require('./src/routes'))


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"));
  });

  app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });

  })


// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() 