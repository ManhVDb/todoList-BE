const todoListRouter = require("./todoListRouter")

function RouteRoot(app) {
    app.use("/todo-list", todoListRouter);
}

module.exports = RouteRoot;