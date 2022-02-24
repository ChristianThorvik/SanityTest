import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
}[0...50]
`;

const MovieList = ({ movies }) => {
  return(
      <React.Fragment>
        <div className="movies">
          <ul className="list">
            {movies.map(movie => (
                <li key={movie._id} className="list__item">
                  <Link href="/movie/[id]" as={`/movie/${movie._id}`}>
                    <a>
                      {movie.poster && (
                          <img
                              src={imageUrlFor(movie.poster)
                                  .ignoreImageParams()
                                  .width(300)}
                              width="100"
                              height={100 / movie.posterAspect}
                          />
                      )}
                      <div style={{ paddingTop: "0.2em" }}>
                        {movie.releaseDate.substr(0, 4)}
                      </div>
                      <h3>{movie.title}</h3>
                      {movie.director && (
                          <span className="movies-list__directed-by">
                      Directed by {movie.director}
                    </span>
                      )}
                    </a>
                  </Link>
                </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .movies {
            padding: 1rem;
          }
          .movies-list__directed-by {
            display: block;
            font-size: 1rem;
          }
        `}
        </style>
        <style jsx>{listStyles}</style>
      </React.Fragment>
  )
}

const MoviePage = ({ movies }) => {
  return (
    <Layout>
      <MovieList movies={movies} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const movies = await sanity.fetch(query);
  return {
    props: { movies } // will be passed to the page component as props
  };
};

exports.MoviePage = MoviePage;
exports.MovieList = MovieList;