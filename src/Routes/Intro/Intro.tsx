import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLayoutContext } from '../../Components/Layout/LayoutProvider';

/* eslint-disable */
const Intro: React.FC<RouteComponentProps> = ({ match: { path } }) => {
	const { handleChangePath } = useLayoutContext();
	useEffect(() => {
		handleChangePath(path);
	}, []);
	return (
		<div>
			<h1>Intro</h1>
		</div>
	);
};

export default Intro;
