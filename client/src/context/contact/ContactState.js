import React, { useReducer } from "react";
import uuid from 'uuid';
import ContactContext from  './contactContext';
import contactReducer from  './contactReducer';

import {
ADD_CONTACT,
DELETE_CONTACT,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CONTACT,
FILTER_CONTACT,
CLEAR_FILTER,
SET_ALERT,
REMOVE_ALERT

} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                type: "personal",
                id: 1,
                name: "Harry Black",
                email: "harryb@gmail.com",
                phone: "111-7777-333-444"
               
            },
            {
                type: "personal",
                id: 2,
                name: "Mrs. Pummy Pool",
                email: "ppummy@gmail.com",
                phone: "111-222-333-444"
              
            },
            {
                type: "professional",
                id: 3,
                name: "Mr. Abraham Dickson",
                email: "adickson@gmail.com",
                phone: "08030896698"
             
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

//Add Contact

//Delete Contact

//Set Current Contact

//Clear Current Contact

//Update Contact

//Filter Contacts

//Clear Filter

return (
    <ContactContext.Provider
    value={{
        contacts: state.contacts
    }}
    >
        {props.children}
    </ContactContext.Provider>
)

};

export default ContactState;
