import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { clearFilter, filterContacts, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const text = useRef('');

    // if text is not empty
    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type="text"
                placeholder="Filter Contacts..."
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
