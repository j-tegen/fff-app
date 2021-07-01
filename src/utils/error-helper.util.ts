import { EErrorCode } from '@/enums/error-code.enum';

export class ErrorHelper {
  static parseErrorCode(value: string): EErrorCode {
    const errorCode: EErrorCode = EErrorCode[value as EErrorCode];
    return errorCode || EErrorCode.UNKNOWN_ERROR;
  }
}
