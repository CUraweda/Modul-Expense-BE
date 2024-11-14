const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const httpStatus = require("http-status-codes");
const userRoute = require("./User/routes");
const expenseRoute = require("./expense/router");
const handleError = require("./exceptions/handler.exception");

const app = express();
dotenv.config();

app.disable("x-powered-by");
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
    credentials: true,
  })
);

app.set("port", process.env.PORT || 8080);
app.use(
  bodyParser.json({
    limit: "50mb",
    type: ["application/json", "application/vnd.api+json"],
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 50000,
    extended: true,
  })
);
app.use(
  bodyParser.raw({ type: ["application/json", "application/vnd.api+json"] })
);
app.use(bodyParser.text({ type: "text/html" }));

app.use(userRoute);
app.use(expenseRoute)

app.use((req, res) => {
  return res.json({
    errors: {
      status: res.statusCode,
      data: null,
      error: {
        code: httpStatus.StatusCodes.NOT_FOUND,
        message: "ENDPOINT_NOTFOUND",
      },
    },
  });
});
app.use(handleError);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

// parsing biginteg
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
