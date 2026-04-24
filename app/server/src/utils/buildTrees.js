function initGroups(nodes) {
  const root = {};
  for (const n of nodes) root[n] = n;

  function seek(x) {
    if (root[x] !== x) root[x] = seek(root[x]);
    return root[x];
  }

  function merge(a, b) {
    root[seek(a)] = seek(b);
  }

  return { seek, merge };
}


function detectLoop(node, adjacency, state) {
  state[node] = 1;
  for (const nb of (adjacency[node] || [])) {
    if (state[nb] === 1) return true;
    if (state[nb] === 0 && detectLoop(nb, adjacency, state)) return true;
  }
  state[node] = 2;
  return false;
}


function expandNode(node, adjacency, seen) {
  const kids = adjacency[node] || [];
  const result = {};
  for (const k of kids) {
    if (!seen.has(k)) {
      seen.add(k);
      result[k] = expandNode(k, adjacency, seen);
    }
  }
  return result;
}


function longestPath(node, adjacency) {
  const branches = adjacency[node] || [];
  if (branches.length === 0) return 1;
  return 1 + Math.max(...branches.map(b => longestPath(b, adjacency)));
}


function buildTrees(validEdges) {
  if (validEdges.length === 0) return [];

  const universe = new Set();
  for (const { parent, child } of validEdges) {
    universe.add(parent);
    universe.add(child);
  }

  const adjacency = {};
  const ownerOf = {};

  for (const { parent, child } of validEdges) {
    if (ownerOf[child] !== undefined) continue;
    ownerOf[child] = parent;
    if (!adjacency[parent]) adjacency[parent] = [];
    adjacency[parent].push(child);
  }

  
  const uf = initGroups([...universe]);
  for (const [child, parent] of Object.entries(ownerOf)) {
    uf.merge(child, parent);
  }


  const buckets = {};
  for (const n of universe) {
    const rep = uf.seek(n);
    if (!buckets[rep]) buckets[rep] = new Set();
    buckets[rep].add(n);
  }

  const output = [];


  for (const members of Object.values(buckets)) {
    const memberList = [...members];

    const hasOwner = new Set(memberList.filter(n => ownerOf[n] !== undefined));
    const freeNodes = memberList.filter(n => !hasOwner.has(n)).sort();

    const stateMap = {};
    for (const n of memberList) stateMap[n] = 0;

    let isCyclic = false;
    for (const n of memberList) {
      if (stateMap[n] === 0 && detectLoop(n, adjacency, stateMap)) {
        isCyclic = true;
        break;
      }
    }

    const chosen = freeNodes.length > 0 ? freeNodes[0] : [...memberList].sort()[0];

    if (isCyclic) {
      output.push({ root: chosen, tree: {}, has_cycle: true });
    } else {
      const visited = new Set([chosen]);
      const nested = expandNode(chosen, adjacency, visited);
      const depth = longestPath(chosen, adjacency);
      output.push({ root: chosen, tree: { [chosen]: nested }, depth });
    }
  }

  output.sort((a, b) => {
    if (a.has_cycle && !b.has_cycle) return 1;
    if (!a.has_cycle && b.has_cycle) return -1;
    return a.root.localeCompare(b.root);
  });

  return output;
}


module.exports = { buildTrees };