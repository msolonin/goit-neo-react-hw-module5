import {useEffect, useState} from "react";
import {getTrendingMovies} from "../../service/moviesApi.js";
import { Link, useLocation, useSearchParams } from 'react-router-dom'


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
					<ul>
						{movies.map((el) => (
							<li key={el.id}>
								<Link to={`/movies/${el.id}`} state={location}>
									{el.title}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
}
export default HomePage

