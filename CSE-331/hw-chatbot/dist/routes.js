"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTranscriptsForTesting = exports.load = exports.save = exports.chat = void 0;
const words_1 = require("./words");
const patterns_1 = require("./patterns");
const chatbot_1 = require("./chatbot");
// Keep track of possible responses for when we run out of things to say.
const memory = [];
// create a new mutable map constant to store transcripts
const transcripts = new Map();
/**
 * Handles request for /chat, with a message included as a query parameter,
 * by getting the next chat response.
 */
const chat = (req, res) => {
    const msg = first(req.query.message);
    if (msg === undefined) {
        res.status(400).send('required argument "message" was missing');
        return;
    }
    const words = (0, words_1.splitWords)(msg);
    const result = (0, chatbot_1.chatResponse)(words, memory, patterns_1.PATTERNS);
    res.send({ response: (0, words_1.toString)(result) });
};
exports.chat = chat;
/** Handles request for /save by storing the given transcript. */
const save = (req, res) => {
    const name = req.body.name;
    if (name === undefined || typeof name !== "string") {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    const value = req.body.value;
    if (value === undefined) {
        res.status(400).send('required argument "value" was missing');
        return;
    }
    // TODO (5a): implement this part
    //  - store the passed in value in the map under the given name
    //  - return a record indicating whether that replaced an existing transcript
    const replaced = transcripts.has(name);
    if (value === null) {
        transcripts.set(name, "");
    }
    else {
        transcripts.set(name, value.toString());
    }
    res.send({ replaced });
};
exports.save = save;
/** Handles request for /load by returning the transcript requested. */
const load = (req, res) => {
    // TODO (5b): implement this function
    //  - chat() & save() functions may be useful examples for error checking!
    const name = first(req.query.name);
    if (name === undefined || typeof name !== "string") {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    else if (!transcripts.has(name)) {
        res.status(404).send("transcript not found");
        return;
    }
    else {
        res.send({ value: transcripts.get(name) });
    }
};
exports.load = load;
/**
 * Used in tests to set the transcripts map back to empty.
 * (exported ONLY for testing)
 */
const resetTranscriptsForTesting = () => {
    // TODO (5c): implement this function
    transcripts.clear();
};
exports.resetTranscriptsForTesting = resetTranscriptsForTesting;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param) && param.length > 0) {
        return first(param[0]);
    }
    else if (typeof param === "string") {
        return param;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBK0M7QUFDL0MseUNBQXNDO0FBQ3RDLHVDQUF5QztBQU16Qyx5RUFBeUU7QUFDekUsTUFBTSxNQUFNLEdBQWUsRUFBRSxDQUFDO0FBRTlCLHlEQUF5RDtBQUN6RCxNQUFNLFdBQVcsR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFbkU7OztHQUdHO0FBQ0ksTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNoRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUNoRSxPQUFPO0tBQ1I7SUFFRCxNQUFNLEtBQUssR0FBRyxJQUFBLGtCQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBWSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO0lBQ3JELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBQSxnQkFBUSxFQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFWVyxRQUFBLElBQUksUUFVZjtBQUVGLGlFQUFpRTtBQUMxRCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVB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