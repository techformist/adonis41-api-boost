# Adonis API Boost

This is the boilerplate on top of boilerplate for creating an API server in AdonisJS v4.1!

When you create AdonisJS API application using the CLI, the app includes -

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

That covered a lot of ground, but I found myself creating the same stuff on top of the base boilerplate. So.. this.

## Additional Libraries

`adonis-api-boost` adds the following additional packages -

1. `@adonisjs/mail`: Mail people using SMTP or third party mail providers
1. `@adonisjs/persona`: User registration, password change, & related paraphernalia
1. `@adonisjs/validator`: Validate data in routes, sanitize data (also, required by persona)
1. `adonis-scheduler`: Schedule jobs
1. `pg`: Connect to PostGRE database. Remove this if you are using other DBs

Oh.. and we also register these packages :)

## Additional Functionality

1. Complete user registration, change password flow with email - thanks to Persona and Mail
1. Use mail templates and do mail-merge (replace placeholders in template with data) using Adonis views
1. Add 'sensible' user attributes like status, start date, etc. See the user migration file for `user`
1. Simple authorisation flow using user role. See `app/services/AuthorisationService` to know more
1. A sample `Service Request` entity that demonstrates authenticated routes
1. Sample batch job that runs daily

Find more superficial and minor changes at the end of this page.

## Setup

Clone this repository to start..

```bash
git clone https://github.com/techformist/adonis41-api-boost.git
```

Install -

```bash
cd adonis41-api-boost
npm i
```

Now you continue your work as in any other AdonisJS project.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## More Info

### More Additions / Changes to AdonisJS API Boilerplate

#### Run Scripts

Run scripts in `package.json` to execute -

1. PM2 (production)
1. Job scheduler using Adonis scheduler

#### Date Format Conversion

Date format changes for entities as demonstrated in User and Service Request models.

#### Test Routes

Test routes accessible to an admin to test batch routines, and send email functionality.

#### Test Mails

Reduce risk of emails being sent out from non-production / test environments. You have to explicitly whitelist email ids that can receive emails in non-production environments.

#### Exceptions

Standard exceptions and exception handling - this is standard behaviour in AdonisJS, but ignored by many.

See `app/services/SendEmailService.js`.

## Quick Tests

There are no test script provided in the repository.

Following samples demonstrate how APIs can be quickly tested with this project.

### Prepare

1. Install a client application like [Insomnia]().
1. Start the AdonisJS server. By default Adonis runs on port 3333
   ```bash
   adonis serve --dev
   ```
1. Open Insomnia and fire away your requests
1. (Optional) Use an app like FakeSMTP to catch emails

### Validate

#### User Registration

1. Send a `POST` request to [http://localhost:3333/api/v0/auth/register]

**Request**

```json
{
  "userid": "a1",
  "password": "a1",
  "email": "a1@a.com",
  "start_date": "31/12/2019"
}
```

**Response**

Data in request is sent back as response along with any data populated by the server.

A registration email is triggered to the registered email id.

```json
{
  "userid": "a1",
  "password": "a1",
  "email": "a1@a.com",
  "start_date": "31/12/2019"
}
```

#### More Auth Requests

Following services are part of authorisation flow.

**1. POST http://localhost:3333/api/v0/auth/login**

Request -

```json
{
  "userid": "a1",
  "password": "a1"
}
```

Response -

```json
{
  "type": "bearer",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.whoa",
  "refreshToken": null,
  "user": [
    {
      "id": 2,
      "username": null,
      "email": "a1@a.com",
      "created_at": "27/03/2020 02:44 pm",
      "updated_at": "27/03/2020 02:44 pm",
      "userid": "a1",
      "mobile_phone": null,
      "start_date": "31/12/2019",
      "end_date": null,
      "account_status": "Pending",
      "phone_1": null,
      "role_cd": null
    }
  ]
}
```

**2. POST http://localhost:3333/api/v0/auth/forgot-password**

```json
{
  "userid": "a5"
}
```

No response output, but an email with security token is sent to user.

**3. POST http://localhost:3333/api/v0/auth/reset-password**

```json
{
  "token": "48fc2cd9a42384b6c1234834e511f98faSepIfa9Pww5aPxQtSavvpnsYvvr8Za556sR9ljpS8w=",
  "password": "pass"
}
```

No response output, but a password reset notification email is sent to user.

**4. POST http://localhost:3333/api/v0/auth/update-password**

```json
{
  "old_password": "pass",
  "new_password": "ssap"
}
```

No response output, but a password reset notification email is sent to user.

#### Other Requests

Similar tests can be done for any services made available in routes.

- POST http://localhost:3333/api/v0/sr [user auth]
- GET http://localhost:3333/api/v0/my-sr [user]
- GET http://localhost:3333/api/v0/sr [admin]

Input and output are JSON - refer migration files for field names. Specify JWT token by logging in as a regular user/admin depending on the authentication type.

## Support Us

I created this boilerplate for a quicker start to projects. I plan to upgrade to v5 when that becomes main stream.

If you are benefited by this, please consider supporting our work!

- [Patreon](https://www.patreon.com/techformist)
