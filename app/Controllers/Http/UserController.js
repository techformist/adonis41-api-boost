"use strict";

const User = use("App/Models/User");
const Persona = use("Persona");

const AuthorizationService = use("App/Services/AuthorizationService");
const UserNotFoundException = use("App/Exceptions/UserNotFoundException");
const CatchAllException = use("App/Exceptions/CatchAllException");

class UserController {
  /*
   * Support user login.
   * Return user details with token upon successful login.
   */
  async login({ request, auth }) {
    const { userid, password } = request.all();

    const userDetails = await User.query()
      .where("userid", userid)
      .setHidden(["password"])
      .fetch();

    const userJSON = userDetails.toJSON();

    if (userJSON.length <= 0) throw new UserNotFoundException();

    let token = await auth.attempt(userid, password);

    // return token + user details
    token["user"] = userDetails;

    return token;
  }

  /*
   * User registration.
   * Use this for
   *  - user self-registration or
   *  - user creation by admin (which may require further validation).
   * Return user details with token upon successful login.
   */
  async register({ request }) {
    const {
      userid,
      email,
      password,
      username,
      start_date,
      end_date,
      mobile_phone
    } = request.all();

    // do any data validations here.

    const registerUser = await Persona.register({
      userid: userid,
      email: email,
      password: password,
      username: username,
      password_confirmation: password,
      mobile_phone: mobile_phone,
      start_date: start_date,
      end_date: end_date,
      account_status: "Pending"
    });

    // Persona creates users and fires events

    return request.all();
  }

  async verifyToken({ request, auth }) {
    /*
     * Registration flow.
     * User clicks on email link as part of registration, goes to a page ..
     * .. and the page sends token to this service
     */
    const { token } = request.all();
    return await Persona.verifyEmail(token);

    // Event fired by persona. Further processing in events
  }

  async forgotPassword({ request, auth }) {
    /*
     * Forgot password flow. Send email.
     */
    const data = request.all();
    await Persona.forgotPassword(data["userid"]);

    // Event fired by persona. Further processing in events
  }

  async resetPassword({ request, auth }) {
    /*
     * Reset password flow.
     * Also called by client/controller/service after verifying
     * token using `verifyToken` service.
     */
    const data = request.all();

    await Persona.updatePasswordByToken(data["token"], {
      password: data["password"],
      password_confirmation: data["password"]
    });

    // Event fired by persona. Further processing in events
  }

  async updatePassword({ request, auth }) {
    /*
     * Update them passwords please
     */
    const { old_password, new_password } = request.all();

    const user = await auth.getUser();

    // we rely on -
    //  - client to enforce validations on the frontend
    //  - persona to validate passwords (including empty conditions)
    //    actually change password on server

    await Persona.updatePassword(user, {
      old_password: old_password,
      password: new_password,
      password_confirmation: new_password
    });

    let token;

    try {
      // validate new password and return this token to client
      token = await auth.attempt(user.userid, new_password);
    } catch (e) {
      throw new CatchAllException("Could not verify updated password. " + e);
    }

    return token;
  }

  async checkValidUser({ request }) {
    /*
     * Return true or false depending on whether userid exists
     */
    const { userid } = request.all();
    const userRec = await User.query()
      .where("userid", userid)
      .first();

    const valid = userRec ? false : true;

    return { valid: valid };
  }
}

module.exports = UserController;
