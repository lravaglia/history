import prisma from "@/src/db";
import { NextResponse } from "next/server";
import zod from "zod";

const post = zod.object({
  kind: zod.enum(["MALUS", "BONUS"]),
  description: zod.string(),
  movie: zod.object({
    connect: zod.object({
      id: zod.string().uuid(),
    }),
  }),
});

export async function POST(request: Request) {
  const json = await request.json();
  const data = post.parse(json);

  const newMovie = await prisma.attribute.create({ data });

  return NextResponse.json(newMovie);
}

export const GET = async () =>
  NextResponse.json(await prisma.attribute.findMany());
