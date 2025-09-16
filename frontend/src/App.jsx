import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [health, setHealth] = useState(null)

  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/health`)
      setHealth(response.data)
    } catch (error) {
      console.error('Health check failed:', error)
      setHealth({ status: 'ERROR', message: 'Backend not available' })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 임시 로그인 검증 (나중에 실제 API로 교체)
      if (loginForm.email === 'admin@example.com' && loginForm.password === 'admin123') {
        setIsLoggedIn(true)
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginForm({ email: '', password: '' })
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">견적 관리 시스템</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">admin@example.com</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">환영합니다!</h2>
                <p className="text-gray-600 mb-6">견적 관리 시스템에 성공적으로 로그인했습니다.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold text-lg mb-2">견적서 작성</h3>
                    <p className="text-gray-600 text-sm">새로운 견적서를 작성합니다</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold text-lg mb-2">견적서 관리</h3>
                    <p className="text-gray-600 text-sm">기존 견적서를 조회하고 관리합니다</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold text-lg mb-2">고객 관리</h3>
                    <p className="text-gray-600 text-sm">고객 정보를 관리합니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            견적 관리 시스템
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            계정에 로그인하여 시스템을 이용하세요
          </p>
        </div>

        {health?.status !== 'OK' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-sm text-red-600">
              ⚠️ 서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">이메일 주소</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600 bg-white p-3 rounded border">
              <strong>테스트 계정:</strong><br />
              이메일: admin@example.com<br />
              비밀번호: admin123
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App