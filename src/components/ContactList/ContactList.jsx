import { PropTypes } from "prop-types";
import { ContactListItem } from "../index";
import { ContnactsList } from "./ContactList.styled";

export const ContactList = ({ contacts, onRemoveContact }) => {  
        return (
            <ContnactsList>
                {contacts.map(({inputName, id, inputNumber}) => {
                    return (
                        <ContactListItem
                            key={id}
                            id={id}
                            name={inputName}
                            tel={inputNumber}
                            onRemoveContact={onRemoveContact}
                        />
                )})}
            </ContnactsList>
        )
}

ContactList.propTypes = {
    // contacts: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
        inputName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        inputNumber: PropTypes.string.isRequired,
    }).isRequired),
    onRemoveContact: PropTypes.func.isRequired,
}