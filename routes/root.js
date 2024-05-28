const { db } = require("../db/mock_db.js");

/**
 * @route   POST /user
 * @desc    Register a new user
 */
function postRoute(request, response) {
  switch (request.url) {
    case "/user":
      data = request.body;

      if (!data.email || !data.password) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Incorrect data",
          })
        );
        response.end();
        break;
      }

      if (db.getUserByEmail(data.email)) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User already exists",
          })
        );
        response.end();
        break;
      }

      if (db.createUser(data.email, data.password)) {
        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User created successfully",
          })
        );
        response.end();
        break;
      } else {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Unexpected behavior",
          })
        );
        response.end();
        break;
      }

    // unexpected requests
    default:
      response.statusCode = 404;
      response.setHeader("Content-Type", "application/json");
      response.write(
        JSON.stringify({
          message: `There is no endpoint for ${request.url}`,
        })
      );
      response.end();
  }
}

/**
 * @route   GET /user
 * @desc    Return user by id
 */
function getRoute(request, response) {
	console.log(db)
  const url = request.url.split("?")[0];

  switch (url) {
    case "/user":
      const id = request.query.searchParams.get("id");

      if (!id) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Id not found",
          })
        );
        response.end();
        break;
      }
      let user = db.getUser(id);

      if (user) {
        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            user,
          })
        );
        response.end();
        break;
      } else {
        response.statusCode = 403;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User not found",
          })
        );
        response.end();
        break;
      }

    // unexpected requests
    default:
      response.statusCode = 404;
      response.setHeader("Content-Type", "application/json");
      response.write(
        JSON.stringify({
          message: `There is no endpoint for ${request.url}`,
        })
      );
      response.end();
  }
}

/**
 * @route   PUT /user
 * @desc    Update user info
 */
function putRoute(request, response) {
  const url = request.url.split("?")[0];

  switch (url) {
    case "/user":
      const id = request.query.searchParams.get("id");
      data = request.body;

      if (!id) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Id not found",
          })
        );
        response.end();
        break;
      }

      if (Object.keys(data).length === 0 && data.constructor === Object || !data?.email || !data.password) {

				response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Incorrect data",
          })
        );
        response.end();
				break;
      }

      if (db.getUser(id)) {
        db.updateUser(id, data);

        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User updated successfully",
          })
        );
        response.end();
        break;
      } else {
        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User not found",
          })
        );
        response.end();
        break;
      }

    // unexpected requests
    default:
      response.statusCode = 404;
      response.setHeader("Content-Type", "application/json");
      response.write(
        JSON.stringify({
          message: `There is no endpoint for ${request.url}`,
        })
      );
      response.end();
  }
}

/**
 * @route   DELETE /user
 * @desc    Delete a user
 */
function deleteRoute(request, response) {
  const url = request.url.split("?")[0];

  switch (url) {
    case "/user":
      const id = request.query.searchParams.get("id");
      data = request.body;

      if (!id) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "Id not found",
          })
        );
        response.end();
        break;
      }

      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return res.status(400).json({
          message: "Incorrect data",
        });
      }

      if (db.getUser(id)) {
        db.deleteUser(id);

        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User deleted successfully",
          })
        );
        response.end();
        break;
      } else {
        response.statusCode = 201;
        response.setHeader("Content-Type", "application/json");
        response.write(
          JSON.stringify({
            message: "User not found",
          })
        );
        response.end();
        break;
      }

    // unexpected requests
    default:
      response.statusCode = 404;
      response.setHeader("Content-Type", "application/json");
      response.write(
        JSON.stringify({
          message: `There is no endpoint for ${request.url}`,
        })
      );
      response.end();
  }
}

module.exports = { postRoute, getRoute, putRoute, deleteRoute };
