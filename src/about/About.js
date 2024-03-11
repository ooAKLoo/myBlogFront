import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionAboutMe from './SectionAboutMe';
import SectionContactMe from './SectionContactMe';


const About = ({ setLanguage }) => {

    const { lang } = useParams();

  useEffect(() => {
    if (lang) setLanguage(lang);
  }, [lang, setLanguage]);


    return (
        <>
            <SectionAboutMe  />
            <SectionContactMe />
        </>
    );
};

export default About;
