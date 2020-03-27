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

## Additional Functions

1. Add 'sensible' user attributes like status, start date, etc. See

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

### More Nuanced Additions

#### Run Scripts

Run scripts in `package.json` to execute -

1. PM2 (production)
1. Job scheduler using Adonis scheduler
