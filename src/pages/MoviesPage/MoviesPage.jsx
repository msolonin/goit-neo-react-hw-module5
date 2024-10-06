import { Field, Form, Formik } from 'formik';
import { useState } from "react";
import { searchMovie } from "../../service/moviesApi.js";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const queryValue = searchParams.get('query') ?? '';

  const handleSubmit = async (values, actions) => {
    const { query } = values;

    if (query.trim() === '') {
      setSearchParams({});
    } else {
      setSearchParams({ query });
    }

    try {
      setIsLoading(true);
      setError(false);

      // Call the searchMovie API with the query from the form submission
      const result = await searchMovie(query);
      setMovies(result.results);

    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }

    actions.setSubmitting(false);
  };


  const handleChange = ({ target: { value } }) => {
    if (!value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <Formik
        initialValues={{ query: queryValue }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values }) => (
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
          <ul>
            {movies.map((el) => (
              <li key={el.id}>
                <Link to={`/movies/${el.id}`} state={{ from: location }}>
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MoviesPage;
