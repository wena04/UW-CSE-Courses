/*
 * CSE 351 Lab 5 (Dynamic Storage Allocator)
 * Extra credit: Implementing mm_realloc
 *
 * Name(s): Anthony Wen, Tim Avilov
 * NetID(s): wena04, timchick
 *
 * NOTES:
 *  - This requires mm_malloc and mm_free to be working correctly, so don't
 *    start on this until you finish mm.c.
 *  - Only the traces that start with 'realloc' actually call this function,
 *    so make sure you actually test your code on these traces!
 *  - This file does not need to be submitted if you did not attempt it.
 */
#include "mm.c"


/*
 * EXTRA CREDIT:
 * Change the size of the memory block pointed to by ptr to size bytes while
 * preserving the existing data in range. If a new block is allocated during
 * this process, make sure to free the old block.
 *  - if ptr is NULL, equivalent to malloc(size)
 *  - if size is 0, equivalent to free(size)
 */
void* mm_realloc(void* ptr, size_t size) {
  // TODO: Implement mm_realloc.
  if (ptr == NULL) {
        // If ptr is NULL, realloc should behave like malloc.
        return mm_malloc(size);
    }

    if (size == 0) {
        // If size is 0, realloc should behave like free.
        mm_free(ptr);
        return NULL;
    }

    // Calculate the block's header and size.
    block_info* block_to_realloc = (block_info*) UNSCALED_POINTER_SUB(ptr, WORD_SIZE);
    size_t old_size = SIZE(block_to_realloc->size_and_tags);
    size_t new_size = ALIGNMENT * ((size + WORD_SIZE + ALIGNMENT - 1) / ALIGNMENT);

    // If the new size is smaller or equal to the old size, return the same block.
    if (new_size <= old_size) {
        return ptr;
    }

    // Check if the following block is free and if we can expand into it.
    block_info* following_block = (block_info*) UNSCALED_POINTER_ADD(block_to_realloc, old_size);
    if (!(following_block->size_and_tags & TAG_USED)) {
        size_t following_size = SIZE(following_block->size_and_tags);
        if (old_size + following_size >= new_size) {
            remove_free_block(following_block);
            block_to_realloc->size_and_tags = new_size | (block_to_realloc->size_and_tags & TAG_PRECEDING_USED);
            block_info* extra_free_block = (block_info*) UNSCALED_POINTER_ADD(block_to_realloc, new_size);
            extra_free_block->size_and_tags = (old_size + following_size - new_size) | TAG_PRECEDING_USED;
            insert_free_block(extra_free_block);
            return ptr;
        }
    }

    // If we can't expand in place, allocate a new block.
    void* new_ptr = mm_malloc(size);
    if (new_ptr == NULL) {
        return NULL;
    }

    // Copy the old data to the new block and free the old block.
    memcpy(new_ptr, ptr, old_size - WORD_SIZE); // Copy only the data, not the header.
    mm_free(ptr);
    return new_ptr;
}
