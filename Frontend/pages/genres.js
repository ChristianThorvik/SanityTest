import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";

const query = `*[_type == "category"] {
  _id,
  name
}`;

const Genres = ({ genres }) => {
    return (
        <Layout>
            <div className="genres">
                <ul className="list">
                    {genres.map(genre => (
                        <li key={genre._id} className="list__item">
                            <Link href="/genres/[name]" as={`/genres/${genre.name}`}>
                                <a>
                                    <h3>{genre.name}</h3>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <style jsx>{`
        .genres {
          padding: 1rem;
        }
        
        .genres .list {
            display: block;
        }

        .genres .list h3 {
          line-height: 1em;
          padding: 0.5em 0;
        }
      `}</style>
            <style jsx>{listStyles}</style>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const genres = await sanity.fetch(query);
    console.log(genres)
    return {
        props: { genres } // will be passed to the page component as props
    };
}

export default Genres;
