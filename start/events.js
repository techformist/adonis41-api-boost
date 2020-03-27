//events.js

const Event = use("Event");
const Env = use("Env");
const querystring = use("querystring");
const User = use("App/Models/User");

const SendMailService = use("App/Services/SendMailService");

Event.on("user::created", async user => {
  /*
   * Event raised by persona when user registers.
   * Send an email wito user to confirm email.
   */
  SendMailService.sendMail({
    user: user,
    template: "registration",
    subject: "Hello! Confirm your registration"
  });
});

Event.on("forgot::password", async data => {
  const emailToken = querystring.encode({
    token: data.token
  });

  SendMailService.sendMail({
    /*
     * Event raised by persona - triggered when user clicks 'forgot password'.
     * Send an email to confirm password change.
     */
    data: {
      ...data.user.toJSON(),
      token: emailToken,
      tokenURL: Env.get("FRONTEND_URL") + "/reset-password?" + emailToken
    },
    params: {
      template: "forgot-password",
      subject: "Reset Password"
    }
  });
});

Event.on("password::changed", async data => {
  /*
   * Event raised by persona when user registers.
   * Send an email to confirm password change.
   */
  SendMailService.sendMail({
    data: {
      ...data.user.toJSON(),
      appURL: Env.get("FRONTEND_URL")
    },
    params: {
      template: "update-password",
      subject: "Password Changed"
    }
  });
});

Event.on("send::mail", async data => {
  /*
   * A generic event to send email.
   * Just specify template & subject and raise event anywhere!
   */
  SendMailService.sendMail({
    data: {
      ...data.objectInstance.toJSON(),
      email: data.email,
      appURL: Env.get("FRONTEND_URL")
    },
    params: {
      template: data.template,
      subject: data.subject
    }
  });
});
