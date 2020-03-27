"use strict";

const Database = use("Database");
const Logger = use("Logger");

const CatchAllCustomException = use("App/Exceptions/CatchAllCustomException");

class DailyService {
  /*
   * This service is called by scheduler.
   */
  constructor() {
    // ...
  }

  async testRun({ runDate }) {
    try {
      /*
       * Method called by scheduler.
       * The runDate argument facilitates
       *  - any testing
       *  - test reruns by calling APIs :)
       */

      let runDateDt;
      if (!runDate) {
        runDateDt = new Date();
        runDate = runDateDt.toUTCString().substr(0, 10);
      } else runDateDt = new Date(runDate);

      console.log(`DailyService TestRun as of ${runDate}. `);
    } catch (e) {
      // error silenced
      console.error("error", "DailyService error. " + e);
    } finally {
      console.log("DailyService end.");
    }
  }
}

module.exports = new DailyService();
