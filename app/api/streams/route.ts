import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/db";
import axios from "axios";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string().url(),
});


const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;

export async function POST(req: NextRequest) {
  try {
    const datas = CreateStreamSchema.parse(await req.json());
    const match = datas.url.match(YT_REGEX);

    if (!match) {
      return NextResponse.json({ message: "Wrong URL format" }, { status: 400 });
    }

    const extractedId = match[1];
    const API_KEY = process.env.YT_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { message: "Missing YT_API_KEY in environment variables" },
        { status: 500 }
      );
    }

    const infoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${extractedId}&key=${API_KEY}`;
    const { data } = await axios.get(infoUrl);

    if (!data.items?.length) {
      return NextResponse.json({ message: "Invalid or private YouTube video" }, { status: 404 });
    }

    const snippet = data.items[0].snippet;
    const title = snippet.title;
    const thumbnail =snippet.thumbnails?.high?.url;
      // snippet.thumbnails?.medium?.url ||
      // snippet.thumbnails?.default?.url ||
  

    
    const streams=await prisma.streams.create({
      data: {
        userId: datas.creatorId,
        url: datas.url,
        extractedId,
        type: "Youtube",
        title,
        thumbnail,
      },
    });

    return NextResponse.json({
      ...streams,
      hasUpvoted:false,
      upvotes:0
    });
  } catch (e: any) {
    console.error("Error while adding stream:", e);
    return NextResponse.json(
      { message: e.message || "Error while adding stream" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    if (!creatorId) {
      return NextResponse.json({ message: "Missing creatorId" }, { status: 400 });
    }

    const streams=await prisma.streams.findMany({
        where:{
            userId:creatorId
        },include:{
            _count:{
                select:{
                    upvotes:true
                }
            },upvotes:{
                where:{
                    userId:creatorId
                }
                
            }
        }
    });

    const formattedStreams = streams.map((stream) => ({
    id: stream.id,
    title: stream.title,
    url: stream.url,
    thumbnail: stream.thumbnail,
    upvotes: stream._count.upvotes,
    liked: stream.upvotes.length > 0, // ✅ user has liked this or not
    // createdAt: stream.createdAt,
  }));

  return NextResponse.json({
    success: true,
    count: formattedStreams.length,
    streams: formattedStreams,
  });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to fetch streams" }, { status: 500 });
  }
}

