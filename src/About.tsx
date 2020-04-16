import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    setAppName("TS | " + name);
    setAppTitle("TS | " + title);
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
    </>
  );
}

export default About;