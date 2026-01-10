import { getCampers } from "@/lib/api";
import CamperList from "@/components/CamperList/CamperList";

const Campers = async () => {
  const response = await getCampers();
  
  const data = Array.isArray(response) ? response[0] : response;
  const campers = data?.items || []; //це для масиву! У іншому посиланні масиву немає
  
  return (
    <section>
      <h1>Campers List</h1>
      {campers.length > 0 ? (
        <CamperList campers={campers} />
      ) : (
        <p>No campers found.</p>
      )}
    </section>
  );
}

export default Campers;