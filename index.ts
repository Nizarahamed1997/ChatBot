import express from "express";
import { logger } from "./src/log/logger";
import { AddressInfo } from "net";
import dataSource from "./src/datasource/datasource";
import { environment } from "./environment/environment";

let app = express();

let PORT = environment.PORT;
// let CronJob = require("cron").CronJob;
let cors = require("cors");
let dataSourceRoutes = dataSource.getRoute();
console.log(environment);

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(`${__dirname}/public`));

app.use(cors());
app.use(express.json());

//app.use(oAuth.oAuthverification);
const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
  "http://localhost:4200",
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions));

app.get("/", cors(corsOptions), (req, res, next) => {
  res.json({ message: "This route is CORS-enabled for an allowed origin." });
});

app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "connected",
  });
});

app.use("/api", dataSourceRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).json({
    code: 404,
    status: "failed",
    message: "Page Not Found",
  });
});

let server = app.listen(PORT, function () {
  var { address, port } = server.address() as AddressInfo;
  logger.log("debug", "running at http://" + address + ":" + port);
});
