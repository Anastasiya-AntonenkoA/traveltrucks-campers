import { getCampers } from "@/lib/api";
import CamperList from "@/components/CamperList/CamperList";

const Campers = async () => {
  const response = await getCampers(1, 4);
  
  const data = Array.isArray(response) ? response[0] : response;

  if (!data || !data.items || data.items.length === 0) {
    return <p>No campers found.</p>;
  }
  return (
    <section>
      <CamperList initialData={data} />
    </section>
  );
}

export default Campers;