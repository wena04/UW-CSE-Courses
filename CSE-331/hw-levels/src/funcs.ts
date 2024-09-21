// Problem 4: translate each math definition below its comment

/** Implements the function "r" from Problem 4. 
 * The following rules define r : {n : N, m : N} → Z, which has a record as input and an integer as output:
funcr({n:0, m:m}) r({n:n+1, m:0})
r({n:n+1, m:m+1})
:=1 foranym:N :=−1 foranyn:N :=0 foranyn,m:N
Note that these rules are exclusive (and exhaustive)! The first rule applies in any case when the “n” field is 0, regardless of the “m” field, the second rule applies only if the “n” field of the record is not 0 and the “m” field is 0, and the last case applies to cases when both are not 0.
*/

export const r = ({ n, m }: { n: bigint; m: bigint }): bigint => {
  if (n === 0n) {
    return 1n;
  } else if (n > 0n && m === 0n) {
    return -1n;
  } else if (n > 0n && m > 0n) {
    return 0n;
  } else {
    throw new Error("input must be big int and less than 0");
  }
};

/** Implements the function "s" from Problem 4. */
/*The following rules define s : (B × N) ∪ B → N, whose input is either a tuple containing a boolean and a non-negative integer or a boolean and whose output is a non-negative integer:
func s(b) := 0 for any b : B s((T,n)) :=n foranyn:N s((F,n)) :=s((T,n+1)) foranyn:N */

export const s = (input: [boolean, bigint] | boolean): bigint => {
  if (typeof input === "boolean") {
    return 0n;
  } else {
    const [b, n] = input;

    if (b) {
      return n;
    } else {
      return s([true, n + 1n]);
    }
  }
};
/** Implements the function "t" from Problem 4. */
/*The following rules define t : (B × {n : Z, m : Z}) → Z, which has a tuple as input (with its second part being a record) and an integer as output:
funct((T,{n:n, m:m})) :=n∗m foranym,n:Z t((F,{n:n, m:m})) :=n−2m foranym,n:Z */

export const t = ([b, { n, m }]: [
  boolean,
  { n: bigint; m: bigint }
]): bigint => {
  if (b) {
    return n * m;
  } else {
    return n - 2n * m;
  }
};

// Problem 7: translate your mathematical definition to code
/** Implements the function "fact" from Problem 7. */
export const fact = (n: bigint): bigint => {
  if (n === 0n) {
    return 1n;
  } else {
    //directly did else statement since problem did not say to worry about checking for negative numbers passed in
    return fact(n - 1n) * n;
  }
};
