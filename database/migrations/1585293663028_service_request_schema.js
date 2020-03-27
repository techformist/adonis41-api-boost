"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceRequestSchema extends Schema {
  up() {
    this.create("service_requests", table => {
      table.increments();
      table.timestamps();

      table
        .integer("owner_id")
        .unsigned()
        .references("id")
        .inTable("users");

      table.string("sr_number", 50);

      table.string("type_cd", 50);
      table.string("status_cd", 50);
      table.string("priority", 50);
      table.string("description", 255);
      table.datetime("actual_start_date");
      table.datetime("actual_end_date");
      table.datetime("planned_start_date");
      table.datetime("planned_end_date");
      table.string("remarks", 255);
    });
  }

  down() {
    this.drop("service_requests");
  }
}

module.exports = ServiceRequestSchema;
