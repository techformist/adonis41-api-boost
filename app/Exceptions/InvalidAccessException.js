"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class InvalidAccessException extends LogicalException {
  /*
   * You can't access this resource!
   */

  handle(error, { response }) {
    return response.status(403).json({
      error: "Invalid access to resource."
    });
  }
}

module.exports = InvalidAccessException;
