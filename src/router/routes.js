const containerPaths = {
  Home: "./",
  Tacos: "./tacos",
  Bus: "./tacos/bus",
  Cart: "./tacos/cart"
};

export default routes = [
  {
    path: "/",
    exact: true,
    containerPath: containerPaths.Home
  },
  {
    path: "/tacos",
    containerPath: containerPaths.Tacos
  },
  {
    path: "/tacos/bus",
    containerPath: containerPaths.Bus
  },
  {
    path: "/tacos/cart",
    containerPath: containerPaths.Cart
  }
];