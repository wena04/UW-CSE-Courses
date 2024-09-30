"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assemble = exports.applyPattern = exports.matchPattern = exports.chatResponse = exports.clearLastUsedForTesting = exports.getInLastUsedForTesting = void 0;
const words_1 = require("./words");
const list_1 = require("./list");
//import { AssocList, contains_key, get_value } from './assoc';
//import { explode_array, nil, cons } from './list';
// TODO (4a): for every instance of "TODO: update" in this file, replace the
// following line with a call to LastUsed.X, where X is a method of the built-in
// TS map with the same behavior
// TODO (4a): update and document
//let LastUsed: AssocList<string> = nil;
let LastUsed = new Map();
/**
 * Gets the value for the given key in LastUsed
 * (exported ONLY for testing)
 * @param key to get the corresponding value of in LastUsed map, must be in map
 * @returns value paired with key in LastUsed map
 */
const getInLastUsedForTesting = (key) => {
    // TODO: update
    return LastUsed.get(key);
};
exports.getInLastUsedForTesting = getInLastUsedForTesting;
/**
 * Clears LastUsed for testing
 * (exported ONLY for testing)
 */
const clearLastUsedForTesting = () => {
    // TODO: update
    LastUsed.clear();
};
exports.clearLastUsedForTesting = clearLastUsedForTesting;
// List of replacements to make in the input words.
const INPUT_REPLACEMENTS = (0, list_1.explode_array)([
    ["dont", ["don't"]],
    ["cant", ["can't"]],
    ["wont", ["won't"]],
    ["recollect", ["remember"]],
    ["dreamt", ["dreamed"]],
    ["dreams", ["dream"]],
    ["maybe", ["perhaps"]],
    ["how", ["what"]],
    ["when", ["what"]],
    ["certainly", ["yes"]],
    ["machine", ["computer"]],
    ["computers", ["computer"]],
    ["were", ["was"]],
    ["you're", ["you", "are"]],
    ["i'm", ["i", "am"]],
    ["same", ["alike"]],
]);
// List of replacements to make in the output words.
const OUTPUT_REPLACEMENTS = (0, list_1.explode_array)([
    ["am", ["are"]],
    ["your", ["my"]],
    ["me", ["you"]],
    ["myself", ["yourself"]],
    ["yourself", ["myself"]],
    ["i", ["you"]],
    ["you", ["I"]],
    ["my", ["your"]],
    ["i'm", ["you", "are"]],
]);
// Pattern to use if nothing above matches.
const DEFAULT_PATTERN = {
    name: ".none",
    contains: [],
    responses: [
        ["I'm", "not", "sure", "I", "understand", "you", "fully", "."],
        ["Please", "go", "on", "."],
        ["What", "does", "that", "suggest", "to", "you", "?"],
        [
            "Do",
            "you",
            "feel",
            "strongly",
            "about",
            "discussing",
            "such",
            "things",
            "?",
        ],
    ],
};
/**
 * Returns the next response from the chatbot.
 * @param words words in the user's message
 * @param memory
 * @param patterns set of word patterns to use
 * @modifies memory
 * @returns words of the response
 */
const chatResponse = (words, memory, patterns) => {
    // Start by making the substitutions listed above.
    words = (0, words_1.replaceWords)(words, INPUT_REPLACEMENTS);
    // Try the patterns in the order they appear. Use the first* that matches.
    // Use the next unused response for the matching pattern.
    // * The one exception to this is "my", which is instead pushed to memory.
    for (const pat of patterns) {
        const args = (0, exports.matchPattern)(words, pat.contains);
        if (args !== undefined) {
            const out_args = [];
            for (const arg of args)
                out_args.push((0, words_1.replaceWords)(arg, OUTPUT_REPLACEMENTS));
            const result = (0, exports.applyPattern)(pat, out_args);
            if (pat.name === "my") {
                memory.push(result);
            }
            else {
                return result;
            }
        }
    }
    // If we have something saved to memory, then pop and return it. Otherwise,
    // we just make up a default response.
    const result = memory.pop();
    if (result !== undefined) {
        return result;
    }
    else {
        return (0, exports.applyPattern)(DEFAULT_PATTERN, []);
    }
};
exports.chatResponse = chatResponse;
/**
 * Returns the arguments from the given words if those words match the given
 * pattern and undefined if not. (See WordPattern above for more info.)
 * @param words words to check against the pattern
 * @param contains list of 1, 2, or 3 sequences of words to look for (in order)
 * @returns the text before, between, and after the required words of the
 *     pattern if they appear and undefined if not
 */
