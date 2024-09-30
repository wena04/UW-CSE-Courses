import express, { Express } from "express";
import bodyParser from "body-parser";
import {
  listEvents,
  addEvent,
  reserveTickets,
  getEventDetails,
  listRankedEvents,
} from "./routes";

const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());

app.get("/api/list", listEvents);
app.get("/api/ranked", listRankedEvents);
app.post("/api/add", addEvent);
app.post("/api/reserve", reserveTickets);
app.get("/api/get", getEventDetails);

app.listen(port, () => console.log(`Server listening on ${port}`));
