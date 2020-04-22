import React from 'react';
import LayoutProvider from './LayoutProvider';

/* eslint-disable  */
const Layout: React.FC = ({ children }) => (
	<LayoutProvider>
		<div>{children}</div>
	</LayoutProvider>
);

export default Layout;
