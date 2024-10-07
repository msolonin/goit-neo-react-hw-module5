import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
// import HomePage from './pages/HomePage/HomePage'
import Navigation from './components/Navigation/Navigation'
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import MovieReviews from "./components/MovieReviews/MovieReviews.jsx";
// import MovieCast from "./components/MovieCast/MovieCast.jsx";
// import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
// const Navigation = lazy(() => import('./components/Navigation/Navigation'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'))

const App = () => {
	return (
		<div>
			<Navigation />
			<Suspense fallback={<h1>LOADING COMPONENT...</h1>}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/movies' element={<MoviesPage />} />
					<Route path='/movies/:movieId' element={<MovieDetailsPage />}>
						<Route path='cast' element={<MovieCast />} />
						<Route path='reviews' element={<MovieReviews />} />
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App
