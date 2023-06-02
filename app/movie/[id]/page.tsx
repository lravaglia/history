import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import ReactMarkdown from "react-markdown";

export default async function MovieWrapper({
  params: { id },
}: {
  params: { id: string };
}) {
  const getMovie = async (id: string) => {
    "use server";

    return await new PrismaClient().movie.findUnique({
      where: {
        id,
      },
      include: {
        attributes: true,
      },
    });
  };

  const movie = await getMovie(id);

  if (!movie) {
    return NextResponse.redirect("/404");
  }

  return (
    <main>
      <h1>{movie.name}</h1>

      <section id="attributes" className="flex flex-row justify-around">
        <article id="bonuses" className="flex-1">
          <h2>Bonuses</h2>
          <ul className="list-disc">
            {movie.attributes
              .filter((attribute) => attribute.kind === "BONUS")
              .map((bonus) => {
                return (
                  <li key={bonus.id}>
                    <ReactMarkdown>{bonus.description}</ReactMarkdown>
                  </li>
                );
              })}
          </ul>
        </article>
        <article id="maluses" className="flex-1">
          <h2>Maluses</h2>
          <ul className="list-disc">
            {movie.attributes
              .filter((attribute) => attribute.kind === "MALUS")
              .map((malus) => {
                return (
                  <li key={malus.id}>
                    <ReactMarkdown>{malus.description}</ReactMarkdown>
                  </li>
                );
              })}
          </ul>
        </article>
      </section>
    </main>
  );
}
