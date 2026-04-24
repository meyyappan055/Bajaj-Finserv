const express = require('express');
const { parseInput } = require('../utils/parseNodes');
const { buildTrees } = require('../utils/buildTrees');


const router = express.Router();

const ME = {
  user_id: 'meyyappanl_27092005',
  email_id: 'ml3893@srmist.edu.in',
  college_roll_number: 'RA2311003010429',
};


router.post('/', (req, res, next) => {
  try {
    const { validEdges, invalidEntries, duplicateEdges } = parseInput(req.body.data);
    const hierarchies = buildTrees(validEdges);

    const nonCyclic = hierarchies.filter(h => !h.has_cycle);
    const cyclic = hierarchies.filter(h => h.has_cycle);

    let largestRoot = '';
    let bestDepth = -1;
    for (const h of nonCyclic) {
      if (h.depth > bestDepth || (h.depth === bestDepth && h.root < largestRoot)) {
        bestDepth = h.depth;
        largestRoot = h.root;
      }
    }

    res.json({
      ...ME,
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary: {
        total_trees: nonCyclic.length,
        total_cycles: cyclic.length,
        largest_tree_root: largestRoot,
      },
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;