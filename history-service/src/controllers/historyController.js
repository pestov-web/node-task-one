const HistoryModel = require("../models/historyModel");
exports.getHistory = async (req, res, next) => {
  const { plu, shopId, dateFrom, dateTo, action } = req.query;
  try {
    const history = await HistoryModel.findByFilters(
      plu,
      shopId,
      dateFrom,
      dateTo,
      action
    );
    res.status(200).json({
      status: "success",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
exports.createHistory = async (req, res, next) => {
  const { plu, shopId, date, action } = req.body;

  try {
    const history = await HistoryModel.create(plu, shopId, date, action);
    if (stock.length) {
      return res.status(201).json({
        status: "success",
        message: "History created successfully",
        data: history[0],
      });
    }

    res.status(400).json({
      status: "error",
      message: "Failed to create history",
    });
  } catch (error) {
    next(error);
  }
};
