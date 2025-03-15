import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  
  // Count characters including whitespace
  const countWithWhitespace = text.length
  
  // Count characters excluding whitespace
  const countWithoutWhitespace = text.replace(/\s/g, '').length

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <>
      <h1 className="title">文字数カウンター</h1>
      <div className="card">
        <textarea 
          className="text-input" 
          placeholder="ここにテキストを入力してください..."
          value={text}
          onChange={handleTextChange}
          rows={10}
          cols={50}
        />
        
        <div className="counter-results">
          <div className="counter-item">
            <h3>空白を含む文字数:</h3>
            <p className="count" data-testid="count-with-whitespace">{countWithWhitespace}</p>
          </div>
          <div className="counter-item">
            <h3>空白を含まない文字数:</h3>
            <p className="count" data-testid="count-without-whitespace">{countWithoutWhitespace}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
