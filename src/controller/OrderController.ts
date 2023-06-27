import { Request, Response } from "express"
import Order from "../database/schema/Order"

class orderController {
	async create(request: Request, response: Response) {
		try {
			const data = {
				user: request.body.user,
				establishment: request.body.establishment,
				status: request.body.status,
				items: request.body.items
			};
			const order = await Order.create(data);
			return response.json(order);
		} catch (error) {
			return response.status(500).send({
				error: "Registration failed",
				message: error.message
			});
		}
	}

	async find(request: Request, response: Response) {
		try {
			const { establishmentId } = request.params;
			const establishmentOrder = await Order.find({ establishment: establishmentId, status: 1 })
			return response.json(establishmentOrder)
		} catch (error) {
			return response.status(500).json({
				error: "Something wrong happened, try again.",
				message: error
			})
		}
	}
}




export default new orderController()