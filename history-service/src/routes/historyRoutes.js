const router = require("express").Router();
const {
  createHistory,
  getHistory,
} = require("../controllers/historyController");
const createHistoryValidation = require("../middlewares/historyValidation");

router.post("/", createHistory);
router.get("/", getHistory);

module.exports = router;
