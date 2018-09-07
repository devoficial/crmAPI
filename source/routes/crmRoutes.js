import express  from  "express";
import { addNewContact,
	getAllContacts,
	getContactWithId,
	updateContact,
	deleteContact,
}  from "../controllers/crmControllers";
const router = express.Router();

router.route("/contact")
// Gettin all cotacts from the db
	.get(getAllContacts)
// Adding a new contact to the db
	.post(addNewContact);


router.route("/contact/:contactId")
// Get specific contact
	.get(getContactWithId)
// put request
	.put(updateContact)
// delete request
	.delete(deleteContact);


export default router;