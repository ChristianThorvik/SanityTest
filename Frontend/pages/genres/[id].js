import React from "react";
import { MoviePage, MovieList } from "../index";
import sanity from "../../lib/sanity";
import Layout from "../../components/Layout";

const categoriesQuery = `*[_type == "category"].name`;

const categoryQuery = `*[_type == "category" && name == $id] {
  _id,
  name,
  "movies": *[_type == "movie" && references(^._id)] {
      _id,
      title,
      overview,
      releaseDate,
      poster,
      "cast": castMembers[] {
        _key,
        characterName,
        "person": person-> {
          _id,
          name,
          image
        }
      }
}
}[0]`;

const Genre = ({ category }) => {
    return (
        <Layout>
            <h3>category.name</h3>
            <MovieList movies = {category.movies} />
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const categories = await sanity.fetch(categoriesQuery);
    const paths = categories.map(category => ({
        params: { id: category }
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
    const category = await sanity.fetch(categoryQuery, { id: params.id });
    return {
        props: { category } // will be passed to the page component as props
    };
};

export default Genre;
