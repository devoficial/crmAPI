import { User } from "../../../../source/controllers/userControllers";

// Require the dev dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../../app";
import { beforeEach } from "mocha";
const should = chai.should();

chai.use(chaiHttp);


describe("User",function(){
	beforeEach(function(done) {
		User.deleteMany({}, () =>{
			done();
		});
	});
	/**
 * Test the Register route
 */
	context("/POST a new user", function() {
		it("should be able to register a new user",function(done){
			let newUser  = {
				"name":"debasis",
				"email":"someone@email.com",
				"password":"password"
			};
			chai.request(server)
				.post("/auth/register")
				.send(newUser)
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					done(err);
				});
		});
	});
});