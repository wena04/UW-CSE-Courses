/*
 * CSE 351 Lab 1b (Manipulating Bits in C)
 *
 * Name(s): Anthony Wen
 * NetID(s): wena04
 *
 * ----------------------------------------------------------------------------
 * Overview
 * ----------------------------------------------------------------------------
 *  This is a program to keep track of the items in a small aisle of a store.
 *
 *  A store's aisle is represented by a 64-bit long integer, which is broken
 *  into 4 16-bit sections representing one type of item each. Note that since
 *  a section is 16-bits, it fits nicely into C's short datatype.
 *
 *  Aisle Layout:
 *
 *    Within an aisle, sections are indexed starting with the least-significant
 *    section being at index 0 and continuing up until one less than the number
 *    of sections.
 *
 *    Example aisle:
 *
 *                MSB                                                       LSB
 *                  +-------------+-------------+-------------+-------------+
 *                  |  Section 3  |  Section 2  |  Section 1  |  Section 0  |
 *                  +-------------+-------------+-------------+-------------+
 *                  |             |             |             |             |
 *      bit offset: 64            48            32            16            0
 *
 *  Section Layout:
 *
 *    A section in an aisle is broken into 2 parts. The 6 most significant bits
 *    represent a unique identifier for the type of item stored in that
 *    section. The rest of the bits in a section (10 least significant)
 *    indicate individual spaces for items in that section. For each of the 10
 *    bits/spaces, a 1 indicates that an item of the section's type is stored
 *    there and a 0 indicates that the space is empty.
 *
 *    Example aisle section: 0x651A
 *
 *                MSB                               LSB
 *                  +-----------+-------------------+
 *                  |0 1 1 0 0 1|0 1 0 0 0 1 1 0 1 0|
 *                  +-----------+-------------------+
 *                  | item id   | section spaces    |
 *      bit offset: 16          10                  0
 *
 *      In this example, the item id is 0b011001, and there are currently 4
 *      items stored in the section (at bit offsets 8, 4, 3, and 1) and 6
 *      vacant spaces.
 *
 *  Written by Porter Jones (pbjones@cs.washington.edu)
 */

#include "aisle_manager.h"
#include "store_util.h"

// the number of total bits in a section
#define SECTION_SIZE 16

// The number of bits in a section used for the item spaces
#define NUM_SPACES 10

// The number of bits in a section used for the item id
#define ID_SIZE 6

// The number of sections in an aisle
#define NUM_SECTIONS 4

// TODO: Fill in these with the correct hex values

// Mask for extracting a section from the least significant bits of an aisle.
// (aisle & SECTION_MASK) should preserve a section's worth of bits at the
// lower end of the aisle and set all other bits to 0. This is essentially
// extracting section 0 from the example aisle shown above.
#define SECTION_MASK 0xFFFF

// Mask for extracting the spaces bits from a section.
// (section & SPACES_MASK) should preserve all the spaces bits in a section and
// set all non-spaces bits to 0.
#define SPACES_MASK 0x3FF

// Mask for extracting the ID bits from a section.
// (section & ID_MASK) should preserve all the id bits in a section and set all
// non-id bits to 0.
#define ID_MASK 0xFC00


