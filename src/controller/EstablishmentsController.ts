import { Request, Response } from "express"
import mongoose from "mongoose";
import Establishment from "../database/schema/Establishment"
import { generateUniqueHash } from '../services/functions'

class establishmentController {

	async create(request: Request, response: Response) {
		const data = {
			name: request.body.name,
			fullname: request.body.fullname,
			description: request.body.description,
			email: request.body.email,
			state_registration: request.body.state_registration,
			address: request.body.address,
			neighborhood: request.body.neighborhood,
			city: request.body.city,
			state: request.body.state,
			country: request.body.country,
			complement: request.body.complement,
			phone: request.body.phone,
			cellphone: request.body.cellphone,
			active: request.body.active,
			establishmentCode: generateUniqueHash()
		}
		try {
			const establishmentExists = await Establishment.findOne({ email: data.email });
			if (establishmentExists) {
				return response.status(400).send({
					error: "Ooops..",
					message: "E-mail already exists"
				});
			}
			const establishment = await Establishment.create(data);
			return response.json(establishment);
		} catch (error) {
			return response.status(500).send({
				error: "Registration failed",
				message: error
			});
		}
	}

	async update(request: Request, response: Response) {
		const data = {
			name: request.body.name,
			fullname: request.body.fullname,
			description: request.body.description,
			email: request.body.email,
			state_registration: request.body.state_registration,
			address: request.body.address,
			neighborhood: request.body.neighborhood,
			city: request.body.city,
			state: request.body.state,
			country: request.body.country,
			complement: request.body.complement,
			phone: request.body.phone,
			cellphone: request.body.cellphone,
			active: request.body.active,
		}
		try {
			const { establishmentId } = request.params;

			// Verificar se o estabelecimento existe
			const establishment = await Establishment.findById(establishmentId);
			if (!establishment) {
				return response.status(404).send({
					error: "Establishment not found",
					message: "Establishment with the provided ID does not exist"
				});
			}

			Object.assign(establishment, data);
			const updatedEstablishment = await establishment.save();
			return response.json(updatedEstablishment);
		} catch (error) {
			return response.status(500).send({
				error: "Update failed",
				message: error.message
			});
		}
	}

	async find(request: Request, response: Response) {
		try {
			const { establishmentId } = request.params;
			const establishment = await Establishment.findById(establishmentId)
			return response.json(establishment)
		} catch (error) {
			return response.status(500).json({
				error: "Something wrong happened, try again.",
				message: error
			})
		}
	}

	async delete(request: Request, response: Response) {
		try {
			const { establishmentId } = request.params;
			await Establishment.findByIdAndDelete(establishmentId);
			return response.status(200).send();
		} catch (error) {
			return response.status(500).json({
				error: "Something wrong happened, try again.",
				message: error
			});
		}
	}
	

	async findAll(request: Request, response: Response) {
		try {
			const establishments = await Establishment.find()
			return response.json(establishments)
		} catch (error) {
			return response.status(500).json({
				error: "Something wrong happened, try again.",
				message: error
			})
		}
	}

	

	async createMenu(request: Request, response: Response) {
		try {
			const { menuName, menuItems } = request.body
			const { establishmentId } = request.params;
			const document = await Establishment.findById(establishmentId)
			document?.menu.push({
				menuName: menuName,
				menuItems: menuItems,
			});
			const savedDocument = await document?.save();
			return response.status(200).json(savedDocument);
		} catch (error) {
			console.log(error)
			return response.status(500).send({
				error: "Creation failed",
				message: error.message
			});
		}
	}

	async updateMenu(request: Request, response: Response) {
		try {
			const { establishmentId, menuId } = request.params;
			const { menuName, menuItems } = request.body;
			if (!mongoose.Types.ObjectId.isValid(establishmentId)) {
				return response.status(404).json({
					error: "Invalid ID",
					message: "The provided ID is not valid",
				});
			}
			const document = await Establishment.findByIdAndUpdate(
				establishmentId,
				{
					$set: {
						"menu.$[menu].menuName": menuName,
						"menu.$[menu].menuItems": menuItems,
					},
				},
				{
					new: true,
					arrayFilters: [{ "menu._id": menuId }],
				}
			);
			if (!document) {
				return response.status(404).json({
					error: "Establishment not found",
					message: "Establishment with the provided ID does not exist",
				});
			}
			return response.status(200).json(document);
		} catch (error) {
			console.log(error)
			return response.status(500).send({
				error: "Update failed",
				message: error.message
			});
		}
	}

