import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(`${API_URL}/health`)
        setHealth(response.data)
      } catch (error) {
        console.error('Health check failed:', error)
        setHealth({ status: 'ERROR', message: 'Backend not available' })
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          견적 관리 시스템
        </h1>
        <div className="text-center">
          {loading ? (
            <div className="text-gray-600">시스템 상태 확인 중...</div>
          ) : (
            <div className={`p-4 rounded ${
              health?.status === 'OK'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="font-semibold">
                상태: {health?.status || 'Unknown'}
              </div>
              <div className="text-sm mt-2">
                {health?.message || '상태 정보 없음'}
              </div>
              {health?.timestamp && (
                <div className="text-xs mt-1 opacity-75">
                  {new Date(health.timestamp).toLocaleString('ko-KR')}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Quotation Management System v1.0.0</p>
          <p>Frontend: React + Vite + TailwindCSS</p>
          <p>Backend: Node.js + Express</p>
        </div>
      </div>
    </div>
  )
}

export default App