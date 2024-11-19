const router = require("express").Router();
const { getHistory } = require("../controllers/historyController");
const { historyValidation } = require("../middlewares/historyValidation");

router.get("/", historyValidation, getHistory);

module.exports = router;
