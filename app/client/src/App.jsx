import { useState } from 'react'
import InputPanel from './components/InputPanel'
import ResultView from './components/ResultView'

export default function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="wrapper">
      <div className="hero">
        <h1 className="title">Tree Explorer</h1>
        <p className="subtitle">by Meyyappan L · RA2311003010429</p>
      </div>
      <InputPanel onResult={setResult} />
      {result && <ResultView data={result} />}
    </div>
  )
}