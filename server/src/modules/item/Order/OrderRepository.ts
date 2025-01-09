import OrderRepository from "./OrderAction";

async function createOrderExample() {
	const newOrderId = await OrderRepository.create({
		shippingAddress: "123 Rue de Paris, France",
		billingAddress: "456 Avenue des Champs, France",
		user_id: 1,
	});
}
