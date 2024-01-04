const ordersController = require("../controllers/ordersController");
const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/api/orders/findByStatus/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findByStatus
  );
  app.get(
    "/api/orders/findByDeliveryAndStatus/:id_delivery/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findByDeliveryAndStatus
  );
  app.post(
    "/api/orders/create",
    passport.authenticate("jwt", { session: false }),
    ordersController.create
  );
  app.put(
    "/api/orders/updateToDispatched",
    passport.authenticate("jwt", { session: false }),
    ordersController.updateToDispatched
  );
};
