import prisma from "@/src/db";
import { NextResponse } from "next/server";
import zod from "zod";

const post = zod.object({
  kind: zod.enum(["MALUS", "BONUS"]),
  description: zod.string(),
  movie: zod.string().uuid(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const { kind, description, movie: id } = post.parse(json);

  const newMovie = await prisma.attribute.create({
    data: {
      kind,
      description,
      movie: { connect: { id } },
    },
  });

  return NextResponse.json(newMovie);
}

export const GET = async () =>
  NextResponse.json(await prisma.attribute.findMany());
