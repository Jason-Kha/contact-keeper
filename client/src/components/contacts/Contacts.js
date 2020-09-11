import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    // get access to actions associated with ContactContext
    const contactContext = useContext(ContactContext);

    // pull contacts and filtered out from context
    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map((contact) => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map((contact) => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};
export default Contacts;
