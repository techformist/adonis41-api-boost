"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class ResourceNotExistException extends LogicalException {
  /*
   * Where's this resource?
   */

  handle(error, { response }) {
    return response.status(404).json({
      error: "Resource does not exist."
    });
  }
}

module.exports = ResourceNotExistException;