/* Given a pointer to an aisle and a section index, return the section at the
 * given index of the given aisle.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
unsigned short get_section(unsigned long* aisle, int index) {
  // TODO: implement this method
  unsigned short section = *aisle >> (SECTION_SIZE*index);
  return (unsigned short)(section & SECTION_MASK);
}

/* Given a pointer to an aisle and a section index, return the spaces of the
 * section at the given index of the given aisle. The returned short should
 * have the least 10 significant bits set to the spaces and the 6 most
 * significant bits set to 0.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
unsigned short get_spaces(unsigned long* aisle, int index) {
  // TODO: implement this method
  return (unsigned short) get_section(aisle, index) & SPACES_MASK;
}

/* Given a pointer to an aisle and a section index, return the id of the
 * section at the given index of the given aisle. The returned short should
 * have the least 6 significant bits set to the id and the 10 most significant
 * bits set to 0.
 *
 * Example: if the section is 0b0110010100011010, return 0b0000000000011001.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
unsigned short get_id(unsigned long* aisle, int index) {
  // TODO: implement this method
  unsigned short id = get_section(aisle, index) & ID_MASK;
  return (unsigned short) id >> NUM_SPACES;
}

/* Given a pointer to an aisle, a section index, and a short representing a new
 * bit pattern to be used for section, set the section at the given index of
 * the given aisle to the new bit pattern.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
void set_section(unsigned long* aisle, int index, unsigned short new_section) {
  // TODO: implement this method
  unsigned long clear_mask = ~((unsigned long) SECTION_MASK << (SECTION_SIZE * index));
  *aisle &= clear_mask;
  unsigned long aligned_section = ((unsigned long)new_section) << (SECTION_SIZE * index);
  *aisle |= aligned_section;
}

/* Given a pointer to an aisle, a section index, and a short representing a new
 * bit pattern to be used for the spaces of the section, set the spaces for the
 * section at the given index of the given aisle to the new bit pattern. The
 * new spaces pattern should be in the 10 least significant bits of the given
 * bit pattern. If the new pattern uses bits outside the 10 least significant
 * bits, then the method should leave the spaces unchanged.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
void set_spaces(unsigned long* aisle, int index, unsigned short new_spaces) {
  // TODO: implement this method
  if(new_spaces & ~SPACES_MASK){
    return;
  }
  new_spaces &= SPACES_MASK;
  unsigned short current_section = get_section(aisle, index);
  unsigned short id_bits = current_section & ID_MASK;
  unsigned short updated_section = id_bits | new_spaces;
  unsigned long clear_mask = ~((unsigned long) SECTION_MASK << (SECTION_SIZE * index));
  *aisle &= clear_mask;
  unsigned long updated_section_long = ((unsigned long)updated_section) << (SECTION_SIZE * index);
  *aisle |= updated_section_long;
}

/* Given a pointer to an aisle, a section index, and a short representing a new
 * bit pattern to be used for the id of the section, set the id for the section
 * at the given index of the given aisle to the new bit pattern. The new id
 * pattern should be in the 6 least significant bits of the given bit pattern.
 * If the new pattern uses bits outside the 6 least significant bits, then the
 * method should leave the id unchanged.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
void set_id(unsigned long* aisle, int index, unsigned short new_id) {
  // TODO: implement this method
  if (new_id & 0xFFC0){
    return;
  }
  new_id <<= NUM_SPACES;
  unsigned short current_section = get_section(aisle, index);
  unsigned short space_bits = current_section & SPACES_MASK;
  unsigned short updated_section = space_bits | new_id;
  unsigned long clear_mask = ~((unsigned long) SECTION_MASK << (SECTION_SIZE * index));
  *aisle &= clear_mask;
  unsigned long updated_section_long = ((unsigned long)updated_section) << (SECTION_SIZE * index);
  *aisle |= updated_section_long;
  
}

/* Given a pointer to an aisle, a section index, and a space index, toggle the
 * item in the given space index of the section at the given section index in
 * the given aisle. Toggling means that if the space was previously empty, it
 * should now be filled with an item, vice-versa.
 *
 * Can assume the section index is a valid index (0-3 inclusive).
 * Can assume the spaces index is a valid index (0-9 inclusive).
 */
void toggle_space(unsigned long* aisle, int index, int space_index) {
  // TODO: implement this method
  int bit_position = SECTION_SIZE * index + space_index;
  unsigned long mask = (unsigned long)1 << bit_position;
  *aisle ^= mask;
}

