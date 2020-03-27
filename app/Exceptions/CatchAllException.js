"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class CatchAllCustomException extends LogicalException {
  /*
   * There is a way to bring all exceptions to the mainstream!
   */

  handle(error, { response }) {
    return response.status(403).json({
      error: "Error processing your request. " + error.message
    });
  }
}

module.exports = CatchAllCustomException;
