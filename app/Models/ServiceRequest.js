"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment");

class ServiceRequest extends Model {
  static get dates() {
    return super.dates.concat([
      "planned_start_date",
      "planned_end_date",
      "actual_start_date",
      "actual_end_date"
    ]);
  }

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

  owner() {
    return this.hasOne("App/Models/User", "owner_id", "id");
  }
}

module.exports = ServiceRequest;
