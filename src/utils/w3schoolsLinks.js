export const W3SCHOOLS_LINKS = {
  java: {
    'Variables, data types, input/output': 'https://www.w3schools.com/java/java_variables.asp',
    'Loops (for, while)': 'https://www.w3schools.com/java/java_for_loop.asp',
    'Methods, parameters': 'https://www.w3schools.com/java/java_methods.asp',
    'String class methods': 'https://www.w3schools.com/java/java_strings.asp',
    'Arrays': 'https://www.w3schools.com/java/java_arrays.asp',
    'HashMap basics': 'https://www.w3schools.com/java/java_hashmap.asp',
    'OOP – class & object': 'https://www.w3schools.com/java/java_classes.asp',
    'Constructors': 'https://www.w3schools.com/java/java_constructors.asp',
    'Encapsulation': 'https://www.w3schools.com/java/java_encapsulation.asp',
    'Exception handling': 'https://www.w3schools.com/java/java_try_catch.asp',
    'Collections overview': 'https://www.w3schools.com/java/java_arraylist.asp',
    'Recursion': 'https://www.w3schools.com/java/java_recursion.asp',
    'Time vs space complexity': 'https://www.w3schools.com/java/java_complexity.asp',
    'Recursion vs iteration': 'https://www.w3schools.com/java/java_recursion.asp',
    'Memory profiling': 'https://www.w3schools.com/java/java_memory.asp'
  },
  python: {
    'Variables, print, input': 'https://www.w3schools.com/python/python_variables.asp',
    'Loops': 'https://www.w3schools.com/python/python_for_loops.asp',
    'Functions': 'https://www.w3schools.com/python/python_functions.asp',
    'String slicing': 'https://www.w3schools.com/python/python_strings_slicing.asp',
    'Lists': 'https://www.w3schools.com/python/python_lists.asp',
    'Dictionary': 'https://www.w3schools.com/python/python_dictionaries.asp',
    'OOP basics': 'https://www.w3schools.com/python/python_classes.asp',
    'List comprehension': 'https://www.w3schools.com/python/python_lists_comprehension.asp',
    'try/except': 'https://www.w3schools.com/python/python_try_except.asp',
    'Sets': 'https://www.w3schools.com/python/python_sets.asp',
    'Recursion': 'https://www.w3schools.com/python/python_recursion.asp',
    'List vs tuple performance': 'https://www.w3schools.com/python/python_tuples.asp',
    'Backtracking template': 'https://www.w3schools.com/python/python_backtracking.asp',
    'Generator functions': 'https://www.w3schools.com/python/python_iterators.asp'
  },
  sql: {
    'SELECT *, WHERE': 'https://www.w3schools.com/sql/sql_select.asp',
    'ORDER BY, LIMIT': 'https://www.w3schools.com/sql/sql_orderby.asp',
    'DISTINCT': 'https://www.w3schools.com/sql/sql_distinct.asp',
    'LIKE operator': 'https://www.w3schools.com/sql/sql_like.asp',
    'COUNT, SUM': 'https://www.w3schools.com/sql/sql_count_avg_sum.asp',
    'GROUP BY': 'https://www.w3schools.com/sql/sql_groupby.asp',
    'HAVING': 'https://www.w3schools.com/sql/sql_having.asp',
    'BETWEEN': 'https://www.w3schools.com/sql/sql_between.asp',
    'IN clause': 'https://www.w3schools.com/sql/sql_in.asp',
    'INNER JOIN': 'https://www.w3schools.com/sql/sql_join_inner.asp',
    'LEFT JOIN': 'https://www.w3schools.com/sql/sql_join_left.asp',
    'RIGHT JOIN': 'https://www.w3schools.com/sql/sql_join_right.asp',
    'Subqueries': 'https://www.w3schools.com/sql/sql_subqueries.asp',
    'EXISTS': 'https://www.w3schools.com/sql/sql_exists.asp',
    'UNION': 'https://www.w3schools.com/sql/sql_union.asp',
    'CASE WHEN': 'https://www.w3schools.com/sql/sql_case.asp',
    'Window functions': 'https://www.w3schools.com/sql/sql_window_functions.asp',
    'ROW_NUMBER()': 'https://www.w3schools.com/sql/sql_window_functions.asp',
    'RANK()': 'https://www.w3schools.com/sql/sql_window_functions.asp',
    'DENSE_RANK()': 'https://www.w3schools.com/sql/sql_window_functions.asp',
    'PARTITION BY': 'https://www.w3schools.com/sql/sql_window_functions.asp'
  },
  dsa: {
    'Array basics, reverse array, max element': 'https://www.w3schools.com/dsa/dsa_arrays.asp',
    'Array rotation, sum of array': 'https://www.w3schools.com/dsa/dsa_arrays_advanced.asp',
    'Linear search, binary search': 'https://www.w3schools.com/dsa/dsa_searching.asp',
    'String reverse, palindrome': 'https://www.w3schools.com/dsa/dsa_strings.asp',
    'Two-sum problem': 'https://www.w3schools.com/dsa/dsa_hashmap.asp',
    'Two pointers (pair sum)': 'https://www.w3schools.com/dsa/dsa_two_pointers.asp',
    'Sliding window (max sum subarray)': 'https://www.w3schools.com/dsa/dsa_sliding_window.asp',
    'Stack implementation': 'https://www.w3schools.com/dsa/dsa_stack.asp',
    'Valid parentheses': 'https://www.w3schools.com/dsa/dsa_stack_problems.asp',
    'Queue implementation': 'https://www.w3schools.com/dsa/dsa_queue.asp',
    'Linked list traversal': 'https://www.w3schools.com/dsa/dsa_linked_list.asp',
    'Binary tree traversal': 'https://www.w3schools.com/dsa/dsa_trees.asp',
    'Heap basics': 'https://www.w3schools.com/dsa/dsa_heap.asp',
    'Sorting (merge sort)': 'https://www.w3schools.com/dsa/dsa_sorting.asp',
    'Greedy basics': 'https://www.w3schools.com/dsa/dsa_greedy.asp',
    'DP intro (fib)': 'https://www.w3schools.com/dsa/dsa_dynamic_programming.asp'
  }
};

