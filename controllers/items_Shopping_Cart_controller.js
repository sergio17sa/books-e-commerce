const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ItemsShoppingCartController {
  static async PostItemsShoppingCart(cart, quantity, bookId, otherProductId) {
    let newItemsShoppingCart;
    try {
      newItemsShoppingCart = await prisma.ItemsShoppingCart.create({
        data: {
          quantity,
          shoppingCartId: cart.id,
          bookId,
          otherProductId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return newItemsShoppingCart;
  }

  static async UpdateItemsShoppingCart(itemsShoppingCart, quantity) {
    let ItemsShoppingCartUpdated;
    try {
      ItemsShoppingCartUpdated = await prisma.ItemsShoppingCart.update({
        where: {
          id: itemsShoppingCart.id,
        },
        data: {
          quantity: itemsShoppingCart.quantity + quantity,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ItemsShoppingCartController;
