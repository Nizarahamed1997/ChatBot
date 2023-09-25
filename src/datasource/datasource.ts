import express from "express";
import { bots } from "./bots";

class DataSource {
  dataSourceRouter;
  constructor() {
    this.dataSourceRouter = express.Router();
    this.initialize();
  }

  initialize() {
    this.dataSourceRouter.use("/bots", bots.getRoute());
  }

  public getRoute() {
    return this.dataSourceRouter;
  }
}

const dataSource = new DataSource();
export default dataSource;
