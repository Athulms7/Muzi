import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import{z}from "zod"
const upvoteschema=z.object({
streamId:z.string()
})

export async function POST(req:NextRequest){
    const session= await getServerSession();
    //TODO:you can get rid of db call here
    const user=await prisma.user.findFirst({
        where:{
            email:session?.user?.email ??""
        }
    })

    if (!user){
        return NextResponse.json({
            message:"Unauthorized"
        },{status:403})
    }
    try{
        const data=upvoteschema.parse(await req.json());
        console.log(data.streamId,user.id)

    await prisma.upvote.create({
        data:{
            userId:user.id,
            streamId:data.streamId

        }
    })
    
    return NextResponse.json({
            message:" Upvoting Done"
        },{status:200})

    }catch(e){
        return NextResponse.json({
            message:"Error while Upvoting"
        },{status:403})
    }
}