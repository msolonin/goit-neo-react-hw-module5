import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import cssNav from './Navigation.module.css'

const generateActiveClass = ({ isActive }) => {
	return clsx(cssNav.link, isActive && cssNav.isActive)
}

const Navigation = () => {
	return (
		<nav className={cssNav.navigation}>
			<NavLink className={generateActiveClass} to='/'>
				Home
			</NavLink>
			<NavLink className={generateActiveClass} to='/movies'>
				Movies
			</NavLink>
		</nav>
	)
}

export default Navigation