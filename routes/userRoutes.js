const userController = require("../controllers/usersController");

module.exports = (app) => {
  // GET => OBTENER DATOS
  // POST => ALMACENAR DATOS
  // PUT => ACTUALIZAR DATOS
  // DELETE => ELIMINIAR DATOS
  app.post("/api/users/create", userController.register);
  app.post("/api/users/login", userController.login);
};
