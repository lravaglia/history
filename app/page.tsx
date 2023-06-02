import { PrismaClient } from "@prisma/client";

const getMovies = async () => {
  "use server";

  return await new PrismaClient().movie.findMany({
    select: { id: true, name: true },
  });
};

const Home = async () => (
  <main>
    <h1>Historical Movie Accuracy</h1>

    <ul className="list-disc">
      {(await getMovies()).map(({ id, name }) => (
        <li key={id}>
          <a href={`/movie/${id}`}>{name}</a>
        </li>
      ))}
    </ul>
  </main>
);

export default Home;
