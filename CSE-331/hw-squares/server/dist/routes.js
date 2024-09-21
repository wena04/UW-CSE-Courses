"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.names = exports.load = exports.save = void 0;
// In-memory storage for designs using Map
const fileStorage = new Map();
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === "string") {
        return param;
    }
    else {
        return undefined;
    }
};
/**
 * Save a design
 * @param req request to respond to
 * @param res object to send response with
 */
const save = (req, res) => {
    const name = first(req.body.name);
    const content = req.body.content;
    if (name === undefined || content === undefined) {
        res.status(400).send('missing "name" or "content" in parameter');
        return;
    }
    fileStorage.set(name, content);
    res.status(200).send({ saved: true });
};
exports.save = save;
/**
 * Load the last-saved content of a file with a given name
 * @param req request to respond to
 * @param res object to send response with
 */
const load = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing "name" parameter');
        return;
    }
    if (!fileStorage.has(name)) {
        res.status(404).send({ message: `File ${name} not found` });
        return;
    }
    const contents = fileStorage.get(name);
    res.status(200).send({ name: name, content: contents });
};
exports.load = load;
/**
 * List the names of all files currently saved
 * @param req request to respond to
 * @param res object to send response with
 */
const names = (_req, res) => {
    const names = Array.from(fileStorage.keys());
    res.status(200).send({ names: names });
};
exports.names = names;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSwwQ0FBMEM7QUFDMUMsTUFBTSxXQUFXLEdBQXlCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFcEQsd0VBQXdFO0FBQ3hFLDZFQUE2RTtBQUM3RSxtREFBbUQ7QUFDbkQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFjLEVBQXNCLEVBQUU7SUFDbkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNO1FBQ0wsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNoRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU87S0FDUjtJQUNELFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBVFcsUUFBQSxJQUFJLFFBU2Y7QUFFRjs7OztHQUlHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNoRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7SUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM1RCxPQUFPO0tBQ1I7SUFDRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFaVyxRQUFBLElBQUksUUFZZjtBQUVGOzs7O0dBSUc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFDLElBQWlCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFIVyxRQUFBLEtBQUssU0FHaEIifQ==