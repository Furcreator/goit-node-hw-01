import { Command } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listResult = await listContacts();
      console.table(listResult);
      break;

    case "get":
      const getByIdResult = await getContactById(id);
      console.log(getByIdResult);
      break;

    case "add":
      const addContactResult = await addContact(name, email, phone);
      console.log(addContactResult);
      break;

    case "remove":
      const removeContactResult = await removeContact(id);
      console.log(removeContactResult);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
