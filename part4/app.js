const express = require("express")
require('express-async-errors');
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");


const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

logger.info("connecting to ", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("Connection established"))
  .catch((error) => logger.error("error connecting: ", error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use("/", blogsRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app