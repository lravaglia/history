import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const data = await request.json()
  const prisma = new PrismaClient()

  const newMovie = await prisma.attribute.create({ data })

  return NextResponse.json(newMovie)
}

export async function GET() {
  const prisma = new PrismaClient()

  const movies = await prisma.attribute.findMany()

  return NextResponse.json(movies)
}