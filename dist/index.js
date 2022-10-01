"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Crawler_1 = require("./Crawler");
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors({ origin: process.env.REMOTE_CLIENT_APP }));
const port = process.env.PORT || 8080;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let answer = {
        status: 'success'
    };
    try {
        const url = new URL(req.query.queryURL);
        if (url.hostname !== 'mandat.dtm.uz')
            throw "Host name forbidden";
        const score = yield (0, Crawler_1.getScore)(req.query.queryURL);
        score ? answer.score = score : answer.status = 'failed';
        res.send(answer);
    }
    catch (error) {
        res.status(403).send();
        res.end();
        return;
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
