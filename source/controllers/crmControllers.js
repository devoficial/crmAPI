import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

// for testing
export const Contact = mongoose.model("Contact",ContactSchema);

export const addNewContact = (req,res) => {
	let newContact = new Contact(req.body);

	newContact.save()
		.then((contact) => {
			res.json({message:"the contact has been added succesfully",
				contact});
		})
		.catch((err) => {
			res.send(err);
		});
};

export const getAllContacts = (req,res) => {
	Contact.find({})
		.then((contacts) => {
			res.json(contacts);
		})
		.catch((err) => {
			res.send(`There is nothig in the collection: ${err}`);
		});
};

export const getContactWithId = (req,res) => {
	Contact.findById(req.params.contactId)
		.then((contact) => {
			res.json(contact);
		})
		.catch((err) => {
			res.send(`There is nothig in the collection: ${err}`);
		});
};

export const updateContact = (req,res) => {
	Contact.findOneAndUpdate({_id:req.params.contactId},req.body,{new :true})
		.then((contact) => {
			res.json(contact);
		})
		.catch((err) => {
			res.send(`There is nothig in the collection: ${err}`);
		});
};

export const deleteContact = (req,res) => {
	Contact.findOneAndDelete({_id:req.params.contactId})
		.then(() => {
			res.json({
				"message":"The contact has been deleted"
			});
		})
		.catch((err) => {
			res.send(`There is nothig in the collection: ${err}`);
		});
};
