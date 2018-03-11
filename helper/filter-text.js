module.exports = node =>
  node.filter((index, element) => element.type === 'text')
    .text()
    .trim();
