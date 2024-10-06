import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
	return (
		<nav className={css.navigation}>
			<NavLink to='/'>
				Home
			</NavLink>
			<NavLink to='/movies'>
				Movies
			</NavLink>
		</nav>
	)
}

export default Navigation