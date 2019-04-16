/**
 * @file
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

export class ErrorGetInitialProps extends Error {
   constructor(message, responseCode) {
      super();
      this.message = message;
      this.responseCode = responseCode;
   }
}
