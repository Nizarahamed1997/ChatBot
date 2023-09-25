import { logger } from "../../log/logger";
import { Utility } from "../../utility/database/mysql/Utility";
import { queryHelper } from "./queryBuilder/mysql";
import { resolve } from "path";
import { query } from "express";

class Controller {
  // public insertAlertDetails(
  //   vesselName,
  //   alertType,
  //   alertTitle,
  //   teamName,
  //   fleetType,
  //   shipType,
  //   imoNumber,
  //   dateTime,
  //   vesselStatus,
  //   masterName,
  //   voyageNumber,
  //   charterer,
  //   tradingType,
  //   latitude,
  //   longitude,
  //   areaOfOperation,
  //   nextPort,
  //   eta,
  //   wind,
  //   sea,
  //   swell,
  //   ballastOrLaden,
  //   ifInBallast,
  //   attachmentId,
  //   details,
  //   envImpact,
  //   ifEnvImpact,
  //   commercialImpact,
  //   ifCommercialImpact,
  //   vesselReminded,
  //   fd,
  //   vesselManager,
  //   hseqManager,
  //   marineOpsManager,
  //   marineHr,
  //   hmInformed,
  //   classNotified,
  //   chartersNotified,
  //   piInformed,
  //   flagNotified,
  //   qiNotified,
  //   terminalNotified,
  //   useruid
  // ) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let alertTypeQuery = queryHelper.fetchAlertType();
  //       let alertTypeDetails = await Utility.databaseQuery(
  //         alertTypeQuery,
  //         "alert table"
  //       );
  //       for (let alerts of alertTypeDetails) {
  //         if (alertType == alerts["Name"]) {
  //           console.log(alertType);
  //           alertType = alerts["Id"];
  //         }
  //       }
  //       let userDetails = queryHelper.fetchUser(useruid);
  //       let user = await Utility.databaseQuery(userDetails, "User Details");
  //       let createdBy = user[0]["Name"];
  //       let userType = user[0]["UserType"];
  //       let userRole = user[0]["UserRole"];
  //       let isVerified = 0;
  //       let verifiedBy = "";
  //       let status = 3;
  //       if (
  //         userType == 2 &&
  //         (userRole == "Fleet Director" ||
  //           userRole == "Vessel Manager" ||
  //           userRole == "Fleet Manager")
  //       ) {
  //         isVerified = 1;
  //         verifiedBy = user[0]["Name"];
  //         status = 1;
  //       }
  //       let alertDetails = queryHelper.fetchAllAlertDetails();
  //       let alertDetailsList = await Utility.databaseQuery(
  //         alertDetails,
  //         "GET Users List"
  //       );

  //       let count = 1;
  //       for (let alerts of alertDetailsList) {
  //         console.log("***************************8");
  //         if (alerts["VesselName"] == vesselName) {
  //           count++;
  //         }
  //       }

  //       let date2 = new Date();
  //       let alertName =
  //         vesselName.slice(0, 6) + "-" + date2.getFullYear() + "-" + count;

  //       await this.insertIncidentDetails(
  //         alertName,
  //         alertTitle,
  //         vesselName,
  //         teamName,
  //         fleetType,
  //         shipType,
  //         imoNumber,
  //         dateTime,
  //         vesselStatus,
  //         masterName,
  //         alertType,
  //         voyageNumber,
  //         charterer,
  //         tradingType,
  //         latitude,
  //         longitude,
  //         areaOfOperation,
  //         ballastOrLaden,
  //         ifInBallast,
  //         nextPort,
  //         eta,
  //         wind,
  //         sea,
  //         swell,
  //         details,

  //         envImpact,
  //         ifEnvImpact,
  //         commercialImpact,
  //         ifCommercialImpact,
  //         vesselReminded,
  //         isVerified,
  //         verifiedBy,
  //         createdBy
  //       );

  //       let incidentDetailsData = await this.getIncidentDetails();

  //       let size = incidentDetailsData["data"].length - 1;
  //       let fkIncidentId = incidentDetailsData["data"][size]["Id"];
  //       console.log(incidentDetailsData["data"].length);
  //       // await this.insertAttachment(fkIncidentId,attachment);
  //       console.log(attachmentId);
  //       for (let i of attachmentId) {
  //         console.log(i);
  //         if (i != null) {
  //           let insertSummaryAttachments = queryHelper.insertSummaryAttachment(
  //             fkIncidentId,
  //             i,
  //             null
  //           );
  //           try {
  //             await Utility.databaseQuery(
  //               insertSummaryAttachments,
  //               "InsertSummaryAttachments"
  //             );
  //           } catch (error) {
  //             logger.log("error", JSON.stringify(error));
  //             return reject(error);
  //           }
  //         }
  //       }
  //       let shipDetailsQuery = queryHelper.getVessels(vesselName);
  //       let shipData = await Utility.databaseQuery(
  //         shipDetailsQuery,
  //         "Ship data"
  //       );
  //       let usersQuery = queryHelper.fetchUsers();
  //       let users = await Utility.databaseQuery(usersQuery, "Fetch users");

