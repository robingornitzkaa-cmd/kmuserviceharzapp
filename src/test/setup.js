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
  const jsPDFMock = vi.fn().mockImplementation(function() {
    this.text = vi.fn();
    this.save = vi.fn();
    this.addImage = vi.fn();
    this.setFontSize = vi.fn();
    this.setFont = vi.fn();
    this.rect = vi.fn();
    this.roundedRect = vi.fn();
    this.circle = vi.fn();
    this.setFillColor = vi.fn();
    this.setTextColor = vi.fn();
    this.line = vi.fn();
    this.setDrawColor = vi.fn();
    this.setLineWidth = vi.fn();
    this.addPage = vi.fn();
    this.setPage = vi.fn();
    this.getNumberOfPages = vi.fn().mockReturnValue(2);
    this.splitTextToSize = vi.fn().mockImplementation((text) => Array.isArray(text) ? text : [String(text)]);
    this.getTextWidth = vi.fn().mockReturnValue(40);
    this.output = vi.fn().mockReturnValue('mock-pdf-blob');
    return this;
  });
  return { jsPDF: jsPDFMock, default: jsPDFMock };
});

// Zusätzliche Web-Speech-API Mocks, da SpeechRecognition in jsdom fehlt
if (typeof window !== 'undefined') {
  window.SpeechRecognition = window.SpeechRecognition || vi.fn()
  window.webkitSpeechRecognition = window.webkitSpeechRecognition || vi.fn()
}

// Mock für globale fetch API (für Supabase-REST)
global.fetch = vi.fn().mockImplementation((url) => {
  if (url.includes('/rest/v1/leads')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          id: "lead_test_1",
          company: "Test SHK Betrieb",
          industry: "Handwerk",
          city: "Quedlinburg",
          street: "Teststr. 1",
          phone: "03946 12345",
          website: "www.test-shk.de",
          segment: "Handwerk",
          priority: "A",
          status: "nicht kontaktiert",
          expected_objection: "Keine Zeit",
          call_hook: "Anrufen wegen SHK",
          pain_point: "",
          urgency: 0,
          actual_objection: "",
          conversation_hook: "",
          next_step: "",
          notes: ""
        }
      ])
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
  });
});
