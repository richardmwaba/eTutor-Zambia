"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
require("mocha");
const _1 = require("../models/");
const express = require("../config/express")();
exports.request = require("supertest")(express);
exports.chai = require("chai");
exports.should = exports.chai.should();
const testUser = { "username": "testuser", "password": "mytestpass" };
const createUser = () => __awaiter(this, void 0, void 0, function* () {
    const UserModel = new _1.model(testUser);
    yield UserModel.save();
});
const getUser = () => __awaiter(this, void 0, void 0, function* () {
    let users = yield _1.model.find({});
    if (users.length === 0) {
        yield createUser();
        return getUser();
    }
    else {
        return users[0];
    }
});
exports.login = () => __awaiter(this, void 0, void 0, function* () {
    let user = yield getUser();
    return exports.request.post(process.env.API_BASE + "login")
        .send({ "username": user.username, "password": testUser.password })
        .expect(200);
});
