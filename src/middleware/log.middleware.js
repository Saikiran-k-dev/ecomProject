import fs from "fs"
import winston from "winston"

const fsPromise = fs.promises

const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
})

export const loggerMiddleware = async (req, res, next) => {
    try {
      const logData = `\n${new Date().toString()}\n req URL: ${req.url} \n reqBody: ${JSON.stringify(req.body)} `
      logger.info(logData)
      next()
    } catch (error) {
      console.log(error)
      next()
    }
  
  };

  export default logger
