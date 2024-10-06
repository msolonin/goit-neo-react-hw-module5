import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BASE_IMG_PATH, getMovieCredits} from "../../service/moviesApi.js";

const MovieCast = () => {

	const {movieId} = useParams()
	const [cast, setCast] = useState([])

	useEffect(() => {
		const getCast = async () => {
			try {
				const res = await getMovieCredits(movieId)
				console.log('res', res)
				setCast(res.cast)
			} catch (error) {
				console.error(error)
			}
		}
		getCast()
	}, [movieId])
	return <div>
		{!cast || cast.length === 0 ? (
			<p>We don't have any reviews for this movie</p>
		) : (
			<ul>
				{cast.map((el) => (
					<li key={el.id}>
						<strong>{el.name}</strong>
						<p>{el.character}</p>
						<img src={BASE_IMG_PATH + el.profile_path} alt={el.name} width={100}/>
					</li>
				))}
			</ul>
		)}
	</div>
}

export default MovieCast
