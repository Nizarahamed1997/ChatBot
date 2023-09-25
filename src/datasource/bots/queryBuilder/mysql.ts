class QueryHelper {
  public fetchVesselKeysTable() {
    let query = `SELECT * FROM VesselKeys`;
    return query;
  }

  public insertUser(userName, adUserUuid, email, mobile, userType) {
    let query = `INSERT INTO Users(Name,AdUserUuid,Email,Mobile,UserType)
      VALUES('${userName}', UNHEX(REPLACE("${adUserUuid}","-","")),"${email}",
      ${mobile},${userType});`;
    return query;
  }
  public getShipName(alertId) {
    let query = `SELECT VesselName FROM IncidentDetails WHERE Id = ${alertId}`;
    return query;
  }
  public updateAlertNewIncidentDetails(
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
    isVerified,
    verifiedBy
  ) {
    verifiedBy = !verifiedBy ? null : `"${verifiedBy}"`;

    alertTitle = !alertTitle ? null : `"${alertTitle}"`;
    vesselName = !vesselName ? null : `"${vesselName}"`;
    teamName = !teamName ? null : `"${teamName}"`;
    // fleetType = !fleetType ? null : `${fleetType}`;
    // shipType = !shipType ? null : `${shipType}`;
    imoNumber = !imoNumber ? null : `${imoNumber}`;
    dateTime = !dateTime ? null : `"${dateTime}"`;
    vesselStatus = !vesselStatus ? null : `"${vesselStatus}"`;
    masterName = !masterName ? null : `"${masterName}"`;
    alertType = !alertType ? null : `${alertType}`;
    voyageNumber = !voyageNumber ? null : `${voyageNumber}`;
    charterer = !charterer ? null : `"${charterer}"`;
    tradingType = !tradingType ? null : `"${tradingType}"`;
    latitude = !latitude ? null : `"${latitude}"`;
    longitude = !longitude ? null : `"${longitude}"`;
    areaOfOperation = !areaOfOperation ? null : `"${areaOfOperation}"`;
    // ballastOrLaden = !ballastOrLaden ? null : `${ballastOrLaden}`;
    // ifInBallast = !ifInBallast ? null : `${ifInBallast}`;
    nextPort = !nextPort ? null : `"${nextPort}"`;
    eta = !eta ? null : `"${eta}"`;
    wind = !wind ? null : `"${wind}"`;
    sea = !sea ? null : `"${sea}"`;
    swell = !swell ? null : `"${swell}"`;
    details = !details ? null : `"${details}"`;
    envImpact = !envImpact ? null : `"${envImpact}"`;
    ifEnvImpact = !ifEnvImpact ? null : `"${ifEnvImpact}"`;
    commercialImpact = !commercialImpact ? null : `"${commercialImpact}"`;
    ifCommercialImpact = !ifCommercialImpact ? null : `"${ifCommercialImpact}"`;
    vesselReminded = !vesselReminded ? null : `"${vesselReminded}"`;

    let query = `UPDATE IncidentDetails SET AlertTitle = ${alertTitle},VesselName =${vesselName},
    TeamName = ${teamName},ImoNumber = ${imoNumber},DateTime = ${dateTime},
  VesselStatus = ${vesselStatus},MastersName = ${masterName},AlertType = ${alertType},
  VoyageNumber = ${voyageNumber}, Charterer = ${charterer}, TradingType = ${tradingType},
  Latitude = ${latitude},Longitude = ${longitude},NextPort = ${nextPort},ETA = ${eta},
  Wind = ${wind}, Sea = ${sea}, Swell = ${swell},
  BallastOrLaden = ${ballastOrLaden},
  IfInBallast = ${ifInBallast},Details = ${details},
    EnvImpact =${envImpact},CommercialImpact=${commercialImpact},
    CommercialComments = ${ifCommercialImpact},EnvComments=${ifEnvImpact},
    IsVerified = ${isVerified},VerifiedBy = ${verifiedBy} 
    WHERE Id =${id}`;
    return query;
  }

  public updateAlertNotification(
    id,
    hmInformed,
    classNotified,
    chartersNotified,
    piInformed,
    flagNotified,
    qiNotified,
    terminalNotified
  ) {
    hmInformed = !hmInformed ? null : `${hmInformed}`;
    classNotified = !classNotified ? null : `${classNotified}`;
    chartersNotified = !chartersNotified ? null : `${chartersNotified}`;
    piInformed = !piInformed ? null : `${piInformed}`;
    flagNotified = !flagNotified ? null : `${flagNotified}`;
    qiNotified = !qiNotified ? null : `${qiNotified}`;
    terminalNotified = !terminalNotified ? null : `${terminalNotified}`;
    let query = `UPDATE AlertNotification SET PiInformed = ${piInformed},TerminalNotified = ${terminalNotified},
        HMInformed = ${hmInformed},ClassNotified = ${classNotified},
        FlagNotified = ${flagNotified},QINotified = ${qiNotified},
        ChartersNotified = ${chartersNotified}
         WHERE FK_IncidentId =${id};`;
    return query;
  }

  public updateAlertFollowUp(id, fkAlertNotificationId, fkIncidentId) {
    let query = `UPDATE AlertFollowUp SET FK_AlertNotificationId = ${fkAlertNotificationId},
      FK_IncidentId = ${fkIncidentId} WHERE Id =${id};`;
    return query;
  }
  public updateStatus(id, nextUpdate) {
    let val = 1;
    if (nextUpdate == 1) val = 2;
    if (nextUpdate == 0) val = 0;
    let query = `UPDATE IncidentDetails SET Status = ${val} WHERE Id = ${id}`;
    return query;
  }
  public getFollowUpList() {
    let query = `SELECT * FROM AlertFollowUp`;
    return query;
  }

  // public insertNewVesselColumn(name : any, casingModifiedName : any) {
  //   let query =
  //     `INSERT INTO VesselKeys(VesselDatas,CasingModifiedNames)
  //     VALUES ('${name}','${casingModifiedName}')`;
  //   return query;
  // }

  public getVessels(search?, fromDate?, toDate?) {
    let whereCondition = "IMV.isActive = 1";
    if (search) {
      if (isNaN(parseInt(search))) {
        whereCondition += ` AND IMV.AnonymousVessel LIKE '${search}'`;
      } else {
        whereCondition += ` AND IMV.IMO_Number LIKE '${search}'`;
      }
    }
    if (fromDate && toDate) {
      whereCondition += ` AND VIM.InsertUtc >= '${fromDate}' && VIM.InsertUtc <='${toDate}'`;
    }
    let query = `SELECT DISTINCT VIM.Id AS Id, IMV.AnonymousVessel AS vesselName,IMV.IMO_Number AS imoNumber,
      LAL.Latitude AS latitude,LAL.Longitude AS longitude, 
      VPR.VoyageNumber AS voyageNumber,VPR.NextPort AS nextPort,VPR.ETA AS eta,IF(VNR.BallastOrLaden = 0,'Ballast','Laden')
      AS ballastOrLaden,VPR.TradingType AS tradingType,VNR.WindForce AS wind,VNR.SeaForce AS sea,VNR.SwellForce AS swell,
      VNR.VesselStatus AS vesselStatus,
       
      VIM.AnonymousMaster AS masterName,VIM.AnonymousCharterer AS charterer,
      TN.AnonymousName AS teamName,FL.Id AS fleetType,ST.Id AS shipType,IMV.FD AS fleetDirector,
      IMV.HseqManager AS hseqManager,IMV.MarineOpsManager AS marineOpsManager,
      IMV.VesselManager AS vesselManager,IMV.FM AS fleetManager,IMV.MarineHr AS marineHr
      
      FROM VesselInformation AS VIM
      LEFT JOIN ImoAndVesselName AS IMV ON VIM.fk_ImoAndNameId = IMV.Id
      LEFT JOIN VesselListWithGPS AS LAL ON IMV.Id = LAL.fk_ImoAndNameId
      LEFT JOIN VesselNoonReports AS VNR ON VNR.FK_ImoAndNameId = IMV.Id
      LEFT JOIN VesselInfoSheet AS VIS ON VIS.FK_ImoAndVesselId = IMV.Id
      LEFT JOIN VPR ON VPR.FK_ImoAndVesselId = IMV.Id
      LEFT JOIN TeamName AS TN ON TN.Id = VIS.FK_TeamId
      LEFT JOIN ShipType AS ST ON ST.Id = VIS.FK_ShipTypeId
      LEFT JOIN Fleet AS FL ON FL.Id = VIS.FK_FleetId
      WHERE ${whereCondition} ORDER BY VIM.Id ASC ;
      SELECT COUNT(*) AS TotalCount FROM (
        SELECT DISTINCT VIM.Id,IMV.IMO_Number
        FROM VesselInformation AS VIM
        LEFT JOIN ImoAndVesselName AS IMV ON VIM.fk_ImoAndNameId = IMV.id
        LEFT JOIN VesselListWithGPS AS LAL ON IMV.Id = LAL.fk_ImoAndNameId
        WHERE ${whereCondition}) AS TBL`;
    return query;
  }
  public fetchDetailsBySearch(search?, limit?, offset?, fromDate?, toDate?) {
    let whereCondition = "1";
    if (search) {
      if (isNaN(parseInt(search))) {
        whereCondition += ` AND VesselName LIKE '${search}'`;
      } else {
        whereCondition += ` AND ImoNumber LIKE '${search}'`;
      }
    }
    if (fromDate && toDate) {
      whereCondition += ` AND InsertUTC >= '${fromDate}' && InsertUTC <='${toDate}'`;
    }
    let query = `SELECT DISTINCT VesselName,VesselCode,ImoNumber,Date,MasterName,Latitude,
      Longitude,AODN,Ballast,IfInBallast,VOC,EnvImpact,CommercialImpact,WeatherCondition,Details,Attachment,
      NextPort,ETA,Status,Category,Severity,FirstAlertNotification,fk_Analytics_Id
      FROM IncidentDetails 
  
        WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset};
        SELECT COUNT(*) AS TotalCount FROM (
          SELECT DISTINCT ImoNumber
          FROM IncidentDetails
          WHERE ${whereCondition}) AS TBL`;
    return query;
  }

  public verifyAlertIdForSummary() {
    let query = `SELECT Id FROM IncidentDetails;`;
    return query;
  }
  public fetchAlertSummary(alertId?) {
    let whereCondition = "1";
    if (alertId) {
      if (isNaN(parseInt(alertId))) {
        whereCondition += ` AND ID.VesselName LIKE '${alertId}'`;
      } else {
        whereCondition += ` AND ID.Id LIKE ${alertId} `;
      }
    }
    let query = `SELECT DISTINCT ID.Id AS alertId,ID.VesselName AS vesselName,ID.AlertTitle AS alertTitle,ID.TeamName AS teamName,
      AlertType.Name AS alertType,ID.VesselStatus AS vesselStatus,
      ID.ImoNumber AS imoNumber,ID.DateTime AS dateTime,ID.MastersName AS masterName,ID.VoyageNumber AS voyageNumber,
      ID.Charterer AS charterer,ID.TradingType AS tradingType,ID.Latitude AS latitude,
      ID.Longitude AS longitude,ID.AreaOfOperation AS areaOfOperation,IF(ID.BallastOrLaden, 'Laden', 'Ballast')ballastOrLaden,
      IF(ID.IfInBallast = 0,'Unfixed',IF(ID.IfInBallast = 1,'Fixed','Not Applicable'))ifInBallast,
      IF(ID.EnvImpact,'Yes','No')envImpact,IF(ID.VesselReminded,'Yes','No') vesselRemindedOfTeam,
      IF(ID.CommercialImpact,'Yes','No')commercialImpact,ID.EnvComments AS envComments,
      ID.CommercialComments AS commercialComments,ID.Wind AS wind,ID.Sea AS sea,ID.Swell AS swell,
      ID.Details AS details,ID.NextPort AS nextPort,ID.ETA AS eta,IF(ID.Status = 0,'Closed',IF(ID.Status = 1,'Open',IF(ID.Status = 2,'Follow Up','New'))) AS status,
      IF(ID.IsVerified = 1,'Yes','No')isVerified,ID.VerifiedBy AS verifiedBy,ID.CreatedBy AS createdBy,
      IF(AN.ChartersNotified,'Yes','No')chartersNotified,IF(AN.QINotified,'Yes','No')qiNotified,
      IF(AN.PiInformed,'Yes','No')piInformed,AN.FD AS fd,IF(AN.HMInformed,'Yes','No')hmInformed,
      IF(AN.ClassNotified,'Yes','No')classNotified,IF(AN.FlagNotified,'Yes','No')flagNotified,
      IF(AN.TerminalNotified,'Yes','No')terminalNotified,ID.InsertUtc AS creationTime,ID.ConfirmedTime AS confirmedTime,
      AN.VesselManager AS vesselManager,AN.FM AS fleetManager,
      AN.HseqManager AS hseqManager,AN.MarineOpsManager AS marineOpsManager,
      AN.MarineHr AS marineHr
      FROM IncidentDetails AS ID
      LEFT JOIN AlertNotification AS AN ON ID.Id = AN.FK_IncidentId
      LEFT JOIN AlertType ON AlertType.Id = ID.AlertType
      LEFT JOIN Attachments ON Attachments.Id = ID.FK_AttachmentId
        WHERE ${whereCondition};`;
    return query;
  }
  public fetchSummaryAttachments(alertId) {
    let query = `SELECT Attachments.data, Attachments.Attachment,Attachments.Id FROM SummaryAttachment AS SA 
    LEFT JOIN Attachments ON SA.FK_AttachmentId = Attachments.Id 
    LEFT JOIN IncidentDetails ON IncidentDetails.Id = SA.FK_AlertId
    WHERE FK_AlertId = ${alertId} AND SA.IsActive = 1;
    `;
    return query;
  }
  public fetchFollowUpAttachments(followUpId) {
    let query = `SELECT Attachments.data, Attachments.Attachment,Attachments.Id FROM SummaryAttachment AS SA 
    LEFT JOIN Attachments ON SA.FK_AttachmentId = Attachments.Id 
    LEFT JOIN AlertFollowUp AS AFU ON AFU.Id = SA.FK_FollowUpId 
    WHERE FK_FollowUpId = ${followUpId} AND IsActive = 1;
    `;
    return query;
  }
  public fetchIndAlertFollowUp(followUpId) {
    let query = `SELECT * FROM AlertFollowUp WHERE Id = ${followUpId}`;
    return query;
  }
  public fetchAlertFollowUp(alertId?) {
    let whereCondition = "1";
    if (alertId) {
      if (isNaN(parseInt(alertId))) {
        whereCondition += ` AND ID.VesselName LIKE '${alertId}'`;
      } else {
        whereCondition += ` AND ID.Id LIKE ${alertId} `;
      }
    }
    let query = `SELECT ID.Id AS alertId,AF.Id AS followUpId,ID.VesselName AS vesselName,
      ID.ImoNumber AS imoNumber,
      IF(AF.CommercialImpact,'Yes','No')commercialImpact,AF.EnvComments AS envComments,
      AF.CommercialComments AS commercialComments,
      IF(AN.ChartersNotified,'Yes','No')chartersNotified,
      IF(AN.PiInformed,'Yes','No')piInformed,IF(AN.HMInformed,'Yes','No')hmInformed,
      IF(AN.ClassNotified,'Yes','No')classNotified,IF(AN.FlagNotified,'Yes','No')flagNotified,
      IF(AN.ClassNotified,'Yes','No')qiNotified,IF(AN.TerminalNotified,'Yes','No')terminalNotified,
      IF(AF.FullTermClass = 1,'Yes',IF(AF.FullTermClass = 2,'Not Applicable','No'))fullTermClass,
      DATE_FORMAT(AF.ShortTermClass, '%Y-%m-%d') AS shortTermClass,
      IF(AF.EnvImpact,'Yes','No')envImpact,IF(AF.NextUpdate,'Yes','No')nextUpdate,
      AF.NextUpdateDateTime AS nextUpdateDateTime, AF.NextUpdateComments AS nextUpdateComments,
      AF.UpdatedBy AS updatedBy,
      IF(AF.IsVerified = 1,'Yes','No')isVerified, AF.VerifiedBy AS verifiedBy,
      IF(AF.IsShipUser = 1,'Yes','No')isShipUser,
      AF.DetailsOfAction AS detailsOfAction,AF.uplm AS uplm,AF.CorrectiveAction AS correctiveAction,
      AF.PreventiveAction AS preventiveAction,AF.RootCause AS rootCause,AF.TimeLost AS timeLost,
      AF.Cost AS cost,AF.InsertUtc AS updatedDateTime,AF.UpdateUtc AS confirmedTime,
      RL.Risks AS riskLevel,IT.Incidents AS incidentType,
      MS.Description AS mainSystem,
      SS.Description AS subSystem,MA.Description AS machinery,MU.Description AS machineUnit,
      SP.Description AS spareParts

      FROM IncidentDetails AS ID
      LEFT JOIN AlertNotification AS AN ON ID.Id = AN.FK_IncidentId
      LEFT JOIN AlertFollowUp AS AF ON ID.Id = AF.FK_IncidentId
      LEFT JOIN RiskLevel AS RL ON RL.Id = AF.FK_RiskLevel
      LEFT JOIN IncidentType AS IT ON IT.ID = AF.FK_IncidentType
      LEFT JOIN MainSystem AS MS ON AF.FK_MainSystemId = MS.Id
      LEFT JOIN SubSystem AS SS ON AF.FK_SubSystemId = SS.ID
      LEFT JOIN Machinery AS MA ON AF.FK_MachineryId = MA.Id
      LEFT JOIN MachineUnit AS MU ON AF.FK_MachineUnitId = MU.ID
      LEFT JOIN SpareParts AS SP ON AF.FK_SparePartId = SP.ID
    WHERE ${whereCondition} ORDER BY ID.InsertUTC DESC;`;
    return query;
  }

  public fetchAttachment(alertId) {
    let query = `SELECT * FROM Attachments WHERE FK_IncidentId =${alertId};`;
    return query;
  }
  public fetchIndAttachment() {
    let query = `SELECT * FROM Attachments;`;
    return query;
  }

  public fetchAllAlertDetails(alertId?) {
    let whereCondition = "1";
    if (alertId) whereCondition += ` AND IncidentDetails.Id = ${alertId}`;
    let query = `SELECT * FROM IncidentDetails WHERE ${whereCondition};`;
    return query;
  }
  public fetchAlertDetails(
    search?,
    limit?,
    offset?,
    fromDate?,
    toDate?,
    statusFilter?,
    statusWidget?,
    teamName?,
    vesselName?,
    alertType?,
    shipType?,
    fleetType?,
    mainSystem?,
    subSystem?,
    machinery?,
    machineUnit?,
    sparePart?
  ) {
    let orderBy = `ORDER BY lastUpdated DESC`;
    let whereCondition = "IsActive = 1";
    if (statusFilter == "Open") {
      statusFilter = "1";
    } else if (statusFilter == "Closed") {
      statusFilter = "0";
    } else if (statusFilter == "Follow Up") {
      statusFilter = "2";
    } else if (statusFilter == "New") {
      statusFilter = "3";
    }
    if (statusFilter) {
      whereCondition += ` AND ID.Status = ${statusFilter}`;
    }
    if (statusWidget == "Open") {
      statusWidget = "1";
    } else if (statusWidget == "Closed") {
      statusWidget = "0";
    } else if (statusWidget == "Follow Up") {
      statusWidget = "2";
    } else if (statusWidget == "New") {
      statusWidget = "3";
    }
    if (statusWidget) {
      whereCondition += ` AND ID.Status = ${statusWidget}`;
    }
    if (teamName) {
      whereCondition += ` AND ID.TeamName LIKE '${teamName}'`;
    }
    if (vesselName) {
      whereCondition += ` AND ID.VesselName LIKE '${vesselName}'`;
    }
    if (alertType) {
      whereCondition += ` AND AlertType.Name = '${alertType}'`;
    }
    if (search) {
      if (isNaN(parseInt(search))) {
        whereCondition += ` AND (ID.VesselName LIKE '%${search}%' || AlertType.Name LIKE '%${search}%' || 
        ID.TeamName LIKE '%${search}%' || AFU.DetailsOfAction LIKE '%${search}%' || MS.Description = '${search}' || 
        SS.Description = '${search}' || MAC.Description = '${search}' || MU.Description = '${search}' || 
        SP.Description = '${search}')`;
        orderBy = `ORDER BY ID.Id DESC`;
      } else {
        whereCondition += ` ID.Status LIKE ${search}`;
      }
    }
    // if (shipType) {
    //   whereCondition += ` AND ShipType.KeyName = '${shipType}'`;
    //   orderBy = `ORDER BY ID.Id DESC`;
    // }
    if (fleetType)
      whereCondition += ` AND Fleet.KeyName = '${fleetType}'|| Fleet.Name= '${fleetType}'`;
    if (shipType)
      whereCondition += ` AND ShipType.KeyName = '${shipType}' || ShipType.Name = '${shipType}'`;
    if (fromDate && toDate) {
      whereCondition += ` AND ID.InsertUTC >= '${fromDate}' && ID.InsertUTC <='${toDate}'`;
    }
    if (mainSystem)
      whereCondition += ` AND MS.MainSystemKey || MS.Description = "${mainSystem}"`;
    if (subSystem)
      whereCondition += ` AND SS.SubSystemKey || SS.Description = "${subSystem}"`;
    if (machinery)
      whereCondition += ` AND MAC.MachineryKey || MAC.Description = "${machinery}"`;
    if (machineUnit)
      whereCondition += ` AND MU.MachineUnitKey || MU.Description = "${machineUnit}"`;
    if (sparePart)
      whereCondition += ` AND SP.SparePartKey || SP.Description = "${sparePart}"`;
    let query = `SELECT DISTINCT ID.Id AS alertId,ID.Alert AS alert,ID.VesselName AS vesselName,ID.TeamName AS teamName,
      AlertType.Name AS alertType,
      ID.AlertTitle AS alertTitle,
      IF(ID.Status = 0,'Closed',IF(ID.Status = 1,'Open',IF(ID.Status = 2,'Follow Up','New'))) AS status,
      IF(ID.Status = 0,AFU.UpdateUtc,IF(ID.Status = 1 OR ID.Status = 3,ID.UpdateUtc,AFU.UpdateUtc)) AS lastUpdated,AFU.DetailsOfAction AS updates
      FROM IncidentDetails AS ID
      LEFT JOIN AlertNotification AS AN ON ID.Id = AN.FK_IncidentId
      LEFT JOIN AlertType ON AlertType.Id = ID.AlertType
      LEFT JOIN AlertFollowUp AS AFU ON ID.Id = AFU.FK_IncidentId
      LEFT JOIN Fleet ON ID.FK_FleetTypeId = Fleet.Id 
      LEFT JOIN ShipType ON ID.FK_ShipTypeId = ShipType.Id
      LEFT JOIN MainSystem AS MS ON MS.Id = AFU.FK_MainSystemId
      LEFT JOIN SubSystem AS SS ON SS.Id = AFU.FK_SubSystemId
      LEFT JOIN Machinery AS MAC ON MAC.Id = AFU.FK_MachineryId
      LEFT JOIN MachineUnit AS MU ON MU.Id = AFU.FK_MachineUnitId
      LEFT JOIN SpareParts AS SP ON SP.Id = AFU.FK_SparePartId
        WHERE ${whereCondition} ${orderBy};
       SELECT COUNT(*) AS TotalCount FROM (
          SELECT ID.Id
          FROM IncidentDetails AS ID
          LEFT JOIN AlertNotification AS AN ON ID.Id = AN.FK_IncidentId
          LEFT JOIN AlertType ON AlertType.Id = ID.AlertType
          LEFT JOIN AlertFollowUp AS AFU ON ID.Id = AFU.FK_IncidentId
          LEFT JOIN Fleet ON ID.FK_FleetTypeId = Fleet.Id 
          LEFT JOIN ShipType ON ID.FK_ShipTypeId = ShipType.Id
          LEFT JOIN MainSystem AS MS ON MS.Id = AFU.FK_MainSystemId
          LEFT JOIN SubSystem AS SS ON SS.Id = AFU.FK_SubSystemId
          LEFT JOIN Machinery AS MAC ON MAC.Id = AFU.FK_MachineryId
          LEFT JOIN MachineUnit AS MU ON MU.Id = AFU.FK_MachineUnitId
          LEFT JOIN SpareParts AS SP ON SP.Id = AFU.FK_SparePartId
          WHERE ${whereCondition}) AS TBL`;
    return query;
  }
  public fetchAlertDetailsCount(limit, offset) {
    let query = `SELECT DISTINCT ID.Id AS alertId,ID.VesselName AS vesselName,ID.TeamName AS teamName,AT.Name AS alertType,
      ID.AlertTitle AS alertTitle,
      IF(ID.Status = 0,'Closed',IF(ID.Status = 1,'Open','FollowUp')) AS status,
      AFU.InsertUTC AS lastUpdated,AFU.DetailsOfAction AS updates
      FROM IncidentDetails AS ID
      LEFT JOIN AlertNotification AS AN ON ID.Id = AN.FK_IncidentId
      LEFT JOIN AlertType AS AT ON AT.Id = ID.AlertType
      LEFT JOIN AlertFollowUp AS AFU ON ID.Id = AFU.FK_IncidentId
        WHERE ID.IsActive =1 ORDER BY ID.InsertUTC DESC LIMIT ${limit} OFFSET ${offset};
        SELECT COUNT(*) AS TotalCount FROM (
          SELECT ID.Id
          FROM IncidentDetails AS ID
          WHERE 1) AS TBL`;
    return query;
  }

  public fetchUsers() {
    let whereCondition = "1";

    let query = `SELECT Id, Name, Email,UserRole FROM Users WHERE 1;`;
    return query;
  }

  public fetchAttachments(alertId) {
    let query = `SELECT * FROM Attachments WHERE FK_IncidentId = ${alertId} ORDER BY AttachmentId DESC;`;
    return query;
  }
  public fetchIncidentDetails() {
    let query = `SELECT * FROM IncidentDetails;`;
    return query;
  }
  public fetchAlertNotification(alertId?) {
    let whereCondition = `1`;
    if (alertId) whereCondition += ` AND FK_IncidentId = ${alertId}`;
    let query = `SELECT * FROM AlertNotification WHERE ${whereCondition};`;
    return query;
  }
  // public fetchAlertFollowUp(){
  //   let query = `SELECT * FROM AlertFollowUp;`
  //   return query;
  // }
  public fetchAlertType() {
    let query = `SELECT * FROM AlertType;`;
    return query;
  }
  public fetchAlertTypeFilter() {
    let query = `SELECT Id As id,Name AS name,KeyName AS keyName FROM AlertType ORDER BY name ASC;`;
    return query;
  }
  public deleteAlertDetail(id) {
    let query = `UPDATE IncidentDetails SET IsActive = 0 WHERE Id = ${id}`;
    return query;
  }
  public deleteAlertNotification(delid) {
    let query = `DELETE FROM AlertNotification WHERE IncidentId = ${delid}`;
    return query;
  }
  public deleteAlertFollowUp(delid) {
    let query = `DELETE FROM AlertFollowUp WHERE IncidentId = ${delid}`;
    return query;
  }
  public fetchUser(userUid) {
    let query = `SELECT VesselName,UserType,UserRole, 
    Name FROM Users
        WHERE UserUid = UNHEX(REPLACE("${userUid}","-","")) AND IsActive = 1;`;
    return query;
  }
  public fetchUsersNotification() {
    let query = `SELECT * FROM UserNotification`;
    return query;
  }

  public fetchNotifications() {
    let query = `SELECT * FROM Notification`;
    return query;
  }
}

export const queryHelper = new QueryHelper();
