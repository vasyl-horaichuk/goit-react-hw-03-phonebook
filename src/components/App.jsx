import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactFrom';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title } from './Title/Title';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Vasyl Horaichuk', number: '459-12-57' },
      { id: 'id-3', name: 'Rosie Simpson', number: '459-12-58' },
      { id: 'id-4', name: 'Rosie Simpson', number: '459-12-59' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.some(
      i =>
        (i.name.toLowerCase() === contact.name.toLowerCase() &&
          i.number === contact.number) ||
        i.number === contact.number
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidUpdate(prevProp, prevState) {
    // prevState.contacts;
    // this.state.contacts;
    if (prevState.contacts !== this.state.contacts) {
      console.log('UPDATE!!! CONTACTS CHANGE');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilterInput = e => {
    this.setState({ filter: e.target.value });
  };

  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <Title title="Phonebook" />
        <ContactForm onSubmit={this.addContact} />
        <Title title="Contacts" />
        <ContactList
          items={this.findContacts()}
          onDelete={this.deleteContact}
        />
        <Filter
          filter={this.state.filter}
          changeFilterInput={this.changeFilterInput}
        />
      </div>
    );
  }
}
