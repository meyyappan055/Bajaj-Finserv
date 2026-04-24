export default function ResultView({ data }) {
  const { hierarchies, invalid_entries, duplicate_edges, summary } = data

  return (
    <div className="result">
      <div className="summary-row">
        <span className="badge blue">Trees: {summary.total_trees}</span>
        <span className="badge red">Cycles: {summary.total_cycles}</span>
        <span className="badge green">Largest: {summary.largest_tree_root || '—'}</span>
      </div>

      <h2>Hierarchies</h2>
      {hierarchies.map((h, i) => (
        <div key={i} className={`card ${h.has_cycle ? 'cyclic' : ''}`}>
          <div className="card-header">
            <strong>Root: {h.root}</strong>
            {h.has_cycle && <span className="tag-cycle">CYCLE</span>}
            {h.depth && <span className="tag-depth">depth {h.depth}</span>}
          </div>
          {!h.has_cycle && (
            <pre className="tree-pre">{JSON.stringify(h.tree, null, 2)}</pre>
          )}
        </div>
      ))}

      {invalid_entries.length > 0 && (
        <div className="side-section">
          <h3>Invalid Entries</h3>
          {invalid_entries.map((e, i) => <span key={i} className="pill red">{e}</span>)}
        </div>
      )}

      {duplicate_edges.length > 0 && (
        <div className="side-section">
          <h3>Duplicate Edges</h3>
          {duplicate_edges.map((e, i) => <span key={i} className="pill yellow">{e}</span>)}
        </div>
      )}
    </div>
  )
}