let authentication = require("./middlewares/authentication"),
	logRequest = require("./middlewares/logRequest");
	
let rUser = require("./routes/rUser"),
	rClient = require("./routes/rClient"),
	rEmployee = require("./routes/rEmployee"),
	rRole = require("./routes/rRole"),
	rTypeEmployee = require("./routes/rTypeEmployee"),
	rFunction = require("./routes/rFunction"),
	rAppointment = require("./routes/rAppointment"),
	rAgreement = require("./routes/rAgreement"),
	rReport = require("./routes/rReport"),
	rTypeDoc = require("./routes/rTypeDoc"),
	rSpeciality = require("./routes/rSpeciality"),
	rService = require("./routes/rService"),
	rMethod = require("./routes/rMethod"),
	rCategory = require("./routes/rCategory"),
	rRegion = require("./routes/rRegion"),
	rProvince = require("./routes/rProvince"),
	rTuition = require("./routes/rTuition"),
	rReferenceValue = require("./routes/rReferenceValue"),
	rExamination = require("./routes/rExamination"),
	rHeadquarter = require("./routes/rHeadquarter"),
	rTypeAgreement = require("./routes/rTypeAgreement"),
	rProfession = require("./routes/rProfession"),
	rPriceList = require("./routes/rPriceList");
		
		
let cUser = require("./controllers/cUser"),
		cInitialization = require("./controllers/cInitialization");

let formidable = require('express-formidable');

let express = require("express"),
	cors = require('cors');

const { pathRootStaticFiles } = require('./config')


let app = express();
//middlewares third-party
app.use(cors());
app.use(formidable(
		{
			encoding: 'utf-8',
			multiples: true,
			keepExtensions:true// req.files to be arrays of files
		}
	)
);
app.use(`/${pathRootStaticFiles}`, express.static(__dirname + `/${pathRootStaticFiles}`));

//middlewares own
if(process.env.NODE_ENV !== "production")
	app.use(logRequest);
//app.use("/api", authentication);

//Private Routes
app.use("/api/user", rUser);
app.use("/api/client", rClient);
app.use("/api/employee", rEmployee);
app.use("/api/role", rRole);
app.use("/api/typeEmployee", rTypeEmployee);
app.use("/api/function", rFunction);
app.use("/api/appointment", rAppointment);
app.use("/api/report", rReport);
app.use("/api/agreement", rAgreement);
app.use("/api/typeDoc", rTypeDoc);
app.use("/api/speciality", rSpeciality);
app.use("/api/category", rCategory);
app.use("/api/service", rService);
app.use("/api/method", rMethod);
app.use("/api/tuition", rTuition);
app.use("/api/region", rRegion);
app.use("/api/province", rProvince);
app.use("/api/referenceValue", rReferenceValue);
app.use("/api/examination", rExamination);
app.use("/api/headquarter", rHeadquarter);
app.use("/api/typeAgreement", rTypeAgreement);
app.use("/api/priceList", rPriceList);
app.use("/api/profession", rProfession);

//Public Routes
app.get("/api/login",cUser.login);
app.get("/initialization",cInitialization.initialization);

app.get("/", (req,res) => {
	res.status(200).json({status:true,message:"A legend was born today"})
})

app.use((req, res, next) => {
  res.sendStatus(404)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500)
});






module.exports = app;