import Order from "../database/schema/Order"


class orderController {
	async create(request, response) {
		try {
			const data = {
				user: request.body.user,
				establishment: '64d442c645841a5a831e8ec2', //request.body.establishment,
				status: 1,
				items: request.body.items,
				local: request.body.local
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


	async addItems(request, response) {
		const { items } = request.body
		const { orderId } = request.params
		try {
		  const order = await Order.findById(orderId);
		  if (!order) {
			return response.status(404).send({
			  error: "Order not found"
			});
		  }
		  order.items.push(...items);
		  await order.save();
		  return response.json(order);
		} catch (error) {
		  return response.status(500).send({
			error: "Update failed",
			message: error.message
		  });
		}
	  }

	  async finalizeOrder(request, response) {
		const { orderId } = request.params
		const date = new Date()
		try {
		  const order = await Order.findById(orderId);
		  if (!order) {
			return response.status(404).send({
			  error: "Order not found"
			});
		  }
		  order.status = 2
		  order.finishedIn = date
		  await order.save();
		  return response.json(order);
		} catch (error) {
		  return response.status(500).send({
			error: "Update failed",
			message: error.message
		  });
		}
	  }


	async findByEstablishment(request, response) {
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

	async findByUser(request,response) {
		try {
			const { userId } = request.params;
			const userOrder = await Order.find({ user: userId, status: 1 })
			return response.json(userOrder)
		} catch (error) {
			return response.status(500).json({
				error: "Something wrong happened, try again.",
				message: error
			})
		}
	}
}




export default new orderController()