import prisma from "@/src/db";
import Link from "next/link";

const Home = async () => {
  const getMovies = async () => {
    "use server";

    return prisma.movie.findMany({
      select: { id: true, name: true },
    });
  };

  return (
    <main>
      <h1>Historical Movie Accuracy</h1>

      <ul className="list-disc">
        {(await getMovies()).map(({ id, name }) => (
          <li key={id}>
            <Link href={`/movie/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
