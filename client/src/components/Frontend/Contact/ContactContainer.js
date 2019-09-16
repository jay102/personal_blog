import React from 'react';
import { TemplateFiles } from '../../../App'
import ContactView from './ContactView'
const ContactContainer = () => {
    return (
        <TemplateFiles.Consumer>
            {value => {
                const { Contact } = value.siteData;
                let mystyle = { backgroundImage: "url(" + Contact.bg + ")" };
                return <ContactView text={Contact.text} subtitle={Contact.subtitle} mystyle={mystyle} header={Contact.header} />
            }}
        </TemplateFiles.Consumer>
    );
}

export default ContactContainer