	async deleteMenu(request: Request, response: Response) {
		try {
			const { establishmentId, menuId } = request.params;
			if (!mongoose.Types.ObjectId.isValid(establishmentId)) {
				return response.status(404).json({
					error: "Invalid ID",
					message: "The provided ID is not valid",
				});
			}
			const document = await Establishment.findByIdAndUpdate(
				establishmentId,
				{
					$pull: {
						menu: { _id: menuId },
					},
				},
				{
					new: true,
				}
			);
			if (!document) {
				return response.status(404).json({
					error: "Establishment not found",
					message: "Establishment with the provided ID does not exist",
				});
			}
			return response.status(200).json(document);
		} catch (error) {
			console.log(error)
			return response.status(500).send({
				error: "Deletion failed",
				message: error.message
			});
		}
	}

	async createMenuItem(request: Request, response: Response) {
		try {
			const { establishmentId, menuId } = request.params;
			const menuItem = request.body;
			if (!mongoose.Types.ObjectId.isValid(establishmentId)) {
				return response.status(404).json({
					error: "Invalid ID",
					message: "The provided ID is not valid",
				});
			}
			const document = await Establishment.findOneAndUpdate(
				{
					_id: establishmentId,
					menu: {
						$elemMatch: { _id: menuId },
					},
				},
				{
					$push: {
						"menu.$.menuItems": menuItem,
					},
				},
				{
					new: true,
				}
			);
			if (!document) {
				return response.status(404).json({
					error: "Establishment not found",
					message: "Establishment with the provided ID does not exist",
				});
			}
			return response.status(200).json(document);
		} catch (error) {
			console.log(error)
			return response.status(500).send({
				error: "Create failed",
				message: error.message
			});
		}
	}
		

	async updateMenuItem(request: Request, response: Response) {
		try {
			const { establishmentId, menuId, menuItemId } = request.params;
			const data = {
				itemName: request.body.itemName,
				itemDescription: request.body.itemDescription,
				itemPrice: request.body.itemPrice
			}
			if (!mongoose.Types.ObjectId.isValid(establishmentId)) {
				return response.status(404).json({
					error: "Invalid ID",
					message: "The provided ID is not valid",
				});
			}
			const document = await Establishment.findOneAndUpdate(
				{
					_id: establishmentId,
					menu: {
						$elemMatch: { _id: menuId },
					},
				},
				{
					$set: {
						"menu.$.menuItems.$[menuItem]": data
					},
				},
				{
					new: true,
					upsert: true,
					arrayFilters: [
						{
							"menuItem._id": menuItemId,
						},
					],
				}
			);
			if (!document) {
				return response.status(404).json({
					error: "Establishment not found",
					message: "Establishment with the provided ID does not exist",
				});
			}
			return response.status(200).json(document);
		} catch (error) {
			console.log(error)
			return response.status(500).send({
				error: "Update failed",
				message: error.message
			});
		}
	}
	
	
	async deleteMenuItem(request: Request, response: Response) {
		try {
			const { establishmentId, menuId, menuItemId } = request.params;
			if (!mongoose.Types.ObjectId.isValid(establishmentId)) {
				return response.status(404).json({
					error: "Invalid ID",
					message: "The provided ID is not valid",
				});
			}
			const document = await Establishment.findOneAndUpdate(
				{
					_id: establishmentId,
					menu: {
						$elemMatch: { _id: menuId },
					},
				},
				{
					$pull: {
						"menu.$.menuItems": { _id: menuItemId },
					},
				},
				{
					new: true,
				}
			);
			
		if (!document) {
		  return response.status(404).json({
			error: "Establishment not found",
			message: "Establishment with the provided ID does not exist",
		  });
		}
		return response.status(200).json(document);
	  } catch (error) {
		console.log(error);
		return response.status(500).send({
		  error: "Delete failed",
		  message: error.message,
		});
	  }
	}
	
	
	
	  
	  
	


	

	

}

export default new establishmentController()