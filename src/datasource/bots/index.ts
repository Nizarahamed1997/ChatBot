import express from "express";
import { logger } from "../../log/logger";
import { controller } from "./controller";
const fs = require("fs");

// import multer from "multer";
// const upload = multer({ dest: "/uploads/" });

class Bots {
  router;
  constructor() {
    this.router = express.Router();
    this.initialize();
  }
  private initialize() {
    this.router.get("/", async (req, res) => {
      try {
        let finalResponse = await controller.getBots();
        res.send(finalResponse);
      } catch (error) {
        logger.log("error", error);
        return res.send({
          status: "failure",
          message: "Internal Server Error!!!",
        });
      }
    });

    this.router.post("/", async (req, res) => {
      try {
        let {
          vesselName,
          alertType,
          alertTitle,
          teamName,
          fleetType,
          shipType,
          imoNumber,
          dateTime,
          vesselStatus,
          masterName,
          voyageNumber,
          charterer,
          tradingType,
          latitude,
          longitude,
          areaOfOperation,
          nextPort,
          eta,
          wind,
          sea,
          swell,
          ballastOrLaden,
          ifInBallast,
          fk_attachmentId,
          details,
          envImpact,
          ifEnvImpact,
          commercialImpact,
          ifCommercialImpact,
          vesselReminded,
          fd,
          vesselManager,
          hseqManager,
          marineOpsManager,
          marineHr,
          hmInformed,
          classNotified,
          chartersNotified,
          piInformed,
          flagNotified,
          qiNotified,
          terminalNotified,
        } = req.body;
        let { useruid } = req.headers;
        if (alertTitle) alertTitle = alertTitle.replaceAll('"', '\\"');
        if (vesselStatus) vesselStatus = vesselStatus.replaceAll('"', '\\"');
        if (masterName) masterName = masterName.replaceAll('"', '\\"');
        if (charterer) charterer = charterer.replaceAll('"', '\\"');
        if (tradingType) tradingType = tradingType.replaceAll('"', '\\"');
        if (latitude) latitude = latitude.replaceAll('"', '\\"');
        if (longitude) longitude = longitude.replaceAll('"', '\\"');
        if (areaOfOperation)
          areaOfOperation = areaOfOperation.replaceAll('"', '\\"');
        if (nextPort) nextPort = nextPort.replaceAll('"', '\\"');
        if (wind) wind = wind.replaceAll('"', '\\"');
        if (sea) sea = sea.replaceAll('"', '\\"');
        if (ifInBallast) ifInBallast = ifInBallast.replaceAll('"', '\\"');
        if (details) details = details.replaceAll('"', '\\"');
        if (ifEnvImpact) ifEnvImpact = ifEnvImpact.replaceAll('"', '\\"');
        if (ifCommercialImpact)
          ifCommercialImpact = ifCommercialImpact.replaceAll('"', '\\"');
        let finalResponse = await controller.insertAlertDetails(
          vesselName,
          alertType,
          alertTitle,
          teamName,
          fleetType,
          shipType,
          imoNumber,
          dateTime,
          vesselStatus,
          masterName,
          voyageNumber,
          charterer,
          tradingType,
          latitude,
          longitude,
          areaOfOperation,
          nextPort,
          eta,
          wind,
          sea,
          swell,
          ballastOrLaden,
          ifInBallast,
          fk_attachmentId,
          details,
          envImpact,
          ifEnvImpact,
          commercialImpact,
          ifCommercialImpact,
          vesselReminded,
          fd,
          vesselManager,
          hseqManager,
          marineOpsManager,
          marineHr,
          hmInformed,
          classNotified,
          chartersNotified,
          piInformed,
          flagNotified,
          qiNotified,
          terminalNotified,
          useruid
        );

        return res.send(finalResponse);
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send({
          status: "failure",
          message: "Internal server error",
        });
      }
    });

    this.router.delete("/deleteAlert/:id", async (req, res) => {
      try {
        let id = req.params.id;
        await controller.deleteAlert(id);
        return res.send({ status: "Success", message: "alert Deleted" });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return res.send({ status: "Failure", message: "Couldnt Delete Alert" });
      }
    });
  }

  public getRoute() {
    return this.router;
  }
}

export const bots = new Bots();
