import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const data = upvoteSchema.parse(await req.json());

    await prisma.upvote.upsert({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
      update: {}, // do nothing if already exists
      create: {
        userId: user.id,
        streamId: data.streamId,
      },
    });

    return NextResponse.json(
      { message: "Upvoting done" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Upvote error:", e);
    return NextResponse.json(
      { message: "Error while upvoting" },
      { status: 400 }
    );
  }
}
