import React from 'react';
import { Helmet } from 'react-helmet';

const Intro: React.FC = () => {
	return (
		<div>
			<Helmet>
				<title>Intro</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap"
					rel="stylesheet"
				/>
				<meta name="description" content="Helmet Intro application" />
				<style>{`
		* { 
			font-size: 22px;
		}
	`}</style>
			</Helmet>
			<h1>Intro Styles</h1>
		</div>
	);
};

export default Intro;
