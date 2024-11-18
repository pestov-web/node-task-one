import { Request, Response } from "express";
import { addHistory, getHistory } from "../models/historyModel";

export const createHistory = async (req: Request, res: Response) => {
  const { productId, shopId, action, quantity } = req.body;

  try {
    const history = await addHistory(productId, shopId, action, quantity);
    res.status(201).json(history);
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchHistory = async (req: Request, res: Response) => {
  try {
    const history = await getHistory(req.query);
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
