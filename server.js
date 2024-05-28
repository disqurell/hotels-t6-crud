const http = require("http");

const PORT = 3030;

require("url");

// Import routers
const { postRoute, getRoute, putRoute, deleteRoute } = require("./routes/root");

// body parser
const getBody = require("./utils/getBody");


const server = http.createServer((request, response) => {

  request.query = new URL(request.url, `http://${request.headers.host}`);

  switch (request.method) {
    case "GET":
      getBody(request, response, getRoute);
      break;

    case "POST":
      getBody(request, response, postRoute);
      break;

    case "PUT":
      getBody(request, response, putRoute);
      break;

    case "DELETE":
      getBody(request, response, deleteRoute);
      break;

    default:
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
});

server.listen(PORT, (err) => {
  // error checking
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});
