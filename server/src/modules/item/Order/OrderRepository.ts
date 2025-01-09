import OrderRepository from "./OrderAction";

// Exemple : Créer une commande
async function createOrderExample() {
	const newOrderId = await OrderRepository.create({
		shippingAddress: "123 Rue de Paris, France",
		billingAddress: "456 Avenue des Champs, France",
		user_id: 1, // L'utilisateur qui passe la commande
	});

	console.log(`Nouvelle commande créée avec l'ID : ${newOrderId}`);
}
