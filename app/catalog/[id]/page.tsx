import { getCamperById } from "@/lib/api";
import CamperDetails from "./CamperDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const camper = await getCamperById(id);

  if (!camper) {
    notFound();
  }

  return (
    <main>
      <CamperDetails item={camper} />
    </main>
  );
}