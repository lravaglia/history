import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();

  const movies = await prisma.movie.findMany();

  return (
    <main>
      <h1>Historical Movie Accuracy</h1>

      <ul className="list-disc">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <a href={`/movie/${movie.id}`}>{movie.name}</a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
