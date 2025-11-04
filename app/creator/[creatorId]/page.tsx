import StreamView from "@/app/_components/StreamView";

export default function ({
  params: { creatorId },
}: {
  params: {
    creatorId: string;
  };
}) {

    return<div>
        <StreamView creatorId={creatorId} />
    </div>
}
