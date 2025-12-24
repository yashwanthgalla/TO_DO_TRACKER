export const PROBLEMS = {
  1: {
    id: 1,
    day: 1,
    title: 'Reverse Array',
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    description: 'Given an array of integers, reverse the array in-place.\n\nReturn the reversed array.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'The array is reversed in-place.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 1000',
      '-1000 <= nums[i] <= 1000'
    ],
    testCases: [
      { input: [1, 2, 3, 4, 5], output: [5, 4, 3, 2, 1] },
      { input: [1, 2], output: [2, 1] },
      { input: [1], output: [1] }
    ],
    starterCode: {
      java: 'public class Solution {\n    public int[] reverseArray(int[] nums) {\n        // Your code here\n        return nums;\n    }\n}',
      python: 'def reverse_array(nums):\n    # Your code here\n    return nums',
      c: '#include <stdio.h>\n\n// Return a newly allocated reversed array and set returnSize\nint* reverse_array(int* nums, int numsSize, int* returnSize) {\n    // Your code here\n    *returnSize = numsSize;\n    return nums;\n}'
    }
  },
  2: {
    id: 2,
    day: 2,
    title: 'Rotate Array by K',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers'],
    description: 'Given an array, rotate it to the right by k steps.\n\nExample: [1,2,3,4,5] rotated by 2 becomes [4,5,1,2,3]',
    examples: [
      {
        input: 'nums = [1,2,3,4,5], k = 2',
        output: '[4,5,1,2,3]',
        explanation: 'Rotate right by 2 positions.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '0 <= k <= 10^5'
    ],
    testCases: [
      { input: { nums: [1, 2, 3, 4, 5], k: 2 }, output: [4, 5, 1, 2, 3] },
      { input: { nums: [1, 2], k: 1 }, output: [2, 1] }
    ],
    starterCode: {
      java: 'public class Solution {\n    public void rotate(int[] nums, int k) {\n        // Your code here\n    }\n}',
      python: 'def rotate(nums, k):\n    # Your code here\n    pass',
      c: '#include <stdio.h>\n\nvoid rotate(int* nums, int numsSize, int k) {\n    // Your code here\n}'
    }
  },
  3: {
    id: 3,
    day: 3,
    title: 'Binary Search',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Array'],
    description: 'Given a sorted array and a target value, return the index if target is found. If not, return -1.',
    examples: [
      {
        input: 'nums = [1,2,3,4,5], target = 3',
        output: '2',
        explanation: 'Target 3 is at index 2.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      'Array is sorted in ascending order'
    ],
    testCases: [
      { input: { nums: [1, 2, 3, 4, 5], target: 3 }, output: 2 },
      { input: { nums: [1, 2, 3, 4, 5], target: 6 }, output: -1 }
    ],
    starterCode: {
      java: 'public class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}',
      python: 'def search(nums, target):\n    # Your code here\n    return -1',
      c: '#include <stdio.h>\n\nint search(int* nums, int numsSize, int target) {\n    // Your code here\n    return -1;\n}'
    }
  },
  4: {
    id: 4,
    day: 4,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: 'After removing non-alphanumeric: "amanaplanacanalpanama" which is a palindrome.'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters'
    ],
    testCases: [
      { input: 'A man, a plan, a canal: Panama', output: true },
      { input: 'race a car', output: false }
    ],
    starterCode: {
      java: 'public class Solution {\n    public boolean isPalindrome(String s) {\n        // Your code here\n        return false;\n    }\n}',
      python: 'def is_palindrome(s):\n    # Your code here\n    return False',
      c: '#include <stdio.h>\n#include <stdbool.h>\n\nbool is_palindrome(const char* s) {\n    // Your code here\n    return false;\n}'
    }
  },
  5: {
    id: 5,
    day: 5,
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers and a target, return indices of the two numbers that add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      'Each input has exactly one solution'
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] }
    ],
    starterCode: {
      java: 'public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}',
      python: 'def two_sum(nums, target):\n    # Your code here\n    return []',
      c: '#include <stdio.h>\n\n// Return a newly allocated array of size 2, set returnSize=2\nint* two_sum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    *returnSize = 0;\n    return nums;\n}'
    }
  }
};

export const getProblemsByDay = (day) => {
  return Object.values(PROBLEMS).filter(p => p.day === day);
};

export const getProblemById = (id) => {
  return PROBLEMS[id];
};

export const getAllProblems = () => {
  return Object.values(PROBLEMS);
};

