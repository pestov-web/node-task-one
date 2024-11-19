const HistoryModel = require("../models/historyModel");

exports.getHistory = async (req, res, next) => {
  try {
    const {
      shopId,
      plu,
      action,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const { data, total } = await HistoryModel.getHistory({
      shopId,
      plu,
      action,
      startDate,
      endDate,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    res.status(200).json({
      status: "success",
      total, // Общее количество записей
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      data,
    });
  } catch (error) {
    next(error);
  }
};