const matchPattern = (words, contains) => {
    if (contains.length < 1 || 3 < contains.length)
        throw new Error(`${contains.length} required word sequences not allowed`);
    const index1 = (0, words_1.wordsContain)(words, contains[0]);
    if (index1 < 0)
        return undefined;
    const arg1 = words.slice(0, index1);
    const words2 = words.slice(index1 + contains[0].length);
    if (contains.length === 1)
        return [arg1, words2];
    const index2 = (0, words_1.wordsContain)(words2, contains[1]);
    if (index2 < 0)
        return undefined;
    const arg2 = words2.slice(0, index2);
    const words3 = words2.slice(index2 + contains[1].length);
    if (contains.length === 2)
        return [arg1, arg2, words3];
    const index3 = (0, words_1.wordsContain)(words3, contains[2]);
    if (index3 < 0)
        return undefined;
    const arg3 = words3.slice(0, index3);
    const words4 = words3.slice(index3 + contains[2].length);
    return [arg1, arg2, arg3, words4];
};
exports.matchPattern = matchPattern;
/**
 * Returns the next response applied to the given pattern
 * @param pat pattern that matches
 * @param args arguments from matching the pattern
 * @modifies LastUsed
 * @effects changes the entry for this pattern in LastUsed to indicate which
 *    response was used
 * @returns result of substituting the arguments into the next unused response
 */
const applyPattern = (pat, args) => {
    let result = [];
    // TODO: update
    if (LastUsed.has(pat.name)) {
        // TODO: update
        const last = LastUsed.get(pat.name);
        const next = (parseInt(String(last)) + 1) % pat.responses.length;
        result = (0, exports.assemble)(pat.responses[next], args);
        // TODO: update
        LastUsed.set(pat.name, next.toString());
    }
    else {
        result = (0, exports.assemble)(pat.responses[0], args);
        // TODO: update
        LastUsed.set(pat.name, "0");
    }
    return result;
};
exports.applyPattern = applyPattern;
/**
 * Returns the result of substituting, for each number in parts, the argument at
 * the corresponding index of args.
 * @param parts mix of words and numbers that indicate arguments to substitute
 * @param args values to substitute for numbers in parts
 * @returns sub(parts, args), where
 *     sub([], args) = []
 *     sub(L @ [w], args) = sub(L) @ [w]         if w is a word
 *     sub(L @ [n], args) = sub(L) @ args[n]     if n is a number
 */
const assemble = (parts, args) => {
    const words = [];
    let j = 0;
    // Inv: words = sub(parts[0..j-1], args)
    while (j != parts.length) {
        const part = parts[j];
        if (typeof part === "number") {
            if (part < 0 || args.length <= part)
                throw new Error(`no argument for part ${part} (only ${parts.length} args)`);
            for (const word of args[part])
                words.push(word);
        }
        else {
            words.push(part);
        }
        j = j + 1;
    }
    return words;
};
exports.assemble = assemble;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Ym90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFxRDtBQUdyRCxpQ0FBdUM7QUFFdkMsK0RBQStEO0FBQy9ELG9EQUFvRDtBQUVwRCw0RUFBNEU7QUFDNUUsZ0ZBQWdGO0FBQ2hGLGdDQUFnQztBQUVoQyxpQ0FBaUM7QUFDakMsd0NBQXdDO0FBQ3hDLElBQUksUUFBUSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTlDOzs7OztHQUtHO0FBQ0ksTUFBTSx1QkFBdUIsR0FBRyxDQUFDLEdBQVcsRUFBVyxFQUFFO0lBQzlELGVBQWU7SUFDZixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBSFcsUUFBQSx1QkFBdUIsMkJBR2xDO0FBRUY7OztHQUdHO0FBQ0ksTUFBTSx1QkFBdUIsR0FBRyxHQUFTLEVBQUU7SUFDaEQsZUFBZTtJQUNmLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFIVyxRQUFBLHVCQUF1QiwyQkFHbEM7QUFFRixtREFBbUQ7QUFDbkQsTUFBTSxrQkFBa0IsR0FBd0IsSUFBQSxvQkFBYSxFQUFDO0lBQzVELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxLQUFLLEVB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