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

    await prisma.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });

    return NextResponse.json(
      { message: "Downvoting done" },
      { status: 200 }
    );
  } catch (e: any) {
    // Handle not found gracefully
    if (e.code === "P2025") {
      return NextResponse.json(
        { message: "Already unliked" },
        { status: 200 }
      );
    }

    console.error("Downvote error:", e);
    return NextResponse.json(
      { message: "Error while downvoting" },
      { status: 400 }
    );
  }
}
