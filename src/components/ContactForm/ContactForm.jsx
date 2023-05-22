import { PropTypes } from "prop-types";
import { Form, Span, AddButton, Label, Input} from "./ContactForm.styled";
import { useState } from "react";

// export const ContactForm = ({ onSubmit, contacts }) => {
//     const [inputName, setInputName] = useState('');
//     const [inputNumber, setInputNumber]= useState('')

//     const handleChange = e => {
//         const { name, value } = e.currentTarget;
//         switch (name) {
//             case 'name':
//                 setInputName(value);
//                 break;
//             case 'number':
//                 setInputNumber(value)
//                 break;
//             default:
//                 console.log(`This is ${name} is not support`);
//         }
//     }

//     const handleAddContactSumbit = e => {
//         e.preventDefault()
        
//         const isIncludeContactName = contacts.find(({ name }) => name === inputName);
//         const isIncludeContactNumber = contacts.find(({ number }) => number === inputNumber);
        
//         if (isIncludeContactName) {
//             return alert(`"${inputName}" is alredy in contacts`)
//         } else if (isIncludeContactNumber) {
//             return alert(`"${inputNumber}" is alredy in contacts`)
//         } else {
//             onSubmit({inputName, inputNumber});
//             setInputName('');
//             setInputNumber('');
//         }
// }
//         return (
//             <Form onSubmit={handleAddContactSumbit}>
//                 <Label>
//                     <Span>Name</Span>
//                     <Input
//                     onChange={handleChange}
//                     type="text"
//                     name="name"
//                     value={inputName}
//                     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                     required
//                     />
//                 </Label>
//                 <Label>
//                     <Span>Number</Span>
//                     <Input
//                     onChange={handleChange}
//                     type="tel"
//                     name="number"
//                     value={inputNumber}
//                     pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                     required
//                     />
//                 </Label>
//                 <AddButton type="submit">Add contact</AddButton>
//             </Form>
//         )
// }

// ContactForm.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         number: PropTypes.string.isRequired,
//     })).isRequired,
//     onSubmit: PropTypes.func.isRequired,
// }

export const ContactForm = ({ contacts, onSubmit }) => {
  const [inputName, setInputName] = useState('');
  const [inputNumber, setInputNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setInputName(value);
    } else if (name === 'number') {
      setInputNumber(value);
    }
  };

  const handleAddContactSubmit = (e) => {
      e.preventDefault();

    const isIncludeContactName = contacts.find(({ name }) => name === inputName);
    const isIncludeContactNumber = contacts.find(({ number }) => number === inputNumber);

    if (isIncludeContactName) {
      return alert(`"${inputName}" is already in contacts`);
    } else if (isIncludeContactNumber) {
      return alert(`"${inputNumber}" is already in contacts`);
    } else {
      onSubmit({ inputName, inputNumber });
      setInputName('');
      setInputNumber('');
    }
  };

  return (
    <Form onSubmit={handleAddContactSubmit}>
      <Label>
        <Span>Name</Span>
        <Input
          onChange={handleChange}
          type="text"
          name="name"
          value={inputName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        <Span>Number</Span>
        <Input
          onChange={handleChange}
          type="tel"
          name="number"
          value={inputNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <AddButton type="submit">Add contact</AddButton>
    </Form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
