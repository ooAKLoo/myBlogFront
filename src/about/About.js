import React, { useRef } from 'react';
import SectionAboutMe from './SectionAboutMe';
import SectionContactMe from './SectionContactMe';

const About = () => {
    const sectionRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);


    

    return (
        <>
            <SectionAboutMe  />
            <SectionContactMe />
        </>
    );
};

export default About;
