import { List, cons, rev, concat, len, nil } from "./list";
import { prefix, suffix } from "./list_ops";
import { compact, explode } from "./char_list";

/** Determines whether the given character is a vowel. */
const is_latin_vowel = (c: number): boolean => {
  const ch = String.fromCharCode(c).toLowerCase();
  return "aeiouy".indexOf(ch) >= 0;
};

/** Determines whether the given character is a Latin consonant. */
const is_latin_consonant = (c: number): boolean => {
  const ch = String.fromCharCode(c).toLowerCase();
  return "bcdfghjklmnpqrstvwxz".indexOf(ch) >= 0;
};

/**
 * Returns the character code for the uppercase (capitalized) version of the given
 * character code. The given character code must be a Latin vowel or consonant.
 */
const to_upper_case = (c: number): number => {
  if (!(is_latin_vowel(c) || is_latin_consonant(c))) {
    throw new Error("invalid char code, c must be a Latin vowel or consonant");
  }

  return String.fromCharCode(c).toUpperCase().charCodeAt(0);
};

/**
 * Returns the character code for the lowercase version of the given character
 * code. The given character code must be a Latin vowel or consonant.
 */
const to_lower_case = (c: number): number => {
  if (!(is_latin_vowel(c) || is_latin_consonant(c))) {
    throw new Error("invalid char code, c must be a Latin vowel or consonant");
  }

  return String.fromCharCode(c).toLowerCase().charCodeAt(0);
};

/** Changes most Latin alphabetic characters to different ones. */
export const next_latin_char = (c: number): number => {
  switch (String.fromCharCode(c)) {
    case "a":
      return "i".charCodeAt(0);
    case "e":
      return "y".charCodeAt(0);
    case "i":
      return "u".charCodeAt(0);
    case "o":
      return "a".charCodeAt(0);
    case "u":
      return "o".charCodeAt(0);
    case "y":
      return "e".charCodeAt(0);

    case "b":
      return "t".charCodeAt(0);
    case "p":
      return "g".charCodeAt(0);
    case "j":
      return "d".charCodeAt(0);
    case "g":
      return "j".charCodeAt(0);
    case "d":
      return "b".charCodeAt(0);
    case "t":
      return "p".charCodeAt(0);

    case "c":
      return "z".charCodeAt(0);
    case "k":
      return "c".charCodeAt(0);
    case "s":
      return "k".charCodeAt(0);
    case "z":
      return "s".charCodeAt(0);

    case "f":
      return "w".charCodeAt(0);
    case "v":
      return "f".charCodeAt(0);
    case "w":
      return "v".charCodeAt(0);

    case "h":
      return "r".charCodeAt(0);
    case "l":
      return "h".charCodeAt(0);
    case "r":
      return "l".charCodeAt(0);

    case "m":
      return "n".charCodeAt(0);
    case "n":
      return "m".charCodeAt(0);

    case "q":
      return "x".charCodeAt(0);
    case "x":
      return "q".charCodeAt(0);

    default:
      return c;
  }
};

/** Inverse of next_latin_char. */
export const prev_latin_char = (c: number): number => {
  switch (String.fromCharCode(c)) {
    case "a":
      return "o".charCodeAt(0);
    case "e":
      return "y".charCodeAt(0);
    case "i":
      return "a".charCodeAt(0);
    case "o":
      return "u".charCodeAt(0);
    case "u":
      return "i".charCodeAt(0);
    case "y":
      return "e".charCodeAt(0);

    case "b":
      return "d".charCodeAt(0);
    case "p":
      return "t".charCodeAt(0);
    case "j":
      return "g".charCodeAt(0);
    case "g":
      return "p".charCodeAt(0);
    case "d":
      return "j".charCodeAt(0);
    case "t":
      return "b".charCodeAt(0);

    case "c":
      return "k".charCodeAt(0);
    case "k":
      return "s".charCodeAt(0);
    case "s":
      return "z".charCodeAt(0);
    case "z":
      return "c".charCodeAt(0);

    case "f":
      return "v".charCodeAt(0);
    case "v":
      return "w".charCodeAt(0);
    case "w":
      return "f".charCodeAt(0);

    case "h":
      return "l".charCodeAt(0);
    case "l":
      return "r".charCodeAt(0);
    case "r":
      return "h".charCodeAt(0);

    case "m":
      return "n".charCodeAt(0);
    case "n":
      return "m".charCodeAt(0);

    case "q":
      return "x".charCodeAt(0);
    case "x":
      return "q".charCodeAt(0);

    default:
      return c;
  }
};