/* Given a pointer to an aisle and a section index, return the number of items
 * in the section at the given index of the given aisle.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
unsigned short num_items(unsigned long* aisle, int index) {
  // TODO: implement this method
  unsigned long spaces = get_spaces(aisle, index);
  unsigned short ans = 0;
  while(spaces){
    ans += spaces & 1;
    spaces >>= 1;
  }
  return ans;
}

/* Given a pointer to an aisle, a section index, and the desired number of
 * items to add, add at most the given number of items to the section at the
 * given index in the given aisle. Items should be added to the least
 * significant spaces possible. If n is larger than or equal to the number of
 * empty spaces in the section, then the section should appear full after the
 * method finishes.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
void add_items(unsigned long* aisle, int index, int n) {
  // TODO: implement this method
  unsigned short current_spaces = get_spaces(aisle, index);
  int empty_spaces = 0;
  for (int i = 0;i<NUM_SPACES;i++){
    if((current_spaces & (1 << i)) == 0) {
      empty_spaces++;
    }
  }
  int items_to_add = (n > empty_spaces) ? empty_spaces : n;
  for (int i = 0; i< items_to_add;i++){
    int bit = 0;
    while ((current_spaces & (1 << bit)) != 0){
      bit++;
    }
    current_spaces |= (1 << bit);
  }
  set_spaces(aisle, index, current_spaces);
}

/* Given a pointer to an aisle, a section index, and the desired number of
 * items to remove, remove at most the given number of items from the section
 * at the given index in the given aisle. Items should be removed from the
 * least significant spaces possible. If n is larger than or equal to the
 * number of items in the section, then the section should appear empty after
 * the method finishes.
 *
 * Can assume the index is a valid index (0-3 inclusive).
 */
void remove_items(unsigned long* aisle, int index, int n) {
  // TODO: implement this method
  unsigned short section = get_section(aisle, index);
  unsigned short space_bits = section & SPACES_MASK;
  for (int i = 0;i<NUM_SPACES && n > 0; ++i) {
    if (space_bits & (1 << i)) {
      space_bits &= ~(1<<i);
      --n;
    }
  }
  section = (section & ID_MASK) | space_bits;
  unsigned long clear_mask = ~((unsigned long) SECTION_MASK << (SECTION_SIZE * index));
  *aisle &= clear_mask;
  unsigned long updated_section_long = ((unsigned long)section) << (SECTION_SIZE * index);
  *aisle |= updated_section_long;
}

/* Given a pointer to an aisle, a section index, and a number of slots to
 * rotate by, rotate the items in the section at the given index of the given
 * aisle to the left by the given number of slots.
 *
 * Example: if the spaces are 0b0111100001, then rotating left by 2 results
 *          in the spaces     0b1110000101
 *
 * Can assume the index is a valid index (0-3 inclusive).
 * Can NOT assume n < NUM_SPACES (hint: find an equivalent rotation).
 */
void rotate_items_left(unsigned long* aisle, int index, int n) {
  // TODO: implement this method
  unsigned short current_spaces = get_spaces(aisle, index);
  n = n%NUM_SPACES;
  unsigned short bits_to_rotate = current_spaces >> (NUM_SPACES - n);
  current_spaces <<= n;
  current_spaces |= bits_to_rotate;
  current_spaces &= SPACES_MASK;
  set_spaces(aisle, index, current_spaces);
}

/* Given a pointer to an aisle, a section index, and a number of slots to
 * rotate by, rotate the items in the section at the given index of the given
 * aisle to the right by the given number of slots.
 *
 * Example: if the spaces are 0b1000011110, then rotating right by 2 results
 *          in the spaces     0b1010000111
 *
 * Can assume the index is a valid index (0-3 inclusive).
 * Can NOT assume n < NUM_SPACES (hint: find an equivalent rotation).
 */
void rotate_items_right(unsigned long* aisle, int index, int n) {
  // TODO: implement this method
  unsigned short current_spaces = get_spaces(aisle, index);
  n = n%NUM_SPACES;
  unsigned short bits_to_rotate = current_spaces << (NUM_SPACES - n);
  current_spaces >>= n;
  current_spaces |= bits_to_rotate;
  current_spaces &= SPACES_MASK;
  set_spaces(aisle, index, current_spaces);
}
