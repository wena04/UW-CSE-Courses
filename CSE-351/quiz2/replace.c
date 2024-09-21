#include <stdio.h>

void replace(int* dest, int replacement) {
  *dest = replacement;
}

int recurse(int arr[], int arr_size, int target, int index) {
  if (index == arr_size) {
    return -1;
  } else if (arr[index] == target) {
    return index;
  } else {
    int target_index = recurse(arr, arr_size, target, index + 1);
    if (target_index != -1) {
      replace(&arr[index], target);
    }
    return target_index;
  }
}

// Replaces elements in arr with target until target is found and returns the index of where
// target was found. If the target was not found, returns -1 and leaves arr unchanged.
int replace_until_found(int arr[], int arr_size, int target) {
  return recurse(arr, arr_size, target, 0);
}

#define ARR_SIZE 10
#define TARGET 6

int main() {
  int arr[] = {2, 9, 4, 3, 1, 6, 7, 5, 8, 24};
  int index = replace_until_found(arr, ARR_SIZE, TARGET);

  printf("Replaced the first %d elements in arr with %d.\n", index, TARGET);
}

