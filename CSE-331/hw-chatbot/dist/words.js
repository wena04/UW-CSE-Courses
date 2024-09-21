"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.wordsContain = exports.splitWords = exports.replaceWords = exports.substitute = void 0;
const assoc_1 = require("./assoc");
const DEBUG = true; // turn this to 'false' later if you want to prevent
// the CheckInv functions from executing. For this project you don't need to change it
// to false, but in a bigger program we might want to turn it off after debugging is
// complete, to avoid running expensive invariant checks when the project is released.
/** TODO (1a): write the specification
 * Substitutes each word in the given array with its value in the given association list.
 * @param {string[]} words - the initial array of strings where some words may be replaced.
 * @param {AssocList<string>} reps - An association list containing pairs of words where the
 *                        first element is the word to be replaced and the second element
 *                          is the replacement word.
 * @modifies words
 * @effects words = substitute(words,reps)
 * @returns {void} - This function mutates the `words` array in-place, replacing words
 *                   according to the given association list.
 *
 * The function iterates through the `words` array, checking each word against the
 * association list. If a word is found in the list, it is replaced by the corresponding
 * value. Otherwise, it remains unchanged. The invariant maintained is:
 * words = substitute(words_0[0 .. j-1]) ++ words_0[j .. n-1]
 *
 * where words_0 is the initial array and n is the length of words.
 */
const substitute = (words, reps) => {
    let j = 0;
    const n = words.length;
    // Inv: words = substitute(words_0[0 .. j-1]) ++ words_0[j .. n-1]
    while (j !== n) {
        // TODO (1b): Fill in loop body according to above invariant
        if ((0, assoc_1.contains_key)(words[j], reps)) {
            words[j] = (0, assoc_1.get_value)(words[j], reps);
        }
        j += 1;
    }
};
exports.substitute = substitute;
/**
 * Returns the array of words that results when each of the words in the given
 * map is replaced by its value, which can be multiple words.
 * @param words initial array of words
 * @param replacements map from strings to their replacements
 * @returns concat(replace(words, replacement))
 *     where replace([], M) = []
 *           replace(L ++ [w], M) = replace(L, M) ++ [get-value(w, M)] if contains-key(w, M)
 *           replace(L ++ [w], M) = replace(L, M) ++ [[w]] if !contains-key(w, M)
 *     where concat([]) = []
 *           concat(L ++ [[]]) = concat(L)
 *           concat(L ++ [S ++ [w]]) = concat(L ++ [S]) ++ [w]
 */
const replaceWords = (words, replacements) => {
    const replaced = [];
    let i = 0;
    // Inv: replaced[0..i-1] = replace(words[0..i-1], replacements) and
    //      replaced[i..n-1] is unchanged
    while (i !== words.length) {
        if ((0, assoc_1.contains_key)(words[i], replacements)) {
            const val = (0, assoc_1.get_value)(words[i], replacements);
            replaced.push(val);
        }
        else {
            replaced.push([words[i]]);
        }
        i = i + 1;
    }
    const result = [];
    let j = 0;
    // Inv: result = concat(replaced[0..j-1])
    while (j !== replaced.length) {
        const L = replaced[j];
        let k = 0;
        // Inv: result = concat(replaced[0..j-1]) @ L[0..k-1]
        while (k !== L.length) {
            result.push(L[k]);
            k = k + 1;
        }
        j = j + 1;
    }
    return result;
};
exports.replaceWords = replaceWords;
// String containing all punctuation characters.
const PUNCT = ",.?;:!";
// Determines whether ch is a punctuation character.
const isPunct = (ch) => {
    if (ch.length !== 1)
        throw new Error(`expecting a single character not "${ch}"`);
    return PUNCT.indexOf(ch) >= 0;
};
/**
 * Breaks the given string into a sequence of words, separated by spaces or
 * punctuation. Spaces are not included in the result. Punctuation is included
 * as its own word.
 * @param str the string in question
 * @return an array of strings words such that
 *     1. join(words) = del-spaces(str), i.e., the concatenation of all the
 *        words is str but with all whitespace removed
 *     2. adjacent letters in the original string are in the same word
 *     3. no word includes any whitespace
 *     4. each word is either a single punctuation character or 1+ letters
 */
