const router = require("express").Router();
import { createHistory, getHistory } from "../controllers/historyController";
import { createHistoryValidation } from "../middlewares/historyValidation";

router.post("/", createHistoryValidation, createHistory);
router.get("/", getHistory);

export default router;
