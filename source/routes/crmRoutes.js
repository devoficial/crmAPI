import express  from  "express";
import { addNewContact,
	getAllContacts,
	getContactWithId,
	updateContact,
	deleteContact,
}  from "../controllers/crmControllers";
import { loginRequired } from "../controllers/userControllers";

const router = express.Router();



router.route("/contact")
// Gettin all cotacts from the db
	.get(loginRequired,getAllContacts)
// Adding a new contact to the db
	.post(loginRequired,addNewContact);


router.route("/contact/:contactId")
// Get specific contact
	.get(loginRequired,getContactWithId)
// put request
	.put(loginRequired,updateContact)
// delete request
	.delete(loginRequired,deleteContact);



export default router;