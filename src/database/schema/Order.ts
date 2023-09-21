import mongoose from "mongoose";

const Order = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		//required: true
	},
	establishment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Establishment',
		required: true
	},
	userName: {type: String},
	local: {type: String},
	items: [
		{
			itemName: {
				type: String,
				required: true
			},
			qty: {
				type: Number,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
	finishedIn: {
		type: Date,
	},
	status: {
		type: Number,
		required: true
	}
})
 

 // Definindo um pre hook para validar o preço do produto antes de salvar o pedido
// Order.pre('save', async function(next) {
// 	var self = this;
// 	// Criando uma variável booleana para armazenar se houve algum erro na verificação
// 	var hasError = false;
// 	// Percorrendo os itens do pedido usando um loop async/await
// 	for await (let item of self.items) {
// 	  // Buscando no banco de dados o produto na collection Estabelecimento pelo id e pelo nome usando o modelo Establishment
// 	  let doc = await Establishment.findOne({ _id: self.establishment }, { menu: { $elemMatch: { 'menuItems.itemName': item.name } } });
// 	  if (doc) {
// 		// Se encontrar o produto, percorre os itens do menu usando outro loop async/await
// 		for await (let menuItem of doc.menu[0].menuItems) {
// 			console.log(('item: '+item.price +' menu: '+ menuItem.itemPrice))
// 		  // Compara o preço com o que está sendo enviado no pedido
// 		  if (item.price === menuItem.itemPrice) {
// 			// Se os preços forem iguais, continua o loop
// 			continue;
// 		  } else {
// 			// Se os preços forem diferentes, lança um erro e interrompe a operação de salvar
// 			next(new Error('Preço do produto inválido!'));
// 			// Atribui true à variável hasError
// 			hasError = true;
// 			// Usa o comando break para encerrar o loop
// 			break;
// 		  }
// 		}
// 	  } else {
// 		// Se não encontrar o produto, lança um erro e interrompe a operação de salvar
// 		next(new Error('Produto não encontrado!'));
// 		// Atribui true à variável hasError
// 		hasError = true;
// 		// Usa o comando break para encerrar o loop
// 		break;
// 	  }
// 	}
// 	// Verifica se houve algum erro na verificação
// 	if (!hasError) {
// 	  // Se não houve erro, prossegue com a operação de salvar
// 	  next();
// 	}
//   });

export default mongoose.model("Order", Order)