import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Home from './Routes/Home';
import Contact from './Routes/Contact';
import Intro from './Routes/Intro';
import NavBar from './Components/NavBar';

const AppGlobalStyles = createGlobalStyle`
	div {
		color: blue !important;
	}
`;

const App: React.FC<void> = () => {
	return (
		<ThemeProvider theme={{}}>
			<AppGlobalStyles />
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/intro" component={Intro} />
					<Route path="/contact" component={Contact} />
					<Redirect to="/" from="*" />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
