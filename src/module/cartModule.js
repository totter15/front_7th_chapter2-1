export const addToCart = (cart) => {
  const currentCart = getCart();
  if (currentCart.find((item) => item.productId === cart.productId)) return false;
  localStorage.setItem("cart", JSON.stringify([...currentCart, cart]));
  return true;
};

export const getCart = () => {
  const currentCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  return currentCart;
};

export const removeFromCart = (productId) => {
  const currentCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  localStorage.setItem("cart", JSON.stringify(currentCart.filter((item) => item.productId !== productId)));
};
