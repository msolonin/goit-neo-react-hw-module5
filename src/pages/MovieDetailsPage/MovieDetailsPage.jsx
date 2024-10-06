import { Suspense, useEffect, useRef, useState } from 'react'
import {Link, NavLink, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'
import {getMovieDetails, BASE_IMG_PATH} from "../../service/moviesApi.js";


const MovieDetailsPage = () => {
	const { movieId } = useParams()
	const [movie, setMovie] = useState(null)
	const location = useLocation()
	const backPath = useRef(location.state ?? '/movies')
	const navigate = useNavigate()

	console.log('render')

	useEffect(() => {
		const getMovie= async () => {
			try {
				const res = await getMovieDetails(movieId)
				setMovie(res)
			} catch (error) {
				console.error(error)
			}
		}
		getMovie()
	}, [movieId])

const onClick = () => {
	try {
		const fullPath = backPath.current.from.pathname + (backPath.current.from.search || '');
		navigate(fullPath);
	} catch (error) {
		console.error(error);
		navigate(backPath.current);
	}

};


	return (
		movie && (
			<div>
				<button onClick={onClick}>back</button>
                <ul>
                    <img src={BASE_IMG_PATH + movie.poster_path} alt={movie.title} width={400}/>
                </ul>
				<ul>
					<h1>{movie.title}</h1>

					<li> User Score: {Math.round(movie.vote_average * 10)} %</li>
					<li>
						<strong>Overview:</strong>
						<p> {movie.overview} </p>
					</li>
					<li>
						<strong>Genres:</strong>
						<p> {movie.genres.map(el => el.name).join(', ')} </p>
					</li>
				</ul>

				<ul>
					<li>
						<NavLink to='cast'>Cast</NavLink>
					</li>
					<li>
					<NavLink to='reviews'>Reviews</NavLink>
					</li>
				</ul>
				<Suspense fallback={<h1>LOADING CHILD COMPONENT...</h1>}>
					<Outlet />
				</Suspense>
			</div>
		)
	)
}

export default MovieDetailsPage
