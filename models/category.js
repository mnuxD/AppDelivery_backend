const db = require("../config/config");
const Category = {};

Category.create = (category, result) => {
  const sql = `
        INSERT INTO
            categories(
                name,
                description,
                image,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?)
    `;

  db.query(
    sql,
    [
      category.name,
      category.description,
      category.image,
      new Date(),
      new Date()
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("Id de la nueva categoria", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};
