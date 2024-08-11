const express = require("express")

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const businessRoutes = require("./business.routes");
const roleRoutes = require("./role.routes");
const configRoutes = require("./config.routes");
const orderRoutes = require("./order.routes");
const genericRoutes = require("./generic.routes");
const chatRoutes = require("./chat.routes");

const router = express.Router();

const defaultRoutes = [
    {
        path:"/auth",
        route:authRoutes
    },
    {
        path:"/businesses",
        route:businessRoutes
    },
    {
        path:"/roles",
        route:roleRoutes
    },
    {
        path:"/users",
        route:userRoutes
    },
    {
        path:"/generic",
        route:genericRoutes
    },
    {
        path:"/orders",
        route:orderRoutes
    },
    {
        path:"/config",
        route:configRoutes
    },
    {
        path:"/chats",
        route:chatRoutes
    },
]

defaultRoutes.forEach((route)=>{
    router.use(route.path, route.route);
})

module.exports = router;
