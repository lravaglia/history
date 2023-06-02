import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const authorization = request.headers.get("Authorization");
  const [type, slug] = authorization?.split(" ")!;
  if (type != "Bearer" || slug != process.env["BEARER_TOKEN"]) {
    return NextResponse.error();
  } 
  const data = await request.json()
  const prisma = new PrismaClient()

  const newMovie = await prisma.movie.create({ data })

  return NextResponse.json(newMovie)
}

export async function GET() {
  const prisma = new PrismaClient()

  const movies = await prisma.movie.findMany()

  return NextResponse.json(movies)
}
