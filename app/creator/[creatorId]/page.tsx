import StreamView from "@/app/_components/StreamView";

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = await params;

  return (
    <div>
      <StreamView creatorId={creatorId} />
    </div>
  );
}
