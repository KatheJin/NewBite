import { useState } from 'react'
import './App.css'

type HealthResponse = {
  service: 'newbite-api'
  status: 'ok'
}

type ConnectionState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'success'; health: HealthResponse }
  | { phase: 'error'; message: string }

function isHealthResponse(value: unknown): value is HealthResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'service' in value &&
    value.service === 'newbite-api' &&
    'status' in value &&
    value.status === 'ok'
  )
}

function App() {
  const [connection, setConnection] = useState<ConnectionState>({ phase: 'idle' })

  async function checkConnection() {
    setConnection({ phase: 'loading' })
    const signal = AbortSignal.timeout(5000)

    try {
      const response = await fetch('/api/health', { signal })

      if (!response.ok) {
        setConnection({
          phase: 'error',
          message: `接続に失敗しました（HTTP ${response.status}）。バックエンドの起動を確認して、もう一度お試しください。`,
        })
        return
      }

      const health: unknown = await response.json()

      if (!isHealthResponse(health)) {
        setConnection({ phase: 'error', message: 'バックエンドから想定外の応答が返りました。' })
        return
      }

      setConnection({ phase: 'success', health })
    } catch (error) {
      let message = '接続に失敗しました。バックエンドの起動を確認して、もう一度お試しください。'

      if (signal.aborted) {
        message = '5秒以内に応答がありませんでした。もう一度お試しください。'
      } else if (error instanceof SyntaxError) {
        message = 'バックエンドの応答を JSON として読み取れませんでした。'
      }

      setConnection({ phase: 'error', message })
    }
  }

  return (
    <main className="connection-check">
      <h1>NewBite</h1>
      <button type="button" onClick={checkConnection} disabled={connection.phase === 'loading'}>
        バックエンドの接続を確認
      </button>
      <div className="connection-status" role="status">
        {connection.phase === 'idle' && <p>未確認です。</p>}
        {connection.phase === 'loading' && <p>接続を確認中です…</p>}
        {connection.phase === 'success' && (
          <>
            <p>接続に成功しました。</p>
            <p>
              service <code>{connection.health.service}</code>
            </p>
            <p>
              status <code>{connection.health.status}</code>
            </p>
          </>
        )}
        {connection.phase === 'error' && <p>{connection.message}</p>}
      </div>
    </main>
  )
}

export default App
