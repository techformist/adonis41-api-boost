"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class UserNotFoundException extends LogicalException {
  /**
   * This user is AWOL?
   */
  // handle () {}

  handle(error, { response }) {
    response.status(401).send("User not registered.");
  }
}

module.exports = UserNotFoundException;
