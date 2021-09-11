import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CONTACTS,
    GET_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    CONTACT_ERROR,
    
    } from '../types';

    const initialState = [];

    export const contactReducer = (state = initialState, action) => {
        switch(action.type) {
            case GET_CONTACTS:
                return {
                    ...state,
                    contacts: action.payload,
                    loading:false
                };
            case ADD_CONTACT:
                return{
                    ...state,
                    contacts: [action.payload, ...state.contacts],
                    loading:false
                };
            case UPDATE_CONTACT:
                    return {
                        ...state,
                        contacts: state.contacts.map(contact => contact._id === action.payload._id ? 
                            action.payload : contact) 
              };
            case DELETE_CONTACT:
                return {
                    ...state,
                    contacts: state.contacts.filter(
                    contact => contact._id !== action.payload)
                };
                case CLEAR_CONTACTS:
                    return {
                        ...state,
                        contacts: null,
                        filtered: null,
                        error: null,
                        current:null
                    };
            case SET_CURRENT:
                return {
                    ...state,
                    current: action.payload
                };
            case CLEAR_CURRENT:
                    return {
                        ...state,
                        current: null
                    };
            case FILTER_CONTACT:
                return {
                   ...state,
                   filtered: state.contacts.filter(contact=>{
                    const regex = new RegExp(action.payload, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                   })
              };
              case CLEAR_FILTER:
                return {
                    ...state,
                filtered: null
                };
            case CONTACT_ERROR:
                return {
                    ...state,
                    contacts: null,
                    error: action.payload
                };
                default:
                    return state;

        }
    }

    
export default contactReducer;