const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");
const storage = require("../utils/cloud_storage");

module.exports = {
  findByStatus(req, res) {
    const status = req.params.status;
    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al listar las órdenes",
          error: err
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      return res.status(201).json(data);
    });
  },

  findByDeliveryAndStatus(req, res) {
    const id_delivery = req.params.id_delivery;
    const status = req.params.status;
    Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al listar las órdenes",
          error: err
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      return res.status(201).json(data);
    });
  },

  create(req, res) {
    const order = req.body; //Capturo los datos que envia el cliente

    Order.create(order, async (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la orden",
          error: err
        });
      }

      for (const product of order.products) {
        await OrderHasProducts.create(
          //id_order, id_product, quantity
          id,
          product.id,
          product.quantity,
          (err, id_data) => {
            if (err) {
              return res.status(501).json({
                success: false,
                message:
                  "Hubo un error con el registro de los productos en la orden",
                error: err
              });
            }
          }
        );
      }

      return res.status(201).json({
        success: true,
        message: "La orden se registró correctamente",
        data: `${id}`
      });
    });
  },

  updateToDispatched(req, res) {
    const order = req.body;
    Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al actualizar la orden",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "La orden se actualizó correctamente",
        data: `${id_order}`
      });
    });
  },

  updateToOnTheWay(req, res) {
    const order = req.body;
    Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al actualizar la orden",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "La orden se actualizó correctamente",
        data: `${id_order}`
      });
    });
  },

  updateToDelivered(req, res) {
    const order = req.body;
    Order.updateToDelivered(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al actualizar la orden",
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: "La orden se actualizó correctamente",
        data: `${id_order}`
      });
    });
  }
};
