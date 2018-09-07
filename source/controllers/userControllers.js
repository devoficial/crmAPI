import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";


const User = mongoose.model("User",UserSchema);

export const register = (req, res) => {
	const newUser = new User(req.body);
	newUser.hashPassword = bcrypt.hashSync(req.body.password,10);
	newUser.save()
		.then((user) => {
			user.hashPassword = undefined;
			res.json(user);
		})
		.catch((err) => {
			res.status(400).json({
				message:err
			});
		});
};

export const login = (req, res) => {
	User.findOne({
		email:req.body.email,
	})
		.then((user) => {
			if(!user){
				return res.status(401).json({
					message:"Authentication failed, No user found"
				});
			} else if(user){
				if(!user.comparePassword(req.body.password , user.hashPassword)){
					return res.status(401).json({
						message:"Authentication failed, password incorrect"
					});
				}else{
					return res.json({token:
                        jwt.sign({email:user.email,	name:user.name,_id:user.id
                        },"RESTFULAPIs")
					});
				}
			}
		})
		.catch((err) => {
			if(err) throw err;
		});
};

export const loginRequired = (req, res, next) => {
	if(req.user){
		next();
	}else{
		return  res.status(401).json({
			message:"Unauthorized user"
		});
	}
};