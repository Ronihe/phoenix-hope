/* this APIError Error Response with a related http status */
class APIError extends Error {
  /** Create an Error Object
   * @params {string} title - the title corresponding to the Status Code (e.g. Bad Request)
   * @params {string} message - Specific info about what caused the error
   */
  constructor(status = 500, message = 'Internal Server Error.') {
    super(message);
    this.status = status;
    this.message = message;
    // what is stack trace going
    Error.captureStackTrace(this);
  }

  /* Defines the JSON representation of this class
  automatically invoked when you pass an API Error to res.json
   */
  toJSON() {
    const { status, message } = this;
    return {
      error: {
        status,
        message
      }
    };
  }
}

module.exports = APIError;
