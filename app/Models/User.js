"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get hidden() {
    return ["password"];
  }

  static get dates() {
    return super.dates.concat(["last_login_date", "start_date", "end_date"]);
  }

  /*
   * Return dates in specific format.
   * Ideally this should use the user locale passed by client
   */
  static castDates(field, value) {
    if (field.indexOf("_date") > 0)
      return value ? value.format("DD/MM/YYYY") : value;
    else return value ? value.format("DD/MM/YYYY hh:mm a") : value;
  }

  static formatDates(field, value) {
    if (field.indexOf("_date") > 0) {
      return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
    return super.formatDates(field, value);
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
