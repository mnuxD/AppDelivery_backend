const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");

// IMPORTAR RUTAS
const userRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoutes");

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

const upload = multer({
  storage: multer.memoryStorage()
});

// LLAMADO A LAS RUTAS

userRoutes(app, upload);
categoriesRoutes(app, upload);
productsRoutes(app, upload);

server.listen(3000, "192.168.0.6" || "localhost", function () {
  console.log("Aplicación de NodeJS " + process.pid + " iniciada...");
});

app.get("/", (req, res) => {
  res.send("Ruta raiz");
});

app.get("/test", (req, res) => {
  res.send("Esta es la ruta test");
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

// 200: Respuesta exitosa
// 404: Url no existe
// 500: Error interno del servidor
