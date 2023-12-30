const Category = require("../models/category");
const storage = require("../utils/cloud_storage");

module.exports = {
  async getAll(req, res) {
    Category.getAll((err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al traer las categorías",
          error: err
        });
      }
      return res.status(201).json(data);
    });
  },

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
  },

  async updateWithImage(req, res) {
    const category = JSON.parse(req.body.category); //Capturo los datos que envia el cliente
    const files = req.files;
    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url) {
        category.image = url;
      }
    }
    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al actualizar la categoría",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "La categoría se actualizó correctamente",
        data: `${id}`
      });
    });
  },

  async update(req, res) {
    const category = req.body; //Capturo los datos que envia el cliente

    Category.update(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al actualizar la categoría",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "La categoría se actualizó correctamente",
        data: `${id}`
      });
    });
  },

  async delete(req, res) {
    const id = req.params.id;
    Category.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al eliminar la categoría",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "El categoría se eliminó correctamente",
        data: `${id}`
      });
    });
  }
};
