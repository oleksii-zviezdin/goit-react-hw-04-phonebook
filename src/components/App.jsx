// import { Component } from 'react';
import { ContactForm, ContactList, Notification, Filter } from './index'
import { nanoid } from "nanoid";
import { Container, FormTitle, ContnactsTitle } from "./App.styled";
import { useEffect, useState } from 'react';

const LS_KEY = 'contact_list';

export const App = () => {
  const initialValue = JSON.parse(localStorage.getItem(LS_KEY)) === false ? [] : JSON.parse(localStorage.getItem(LS_KEY));
  const [contacts, setContacts] = useState(initialValue);
  const [filter, setFilter] = useState('');

  const handleSubmit = (data) => {
    const contact = { ...data, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, contact]);
  }

  const removeContact = (contactId) => {
    setContacts( contacts => contacts.filter(({id}) => id !== contactId));
  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
  if (contacts?.length !== 0) {
    return contacts.filter(({ inputName }) => inputName && inputName.toLowerCase().includes(normalizedFilter));
  }
  };

  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactsFromLocalStorage) {
      setContacts(contactsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);
  
  const filteredContacts = getFilteredContacts();
  const contactsLength = contacts.length;

  return (
    <Container>
      <FormTitle>Phonebook</FormTitle>
      <ContactForm onSubmit={handleSubmit} contacts={contacts} />
      {contactsLength !== 0 && <Filter value={filter} changeFilter={changeFilter} />}
      {contactsLength === 0 && <Notification message={"This is where your added contacts will be displayed"} />}
      {contactsLength !== 0 && <>
                                <ContnactsTitle>Contacts</ContnactsTitle>
                                <ContactList contacts={filteredContacts || []} onRemoveContact={removeContact} />
      </>}
    </Container>
  );
};

/*    * * *    */
// Код з класом

// export class App extends Component {

//   state = {
//     contacts: [],
//     filter: ''
//   }


//   componentDidMount() {
//     const contactsFromlocalStorage = JSON.parse(localStorage.getItem(LS_KEY));
//     if (contactsFromlocalStorage) {
//       this.setState({
//       contacts: [...contactsFromlocalStorage],
//     });
//     }
//   }

//   componentDidUpdate() {
//     const { contacts } = this.state;
//     if (contacts.length) {
//       localStorage.setItem(LS_KEY, JSON.stringify(contacts));
//     }
//   }

//   handleSubmit = (data) => {
//     const contact = {...data};
//     contact.id = nanoid();
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   }

//   removeContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contacts => contacts.id !== contactId)
//     }));
//   }

//   changeFilter = e => {
//     this.setState({filter: e.currentTarget.value})
//   }

//   getFilteredContact = () => {
//     const {filter, contacts } = this.state;
//     const normailzedContacts = filter.toLowerCase();
//     if (contacts || contacts.length === 0) {
//       return contacts.filter(({name}) => name.toLowerCase().includes(normailzedContacts))
//     }
//   }

//   render() {
//     const { contacts, filter } = this.state;
//     const contactsLength = contacts.length;

//     const filteredContacts = this.getFilteredContact();

//     return (
//       <Container>
//         <FormTitle>Phonebook</FormTitle>
//         <ContactForm onSubmit={this.handleSubmit} contacts={contacts} />
//         {contactsLength !== 0 && <Filter value={filter} changeFilter={this.changeFilter} />}
//         {contactsLength === 0 ? <Notification message={"This is where your added contacts will be displayed"}/> : <>
//           <ContnactsTitle>Contacts</ContnactsTitle>
//           <ContactList
//             contacts={filteredContacts}
//             onRemoveContact={this.removeContact}
//           />
//         </>}
//       </Container>
//     )
//   }
// };
