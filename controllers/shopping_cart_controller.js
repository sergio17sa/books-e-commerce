const { PrismaClient } = require('@prisma/client');
const ItemsShoppingCartController = require('./items_Shopping_Cart_controller');
const prisma = new PrismaClient();

class ShoppingCartController {
  static async PostShoppingCart(req, res) {
    const { userId, bookId, otherProductId, quantity } = req.body;

    let cart;
    let itemsShoppingCart;

    if (bookId && otherProductId) {
      return res
        .status(200)
        .json({ msg: 'Only one type of products can added at a time' });
    }

    try {
      // check if the user have a cart
      cart = await prisma.ShoppingCart.findFirst({
        where: { userId },
        include: {
          itemShoppingCart: {
            include: {
              book: true,
              otherProduct: true,
            },
          },
        },
      });

      // if cart does not exist. We create a cart
      if (!cart) {
        cart = await prisma.ShoppingCart.create({
          data: {
            userId,
          },
        });
      }

      // Check if item is in the cart
      if(bookId){
          itemsShoppingCart = cart.itemShoppingCart.find(
            (item) => item.bookId == bookId 
          );
      }

      if(otherProductId){
        itemsShoppingCart = cart.itemShoppingCart.find(
            (item) => item.otherProductId == otherProductId 
          );
      }

      // If the item does not exist. We create it, otherwise we update its quantity
      if (!itemsShoppingCart) {
        itemsShoppingCart =
           ItemsShoppingCartController.PostItemsShoppingCart(
            cart,
            quantity,
            bookId,
            otherProductId 
          );
      } else {
        itemsShoppingCart =
           ItemsShoppingCartController.UpdateItemsShoppingCart(
            itemsShoppingCart,
            quantity
          );
      }

      //update changes in the shopping cart
      cart = await ShoppingCartController.UpdateShoppingCart(cart);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json({ msg: 'Shopping Cart updated successfully', cart });
  }

  static async UpdateShoppingCart(cart) {
    let updateCart;
    try {
      updateCart = await prisma.ShoppingCart.update({
        where: {
          id: cart.id,
        },
        data: {
          updatedAt: new Date(),
        },
        include: {
          itemShoppingCart: {
            include: {
              book: true,
              otherProduct: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return updateCart;
  }
}

module.exports = ShoppingCartController;
