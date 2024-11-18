import { Router } from "express";
import { createHistory, fetchHistory } from "../controllers/historyController";

const router = Router();

router.post("/", createHistory);
router.get("/", fetchHistory);

export default router;
