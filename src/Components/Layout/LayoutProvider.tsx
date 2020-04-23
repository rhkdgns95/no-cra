import React, { useContext, useState } from 'react';

/* eslint-disable */

interface IContext {
	path: string;
	handleChangePath: (path: string) => void;
}

const InitContext: IContext = {
	path: '',
	handleChangePath: () => {},
};

const LayoutContext: React.Context<IContext> = React.createContext(InitContext);

const useLayoutContext = () => useContext<IContext>(LayoutContext);

const useFetch = (): { value: IContext } => {
	const [path, setPath] = useState<string>('');

	const handleChangePath = (newPath: string) => {
		console.log('newPath: ', newPath);
		setPath(newPath);
	};

	return {
		value: {
			path,
			handleChangePath,
		},
	};
};

const LayoutProvider: React.FC = ({ children }) => {
	return (
		<LayoutContext.Provider {...useFetch()}>{children}</LayoutContext.Provider>
	);
};

export { useLayoutContext };
export default LayoutProvider;
