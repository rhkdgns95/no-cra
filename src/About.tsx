import React, { useState, useEffect } from 'react';
// import Card from './Components/Card/Card';
// import Label from './Components/Label/Label';
import Add from './Components/Add/Add';

import('./msg' as any).then(function (module) {
  console.log(module.msg.hello);
});

interface IProps {
  name: string;
  title: string;
}
const About: React.FC<IProps> = ({
  name,
  title
}) => {
  const [appName, setAppName] = useState<string>("");
  const [appTitle, setAppTitle] = useState<string>("");
  const [firstMounted, setFirstMounted] = useState<boolean>(false);
  const [secondMounted, setSecondMounted] = useState<boolean>(false);
  
  console.log("About.tsx - firstMounted: ", firstMounted);
  console.log("About.tsx - secondMounted: ", secondMounted);

  useEffect(() => {
    setAppName("TS | " + name);
    setAppTitle("TS | " + title);
    setTimeout(() => {
      setFirstMounted(true)
    }, 2000);
    setTimeout(() => {
      setSecondMounted(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if(appTitle.length > 0) {
      window.document.title = appTitle;
    }
  }, [appTitle]);

  return (
    <>
      <h1>Hello About</h1>
      <p>{appName}</p>    
      <p>{appTitle}</p>    
      <Add />
    </>
  );
}

export default About;