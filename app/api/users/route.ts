import prisma from "@/public/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    // const users = await prisma.user.findMany();
    // console.log(users);
    return NextResponse.json("GET Hello Users!")
}

export async function POST(req: NextRequest, res: NextResponse) {
    return NextResponse.json("POST Hello Users!")
}
