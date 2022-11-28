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
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../service/user"));
/**
 * @description ADD USER
 */
router.post("/register", [
    (0, express_validator_1.body)("name", "Name is required").notEmpty(),
    (0, express_validator_1.body)("address", "Address is required").notEmpty(),
    (0, express_validator_1.body)("city", "Please enter your City").notEmpty(),
    (0, express_validator_1.body)("state", "Please enter your State").notEmpty(),
    (0, express_validator_1.body)("email", "Please enter your valid Email").isEmail(),
    (0, express_validator_1.body)("phone", "Enter valid Phone No.").isLength({ min: 10, max: 10 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    try {
        // const { name, address, city, state, email, phone } = req.body;
        const { data } = yield user_1.default.registerUser(req.body);
        return res.json(data);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
router.get("/", [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield user_1.default.getAllUsers();
        return res.json(data);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.default = router;
