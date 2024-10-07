import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from "react";
import { searchMovie } from "../../service/moviesApi.js";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const queryValue = searchParams.get('query') ?? '';

  useEffect(() => {
    const fetchMovies = async () => {
      if (!queryValue) return;
      try {
        setIsLoading(true);
        setError(false);
        const result = await searchMovie(queryValue);
        setMovies(result.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [queryValue]);

  const handleSubmit = (values, actions) => {
    const { query } = values;

    if (query.trim() === '') {
      setSearchParams({});
      setMovies([]);
    } else {
      setSearchParams({ query });
    }

    actions.setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ query: queryValue }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              name="query"
              value={values.query}
              onChange={handleChange}
              placeholder="Search for a movie"
            />
            <button type="submit">Search</button>
          </Form>
        )}
      </Formik>

      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Oops, something went wrong...</h1>}
        {movies.length > 0 && (
          <MovieList movies={movies} location={location} />
        )}
      </div>
    </>
  );
};

export default MoviesPage;
