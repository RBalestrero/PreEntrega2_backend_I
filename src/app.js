import express from "express";
import productRouter from "./api/products/products.router.js";
import cartRouter from "./api/carts/carts.router.js";
import path from 'path';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./views/views.router.js";
import { __dirname } from './utils.js';

const app = express();
const httpServer = app.listen(8080, () => console.log("server ok puerto 8080"));

// Creamos el servidor para sockets viviendo dentro de nuestro servidor principal
const socketServer = new Server(httpServer);

// Configuramos el servidor para que pueda manejar los sockets
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
});


// app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);

// console.log(process.cwd())

