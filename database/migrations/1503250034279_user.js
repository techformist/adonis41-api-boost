"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("username", 80)
        .notNullable()
        .unique();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.timestamps();

      // I want more!
      table
        .string("userid", 20)
        .notNullable()
        .unique();
      table.string("mobile_phone", 15);
      table.datetime("start_date", 6);
      table.datetime("end_date", 6);
      table.string("account_status", 50);
      table.string("phone_1", 50);
      table.string("role_cd", 50);
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
