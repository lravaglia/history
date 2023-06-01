import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
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
