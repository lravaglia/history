import prisma from "@/src/db";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const authorization = request.headers.get("Authorization");
  const [type, slug] = authorization?.split(" ")!;
  if (type != "Bearer" || slug != process.env["BEARER_TOKEN"]) {
    return NextResponse.error();
  } 
  const data = await request.json()

  const newMovie = await prisma.attribute.create({ data })

  return NextResponse.json(newMovie)
}

export const GET = async () => NextResponse.json(await prisma.attribute.findMany())