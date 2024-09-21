import { List, cons, nil } from "./list";

/** Returns the last element in the given list. */
export const last = <A>(L: List<A>): A => {
  if (L.kind === "nil") {
    throw new Error("empty list has no last element");
  } else if (L.tl.kind === "nil") {
    return L.hd;
  } else {
    return last(L.tl);
  }
};

/** Returns the prefix consisting of the
 * first n elements of L. */
export const prefix = <A>(n: bigint, L: List<A>): List<A> => {
  if (n === 0n) {
    return nil;
  } else if (L.kind === "nil") {
    throw new Error("list is too short");
  } else {
    return cons(L.hd, prefix(n - 1n, L.tl));
  }
};

/** Returns the suffix consisting of the elements of L after the first n. */
export const suffix = <A>(n: bigint, L: List<A>): List<A> => {
  if (n === 0n) {
    return L;
  } else if (L.kind === "nil") {
    throw new Error("list is too short");
  } else {
    return suffix(n - 1n, L.tl);
  }
};
