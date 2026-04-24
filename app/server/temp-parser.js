// TEST FILE 

// const { parseInput } = require("./src/utils/parseNodes");

// const result = parseInput([
//   "A->B", "A->C", "B->D",
//   "G->H", "G->H", "G->I",
//   "hello", "1->2", "A->",
//   "A->A", " A->B ", ""
// ]);

// console.log(JSON.stringify(result, null, 2));

// const { buildTrees } = require('./src/utils/buildTrees');
// const edges = [
//   { parent: 'A', child: 'B' }, { parent: 'A', child: 'C' },
//   { parent: 'B', child: 'D' }, { parent: 'C', child: 'E' },
//   { parent: 'E', child: 'F' }, { parent: 'X', child: 'Y' },
//   { parent: 'Y', child: 'Z' }, { parent: 'Z', child: 'X' },
//   { parent: 'P', child: 'Q' }, { parent: 'Q', child: 'R' },
//   { parent: 'G', child: 'H' }, { parent: 'G', child: 'I' },
// ];
// console.log(JSON.stringify(buildTrees(edges), null, 2));


// const { buildTrees } = require('./src/utils/buildTrees');
// // A->D and B->D: first parent (A) wins, B->D silently dropped
// const edges = [
//   { parent: 'A', child: 'D' }, { parent: 'B', child: 'D' }
// ];
// console.log(JSON.stringify(buildTrees(edges), null, 2));

// const { parseInput } = require('./src/utils/parseNodes');
// const raw = ['A->B','A->C','B->D','X->Y','Y->Z','Z->X'];
// const { validEdges } = parseInput(raw);
// console.log(JSON.stringify(validEdges, null, 2));