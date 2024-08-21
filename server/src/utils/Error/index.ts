import logger from '../../config/logger';
import { Response } from 'express';
import { errorResponse } from '../../utils/HttpResponse/index';

export default class CustomError extends Error {
  statusCode: number;
  name: string;
  errors?: Object;

  constructor(message: string, statusCode: number, errors?: Object) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errors = errors;
  }
}

export const errorHandler = (res: Response, error: unknown) => {
  if (error instanceof CustomError) {
    logger.error(`${error.name}: ${error.message}`); // Log short message
    logger.debug(error.stack); // Log detailed stack trace
    errorResponse({
      response: res,
      message: error.message,
      status: error.statusCode,
      data: error.errors,
    });
  } else if (error instanceof Error) {
    logger.error(`Error: ${error.message}`);
    logger.debug(error.stack); 
    errorResponse({
      response: res,
      message: error.message,
      status: 500,
    });
  } else {
    logger.error(`Error: ${error}`); 
    errorResponse({
      response: res,
      message: 'Internal Server Error',
      status: 500,
    });
  }
};