const splitWords = (str) => {
    let splits = [0]; // TODO (part 3a): fix this
    let j = 0; // TODO (part 3a): fix this
    CheckInv1(splits, str, j);
    // Inv: 1. 0 = splits[0] < splits[1] < ... < splits[n-1] = j
    //      2. for i = 0 .. n-1, if splits[i+1] - splits[i] > 1, then
    //         str[splits[i] ..  splits[i+1]-1] is all letters
    //      3. for i = 1 .. n-2, splits[i] is not between two letters
    //  where n = splits.length
    while (j !== str.length) {
        // TODO (part 3a): fix this loop condition
        // TODO (part 3a): implement loop body here
        if (j !== 0) {
            splits.pop();
            if (isPunct(str.charAt(j)) || str.charAt(j) === " ") {
                splits.push(j);
            }
            else if (isPunct(str.charAt(j - 1)) || str.charAt(j - 1) === " ") {
                splits.push(j);
            }
        }
        j = j + 1;
        splits.push(j);
        CheckInv1(splits, str, j);
    }
    let words = [];
    let i = 0;
    CheckInv2(words, splits, str, i);
    // Inv: 1. join(words) = del-space(s[0..splits[i]-1]))
    //      2. no element of words contains any whitespace
    while (i + 1 !== splits.length) {
        if (str[splits[i]] !== " ")
            words.push(str.substring(splits[i], splits[i + 1]));
        i = i + 1;
        CheckInv2(words, splits, str, i);
    }
    // Post: join(words) = del-space(str), each punctuation is its own word,
    //       adjacent letters are in the same word, and no word has spaces
    return words;
};
exports.splitWords = splitWords;
// Verify that the invariant from the first loop of splitWords holds.
const CheckInv1 = (splits, str, j) => {
    if (!DEBUG)
        return; // skip this
    if (splits.length === 0 || splits[0] !== 0)
        throw new Error("splits should start with 0");
    if (splits[splits.length - 1] !== j)
        throw new Error(`splits should end with the string's length ${j}`);
    const n = splits.length;
    let i = 0;
    // Inv: checked the invariant for splits[0 .. i-1]
    while (i < n) {
        // Part 1:
        if (splits[i + 1] - splits[i] <= 0)
            throw new Error(`should have at least 1 char between splits at ${splits[i]} and ${splits[i + 1]}`);
        // Part 2:
        if (splits[i + 1] - splits[i] > 1) {
            const w = str.substring(splits[i], splits[i + 1]);
            let j = 0;
            // Inv: w[0 .. j-1] is all letters
            while (j < w.length) {
                if (w[j] === " " || isPunct(w[j])) {
                    throw new Error(`space/punct "${w[j]}" is in a part with other characters`);
                }
                j = j + 1;
            }
        }
        // Part 3:
        if (i > 0 && i < n - 1) {
            const c1 = str[splits[i] - 1];
            const c2 = str[splits[i]];
            if (c1 !== " " && !isPunct(c1) && c2 !== " " && !isPunct(c2))
                throw new Error(`split at ${splits[i]} is between two letters "${c1}" and "${c2}"`);
        }
        i = i + 1;
    }
};
// Verify that the invariant from the second loop of splitWords holds.
const CheckInv2 = (words, splits, str, i) => {
    if (!DEBUG)
        return; // skip this
    const s1 = words.join("");
    if (s1.indexOf(" ") >= 0)
        throw new Error(`words contains space characters: "${s1}"`);
    let s2 = str.slice(0, splits[i]);
    // Inv: s2 = str[0..splits[i]-1] with some spaces removed
    while (s2.indexOf(" ") >= 0)
        s2 = s2.replace(" ", "");
    if (s1 !== s2)
        throw new Error(`words do not match the string (minus spaces): "${s1}" vs "${s2}"`);
};
/**
 * Finds where the words of "sub" appear as a sub-array within "all".
 * @param all full list of words
 * @param sub non-empty list of words to search for in all
 * @returns an index j <= all.length - sub.length such that
 *     lower(all[j+i]) = lower(sub[i]) for i = 0 .. sub.length - 1
 *     or -1 if none exists
 */
const wordsContain = (all, sub) => {
    if (sub.length === 0)
        throw new Error("second list of words cannot be empty");
    if (all.length < sub.length)
        return -1; // not enough words to contain sub
    let k = -1;
    // Inv: no index 0 <= j <= k such that
    //      lower(all[j+i]) = lower(sub[i]) for i = 0 .. sub.length-1
    while (k + sub.length !== all.length) {
        k = k + 1;
        let m = 0;
        // Inv: outer Inv and lower(all[k+i]) = lower(sub[i]) for i = 0 .. m-1
        while (m !== sub.length &&
            all[k + m].toLowerCase() === sub[m].toLowerCase()) {
            m = m + 1;
        }
        if (m === sub.length) {
            // all[k+i] = sub[i] for i = 0 .. sub.length-1
            return k; // j = k matches
        }
    }
    // Post: no index 0 <= j <= all.length - sub.length such that
    //       all[j+i] = sub[i] for i = 0 .. sub.length-1
    return -1;
};
exports.wordsContain = wordsContain;
/**
 * Returns a string containing all of the given words, in the same order, but
 * with spaces before each (non-punctuation) word other than the first.
 * @param words list of words (no spaces, punctuation as its own words)
 * @return to-string(words), where
 *     to-string([]) = []
 *     to-string([w]) = w
 *     to-string(L @ [v, w]) =
 *         to-string(L @ [v]) + w        if w is punctuation
 *         to-string(L @ [v]) + " " + w  if w is not punctuation
 */
