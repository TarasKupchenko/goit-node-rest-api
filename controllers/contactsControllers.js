import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(HttpError(500, "Internal Server Error"));
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsService.getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      next(HttpError(404, "Not found"));
    }
  } catch (error) {
    next(HttpError(500, "Internal Server Error"));
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactsService.removeContact(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      next(HttpError(404, "Not found"));
    }
  } catch (error) {
    next(HttpError(500, "Internal Server Error"));
  }
};

export const createContact = [
  validateBody(contactsSchema), // Assuming you have a schema defined in contactsSchemas.js
  async (req, res, next) => {
    const { name, email, phone } = req.body;
    try {
      const newContact = await contactsService.addContact(name, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      next(HttpError(500, "Internal Server Error"));
    }
  },
];

export const updateContact = [
  validateBody(contactsSchema), // Assuming you have a schema defined in contactsSchemas.js
  async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
      const updatedContact = await contactsService.updateContact(id, {
        name,
        email,
        phone,
      });
      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        next(HttpError(404, "Not found"));
      }
    } catch (error) {
      next(HttpError(500, "Internal Server Error"));
    }
  },
];
