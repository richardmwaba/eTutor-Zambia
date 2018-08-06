"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const user_1 = require("../models/user");
describe("# Auth", () => {
    const endpoint = process.env.API_BASE + "login";
    it("should retrieve the token", () => {
        return user_1.cleanCollection().then(res => {
            return common_1.login().then(res => {
                res.status.should.equal(200);
                res.body.token.should.not.be.empty;
            });
        });
    });
    it("should not login with the right user but wrong password", () => {
        return common_1.request.post(endpoint)
            .send({ "username": "testuser", "password": "anythingGoesHere" })
            .expect(401);
    });
    it("should return invalid credentials error", () => {
        return common_1.request.post(endpoint)
            .send({ "username": "testuser", "password": "" })
            .expect(401)
            .then(res => {
            return common_1.request.post(endpoint)
                .send({ "username": "anotherusername", "password": "mypass" })
                .expect(401);
        });
    });
    it("should return token expired message", () => {
        return common_1.request.post(process.env.API_BASE + "tasks")
            .set("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTg5Mzk1MTksInVzZXJuYW1lIjoidGVzdHVzZXIifQ.FUJcVCzZTkjDr62MCJj5gvCFvmxewmz2jotiknuVbOg")
            .send({
            name: "Do the dishes"
        })
            .expect(res => res.body.message.should.equal("Your token has expired. Please generate a new one"))
            .expect(401);
    });
});
