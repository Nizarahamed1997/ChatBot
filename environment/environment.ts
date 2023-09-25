export const environment = {
  MySQLConfig: {
    host: process.env.MY_SQL_URL || "localhost",
    user: process.env.MY_SQL_USER || "root",
    password: process.env.MY_SQL_PASSWORD || "",
    database: process.env.MY_SQL_DATABASE || "FirstAlert",
    port: Number(process.env.MY_SQL_PORT) || 3306,
  },
  PORT: process.env.PORT || 9120,
  TeekayApis: {
    key: "f5471111e88e4642a0a1b2998bc23840",
    URL1: `https://staging-api.teekay.com/uat/VesselInfo/GetVesselInfo`,
    URL2: `https://staging-api.teekay.com/uat/VesselInfo/GetVesselListWithGPS`,
    URL3: `https://staging-api.teekay.com/uat/Seatrends/GetVesselNoonReports?StartDate=2022-01-01&EndDate=2022-12-31&Type=I`,
    URL4: `https://staging-api.teekay.com/uat/VPR/GetVPRVoyageDetails?`,
  },
  vapidKeys: {
    publicKey:
      "BCFFrzrbsFQL0ttQI-2_ph0_NM1QWAXn5dEPDglQATrI8ZX-QYj-novOhvBp1VRh6uckISl8RNkwwk6JOFRrmWc",
    privateKey: "pTMkIOHvzIf2811qKDC7T5iPu6FsfhDGkzMOTnxznyo",
  },
};
