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
        }
    });
    return NextResponse.json({
        streams
    })

}