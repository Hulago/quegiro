/**
 * Prevents leading spaces in a multiline template literal from appearing in the resulting string
 * @param strings The strings in the template literal
 * @returns The template literal, with spaces removed from all lines
 */
function unIndent(strings) {
  const WHITESPACE_REGEX = / */u;
  const [templateValue] = strings;
  const lines = templateValue
    .replace(/^\n/u, '')
    .replace(/\n\s*$/u, '')
    .split('\n');
  const lineIndents = lines
    .filter(line => line.trim())
    .map(line => {
      const [ rs = [] ] = WHITESPACE_REGEX.exec(line);

      return rs.length;
    });
  const minLineIndent = Math.min(...lineIndents);

  return lines.map(line => line.slice(minLineIndent)).join('\n');
}

module.exports = {
  unIndent
};