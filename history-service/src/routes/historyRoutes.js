const router = require("express").Router();
const { getHistory } = require("../controllers/historyController");
const createHistoryValidation = require("../middlewares/historyValidation");

router.get("/", getHistory);

module.exports = router;
