import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const session=await getServerSession();
    //Todo you can get rid of db call
    const user= await prisma.user.findUnique({
        where:{
            email:session?.user?.email??""
        }
    });
    if (!user){
        return NextResponse.json({
            "message":"Unauthenticated"
        },{
            status:403
        })
    }
    const streams=await prisma.streams.findMany({
        where:{
            userId:user.id
        },include:{
            _count:{
                select:{
                    upvotes:true
                }
            },upvotes:{
                where:{
                    userId:user.id
                }
                
            }
        }
    });
    // return NextResponse.json({
    //     streams:streams.map((_count,...rest)=>({
    //         ...rest,
    //         upvotes:_count.upvotes,
    //         haveUpvoted:rest.length ? true:false
    //     }))
    // })

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
}

