import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieReviews} from "../../service/moviesApi.js";

const MovieReviews = () => {

	const {movieId} = useParams()
	const [review, setReview] = useState([])

	useEffect(() => {
		const getReview = async () => {
			try {
				const res = await getMovieReviews(movieId)
				setReview(res.results)
			} catch (error) {
				console.error(error)
			}
		}
		getReview()
	}, [movieId])

	return <div>
		{!review || review.length === 0 ? (
			<p>We don't have any reviews for this movie</p>
		) : (
			<ul>
				{review.map((el) => (
					<li key={el.id}>
						<strong>{el.author}</strong>
						<p>{el.content}</p>
					</li>
				))}
			</ul>
		)}
	</div>
}

export default MovieReviews
