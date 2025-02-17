import { useOrders } from "../../services/useOrders";

export default function OrdersList() {
  const { orders, loading, error } = useOrders();

  if (loading) return <div>Chargement des commandes...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="orders-list">
      <h2>Liste des Commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID Commande</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Détails de la Commande</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">
                  {order.client.firstname} {order.client.lastname}
                </td>
                <td className="border p-2">{order.client.mail}</td>
                <td className="border p-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {order.status ? "Traitée" : "En cours"}
                </td>
                <td className="border p-2">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - Quantité : {item.quantity} - Prix :{" "}
                        {item.price.toFixed(2)}€
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