  //       let notifiedMails = [];
  //       let usersNotiQuery = queryHelper.fetchUsersNotification();
  //       let usersNotiData = await Utility.databaseQuery(
  //         usersNotiQuery,
  //         "fetch users notificaiton"
  //       );
  //       console.log(shipData[0][0]);
  //       for (let user of users) {
  //         if (user["Id"] == shipData[0][0]["fleetDirector"]) {
  //           shipData[0][0]["fleetDirector"] = user["Name"];
  //         }
  //         if (user["Id"] == shipData[0][0]["hseqManager"]) {
  //           shipData[0][0]["hseqManager"] = user["Name"];
  //         }
  //         if (user["Id"] == shipData[0][0]["marineOpsManager"]) {
  //           shipData[0][0]["marineOpsManager"] = user["Name"];
  //         }
  //         if (user["Id"] == shipData[0][0]["vesselManager"]) {
  //           shipData[0][0]["vesselManager"] = user["Name"];
  //         }
  //         if (user["Id"] == shipData[0][0]["marineHr"]) {
  //           shipData[0][0]["marineHr"] = user["Name"];
  //         }
  //         if (user["Id"] == shipData[0][0]["fleetManager"]) {
  //           shipData[0][0]["fleetManager"] = user["Name"];
  //         }
  //       }

  //       await this.insertAlertNotification(
  //         fkIncidentId,
  //         fd,
  //         vesselManager,
  //         hseqManager,
  //         marineOpsManager,
  //         marineHr,
  //         hmInformed,
  //         classNotified,
  //         chartersNotified,
  //         piInformed,
  //         flagNotified,
  //         qiNotified,
  //         terminalNotified
  //       );

  //       let alertNotificationData = await this.getAlertNotification();
  //       let size2 = alertNotificationData["data"].length - 1;
  //       alertNotificationData["data"][size2]["Id"];
  //       if (isVerified == 1) {
  //         for (let users of usersNotiData) {
  //           if (users["Role"] == "HMInformed" && hmInformed == "Yes") {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (users["Role"] == "PiInformed" && piInformed == "Yes") {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (users["Role"] == "ClassNotified" && classNotified == "Yes") {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (users["Role"] == "FlagNotified" && flagNotified == "Yes") {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (
  //             users["Role"] == "ChartersNotified" &&
  //             chartersNotified == "Yes"
  //           ) {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (
  //             users["Role"] == "TerminalNotified" &&
  //             terminalNotified == "Yes"
  //           ) {
  //             notifiedMails.push(users["Email"]);
  //           }
  //           if (users["Role"] == "QINotified" && qiNotified == "Yes") {
  //             notifiedMails.push(users["Email"]);
  //           }
  //         }
  //         for (let user of users) {
  //           if (user["Name"] == shipData[0][0]["hseqManager"]) {
  //             shipData[0][0]["hseqManager"] = user["Name"];
  //             notifiedMails.push(user["Email"]);
  //           }
  //           if (user["Name"] == shipData[0][0]["marineOpsManager"]) {
  //             shipData[0][0]["marineOpsManager"] = user["Name"];
  //             notifiedMails.push(user["Email"]);
  //           }

  //           if (user["Name"] == shipData[0][0]["marineHr"]) {
  //             shipData[0][0]["marineHr"] = user["Name"];
  //             notifiedMails.push(user["Email"]);
  //           }
  //           if (
  //             user["UserRole"] == "Vessel Manager" ||
  //             user["UserRole"] == "Fleet Manager" ||
  //             user["UserRole"] == "Fleet Director"
  //           ) {
  //             notifiedMails.push(user["Email"]);
  //           }
  //         }
  //         try {
  //           this.emailConfig(fkIncidentId, notifiedMails);
  //         } catch (error) {
  //           logger.log("error", JSON.stringify(error));
  //         }
  //       }
  //       let fetchNotification = queryHelper.fetchNotifications();
  //       let fetchNoticationData = await Utility.databaseQuery(
  //         fetchNotification,
  //         "Subscriptions"
  //       );
  //       console.log(fetchNoticationData);
  //       let shipDetails = await this.getAlertDetails(
  //         "",
  //         "",
  //         1,
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         ""
  //       );
  //       let shipDetailsData = shipDetails["response"][0];
  //       for (let subscriptions of fetchNoticationData) {
  //         try {
  //           let subscribtion = JSON.parse(subscriptions["Data"]);
  //           await provider.pushNotification(
  //             subscribtion,
  //             shipDetailsData["alert"],
  //             shipDetailsData["alertTitle"],
  //             shipDetailsData["vesselName"]
  //           );
  //         } catch (error) {
  //           logger.log("error", JSON.stringify(error));
  //         }
  //       }
  //       // try {
  //       //   this.emailConfig(fkIncidentId);
  //       // } catch (error) {
  //       //   logger.log("error", JSON.stringify(error));
  //       // }

  //       return resolve({
  //         status: "Success",
  //         message: "new alert created",
  //         alertId: fkIncidentId,
  //       });
  //     } catch (error) {
  //       logger.log("error", JSON.stringify(error));
  //       return reject(error);
  //     }
  //   });
  // }
  public updateAlertNewDetails(
    id,
    vesselName,
    alertType,
    alertTitle,
    teamName,

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
    fk_deleteAttachmentId,
    useruid
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve({
          status: "success",
          message: "Alert Updated",
        });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }
  public getBots() {
    return new Promise(async (resolve, reject) => {
      try {
        let fetchBotsQuery = queryHelper.getBots();
        let fetchBotsData = await Utility.databaseQuery(
          fetchBotsQuery,
          "Fetch Bots"
        );

        return resolve({
          status: "success",
          response: fetchBotsData,
        });
      } catch (error) {
        logger.log("error", JSON.stringify(error));
        return reject(error);
      }
    });
  }

  // public deleteAlert(id) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let deleteAlertDetails = queryHelper.deleteAlertDetail(id);
  //       let deleteAlertDetailsData = await Utility.databaseQuery(
  //         deleteAlertDetails,
  //         "delete details"
  //       );
  //       return resolve(deleteAlertDetailsData);
  //     } catch (error) {
  //       logger.log("error", JSON.stringify(error));
  //       return reject(error);
  //     }
  //   });
  // }
}
export const controller = new Controller();
