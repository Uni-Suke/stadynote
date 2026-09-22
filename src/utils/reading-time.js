// Japanese prose is estimated at 400 characters/minute, Latin text at 200 words/minute.
export function readingTimeMinutes(text) {
  const japaneseCharacters = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) ?? []).length;
  const latinWords = (text.match(/[\p{Script=Latin}\p{Number}]+(?:['’-][\p{Script=Latin}\p{Number}]+)*/gu) ?? []).length;
  return Math.max(1, Math.ceil(japaneseCharacters / 400 + latinWords / 200));
}

function textOf(node) {
  if (node.type === 'code' || node.type === 'html' || node.type === 'mdxjsEsm') return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children ?? []).map(textOf).join(' ');
}

export function remarkReadingTime() {
  return (tree) => {
    const minutes = readingTimeMinutes(textOf(tree));
    const label = `読了目安：約${minutes}分`;
    let replaced = false;

    // Preserve the lesson level and review date while replacing its handwritten estimate.
    for (const node of tree.children) {
      if (node.type !== 'paragraph') continue;
      for (const child of node.children ?? []) {
        if (child.type !== 'strong') continue;
        for (const part of child.children ?? []) {
          if (part.type === 'text' && /約\d+分/.test(part.value)) {
            part.value = part.value.replace(/約\d+分/, label);
            replaced = true;
          }
        }
      }
    }

    if (!replaced) {
      const firstContent = tree.children.findIndex((node) => node.type !== 'mdxjsEsm');
      tree.children.splice(firstContent < 0 ? tree.children.length : firstContent, 0, {
        type: 'paragraph',
        children: [{ type: 'text', value: label }],
      });
    }
  };
}
