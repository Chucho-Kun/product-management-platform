"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const colors_1 = __importDefault(require("colors"));
const port = process.env.PORT || 4000;
server_1.default.listen(port, () => {
    console.log(colors_1.default.blue.bold(`REST API en puerto ${port}`));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsb0RBQTRCO0FBRTVCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QyxnQkFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUcsR0FBRyxFQUFFO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLHNCQUF1QixJQUFLLEVBQUUsQ0FBRSxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFDLENBQUEifQ==