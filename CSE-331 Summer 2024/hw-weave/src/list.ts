export type List<A> =
    | {readonly kind: "nil"}
    | {readonly kind: "cons", readonly hd: A, readonly tl: List<A>};


/** The empty list. */
export const nil: {kind: "nil"} = {kind: "nil"};

/** Returns a list with hd in front of tl. */
export const cons = <A,>(hd: A, tl: List<A>): List<A> => {
  return {kind: "cons", hd: hd, tl: tl};
};


/**
 * Returns the length of the list.
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
export const len = <A,>(L: List<A>): bigint => {
  if (L.kind === "nil") {
    return 0n;
  } else {
    return 1n + len(L.tl);
  }
};

/**
 * Determines whether the two given lists are equal, using === to compare the
 * corresponding values in the lists.
 * @param L The first list to compare
 * @param R The second list to compare
 * @returns true iff the lists have the same length and the elements at the same
 *     indexes of the two lists have values that are ===.
 */
export const equal = <A>(L: List<A>, R: List<A>): boolean => {
  if (L.kind === "nil") {
    return R.kind === "nil";
  } else if (R.kind === "nil") {
    return false;
  } else if (L.hd !== R.hd) {
    return false;
  } else {
    return equal(L.tl, R.tl);
  }
};

/**
 * Returns the a list consisting of L followed by R.
 * @param L list to go at the front of the result
 * @param R list to go at the end of the result
 * @returns A single list consisting of L's elements followed by R's
 */
export const concat = <A,>(L: List<A>, R: List<A>): List<A> => {
  if (L.kind === "nil") {
    return R;
  } else {
    return cons(L.hd, concat(L.tl, R));
  }
};

/**
 * Returns the reverse of the given list.
 * @param L list to revese
 * @returns list containing the same elements but in reverse order
 */
export const rev = <A>(L: List<A>): List<A> => {
  if (L.kind === "nil") {
    return nil;
  } else {
    return concat(rev(L.tl), cons(L.hd, nil));
  }
};

/**
 * Returns the elements of a list, packed into an array.
 * @param L the list to turn into an array
 * @returns array containing the same elements as in L in the same order
 */
export const compact_list = <A,>(L: List<A>): Array<A> => {
  if (L.kind === "nil") {
    return [];
  } else {
    return [L.hd].concat(compact_list(L.tl));  // NOTE: O(n^2)
  }
};

/**
 * Returns the elements in the given array as a list.
 * @param arr the array to turn into a list
 * @returns list containing the same elements as in arr in the same order
 */
export const explode_array = <A,>(arr: ReadonlyArray<A>): List<A> => {
  if (arr.length === 0) {
    return nil;
  } else {
    return cons(arr[0], explode_array(arr.slice(1)));  // NOTE: O(n^2)
  }
};