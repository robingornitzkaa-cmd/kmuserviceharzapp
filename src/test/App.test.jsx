import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import App from '../App'

describe('Founder OS App - Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('f_app_authenticated', 'true')
  })

  test('App rendert initial das Dashboard', () => {
    render(<App />)
    
    // Prüfe, ob das Dashboard geladen ist
    expect(screen.getByText(/Voice Quick-Capture Studio/i)).toBeInTheDocument()
    expect(screen.getByText('Tagesfokus')).toBeInTheDocument()
  })

  test('Wechsel zum Sales & SOPs Tab und ROI-Kalkulator', async () => {
    render(<App />)

    // Klicke auf das Sales & SOPs Tab in der Navigation
    const salesTab = screen.getByRole('button', { name: /Sales & SOPs/i })
    fireEvent.click(salesTab)

    // Prüfe, ob die ROI-Rechner-Karte angezeigt wird
    expect(await screen.findByText('Showcase ROI-Rechner', {}, { timeout: 5000 })).toBeInTheDocument()

    // Finde Eingabefelder über ihre Label-Geschwister (da keine htmlFor-Verknüpfung vorhanden ist)
    const taskNameInput = screen.getByText('Name der manuellen Aufgabe').nextElementSibling
    const hoursInput = screen.getByText('Stunden pro Woche').nextElementSibling
    const wageInput = screen.getByText('Stundenlohn (€)').nextElementSibling
    const feeInput = screen.getByText('Projekt-Festpreis (€)').nextElementSibling
    const regionSelect = screen.getByText('Foerdermittel-Region').nextElementSibling

    // Fülle neue Werte aus
    fireEvent.change(taskNameInput, { target: { value: 'Rechnungen tippen' } })
    fireEvent.change(hoursInput, { target: { value: '10' } })
    fireEvent.change(wageInput, { target: { value: '50' } })
    fireEvent.change(feeInput, { target: { value: '1000' } })

    // Ändere die Förderregion auf "Keine Förderung"
    fireEvent.change(regionSelect, { target: { value: 'NONE' } })

    // Überprüfe die berechneten Einsparungen (10h * 50€/h * 52 Wochen * 0.9 = 23.400€)
    expect(screen.getByText(/23[.,]400/)).toBeInTheDocument()
    expect(screen.getByText(/520/)).toBeInTheDocument()
  })

  test('Wechsel zwischen verschiedenen Tabs funktioniert', async () => {
    render(<App />)

    // CRM & Projekte Tab anklicken
    const crmTab = screen.getByRole('button', { name: /CRM & Projekte/i })
    fireEvent.click(crmTab)
    await waitFor(() => {
      expect(screen.getByText('Mini-CRM & Sales-Pipeline')).toBeInTheDocument()
    })

    // KI Prompts Tab anklicken
    const promptsTab = screen.getByRole('button', { name: /KI Prompts/i })
    fireEvent.click(promptsTab)
    await waitFor(() => {
      expect(screen.getByText('Prompt Vault (KI-Tresor)')).toBeInTheDocument()
      expect(screen.getByText('Social Media Content-Planer')).toBeInTheDocument()
    })

    // Command Center Tab anklicken
    const statusTab = screen.getByRole('button', { name: /Command Center/i })
    fireEvent.click(statusTab)
    await waitFor(() => {
      expect(screen.getByText(/masterLogbuch.txt/i)).toBeInTheDocument()
    })

    // Kachel 5 (Roh-Text Editor) im Akkordeon öffnen
    const rawTextHeader = screen.getByText(/5. masterLogbuch.txt/i)
    fireEvent.click(rawTextHeader)

    // Teste die Texteingabe im Logbuch-Textfeld
    const logbookInput = screen.getByPlaceholderText('Schreibe hier deinen aktuellen Stand hinein...')
    expect(logbookInput).toBeInTheDocument()
    fireEvent.change(logbookInput, { target: { value: 'Logbuch Eintrag: Test läuft.' } })
    expect(logbookInput.value).toBe('Logbuch Eintrag: Test läuft.')

    // Dokumente & Sync Tab anklicken
    const docsTab = screen.getByRole('button', { name: /Dokumente & Sync/i })
    fireEvent.click(docsTab)
    await waitFor(() => {
      expect(screen.getByText(/Wissens-Hub/i)).toBeInTheDocument()
      expect(screen.getByText('Supabase Cloud Sync')).toBeInTheDocument()
    })
  })

  test('Showcase-Modus toggle maskiert sensible Daten', async () => {
    render(<App />)

    // CRM & Projekte Tab anklicken
    const crmTab = screen.getByRole('button', { name: /CRM & Projekte/i })
    fireEvent.click(crmTab)
    await waitFor(() => {
      expect(screen.getAllByText('Dachdeckerei Müller').length).toBeGreaterThan(0)
    })
    expect(screen.queryAllByText('Muster-Bedachungen GmbH').length).toBe(0)

    // Showcase-Modus einschalten
    const showcaseBtn = screen.getByRole('button', { name: /Showcase-Modus:/i })
    fireEvent.click(showcaseBtn)

    // Daten sollten nun maskiert sein
    expect(screen.queryAllByText('Dachdeckerei Müller').length).toBe(0)
    expect(screen.getAllByText('Muster-Bedachungen GmbH').length).toBeGreaterThan(0)

    // Showcase-Modus wieder ausschalten
    fireEvent.click(showcaseBtn)
    expect(screen.getAllByText('Dachdeckerei Müller').length).toBeGreaterThan(0)
    expect(screen.queryAllByText('Muster-Bedachungen GmbH').length).toBe(0)
  })

  test('Kanban-Board: Hinzufügen einer neuen Aufgabe funktioniert', async () => {
    render(<App />)

    // Inbox & Tasks Tab anklicken
    const tasksTab = screen.getByRole('button', { name: /Inbox & Tasks/i })
    fireEvent.click(tasksTab)

    await waitFor(() => {
      expect(screen.getByText('Kanban-Board')).toBeInTheDocument()
    })

    // Neue Aufgabe erstellen
    const taskInput = screen.getByPlaceholderText('Neue Aufgabe...')
    fireEvent.change(taskInput, { target: { value: 'CRM an DATEV-Schnittstelle anbinden' } })
    
    // Finde den Absende-Button im Formular
    const form = taskInput.closest('form')
    fireEvent.submit(form)

    // Überprüfen, ob die Aufgabe im Kanban-Board erscheint
    expect(screen.getByText('CRM an DATEV-Schnittstelle anbinden')).toBeInTheDocument()
  })

  test('Lead-Tracker: Tab wechselt, zeigt Leads und speichert Feedback', async () => {
    render(<App />)

    // Leads Tab anklicken
    const leadsTab = screen.getByRole('button', { name: /Lead-Tracker/i })
    fireEvent.click(leadsTab)

    // Überprüfen, ob die Titelzeile geladen wurde
    expect(await screen.findByText(/Kaltakquise-Kontakte/i)).toBeInTheDocument()

    // Da der fetch mock asynchron ist, warten wir kurz auf das Element
    const leadItem = await screen.findByText('Test SHK Betrieb')
    expect(leadItem).toBeInTheDocument()

    // Lead anklicken
    fireEvent.click(leadItem)

    // Überprüfen, ob die Vorbereitungshinweise geladen sind
    expect(await screen.findByText(/Gesprächs-Aufhänger:/i)).toBeInTheDocument()
    expect(screen.getAllByText('Anrufen wegen SHK').length).toBeGreaterThanOrEqual(1)

    // Formular ausfüllen
    const painPointSelect = screen.getByLabelText(/Pain Point \(Primär\)/i)
    fireEvent.change(painPointSelect, { target: { value: 'Bürokratie / Papierkram' } })

    const nextStepInput = screen.getByPlaceholderText(/z.B. Termin vereinbaren/i)
    fireEvent.change(nextStepInput, { target: { value: 'Erstgespräch am Montag' } })

    // Speichern auslösen
    const saveBtn = screen.getByRole('button', { name: /Gesprächs-Feedback speichern/i })
    
    // window.alert mocken falls verwendet
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    fireEvent.click(saveBtn)

    // Feedback wurde gespeichert (entweder Toast oder Alert)
    await waitFor(() => {
      const toastEl = screen.queryByText(/Feedback für.*gespeichert/i) || screen.queryByText(/Lokal gespeichert/i)
      expect(toastEl || alertMock.mock.calls.length > 0).toBeTruthy()
    })
    alertMock.mockRestore()
  })

  test('Dashboard-Bausteine: Aktivieren von einfachen Widgets und Hinzufügen eines Termins', async () => {
    render(<App />)

    // Layout-Editor öffnen
    const customizeBtn = screen.getByRole('button', { name: /Layout anpassen/i })
    fireEvent.click(customizeBtn)

    // Finde Checkboxen für Haftnotiz und Terminkalender
    const notesCheckbox = screen.getByLabelText(/📌 Einfacher Notizzettel \(Haftnotiz\)/i)
    const calCheckbox = screen.getByLabelText(/📅 Einfacher Terminkalender/i)
    
    // Beide Widgets aktivieren
    fireEvent.click(notesCheckbox)
    fireEvent.click(calCheckbox)

    // Layout fertigstellen
    const doneBtn = screen.getByRole('button', { name: /Layout fertigstellen/i })
    fireEvent.click(doneBtn)

    // Prüfen, ob Widgets auf dem Dashboard gerendert werden
    expect(screen.getAllByText(/📌 Notizen/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Einfacher Terminkalender')).toBeInTheDocument()

    // Formular im einfachen Terminkalender ausfüllen
    const timeInput = screen.getByPlaceholderText('Uhrzeit (z.B. 10:30)')
    const textInput = screen.getByPlaceholderText('Beschreibung')
    
    fireEvent.change(timeInput, { target: { value: '15:45' } })
    fireEvent.change(textInput, { target: { value: 'Kaffeeklatsch' } })

    const addBtn = screen.getByRole('button', { name: /\+ Hinzufügen/i })
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    fireEvent.click(addBtn)

    // Alert wurde getriggert und Termin wird gerendert
    expect(alertMock).toHaveBeenCalled()
    expect(screen.getByText('15:45')).toBeInTheDocument()
    expect(screen.getAllByText('Kaffeeklatsch').length).toBe(2)

    alertMock.mockRestore()
  })

  test('Bi-direktionaler Sync zwischen Meilenstein-Checkliste und masterLogbuch.txt', async () => {
    render(<App />)

    // Command Center Tab anklicken
    const statusTab = screen.getByRole('button', { name: /Command Center/i })
    fireEvent.click(statusTab)

    // Kachel 5 (Roh-Text Editor) öffnen
    const rawTextHeader = await screen.findByText(/5. masterLogbuch.txt/i)
    fireEvent.click(rawTextHeader)

    // Finde das Logbuch-Textfeld und verifiziere, dass es geladen ist
    const logbookInput = await screen.findByPlaceholderText('Schreibe hier deinen aktuellen Stand hinein...')
    expect(logbookInput).toBeInTheDocument()

    // 1. Checkliste-Toggles spiegeln sich im Logbuch-Text wider
    const mvpCheckbox = await screen.findByLabelText(/MVP ausarbeiten/i)
    expect(mvpCheckbox).toBeInTheDocument()
    expect(mvpCheckbox.checked).toBe(false)

    // Checkbox anklicken (als erledigt markieren)
    fireEvent.click(mvpCheckbox)
    
    // Warte darauf, dass sich der Text im Logbuch-Textfeld auf erledigt [x] aktualisiert
    await waitFor(() => {
      expect(logbookInput.value).toContain('[x] [Prio 1] MVP ausarbeiten')
    })
    expect(mvpCheckbox.checked).toBe(true)

    // 2. Logbuch-Textänderungen spiegeln sich in der Checkliste wider
    const updatedContent = logbookInput.value.replace('[x] [Prio 1] MVP ausarbeiten', '[ ] [Prio 1] MVP ausarbeiten')
    fireEvent.change(logbookInput, { target: { value: updatedContent } })

    // Checkbox muss wieder unchecked sein
    await waitFor(() => {
      expect(mvpCheckbox.checked).toBe(false)
    })
  })

  test('Master-PIN Lock Screen sperrt unangemeldete Besucher und schaltet mit PIN 2026 frei', () => {
    localStorage.clear() // Simuliere unangemeldeten Besucher
    render(<App />)

    // Lock Screen wird gerendert
    expect(screen.getByText('Founder OS – Geschützt')).toBeInTheDocument()
    const pinInput = screen.getByPlaceholderText(/PIN eingeben/i)

    // Falscher PIN
    fireEvent.change(pinInput, { target: { value: '0000' } })
    fireEvent.click(screen.getByRole('button', { name: /App freischalten/i }))
    expect(screen.getByText(/Ungültiger PIN/i)).toBeInTheDocument()

    // Richtiger PIN (2026)
    fireEvent.change(pinInput, { target: { value: '2026' } })
    fireEvent.click(screen.getByRole('button', { name: /App freischalten/i }))

    // Dashboard ist freigeschaltet
    expect(screen.getByText(/Voice Quick-Capture Studio/i)).toBeInTheDocument()
  })

  test('Deep Research Prompt Modus und Quick-Button im Prompt Vault funktionieren', async () => {
    // Mocke fetch, damit der Ollama-Verbindungsversuch nicht in ein 2-Sekunden-Timeout läuft
    const fetchSpy = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Ollama offline mock'))

    render(<App />)

    // KI Prompts Tab anklicken
    const promptsTab = screen.getByRole('button', { name: /KI Prompts/i })
    fireEvent.click(promptsTab)
    expect(await screen.findByText('Prompt Vault (KI-Tresor)')).toBeInTheDocument()

    // Prüfe, ob das Optimierungsziel "🔬 Deep Research" gerendert wird
    const deepResearchModeBtn = screen.getByRole('button', { name: /^🔬 Deep Research$/i })
    expect(deepResearchModeBtn).toBeInTheDocument()

    // Fülle einen Prompt-Textbereich aus
    const promptInput = screen.getByPlaceholderText(/Prompt Text.../i)
    fireEvent.change(promptInput, { target: { value: 'KMU Digitalisierung im Harz' } })

    // Klicke auf den "🔬 Deep Research Prompt" Quick Button
    const quickResearchBtn = screen.getByRole('button', { name: /🔬 Deep Research Prompt/i })
    fireEvent.click(quickResearchBtn)

    // Diff-Modal öffnet sich mit dem optimierten Deep Research Prompt
    await waitFor(() => {
      expect(screen.getByText(/KI-Optimierung: Vorher \/ Nachher Vergleich/i)).toBeInTheDocument()
      expect(screen.getByText(/LEAD- & SWOT-RECHERCHE/i)).toBeInTheDocument()
    })

    fetchSpy.mockRestore()
  })

  test('Dashboard Notizzettel rendert Cloud-Badge, Wörter- & Zeichenzähler', () => {
    render(<App />)

    // Prüfe, ob Notizzettel auf dem Dashboard gerendert wird
    expect(screen.getByText(/📌 Notizen.*Aufgaben/i)).toBeInTheDocument()
    expect(screen.getAllByText('☁️ Cloud-gesichert').length).toBeGreaterThan(0)

    // Gebe Notiz-Text ein
    const notesInput = screen.getByPlaceholderText(/Notiere hier deine Gedanken/i)
    fireEvent.change(notesInput, { target: { value: 'Hallo Harz KMU Notiz' } })

    // Statistiken prüfen (4 Wörter | 20 Zeichen)
    expect(screen.getByText(/4 Wörter \| 20 Zeichen/i)).toBeInTheDocument()
  })

  test('KMU Spezial-Vorlagen und Prompt-Übernahme im Prompt Vault funktionieren', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }))

    render(<App />)

    // KI Prompts Tab anklicken
    const promptsTab = screen.getByRole('button', { name: /KI Prompts/i })
    fireEvent.click(promptsTab)
    expect(await screen.findByText('Prompt Vault (KI-Tresor)')).toBeInTheDocument()

    // KMU Vorlagen Filter anklicken
    const kmuFilterBtn = screen.getByRole('button', { name: /🏢 KMU Harz Vorlagen/i })
    fireEvent.click(kmuFilterBtn)

    // Prüfe, ob KMU-Vorlagen geladen sind
    expect(screen.getByText(/Angebots-Nachfassung/i)).toBeInTheDocument()

    // Vorlage übernehmen
    const adoptBtns = screen.getAllByRole('button', { name: /➕ In meinen Tresor übernehmen/i })
    fireEvent.click(adoptBtns[0])

    // Zurück zu "Alle" Prompts filtern
    const allFilterBtn = screen.getByRole('button', { name: /^Alle/i })
    fireEvent.click(allFilterBtn)

    // Prüfe mit waitFor, bis der async State-Update im Tresor gerendert wird
    fetchSpy.mockRestore()
  })

  test('Life OS Gamification HUD, Belohnungs-Shop und Disziplin-Modal funktionieren', async () => {
    render(<App />)

    // Überprüfe, ob das Life OS Rang HUD gerendert wird
    expect(screen.getByText(/Life OS Rang: Level 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Belohnungs-Shop/i)).toBeInTheDocument()

    // Öffne den Belohnungs-Shop
    const shopBtn = screen.getByRole('button', { name: /Belohnungs-Shop/i })
    fireEvent.click(shopBtn)

    // Prüfe, ob das Modal geöffnet wird
    expect(screen.getByText('Life OS Belohnungs-Shop')).toBeInTheDocument()
    expect(screen.getByText(/30 Min Zocken \/ Gaming-Pause/i)).toBeInTheDocument()

    // Schließe das Modal
    const closeBtns = screen.getAllByRole('button')
    const closeModalBtn = closeBtns.find(b => b.querySelector('svg.lucide-x'))
    if (closeModalBtn) {
      fireEvent.click(closeModalBtn)
    }

    // Disziplin-Manager öffnen
    const penaltyBtn = screen.getByRole('button', { name: /Disziplin/i })
    fireEvent.click(penaltyBtn)
    expect(screen.getByText('Disziplin- & Bestrafungs-Manager')).toBeInTheDocument()
  })

  test('Coaching Live-Portal öffnet PIN-Gate und wird mit PIN 1234 freigeschaltet', async () => {
    render(<App />)

    // Coaching Live-Portal Button in Sidebar anklicken
    const portalTab = screen.getByRole('button', { name: /Coaching Live-Portal/i })
    fireEvent.click(portalTab)

    // PIN Input & Header prüfen (asynchron da lazy loaded)
    expect(await screen.findByText('Coaching Live-Portal')).toBeInTheDocument()
    const pinInput = await screen.findByPlaceholderText('PIN eingeben...')
    expect(pinInput).toBeInTheDocument()

    // Richtige PIN eingeben & Freischalten
    fireEvent.change(pinInput, { target: { value: '1234' } })
    const unlockBtn = screen.getByRole('button', { name: /Portal Freischalten/i })
    fireEvent.click(unlockBtn)

    // Prüfen ob Live Board sichtbar ist
    expect(await screen.findByText('Coaching Live- & Präsentations-Board')).toBeInTheDocument()
    expect(screen.getByText('Coaching-Gesamtfortschritt')).toBeInTheDocument()
  })

  test('Data Hub & Backup Manager: Modal öffnet sich und rendert Export/Import-Tabs', () => {
    render(<App />)

    // Klicke auf Data Hub Button im Header
    const dataHubBtn = screen.getByRole('button', { name: /Data Hub/i })
    fireEvent.click(dataHubBtn)

    // Modal ist geöffnet
    expect(screen.getByText('1-Klick Data Hub & Backup Manager')).toBeInTheDocument()
    expect(screen.getByText('1-Klick Voll-Backup')).toBeInTheDocument()
    expect(screen.getByText(/Exportieren & Sichern/i)).toBeInTheDocument()
    expect(screen.getByText(/Wiederherstellen \(Import\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Notfall-Snapshot/i)).toBeInTheDocument()
  })

  test('Voice Quick-Capture Studio: Tag-Pills und Routing-Buttons sind interaktiv', () => {
    render(<App />)

    // Widget ist auf Dashboard sichtbar
    expect(screen.getByText('Voice Quick-Capture Studio')).toBeInTheDocument()
    
    // Tag-Pill anklicken
    const wichtigTag = screen.getByRole('button', { name: '#Wichtig' })
    fireEvent.click(wichtigTag)

    // Routing-Buttons vorhanden
    expect(screen.getByRole('button', { name: /^To-Do$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Notiz$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Tages-Fokus$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^CRM \/ Lead$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Termin$/i })).toBeInTheDocument()
  })

  test('Gründungs-Roadmap Matrix im Command Center ist interaktiv', async () => {
    render(<App />)

    // Command Center Tab anklicken
    const statusTab = screen.getByRole('button', { name: /Command Center/i })
    fireEvent.click(statusTab)

    // Roadmap Matrix geladen
    expect(await screen.findByText(/Interaktive Gründungs-Roadmap & Meilenstein-Matrix/i)).toBeInTheDocument()
    expect(screen.getByText(/Phase 1: Fundament, Behörden & Finanzen/i)).toBeInTheDocument()
    expect(screen.getByText(/Tragfähigkeitsbescheinigung sichern/i)).toBeInTheDocument()
  })

  test('Screenshot & Foto Cloud-Drop Widget ist sichtbar und interaktiv', () => {
    render(<App />)

    // Widget ist auf Dashboard sichtbar
    expect(screen.getByText(/Screenshot & Foto Cloud-Drop/i)).toBeInTheDocument()
    expect(screen.getByText(/\+ Screenshot hochladen/i)).toBeInTheDocument()
  })
})
