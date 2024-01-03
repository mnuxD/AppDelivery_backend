const Address = require("../models/address");
const storage = require("../utils/cloud_storage");

module.exports = {
  async findByUser(req, res) {
    const id_user = req.params.id_user;
    Address.findByUser(id_user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al traer las direcciones",
          error: err
        });
      }
      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const address = req.body;

    Address.create(address, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la dirección",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "El dirección se registró correctamente",
        data: `${id}`
      });
    });
  }
};
