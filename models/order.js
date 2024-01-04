const db = require("../config/config");
const Order = {};

Order.findByStatus = (status, result) => {
  const sql = `
    SELECT
    CONVERT(o.id,char) as id,
      CONVERT(o.id_client,char) as id_client,
      CONVERT(o.id_address,char) as id_address,
      CONVERT(o.id_delivery,char) as id_delivery,
      o.status,
      o.timestamp,
      JSON_OBJECT(
          "id", CONVERT(a.id,char),
          "address",a.address,
          "neighborhood",a.neighborhood,
          "lat",a.lat,
          "lng",a.lng
      ) AS address,
      JSON_OBJECT(
          "id",CONVERT(u.id,char),
          "name",u.name,
          "lastname",u.lastname,
          "image",u.image,
          "phone",u.phone
      ) AS client,
      JSON_OBJECT(
        "id",CONVERT(u2.id,char),
        "name",u2.name,
        "lastname",u2.lastname,
        "image",u2.image,
        "phone",u2.phone
    ) AS delivery,
      JSON_ARRAYAGG(
      JSON_OBJECT(
            "id",CONVERT(p.id, char),
            "name", p.name,
            "description", p.description,
            "image1", p.image1,
            "image2", p.image2,
            "image3", p.image3,
            "price", p.price,
            "quantity", ohp.quantity
          )
      ) AS products
  FROM
    orders AS o
  INNER JOIN
    users AS u
  ON 
    u.id = o.id_client
  LEFT JOIN
    users AS u2
  ON
    u2.id = o.id_delivery
  INNER JOIN
    address AS a
  ON
    a.id = o.id_address
  INNER JOIN
    order_has_products AS ohp
  ON
    ohp.id_order = o.id
  INNER JOIN
    products AS p
  ON
    p.id = ohp.id_product
  WHERE
    status = ?
  GROUP BY
    o.id;
  `;

  db.query(sql, status, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(data);
      result(null, data);
    }
  });
};

Order.findByDeliveryAndStatus = (id_delivery, status, result) => {
  const sql = `
    SELECT
    CONVERT(o.id,char) as id,
      CONVERT(o.id_client,char) as id_client,
      CONVERT(o.id_address,char) as id_address,
      CONVERT(o.id_delivery,char) as id_delivery,
      o.status,
      o.timestamp,
      JSON_OBJECT(
          "id", CONVERT(a.id,char),
          "address",a.address,
          "neighborhood",a.neighborhood,
          "lat",a.lat,
          "lng",a.lng
      ) AS address,
      JSON_OBJECT(
          "id",CONVERT(u.id,char),
          "name",u.name,
          "lastname",u.lastname,
          "image",u.image,
          "phone",u.phone
      ) AS client,
      JSON_OBJECT(
        "id",CONVERT(u2.id,char),
        "name",u2.name,
        "lastname",u2.lastname,
        "image",u2.image,
        "phone",u2.phone
    ) AS delivery,
      JSON_ARRAYAGG(
      JSON_OBJECT(
            "id",CONVERT(p.id, char),
            "name", p.name,
            "description", p.description,
            "image1", p.image1,
            "image2", p.image2,
            "image3", p.image3,
            "price", p.price,
            "quantity", ohp.quantity
          )
      ) AS products
  FROM
    orders AS o
  INNER JOIN
    users AS u
  ON 
    u.id = o.id_client
  LEFT JOIN
    users AS u2
  ON
    u2.id = o.id_delivery
  INNER JOIN
    address AS a
  ON
    a.id = o.id_address
  INNER JOIN
    order_has_products AS ohp
  ON
    ohp.id_order = o.id
  INNER JOIN
    products AS p
  ON
    p.id = ohp.id_product
  WHERE
    o.id_delivery = ? AND status = ?
  GROUP BY
    o.id;
  `;

  db.query(sql, [id_delivery, status], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log(data);
      result(null, data);
    }
  });
};

Order.create = (order, result) => {
  const sql = `
        INSERT INTO
            orders(
                id_client,
                id_address,
                status,
                timestamp,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?,?)
    `;

  db.query(
    sql,
    [
      order.id_client,
      order.id_address,
      "PAGADO", // 1. PAGADO 2. DESPACHADO 3 EN CAMINO 4 ENTREGADO
      Date.now(),
      new Date(),
      new Date()
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva orden", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Order.updateToDispatched = (id_order, id_delivery, result) => {
  const sql = `
    UPDATE
      orders
    SET
      id_delivery = ?,
      status = ?,
      updated_at = ?
    WHERE
      id = ?
  `;

  db.query(
    sql,
    [id_delivery, "DESPACHADO", new Date(), id_order],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

Order.updateToOnTheWay = (id_order, id_delivery, result) => {
  const sql = `
    UPDATE
      orders
    SET
      id_delivery = ?,
      status = ?,
      updated_at = ?
    WHERE
      id = ?
  `;

  db.query(
    sql,
    [id_delivery, "EN CAMINO", new Date(), id_order],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

Order.updateToDelivered = (id_order, id_delivery, result) => {
  const sql = `
    UPDATE
      orders
    SET
      id_delivery = ?,
      status = ?,
      updated_at = ?
    WHERE
      id = ?
  `;

  db.query(
    sql,
    [id_delivery, "ENTREGADO", new Date(), id_order],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

module.exports = Order;
