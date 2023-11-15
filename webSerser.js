const http = require("http");
const fs = require("fs");
const { DEFAULT_ECDH_CURVE } = require("tls");

const myserver = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New record created\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("homepage");
        break;
      case "/about":
        res.end("iam karan rawat");
        break;
      default:
        res.end("404 Not found");
    }
  });
});

myserver.listen(8000, () => {
  console.log("server started");
});
