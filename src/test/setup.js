import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock für Capacitor-Plattformen und Custom Plugins
vi.mock('@capacitor/core', () => ({
  registerPlugin: vi.fn().mockReturnValue({
    updateWidgetData: vi.fn().mockResolvedValue({ success: true }),
  }),
  Capacitor: {
    isNativePlatform: vi.fn().mockReturnValue(false),
    getPlatform: vi.fn().mockReturnValue('web'),
  },
}))

// Mock für jsPDF, um Canvas-Fehler im Headless-Modus zu verhindern
vi.mock('jspdf', () => {
  const jsPDFMock = vi.fn().mockImplementation(() => ({
    text: vi.fn(),
    save: vi.fn(),
    addImage: vi.fn(),
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    rect: vi.fn(),
    setFillColor: vi.fn(),
    setTextColor: vi.fn(),
    line: vi.fn(),
    setDrawColor: vi.fn(),
    setLineWidth: vi.fn(),
  }))
  return { jsPDF: jsPDFMock }
})

// Zusätzliche Web-Speech-API Mocks, da SpeechRecognition in jsdom fehlt
if (typeof window !== 'undefined') {
  window.SpeechRecognition = window.SpeechRecognition || vi.fn()
  window.webkitSpeechRecognition = window.webkitSpeechRecognition || vi.fn()
}
