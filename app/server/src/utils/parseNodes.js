const EDGE_PATTERN = /^([A-Z])->([A-Z])$/;

function parseInput(data) {
  const invalidEntries = [];
  const duplicateEdges = [];
  const validEdges = [];

  const seenEdges = new Set();
  const reportedDupes = new Set();


  for (const raw of data) {
    const entry = raw.trim();

    if (entry.length === 0) {
      invalidEntries.push(raw);
      continue;
    }

    const match = entry.match(EDGE_PATTERN);

    if (!match) {
      invalidEntries.push(raw);
      continue;
    }

    const from = match[1];
    const to = match[2];

    if (from === to) {
      invalidEntries.push(raw);
      continue;
    }

    const key = `${from}->${to}`;

    if (seenEdges.has(key)) {
      if (!reportedDupes.has(key)) {
        duplicateEdges.push(key);
        reportedDupes.add(key);
      }
      continue;
    }


    seenEdges.add(key);
    validEdges.push({ from, to });
  }

  return { validEdges, invalidEntries, duplicateEdges };
}


module.exports = { parseInput };