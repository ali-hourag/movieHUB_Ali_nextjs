import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    console.log(params)
    return NextResponse.json({ params })
}
