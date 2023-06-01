import { PrismaClient } from "@prisma/client";
import ReactMarkdown from "react-markdown";

type Kind = "BONUS" | "MALUS";

type Attribute = {
  id: string;
  description: string;
  kind: Kind;
};

type Movie = {
  name: string;
  attributes: Attribute[];
};

export default async function MovieWrapper({
  params: { id },
}: {
  params: { id: string };
}) {
  async function getMovie(id: string) {
    "use server";

    const prisma = new PrismaClient();

    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        attributes: true,
      },
    });

    return movie;
  }

  if (!id) {
    return null;
  }

  const movie = await getMovie(id);

  if (!movie) {
    return null;
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
