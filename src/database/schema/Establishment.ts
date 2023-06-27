import mongoose from "mongoose";

const Establishment = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	fullname: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	state_registration: {
		type: String,
	},
	address: {
		type: String,
	},
	neighborhood: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
	},
	complement: {
		type: String,
	},
	phone: {
		type: String,
	},
	cellphone: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	active: {
		type: Boolean,
	},
	establishmentCode: {
		type: String,
		unique: true
	},
	menu: [
		{
			menuName: {
				type: String,
				required: true
			},
			menuItems: [
				{
					itemName: {
						type: String,
						required: true
					},
					itemDescription: {
						type: String
					},
					itemPrice: {
						type: Number,
						required: true
					},
				}
			],
		}
	]
})

export default mongoose.model("Establishment", Establishment)