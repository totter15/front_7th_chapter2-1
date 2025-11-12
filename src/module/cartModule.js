export const addToCart = (cart, quantity = 1) => {
  const currentCart = getCart();
  const index = currentCart.findIndex((item) => item.productId === cart.productId);
  const newCart = [...currentCart];

  if (index < 0) {
    newCart.push({ ...cart, quantity });
  } else {
    newCart[index].quantity += quantity;
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
};

export const getCart = () => {
  const currentCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  return currentCart;
};

export const removeFromCart = (productId) => {
  const currentCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  localStorage.setItem("cart", JSON.stringify(currentCart.filter((item) => item.productId !== productId)));
};
