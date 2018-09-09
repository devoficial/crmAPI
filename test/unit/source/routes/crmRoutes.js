import { Contact } from "../../../../source/controllers/crmControllers";

// Require the dev dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../app";
import { beforeEach } from "mocha";

const should = chai.should();

chai.use(chaiHttp);


describe("Contact",function(){
	beforeEach(function(done) {
		Contact.deleteMany({}, () =>{
			done();
		});
	});
	/**
     * Get route for all conatcts
     */
	context("/Get all contacts", function() {
		it("should be able return all the contacts",function(done){
			chai.request(server)
				.get("/api/contact")
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("array");
					res.body.length.should.be.eql(0);
					done(err);
				});
		});
	});
	/*
  * Test the /POST route
  */
	context("/POST contact", function() {
		it("It should not POST a contact without phone field",function(done){
			let contact = {
				firstName:"dev",
				lastName:"nath"
			};
			chai.request(server)
				.post("/api/contact")
				.send(contact)
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("errors");
					res.body.errors.should.have.property("phone");
					res.body.errors.phone.should.have.property("kind").eql("required");
					done(err);
				});
		});

		it("It should POST a contact",(done) => {
			let contact = {
				firstName:"dev",
				lastName:"nath",
				email:"hello@gmail.com",
				company:"xyz",
				phone:456736273
			};
			chai.request(server)
				.post("/api/contact")
				.send(contact)
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("message").eql("the contact has been added succesfully");
					res.body.contact.should.have.property("firstName");
					res.body.contact.should.have.property("lastName");
					res.body.contact.should.have.property("email");
					res.body.contact.should.have.property("company");
					res.body.contact.should.have.property("phone");
					done(err);
				});
		});
	});
	/*
  * Test the /GET/:id route
  */
	context("/GET/:id get a contact", function() {
		it("should be able return a contact for the id",function(done){
			let contact =  new Contact({
				firstName:"dev",
				lastName:"nath",
				email:"hello@gmail.com",
				company:"xyz",
				phone:456736273
			});

			contact.save(function(err, contact){
				chai.request(server)
					.get("/api/contact/" + contact.id)
					.send(contact)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("firstName");
						res.body.should.have.property("lastName");
						res.body.should.have.property("email");
						res.body.should.have.property("company");
						res.body.should.have.property("phone");
						res.body.should.have.property("_id").eql(contact.id);
						done(err);
					});
			});
		});
	});
	/*
  * Test the /PUT/:id route
  */
	context("/PUT/:id get a contact", function() {
		it("should be able update a contact for the id",function(done){
			let contact =  new Contact({
				firstName:"dev",
				lastName:"nath",
				email:"hello@gmail.com",
				company:"xyz",
				phone:456736273
			});

			contact.save(function(err, contact){
				chai.request(server)
					.put("/api/contact/" + contact.id)
					.send({
						firstName:"dev",
						lastName:"nath",
						email:"hello@gmail.com",
						company:"xyz",
						phone:7977955808
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("phone").eql(7977955808);
						done(err);
					});
			});
		});
	});
	/*
  * Test the /DELETE/:id route
  */
	context("/DELETE/:id delete a contact", function() {
		it("should be able DELETE a contact for the id",function(done){
			let contact =  new Contact({
				firstName:"dev",
				lastName:"nath",
				email:"hello@gmail.com",
				company:"xyz",
				phone:456736273
			});

			contact.save(function(err, contact){
				chai.request(server)
					.delete("/api/contact/" + contact.id)
					.end((err, res) => {
						// console.log(res.body);
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("message").eql("The contact has been deleted");
						done(err);
					});
			});
		});
	});
});