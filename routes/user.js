const { request } = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/register", (request, response) => {
  const { firstName, email, phone, password, lastName } = request.body;

  const statement = `
      INSERT INTO User (
          firstName, lastName, email, password, phone
      ) VALUES (?, ?, ?, ?, ?)
    `;

  // encrypt the password
  const encryptedPassword = String(crypto.MD5(password));

  db.pool.execute(
    statement,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      if (!error) {
        // user registered successfully
        //   'Welcome to TodoApp',
        //   `
        //     <h1>Welcome to TodoApp</h1>
        //     <div>Hi ${firstName}, </div>
        //     <br/>
        //     <div>Thank your registering with us. This app ......</div>
        //     <br/>
        //     <div>Verify your account here: ...</div>
        //     <br/>
        //     <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        //     <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        //     <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        //     <br/>
        //     <div>Thank you,</div>
        //     <div>TodoApp.</div>
        //   `,
        //   () => {
        //     response.send(utils.createResult(error, result))
        //   }
        // )

        response.send(utils.createResult(error, result));
      } else {
        response.send(utils.createError(error));
      }
    }
  );

  router.post("/login", (request, response) => {
    const { email, password } = request.body;

    const statement = `
      SELECT id, firstName, lastName, phone 
      FROM User
      WHERE email = ? AND password = ?
    `;

    // encrypt the password
    const encryptedPassword = String(crypto.MD5(password));

    db.pool.query(statement, [email, encryptedPassword], (error, users) => {
      // if error exists
      if (error) {
        response.send(utils.createError(error));
      } else {
        // query got successfully executed

        // check if user exists
        if (users.length == 0) {
          // user does not exist
          response.send(utils.createError("user does not exist"));
        } else {
          // at least one user exists
          // send the users data to the client

          const { id, firstName, lastName, phone } = users[0];

          response.send(
            utils.createSuccess({
              id,
              firstName,
              lastName,
              email,
            })
          );
        }
      }
    });
  });
});
