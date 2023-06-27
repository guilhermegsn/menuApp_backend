import mongoose from "mongoose";


const User = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false //não vem nas buscas
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default mongoose.model("User", User)