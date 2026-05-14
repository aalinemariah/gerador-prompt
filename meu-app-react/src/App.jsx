import { useState } from 'react'
import devStudentFullLogo from './assets/dev_student_logo_transparent.png'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])

  const saveHistoryItem = (item) => {
    const trimmed = item.trim()
    if (!trimmed) return

    const nextHistory = [trimmed, ...history.filter((entry) => entry !== trimmed)]
      .slice(0, 5)

    setHistory(nextHistory)
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return

    saveHistoryItem(prompt)


    const robust = `
## Contexto
Você é um assistente de desenvolvimento experiente e prestativo.

## Tarefa
${prompt}

## Modo de Resultado
Forneça uma resposta prática, bem estruturada e pronta para usar.
Inclua exemplos quando relevante.
Explique o "porquê" além do "como".

---

**Prompt Original:** ${prompt}
    `.trim()

    setGeneratedPrompt(robust)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app-container">
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-section">
            <img src={devStudentFullLogo} alt="Dev Student Logo" className="logo-image" />
          </div>

          <nav className="menu">
            <button className="menu-item">Novo Projeto </button>
            <button className="menu-item">Histórico</button>
          </nav>

          {history.length > 0 && (
            <div className="history-section">
              <h3 className="history-title">Histórico 👀</h3>
              <ul className="history-list">
                {history.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <button
                      type="button"
                      className="history-item"
                      onClick={() => {
                        setPrompt(item)
                        setGeneratedPrompt('')
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <section className="content-section">
            <h2 className="section-title">Gerador de Prompt 🎇</h2>
            
            <div className="prompt-container">
              <label className="prompt-label">💡 Em que posso te ajudar dev?</label>
              <input
                type="text"
                className="prompt-input"
                placeholder="Digite seu prompt aqui..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button className="generate-btn" onClick={handleGenerate}>
                {'</>'} Gerar
              </button>
            </div>

            {generatedPrompt && (
              <div className="output-container">
                <div className="output-header">
                  <h3 className="output-title">✨ Prompt robusto e eficiente </h3>
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    title="Copiar para área de transferência"
                  >
                    {copied ? '✓ Copiado!' : '📋 Copiar'}
                  </button>
                </div>
                <pre className="output-text">{generatedPrompt}</pre>
              </div>
            )}
          </section>
        </main>
      </div>

      <footer className="app-footer">
        <p>Desenvolvido por Aline Araújo</p>
      </footer>
    </div>
  )
}

export default App
