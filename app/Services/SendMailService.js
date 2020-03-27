"use strict";

const Mail = use("Mail");
const Env = use("Env");

class SendMailService {
  async sendMail({ data, params }) {
    // NO EXTERNAL EMAILS TO BE SENT IN NON-PROD UNLESS WHITELISTED.
    if (
      Env.get("NODE_ENV")
        .toLowerCase()
        .indexOf("production") < 0
    ) {
      if (
        Env.get("EMAIL_WHITE_LIST")
          .toLowerCase()
          .indexOf(data.email) < 0
      )
        data.email = Env.get("EMAIL_TEST_USER");
    }

    params.template = params.template ? params.template : "hello";
    params.subject = params.subject ? params.subject : params.template;

    await Mail.send("emails." + params.template, data, message => {
      message
        .to(data.email)
        .from(Env.get("SMTP_USERNAME"))
        .subject(params.subject);
    });
  }
}

module.exports = new SendMailService();
