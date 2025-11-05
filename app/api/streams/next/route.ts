// import { prisma } from "@/app/lib/db";
// import { getServerSession } from "next-auth";
// import { Updock } from "next/font/google";
// import { NextResponse } from "next/server";
// import { use } from "react";
// import Stream from "stream";

// export async function GET() {
//   const session = await getServerSession();
//   const user = await prisma.user.findFirst({
//     where: {
//       email: session?.user?.email ?? "",
//     },
//   });
//   console.log(user);
//   if (!user) {
//     return NextResponse.json(
//       {
//         message: "Unauthenticated",
//       },
//       { status: 403 }
//     );
//   } 
//     const mostUpvotedStream =await prisma.streams.findFirst({
//       where: {
//         userId: user.id,
//       },
//       orderBy:{
//        upvotes:{
//         _count:"desc"
//        } 
//       }

//     });
// await prisma.currentStream.upsert({
//   where: { userId: user.id },
//   update: { streamId: mostUpvotedStream?.id },
//   create: { userId: user.id, streamId: mostUpvotedStream?.id },
// });

// await prisma.streams.delete({
//   where: { id: mostUpvotedStream?.id },
// });

// return NextResponse.json({
//  stream:mostUpvotedStream
// })

// }


import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { Concert_One } from "next/font/google";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthenticated" },
      { status: 403 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }
console.log("✅ Found user:", user?.id);
  // ✅ Find the most upvoted stream for this user
  const mostUpvotedStream = await prisma.streams.findFirst({
    where: { userId: user.id },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });
console.log(mostUpvotedStream)
  if (!mostUpvotedStream) {
    return NextResponse.json(
      { message: "No streams found for this user" },
      { status: 404 }
    );
  }
  
  // ✅ Wrap both actions in a transaction (atomic & safe)
  await prisma.currentStream.upsert({
  where: { userId: user.id },
  update: { streamId: mostUpvotedStream.id },
  create: { userId: user.id, streamId: mostUpvotedStream.id },
});

// Then delete the stream
await prisma.streams.delete({
  where: { id: mostUpvotedStream.id },
});


  return NextResponse.json({
    stream: mostUpvotedStream,
  });
}
