import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from  './contactContext';
import contactReducer from  './contactReducer';

import {
ADD_CONTACT,
GET_CONTACTS,
CLEAR_CONTACTS,
DELETE_CONTACT,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CONTACT,
FILTER_CONTACT,
CLEAR_FILTER,
SET_ALERT,
REMOVE_ALERT,
CONTACT_ERROR

} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered:null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

//Get Contact
const getContacts = async () => {
  try {
    const res = await axios.get('/api/contacts');
 
    dispatch({ 
      type: GET_CONTACTS, 
      payload: res.data
     });
  } catch (error) {
   dispatch({ 
     type: CONTACT_ERROR, 
     payload: error.status
    });
  }
 };

//Add Contact
const addContact = async contact => {
 const config = {
   headers: {
     'Content-Type':'application/json'
   }
 }

 try {
   const res = await axios.post('/api/contacts', contact, config);

   dispatch({ 
     type: ADD_CONTACT, 
     payload: res.data
    });
 } catch (error) {
  dispatch({ 
    type: CONTACT_ERROR, 
    payload: error.response.msg
   });
 }
};

//Delete Contact
const deleteContact = async id => {
  try {
    await axios.delete('/api/contacts/'+id);
 
    dispatch({ 
      type: DELETE_CONTACT, 
      payload: id
     });
  } catch (error) {
   dispatch({ 
     type: CONTACT_ERROR, 
     payload: error.response.msg
    });
  }
  };

  //Update Contact
const updateContact = async contact => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }
 
  try {
    const res = await axios.put('/api/contacts/'+contact._id, contact, config);
 
    dispatch({ 
      type: UPDATE_CONTACT, 
      payload: res.data
     });
  } catch (error) {
   dispatch({ 
     type: CONTACT_ERROR, 
     payload: error.response.msg
    });
  }
};

  //Clear contacts
  const clearContacts = contact => {
    dispatch({ type: CLEAR_CONTACTS });
  };

//Set Current Contact
const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact});
  };

//Clear Current Contact
const clearCurrent = contact => {
    dispatch({ type: CLEAR_CURRENT });
  };


//Filter Contacts
const filterContacts = text => {
    dispatch({ type: FILTER_CONTACT, payload: text});
  };
//Clear Filter
const clearFilter = contact => {
    dispatch({ type: CLEAR_FILTER });
  };

return (
    <ContactContext.Provider
    value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts
    }}
    >
        {props.children}
    </ContactContext.Provider>
)

};

export default ContactState;
