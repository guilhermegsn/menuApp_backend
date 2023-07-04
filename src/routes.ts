import { Router } from 'express'

import UserController from './controller/UserController'
import EstablishmentsController from './controller/EstablishmentsController'
import OrderController from './controller/OrderController'

const routes = Router()

//users
routes.post("/user", UserController.create)
routes.get("/user", UserController.find)

//establishment
routes.get("/establishment", EstablishmentsController.findAll)
routes.get("/establishment/:establishmentId", EstablishmentsController.find)
routes.post("/establishment", EstablishmentsController.create)
routes.put("/establishment/:establishmentId", EstablishmentsController.update)
routes.delete("/establishment/:establishmentId", EstablishmentsController.delete)

//menu
routes.post("/establishment/:establishmentId/menu", EstablishmentsController.createMenu)
routes.put("/establishment/:establishmentId/menu/:menuId", EstablishmentsController.updateMenu)
routes.delete("/establishment/:establishmentId/menu/:menuId", EstablishmentsController.deleteMenu)

//menuItems
routes.post("/establishment/:establishmentId/menu/:menuId/:menuItemId", EstablishmentsController.createMenuItem)
routes.put("/establishment/:establishmentId/menu/:menuId/:menuItemId", EstablishmentsController.updateMenuItem)
routes.delete("/establishment/:establishmentId/menu/:menuId/:menuItemId", EstablishmentsController.deleteMenuItem)

//Order
routes.post("/order", OrderController.create)
routes.get("/order/establishment/:establishmentId", OrderController.findByEstablishment)
routes.get("/order/user/:userId", OrderController.findByUser)
routes.post("/order/:orderId", OrderController.addItems)
routes.put("/order/:orderId/finalize", OrderController.finalizeOrder)

export default routes