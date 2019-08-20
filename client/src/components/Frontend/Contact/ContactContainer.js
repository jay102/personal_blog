import React from 'react';
import { TemplateFiles } from '../../../App'
import ContactView from './ContactView'
const ContactContainer = () => {
    return (
        <TemplateFiles.Consumer>
            {value => {
                let mystyle = { backgroundImage: "url(" + value.Contact.bg + ")" };
                return <ContactView text={value.Contact.text} subtitle={value.Contact.subtitle} mystyle={mystyle} header={value.Contact.header} />
            }}
        </TemplateFiles.Consumer>
    );
}

export default ContactContainer