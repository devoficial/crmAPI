import  chai from "chai";
chai.should();
import { UserSchema } from "../../../../source/models/userModel";
import  bcrypt from  "bcrypt";

describe("Password compare", function() {
	context("compare the original password with hashed password", function(){
		it("should return true", function(){
			const password = "imdev2018";
			const hasedPassword  =  bcrypt.hashSync(password,10);

			UserSchema.methods.comparePassword(password,hasedPassword)
				.should.equal(true);
		});

		it("should return false for a wrong password", function(){
			const password = "imdev2018";
			const hasedPassword  =  bcrypt.hashSync(password,10);

			UserSchema.methods.comparePassword("hello",hasedPassword)
				.should.equal(false);
		});
	});
});