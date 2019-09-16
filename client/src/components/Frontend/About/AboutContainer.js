import React from 'react';
import { TemplateFiles } from '../../../App'
import AboutView from './AboutView'
const AboutContainer = () => {
    return (
        <TemplateFiles.Consumer>
            {value => {
                const { About } = value.siteData;
                let style = {
                    backgroundImage: "url(" + About.bg + ")"
                }
                return <AboutView Title={About.header} subTitle={About.subtitle} bg={style} text={About.text} />
            }}
        </TemplateFiles.Consumer>
    );
}



export default AboutContainer