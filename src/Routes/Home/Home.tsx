import React from 'react';
import { Helmet } from 'react-helmet';
import './home.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// import HomeStyles from '../../Styles/HomeStyles';

interface IHead {
	title: string;
}

const Head: React.FC<IHead> = ({ title }) => {
	const sessionId: string = window.sessionStorage.getItem('x-jwt') || '';
	console.log('sessionId: ', sessionId);
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content="Helmet Home application" />
			<style>{`
			* {
				font-weight: bold;
			}`}</style>
			{/* <script>{`
			alert("hi");`}
			</script> */}
		</Helmet>
	);
};

const HomeGlobalStyles = createGlobalStyle`
	div {
		color: green;
	}
`;

/* eslint-disable */
const Home = () => {
	return (
		<ThemeProvider theme={{}}>
			<HomeGlobalStyles />
			{/* <HomeStyles /> */}
			<Head title="home" />
			<div>
				<h1>Home Styles</h1>
			</div>
		</ThemeProvider>
	);
};

export default Home;
