/*
 * This file is responsible for performing the logic of replacing
 * all occurrences of each mapped word with its emoji counterpart.
 */

/*global emoji*/

// emojiMap.js defines the 'emoji' variable.
// Referenced here to reduce confusion.
const emojiMap = emoji;

/**
 * Substitutes emojis into text nodes.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
function replaceText (node) {
    console.log(node);
    let content = node.innerHTML;
    for (let [emoji, word] of emojiMap) {
      const regex = emoji;
      content = content.replace(regex, word);
    }
    node.innerHTML = content;
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
