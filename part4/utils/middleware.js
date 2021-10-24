const logger = require("./logger")

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  // code that extracts the token

  next()
}

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method)
  logger.info("Path: ", req.path)
  logger.info("Body: ", req.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: "unknown Endpoint"})
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({error: "malformatted id"})
  } else if (error.name === "ValidationError") {
    return res.status(400).json({error: error.message})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'})
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired' })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}