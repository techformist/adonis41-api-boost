"use strict";

const Task = use("Task");
const DailyService = use("App/Services/DailyService");

class RunDailyService extends Task {
  static get schedule() {
    /* This job will run daily.
     * Schedule is picked by adonis-scheduler, which in turn runs
     * as a job on the server.
     */
    return "0 0 0 /1 * *";
  }

  async handle() {
    try {
      console.log("RunDailyService task start.");

      // we can call more than one task in one go.
      // .. or have multiple schedulers.
      DailyService.testRun();

      console.log("Ended RunDailyService task end.");
    } catch (e) {
      console.error("Error running RunDailyService task. ", e);
    }
  }
}

module.exports = RunDailyService;
