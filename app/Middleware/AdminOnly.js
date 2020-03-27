"use strict";

const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

class AdminOnly {
  async handle({ request, auth }, next) {
    const user = await auth.getUser();

    if (!user.role_cd || user.role_cd.toLowerCase().indexOf("admin") < 0)
      throw new InvalidAccessException();

    await next();
  }
}

module.exports = AdminOnly;
