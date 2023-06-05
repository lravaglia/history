import prisma from "@/src/db";
import { NextResponse } from "next/server";
import zod from "zod";

const post = zod.object({
  name: zod.string(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const data = post.parse(json);

  const newMovie = await prisma.movie.create({ data });

  return NextResponse.json(newMovie);
}

export const GET = async () => NextResponse.json(await prisma.movie.findMany());