/**
 * Returns the number of consonants at the start of the given string
 * before the first vowel, or -1 if there are no vowels.
 */
export const count_consonants = (L: List<number>): bigint => {
  if (L.kind === "nil") {
    return -1n;
  } else if (is_latin_vowel(L.hd)) {
    return 0n;
  } else if (is_latin_consonant(L.hd)) {
    const n = count_consonants(L.tl);
    if (n === -1n) {
      return -1n;
    } else {
      return n + 1n;
    }
  } else {
    // not a vowel or a consonant
    return -1n;
  }
};

// TODO: add your function declarations in this file for:
// cipher_encode, cipher_decode crazy_caps_encode, crazy_caps_decode,
// and worm_latin_encode

/** Returns returns a list of the same length but with each character replaced by the ‘next’ Latin characte */
export const cipher_encode = (L: List<number>): List<number> => {
  if (L.kind === "nil") {
    return L;
  } else {
    return cons(next_latin_char(L.hd), cipher_encode(L.tl));
  }
};

/** Returns a list of the same length but with each character replaced by the ‘previous’ Latin character */
export const cipher_decode = (L: List<number>): List<number> => {
  if (L.kind === "nil") {
    return L;
  } else {
    return cons(prev_latin_char(L.hd), cipher_decode(L.tl));
  }
};

/** Returns a list of the same length but with every three characters, starting with the third, made upper case */
export const crazy_caps_encode = (L: List<number>): List<number> => {
  if (L.kind === "nil") {
    return L;
  } else if (L.tl.kind === "nil") {
    return L;
  } else if (L.tl.tl.kind === "nil") {
    return L;
  } else {
    return cons(
      L.hd,
      cons(
        L.tl.hd,
        cons(to_upper_case(L.tl.tl.hd), crazy_caps_encode(L.tl.tl.tl))
      )
    );
  }
};

/** Returns a list of the same length but with every three character, starting with the second, made lower case */
export const crazy_caps_decode = (L: List<number>): List<number> => {
  if (L.kind === "nil") {
    return L;
  } else if (L.tl.kind === "nil") {
    return L;
  } else if (L.tl.tl.kind === "nil") {
    return L;
  } else {
    return cons(
      L.hd,
      cons(
        L.tl.hd,
        cons(to_lower_case(L.tl.tl.hd), crazy_caps_decode(L.tl.tl.tl))
      )
    );
  }
};

// * Remember to add /** jsdoc */ comments above each function! The contents
//   won't be graded, but a brief description is appropriate (see the above
//   functions for an example)

/** Returns the Worm Latin translation of the given word. */
export const worm_latin_encode = (L: List<number>): List<number> => {
  if (compact(L) === "bird") {
    return nil;
  } else if (count_consonants(L) === -1n) {
    return L;
  } else if (count_consonants(L) === 0n && L.kind !== "nil") {
    return cons(
      "w".charCodeAt(0),
      cons(L.hd, concat(explode("orm"), suffix(1n, L)))
    );
  } else {
    const cc = count_consonants(L);
    return concat(suffix(cc, L), concat(prefix(cc, L), explode("orm")));
  }
};

/** Returns the (probable) original word from its Worm Latin translation. */
export const worm_latin_decode = (L: List<number>): List<number> => {
  // Early bird got the worm, the bird is back for more.
  if (L.kind === "nil") {
    return explode("bird");

    // Q6 EC: Why do we need this?
  } else if (len(L) < 5) {
    return L;
  } else {
    const R: List<number> = rev(L);
    const P: List<number> = prefix(len(L) - 3n, L);
    const n: bigint = count_consonants(suffix(3n, R));

    // w is the first consonant with a vowel after and ends in "orm"
    if (
      count_consonants(L) === 1n &&
      L.hd === "w".charCodeAt(0) &&
      L.tl.kind !== "nil" &&
      compact(suffix(2n, prefix(5n, L))) === "orm"
    ) {
      // Note: we know that L.tl != nil because of cc >= 1
      return cons(L.tl.hd, suffix(5n, L));

      // Starts with a vowel and has consonants before "orm" at the end
    } else if (
      count_consonants(L) === 0n &&
      n > 0 &&
      compact(prefix(3n, R)) === "mro"
    ) {
      const m = len(P) - n;
      return concat(suffix(m, P), prefix(m, P));

      // Does not start with "w" or no vowel comes after or no "orm" after the vowel
      // AND
      // Does not start with a vowel or does not have consonants before "orm"
    } else {
      return L;
    }
  }
};
