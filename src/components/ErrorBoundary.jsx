import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

/**
 * React Error Boundary Komponente.
 * Fängt JavaScript-Laufzeitfehler im Unterbaum ab und zeigt eine sichere,
 * informative Wiederherstellungsansicht statt eines White Screens.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary gefangen:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '1rem',
          margin: '1.5rem'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: '#ef4444'
          }}>
            <AlertTriangle size={32} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f87171', marginBottom: '0.5rem' }}>
            Hoppla, ein unerwarteter Fehler ist aufgetreten
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Die Anwendung hat einen geschützten Zustand eingenommen, um Datenverlust zu verhindern. Deine gespeicherten Daten sind sicher.
          </p>

          {this.state.error && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#fb7185',
              maxWidth: '650px',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              {this.state.error.toString()}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReset}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={16} /> Ansicht wiederherstellen
            </button>
            <button
              onClick={this.handleReload}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Home size={16} /> Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
