import React from 'react';
import { TemplateFiles } from '../../../App'
import AboutView from './AboutView'
const AboutContainer = () => {
    return (
        <TemplateFiles.Consumer>
            {value => {
                let style = {
                    backgroundImage: "url(" + value.About.bg + ")"
                }
                return <AboutView Title={value.About.header} subTitle={value.About.subtitle} bg={style} />
            }}
        </TemplateFiles.Consumer>
    );
}



export default AboutContainer