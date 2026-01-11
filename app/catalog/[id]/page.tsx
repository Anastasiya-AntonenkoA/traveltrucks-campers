export default async function CamperDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Тут логіка отримання даних про кемпера за id
  return <div>Деталі кемпера: {id}</div>;
}