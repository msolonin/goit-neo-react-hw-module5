import {useEffect, useState} from "react";
import {getTrendingMovies} from "../../service/moviesApi.js";
import {useLocation, useSearchParams } from 'react-router-dom'
import MovieList from "../../components/MovieList/MovieList.jsx";


const HomePage = () => {
	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const [params, setParams] = useSearchParams()
	const location = useLocation()

	useEffect(() => {
		const getMovies = async () => {
			try {
				setIsLoading(true)
				setError(false)
				const result = await getTrendingMovies()
				console.log('result', result)
				setMovies(result.results)
			} catch (error) {
				// console.error(error)
				setError(true)
			} finally {
				setIsLoading(false)
			}
		}
		getMovies()
	}, [])

		return <div>
			{isLoading && <h1>isLoading...</h1>}
			{error && <h1>oops...</h1>}
			{movies && (
				<>
					<h1>Trending today</h1>
					<MovieList movies={movies} location={location} />
				</>
			)}
		</div>
}
export default HomePage

