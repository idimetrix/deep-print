// Type alias for a function that takes a tab (indentation) string and returns a string representing the node or subtree
type Child = (tab: string) => string;

/**
 * Prints a binary tree structure to the console.
 * @param {string} tab - Indentation string for current level (defaults to empty).
 * @param {[left?: null | Child, right?: null | Child]} children - Tuple of left and right children (both optional).
 * @returns {string} Tree structure as a formatted string.
 */
export const dpb = (
  tab = "",
  children: [left?: null | Child, right?: null | Child],
): string => {
  const [left, right] = children;
  let str = "";

  // Add the left child branch if it exists
  if (left) str += "\n" + tab + "← " + left(tab + "  ");

  // Add the right child branch if it exists
  if (right) str += "\n" + tab + "→ " + right(tab + "  ");

  return str;
};

/**
 * Prints a general tree structure (with any number of children) to the console.
 * @param {string} tab - Indentation string for current level (defaults to empty).
 * @param {(Child | null)[]} children - Array of children (null or Child functions).
 * @param {boolean} showVertical - Option to show vertical lines for better visual clarity (default true).
 * @param {boolean} compact - Option for compact tree display, omitting empty lines (default false).
 * @returns {string} Tree structure as a formatted string.
 */
export const dp = (
  tab = "",
  children: (Child | null)[],
  showVertical = true, // New option: show vertical lines connecting siblings
  compact = false, // New option: compact display (omits empty lines)
): string => {
  let str = "";
  let last = children.length - 1;

  // Find the last non-null child for proper formatting
  for (; last >= 0; last--) if (children[last]) break;

  // Loop through the children and build the tree
  for (let i = 0; i <= last; i++) {
    const fn = children[i];
    if (!fn) continue;

    const isLast = i === last;
    const child = fn(tab + (isLast ? " " : showVertical ? "│" : " ") + "  ");

    // Use different branches depending on position (last child, etc.)
    const branch = compact && !child ? "" : isLast ? "└─" : "├─";

    // Append the current branch and its subtree to the result
    str += "\n" + tab + branch + (child ? " " + child : "");
  }

  return str;
};
