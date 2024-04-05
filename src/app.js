const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const Database = require("./dbs/init.postgresql.lv0");
const cors = require("cors");

//
const AuthRoutes = require("./api/v1/routes/auth_route");
const RoleRoutes = require("./api/v1/routes/role_route");
const ProductRoutes = require("./api/v1/routes/product_route");
const MenuProductRoutes = require("./api/v1/routes/menu_product_routes");
const TableRoutes = require("./api/v1/routes/table_routes");
const FloorRoutes = require("./api/v1/routes/floor_route");
const FranchiseRoutes = require("./api/v1/routes/franchise_routes");
const OrderRoutes = require("./api/v1/routes/order_route");
const CatalogueRoutes = require("./api/v1/routes/catalogue_route");
const RolePermissionRoutes = require("./api/v1/routes/role_permission_route");
const MenuRoleRoutes = require("./api/v1/routes/menu_role_route");
const OrderDetailRoutes = require("./api/v1/routes/order_details_routes");
const QRRoutes = require("./api/v1/routes/qr_route");
const QRRoleRoutes = require("./api/v1/routes/qr_role_route");
const PaymentMethodRoutes = require("./api/v1/routes/payment_method_route");
const UserRoutes = require("./api/v1/routes/user_route");
const CustomerRoutes = require("./api/v1/routes/customer_route");
const app = express();
//CORS
app.use(
  cors({
    origin: "http:localhost:5173",
  })
);
//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//init db
const db = new Database();
//init routes
app.use("/v1/auth", AuthRoutes);
app.use("/v1/role", RoleRoutes);
app.use("/v1/product", ProductRoutes);
app.use("/v1/menu_product", MenuProductRoutes);
app.use("/v1/table", TableRoutes);
app.use("/v1/floor", FloorRoutes);
app.use("/v1/franchise", FranchiseRoutes);
app.use("/v1/order", OrderRoutes);
app.use("/v1/catalogue", CatalogueRoutes);
app.use("/v1/role_permission", RolePermissionRoutes);
app.use("/v1/menu_role", MenuRoleRoutes);
app.use("/v1/order_detail", OrderDetailRoutes);
app.use("/v1/qr_role", QRRoleRoutes);
app.use("/v1/payment_method", PaymentMethodRoutes);
app.use("/v1/qr", QRRoutes);
app.use("/v1/user", UserRoutes);
app.use("/v1/customer", CustomerRoutes);

//Redis
const client = require("./helpers/connect_redis");
//

//handle error
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    messages: "Not Found",
  });
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,
    messages: error.message || "Internal Server Error",
  });
});

//
process.on("SIGINT", async () => {
  await db.disconnect();
  console.log("Application terminated, database connection closed.");
  process.exit(0);
});
module.exports = app;
