import React from 'react';
import ReactDOM from 'react-dom';
import About from './About';
import "./index.css";
console.log("PUBLIC_URL: ", process.env.PUBLIC_URL);
ReactDOM.render(<About name="About_name" title="About_title" />, document.getElementById('root'))