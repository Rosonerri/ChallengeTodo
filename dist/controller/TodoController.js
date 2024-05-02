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
exports.getAllCombine = exports.getAll = exports.moveProgressToDone = exports.moveTodoToProgress = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const createTask = yield todoModel_1.default.create({ title: title });
        return res.status(201).json({
            message: "Todo task Created Successfully",
            data: createTask,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Error Creating Task",
            data: error.message
        });
    }
});
exports.createTodo = createTodo;
const moveTodoToProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
        const find = yield todoModel_1.default.findByIdAndUpdate(Id, { progress: true }, { new: true });
        return res.status(201).json({
            message: "Task Found",
            data: find,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding Task",
        });
    }
});
exports.moveTodoToProgress = moveTodoToProgress;
const moveProgressToDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
        const findTask = yield todoModel_1.default.findById(Id);
        if (findTask === null || findTask === void 0 ? void 0 : findTask.progress) {
            const createTask = yield todoModel_1.default.findByIdAndUpdate(Id, { done: true }, { new: true });
            return res.status(201).json({
                message: "Todo Task created succesfully",
                data: createTask,
            });
        }
        else {
            return res.status(404).json({
                message: "Task must have started first...!",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Creating new Todo",
        });
    }
});
exports.moveProgressToDone = moveProgressToDone;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTask = yield todoModel_1.default.find();
        return res.status(201).json({
            message: "Todo task created successfully",
            data: getTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating new Todo",
        });
    }
});
exports.getAll = getAll;
const getAllCombine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTask = yield todoModel_1.default.find();
        const getAllTask = getTask.filter((el) => {
            return el.progress === false && el.done === false;
        });
        const getAllProgress = getTask.filter((el) => {
            return el.progress === true && el.done === false;
        });
        const getAllDone = getTask.filter((el) => {
            return el.progress === true && el.done === true;
        });
        let data = {
            task: getAllTask,
            progress: getAllProgress,
            done: getAllDone,
        };
        return res.status(200).json({
            message: "Todo task gotten successfully",
            data: data,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating new Todo",
        });
    }
});
exports.getAllCombine = getAllCombine;
// export const getAllCombine = async (req: Request, res: Response) => {
//   try {
//     const getTask = await todoModel.find();
//     const getAllTask  = getTask.filter((el: iProps) =>{
//         return el.progress === false && el.done === false;
//     })
//   } catch (error) {}
// };