const toString = (words) => {
    if (words.length === 0) {
        return "";
    }
    else if (words.length == 1) {
        return words[0];
    }
    else {
        const w = words[words.length - 1];
        if (w.length === 1 && isPunct(w)) {
            const rest = (0, exports.toString)(words.slice(0, words.length - 1));
            return rest + w;
        }
        else {
            const rest = (0, exports.toString)(words.slice(0, words.length - 1));
            return rest + " " + w;
        }
    }
};
exports.toString = toString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQTZEO0FBRTdELE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG9EQUFvRDtBQUNqRixzRkFBc0Y7QUFDdEYsb0ZBQW9GO0FBQ3BGLHNGQUFzRjtBQUV0Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSSxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWUsRUFBRSxJQUF1QixFQUFRLEVBQUU7SUFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN2QixrRUFBa0U7SUFDbEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2QsNERBQTREO1FBQzVELElBQUksSUFBQSxvQkFBWSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUNELENBQUMsSUFBSSxDQUFDLENBQUM7S0FDUjtBQUNILENBQUMsQ0FBQztBQVhXLFFBQUEsVUFBVSxjQVdyQjtBQUVGOzs7Ozs7Ozs7Ozs7R0FZRztBQUNJLE1BQU0sWUFBWSxHQUFHLENBQzFCLEtBQTRCLEVBQzVCLFlBQWlDLEVBQ3ZCLEVBQUU7SUFDWixNQUFNLFFBQVEsR0FBNEIsRUFBRSxDQUFDO0lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVWLG1FQUFtRTtJQUNuRSxxQ0FBcUM7SUFDckMsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUN6QixJQUFJLElBQUEsb0JBQVksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBUyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQjtRQUNELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVYseUNBQXlDO0lBQ3pDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDNUIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLHFEQUFxRDtRQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDWDtRQUNELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFuQ1csUUFBQSxZQUFZLGdCQW1DdkI7QUFFRixnREFBZ0Q7QUFDaEQsTUFBTSxLQUFLLEdBQVcsUUFBUSxDQUFDO0FBRS9CLG9EQUFvRDtBQUNwRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQVUsRUFBVyxFQUFFO0lBQ3RDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFOUQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7R0FXRztBQUNJLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBVyxFQUFZLEVBQUU7SUFDbEQsSUFBSSxNQUFNLEdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtJQUN2RCxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7SUFFOUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFMUIsNERBQTREO0lBQzVELGlFQUFpRTtJQUNqRSwwREFBMEQ7SUFDMUQsaUVBQWlFO0lBQ2pFLDJCQUEyQjtJQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLDBDQUEwQztRQUMxQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1NBQ0Y7UUFDRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMzQjtJQUVELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFVixTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFakMsc0RBQXNEO0lBQ3RELHNEQUFzRDtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUM5QixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7SUFFRCx3RUFBd0U7SUFDeEUsc0VBQXNFO0lBQ3RFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBNUNXLFFBQUEsVUFBVSxjQTRDckI7QUFFRixxRUFBcUU7QUFDckUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFnQixFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQVEsRUFBRTtJQUNuRSxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sQ0FBQyxZQUFZO0lBRWhDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1Ysa0RBQWtEO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNaLFVBQVU7UUFDVixJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDYixpREFBaUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUN4RCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDZCxFQUFFLENBQ0gsQ0FBQztRQUVKLFVBQVU7UUFDVixJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1Ysa0NBQWtDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsc0NBQXNDLENBQzNELENBQUM7aUJBQ0g7Z0JBRUQsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDWDtTQUNGO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzFELE1BQU0sSUFBSSxLQUFLLENBQ2IsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixFQUFFLFVBQVUsRUFBRSxHQUFHLENBQ25FLENBQUM7U0FDTDtRQUVELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7QUFDSCxDQUFDLENBQUM7QUFFRixzRUFBc0U7QUFDdEUsTUFBTSxTQUFTLEdBQUcsQ0FDaEIsS0FBZSxFQUNmLE1BQWdCLEVBQ2hCLEdBQVcsRUFDWCxDQUFTLEVBQ0gsRUFBRTtJQUNSLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxDQUFDLFlBQVk7SUFFaEMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTlELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLHlEQUF5RDtJQUN6RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV0RCxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDYixrREFBa0QsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUNuRSxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNJLE1BQU0sWUFBWSxHQUFHLENBQzFCLEdBQTBCLEVBQzFCLEdBQTBCLEVBQ2xCLEVBQUU7SUFDVixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM5RSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU07UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0lBRTFFLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQyxDQUFDO0lBRW5CLHNDQUFzQztJQUN0QyxpRUFBaUU7SUFDakUsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ3BDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLHNFQUFzRTtRQUN0RSxPQUNFLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTTtZQUNoQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFDakQ7WUFDQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNwQiw4Q0FBOEM7WUFDOUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7U0FDM0I7S0FDRjtJQUVELDZEQUE2RDtJQUM3RCxvREFBb0Q7SUFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQztBQWpDVyxRQUFBLFlBQVksZ0JBaUN2QjtBQUVGOzs7Ozs7Ozs7O0dBVUc7QUFDSSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQTRCLEVBQVUsRUFBRTtJQUMvRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzVCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO1NBQU07UUFDTCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNqQjthQUFNO1lBQ0wsTUFBTSxJQUFJLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFmVyxRQUFBLFFBQVEsWUFlbkIifQ==