import prisma from "../prismaClient";

export const addHistory = async (
  productId: number,
  shopId: number,
  action: string,
  quantity: number
) => {
  const history = await prisma.history.create({
    data: {
      productId,
      shopId,
      action,
      quantity,
    },
  });
  return history;
};

export const getHistory = async (filters: any) => {
  const { shop_id, product_id, action, date_from, date_to } = filters;
  const where: any = {};

  if (shop_id) where.shopId = Number(shop_id);
  if (product_id) where.productId = Number(product_id);
  if (action) where.action = action;
  if (date_from || date_to) {
    where.createdAt = {};
    if (date_from) where.createdAt.gte = new Date(date_from);
    if (date_to) where.createdAt.lte = new Date(date_to);
  }

  const history = await prisma.history.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return history;
};
