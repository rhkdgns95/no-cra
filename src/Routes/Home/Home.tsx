import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLayoutContext } from '../../Components/Layout/LayoutProvider';

/* eslint-disable */
const Home: React.FC<RouteComponentProps> = ({ match: { path } }) => {
	const { handleChangePath } = useLayoutContext();

	useEffect(() => {
		handleChangePath(path);
	}, []);

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
