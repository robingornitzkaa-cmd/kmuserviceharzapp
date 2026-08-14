import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom Hook für die Browser Web Speech API.
 * Ermöglicht komfortables Diktieren von Notizen und Aufgaben.
 */
export function useSpeechRecognition({ onResult, onError, lang = 'de-DE' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;
    setIsSupported(Boolean(SpeechRecognition));
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('SpeechRecognition stop error:', e);
      }
    }
    setIsListening(false);
    setActiveTargetId(null);
  }, []);

  const startListening = useCallback((targetId = null, customOnResult = null) => {
    const SpeechRecognition = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;

    if (!SpeechRecognition) {
      const msg = 'Spracherkennung wird von diesem Browser leider nicht unterstützt.';
      if (onError) onError(msg);
      else alert(msg);
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setActiveTargetId(targetId);
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        if (customOnResult) {
          customOnResult(text, targetId);
        } else if (onResult) {
          onResult(text, targetId);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (onError) onError(event.error);
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
        setActiveTargetId(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
      setActiveTargetId(null);
    }
  }, [isListening, lang, onError, onResult, stopListening]);

  return {
    isListening,
    activeTargetId,
    transcript,
    isSupported,
    startListening,
    stopListening
  };
}
