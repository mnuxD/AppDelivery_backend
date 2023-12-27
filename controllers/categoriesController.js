const Category = require("../models/category");
const storage = require("../utils/cloud_storage");

module.exports = {
  async create(req, res) {
    const category = JSON.parse(req.body.category); //Capturo los datos que envia el cliente
    const files = req.files;
    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url) {
        category.image = url;
      }
    }
    Category.create(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la categoría",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "El categoría se registró correctamente",
        data: `${id}`
      });
    });
  }
};
