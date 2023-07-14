//! IMPORTS
import { promises as fs } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";

//! Path to file with contacts
const contactsPath = join("db", "contacts.json");

//! Create function for working with colections of contacts
// Function for get list of contacts
export async function listContacts() {
  try {
    const resp = await fs.readFile(contactsPath);
    const data = JSON.parse(resp);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
// Function for get contacts by id
export async function getContactById(id) {
  try {
    const resp = await fs.readFile(contactsPath);
    const data = JSON.parse(resp);
    const filtered = data.filter((item) => item.id === id);
    if (filtered.length === 0) return null;
    return filtered[0];
  } catch (err) {
    console.log(err.message);
  }
}
//Function for delete contact by id
export async function removeContact(id) {
  try {
    const resp = await fs.readFile(contactsPath);
    const data = JSON.parse(resp);

    let deletedContact = null;
    const newContactArray = [];

    data.forEach((item) => {
      if (item.id !== id) {
        newContactArray.push(item);
      } else {
        deletedContact = item;
      }
    });
    if (deletedContact === null) return null;
    await fs.writeFile(contactsPath, JSON.stringify(newContactArray));
    return deletedContact;
  } catch (err) {
    console.log(err.message);
  }
}

//Function for add new contact on contacts list
export async function addContact(name, email, phone) {
  try {
    const resp = await fs.readFile(contactsPath);
    const data = JSON.parse(resp);
    const id = nanoid(21);
    const newContact = { id, name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}
