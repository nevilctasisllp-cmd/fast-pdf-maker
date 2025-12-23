const router = require("express").Router();
const controller = require("../controllers/report.controller");
const { downloadStudentReport } = require("../controllers/report.controller");

router.post("/student-report", controller.generateStudentReport);
router.post("/student-report/download", downloadStudentReport);

module.exports = router;
