const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(express.json());
const port = process.env.PORT || 8000;

app.use("/auth", routes.authRoute);
app.use("/items", routes.itemsRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
