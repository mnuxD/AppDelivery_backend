const userController = require("../controllers/usersController");

module.exports = (app, upload) => {
  // GET => OBTENER DATOS
  // POST => ALMACENAR DATOS
  // PUT => ACTUALIZAR DATOS
  // DELETE => ELIMINIAR DATOS
  app.post("/api/users/create", userController.register);
  app.post(
    "/api/users/createWithImage",
    upload.array("image", 1),
    userController.registerWithImage
  );
  app.post("/api/users/login", userController.login);
};
