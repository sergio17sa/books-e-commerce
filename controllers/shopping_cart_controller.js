const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ShoppingCartController {
  static async PostShoppingCart(req, res) {
    const { userId, bookId, otherProductId, quantity } = req.body;

    let cart;
    let itemsShoppingCart;

    if(bookId && otherProductId ){
       return res.status(200).json({msg: "Only one type of products can added at a time"})
    } 

    try {
      //buscar is el usuario tiene un carrito o no
      cart = await prisma.ShoppingCart.findFirst({
        where: { userId },
        include: {
          itemShoppingCart: {
            include: {
              book: true,
              otherProduct: true
            },
          },
        },
      });

      // si el usuario no tiene carrito lo crea y si lo tiene responde con el carrito
      if (!cart) {
        cart = await prisma.ShoppingCart.create({
          data: {
            userId,
          },
        });
      }

      // buscar si el producto ya se encuentra en el carrito
      itemsShoppingCart = cart.itemShoppingCart.find(
        (item) => item.bookId == bookId,
        (item) => item.otherProductId == otherProductId
      );
      
      console.log(itemsShoppingCart)
      if (!itemsShoppingCart) {
        itemsShoppingCart = await prisma.ItemsShoppingCart.create({
          data: {
            quantity,
            shoppingCartId: cart.id,
            bookId,
            otherProductId,
          },
        });
   
      } else {
        itemsShoppingCart = await prisma.ItemsShoppingCart.update({
          where: {
            id: itemsShoppingCart.id,
          },
          data: {
            quantity: itemsShoppingCart.quantity + quantity,
          },
        });
      }

      //actualizo los cambios en carrito
      cart = await prisma.ShoppingCart.update({
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
              otherProduct: true
            },
          },
        },
      });

    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
    res.status(200).json({ msg: 'Shopping Cart updated successfully', cart });
  }
}

module.exports = ShoppingCartController;
