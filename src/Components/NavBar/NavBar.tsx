import React from 'react';
import { Link } from 'react-router-dom';
import { useLayoutContext } from '../Layout/LayoutProvider';

interface INavbar {
	path: string;
	name: string;
}
/* eslint-disable */
const navigations: Array<INavbar> = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Intro',
		path: '/intro',
	},
	{
		name: 'Contact',
		path: '/contact',
	},
];

const NavBar = () => {
	const { path } = useLayoutContext();
	return (
		<div>
			{navigations.map((item, key) => (
				<span
					key={key}
					style={path === item.path ? { color: 'red' } : { color: 'black' }}
				>
					<Link to={item.path}>{item.name}</Link>
				</span>
			))}
		</div>
	);
};

export default NavBar;
