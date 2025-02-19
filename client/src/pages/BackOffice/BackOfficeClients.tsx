import { useClients } from "../../services/useClient";
import type { Clients } from "../../types/clientsData";

const ClientList = () => {
  const { clients, loading, error } = useClients();

  if (loading) {
    return <p>Chargement des clients...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <article>
      <h1>Liste des Clients</h1>
      <ul>
        {clients.map((client: Clients) => (
          <li key={client.id}>
            {client.lastname} {client.firstname} - {client.mail}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ClientList;
