"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const port = 8088;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/api/list", routes_1.listEvents);
app.get("/api/ranked", routes_1.listRankedEvents);
app.post("/api/add", routes_1.addEvent);
app.post("/api/reserve", routes_1.reserveTickets);
app.get("/api/get", routes_1.getEventDetails);
app.listen(port, () => console.log(`Server listening on ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBMkM7QUFDM0MsOERBQXFDO0FBQ3JDLHFDQU1rQjtBQUVsQixNQUFNLElBQUksR0FBVyxJQUFJLENBQUM7QUFDMUIsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsbUJBQVUsQ0FBQyxDQUFDO0FBQ2pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHlCQUFnQixDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQVEsQ0FBQyxDQUFDO0FBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHVCQUFjLENBQUMsQ0FBQztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSx3QkFBZSxDQUFDLENBQUM7QUFFckMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDIn0=