export const getW3SchoolsLink = (subject, topic) => {
  const subjectLinks = W3SCHOOLS_LINKS[subject.toLowerCase()];
  if (!subjectLinks) return null;
  
  return subjectLinks[topic] || null;
};

export const generateNoteTemplate = (subject, topic) => {
  const normalizedSubject = (subject || '').toLowerCase();
  const safeTopic = topic || 'Topic';

  const link = getW3SchoolsLink(normalizedSubject, safeTopic);
  const linkLine = link ? `\n\nReference: ${link}` : '';

  if (normalizedSubject === 'java') {
    return `# Day Notes: Java — ${safeTopic}${linkLine}

## What to learn
- Define the concept in 1–2 sentences
- Know the common syntax patterns
- Recognize edge cases and typical mistakes

## Key concepts
- Definitions:
- When to use:
- Common pitfalls:

## Syntax / patterns
\`\`\`java
public class Solution {
    public static void main(String[] args) {
        // quick sandbox
    }
}
\`\`\`

## Mini examples
- Example 1:
- Example 2:

## Interview notes
- Time/space tradeoffs (if applicable)
- How to explain it in 30 seconds

## Practice checklist
- I can write it from memory
- I can debug common errors
- I can explain constraints and complexity
`;
  }

  if (normalizedSubject === 'python') {
    return `# Day Notes: Python — ${safeTopic}${linkLine}

## What to learn
- Core idea and when to use it
- Idiomatic Python patterns

## Key concepts
- Definitions:
- Common pitfalls:

## Syntax / patterns
\`\`\`python
def solve(*args):
    pass

if __name__ == "__main__":
    solve()
\`\`\`

## Mini examples
- Example 1:
- Example 2:

## Debug notes
- Typical exceptions for this topic:
- How to print/inspect state:

## Practice checklist
- I can write it from memory
- I can handle edge cases
- I can explain complexity
`;
  }

  if (normalizedSubject === 'sql') {
    return `# Day Notes: SQL — ${safeTopic}${linkLine}

## What to learn
- What this clause/function does
- Where it is applied in query execution

## Core syntax
\`\`\`sql
SELECT
  -- columns
FROM
  -- tables
WHERE
  -- filters
;
\`\`\`

## Key concepts
- Ordering of operations (WHERE/GROUP BY/HAVING/ORDER BY)
- NULL behavior
- Performance notes (indexes / scans)

## Examples
\`\`\`sql
-- Example 1
\`\`\`

\`\`\`sql
-- Example 2
\`\`\`

## Practice checklist
- I can write 2 queries without looking
- I understand edge cases (NULLs, duplicates)
- I can explain performance implications
`;
  }

  if (normalizedSubject === 'dsa') {
    return `# Day Notes: DSA — ${safeTopic}${linkLine}

## Problem pattern
- Pattern name:
- When it applies:

## Key ideas
- Invariant:
- Data structures involved:
- Complexity goal:

## Template
\`\`\`
Input: 
Approach:
1)
2)
Output:
\`\`\`

## Edge cases
- Empty input
- Single element
- Duplicates
- Large constraints

## Dry run
- Example input:
- Step-by-step:

## Practice checklist
- I can implement it quickly
- I can prove correctness
- I can analyze time/space
`;
  }

  return `# Day Notes — ${safeTopic}${linkLine}

## Overview

## Key concepts

## Examples

## Practice checklist
`;
};

