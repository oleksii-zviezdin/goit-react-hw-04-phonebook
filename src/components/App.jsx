// import { Component } from 'react';
import { ContactForm, ContactList, Notification, Filter } from './index'
import { nanoid } from "nanoid";
import { Container, FormTitle, ContnactsTitle } from "./App.styled";
import { useEffect, useState } from 'react';

const LS_KEY = 'contact_list';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleSubmit = (data) => {
    const contact = { ...data, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, contact]);
  }

  const removeContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
  if (normalizedFilter && contacts.length !== 0) {
    return contacts.filter(({ name }) => name && name.toLowerCase().includes(normalizedFilter));
  }
  };

  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactsFromLocalStorage) {
      setContacts(contactsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    contacts && localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(() => {
  //   if (contacts.length) {
  //     localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  //   }
  // }, [contacts]);
  
  const filteredContacts = getFilteredContacts();
  const contactsLength = contacts.length;
  console.log(contactsLength)
  console.log(`its filter: ${filteredContacts}`)

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

// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const contactsFromlocalStorage = JSON.parse(localStorage.getItem(LS_KEY));
//     if (contactsFromlocalStorage) {
//       setContacts([...contactsFromlocalStorage])
//     }
//   },[])
  
//   useEffect(() => {
//       localStorage.setItem(LS_KEY, JSON.stringify(contacts));

//   },[contacts])

//   const handleSubmit = (data) => {
//     const contact = { ...data };
//     contact.id = nanoid();
//     setContacts(prevState => ([...prevState, contact]))
//   }

//   const removeContact = contactId => {
//     setContacts(prevState =>  prevState.filter(contacts => contacts.id !== contactId))
//   }

//   const changeFilter = e => {
//     setFilter(e.currentTarget.value)
//   }

//   const getFilteredContact = () => {
//     const normailzedContacts = filter.toLowerCase();
//     if (contacts.length !== 0) {
//       return contacts.filter(({name}) => name.toLowerCase().includes(normailzedContacts))
//     } else {
//       return [];
//     }
//   }
//   const contactsLength = contacts.length;
//   console.log(getFilteredContact())

//     return (
//     <Container>
//       <FormTitle>Phonebook</FormTitle>
//       <ContactForm onSubmit={handleSubmit} contacts={contacts} />
//       {contactsLength !== 0 && <Filter value={filter} changeFilter={changeFilter} />}
//       {contactsLength === 0 && <Notification message={"This is where your added contacts will be displayed"} />}
//       {contactsLength !== 0 && <>
//                                 <ContnactsTitle>Contacts</ContnactsTitle>
//                                 <ContactList contacts={getFilteredContact () || []} onRemoveContact={removeContact} />
//                               </>}
//     </Container>
//   );
// };

/*    * * *    */

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
