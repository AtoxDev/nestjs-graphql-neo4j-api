import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler {
 static handleErrorGeneral(message: string, status: HttpStatus, errorCode: string) {
  throw new HttpException(
    {
      message: message,
      errorCode: errorCode,
      statusCode: status,
    },
    status
  );
 }
}
