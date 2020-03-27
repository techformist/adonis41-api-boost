"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("/auth/register", "UserController.register");
  Route.post("/auth/login", "UserController.login");
  Route.post("/auth/verify-token", "UserController.verifyToken");
  Route.post("/auth/forgot-password", "UserController.forgotPassword");
  Route.post("/auth/reset-password", "UserController.resetPassword");
  Route.post("/auth/update-password", "UserController.updatePassword");
}).prefix("api/v0");

/*
 USER ROUTES
*/
Route.group(() => {
  Route.get("/my-sr", "ServiceRequestController.indexMy");
  Route.post("/sr", "ServiceRequestController.create");
  Route.patch("/sr/:id", "ServiceRequestController.update");
})
  .prefix("api/v0")
  .middleware("auth");

/*
 ADMIN ROUTES
*/
Route.group(() => {
  Route.get("/sr", "ServiceRequestController.index");
})
  .prefix("api/v0")
  .middleware(["auth", "admin"]);

/*
 * TEST ROUTES - FOR SUPER ADMIN.
 * We are just using admin role here because that's how we roll
 */
Route.group(() => {
  Route.post("/test-mail", () => {
    const user = {
      username: "John Doe",
      email: "test1@test.com"
    };
    SendMailService.sendMail({ user: user });
  });
})
  .prefix("api/v0")
  .middleware(["auth", "super"]);
