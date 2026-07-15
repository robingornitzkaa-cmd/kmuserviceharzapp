import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import App from '../App'

describe('Founder OS App - Integration Tests', () => {
  test('App rendert initial das Dashboard', () => {
    render(<App />)
    
    // Prüfe, ob das Dashboard geladen ist
    expect(screen.getByText('Neue Idee oder Notiz erfassen')).toBeInTheDocument()
    expect(screen.getByText('Tagesfokus')).toBeInTheDocument()
  })

  test('Wechsel zum Sales & SOPs Tab und ROI-Kalkulator', async () => {
    render(<App />)

    // Klicke auf das Sales & SOPs Tab in der Navigation
    const salesTab = screen.getByRole('button', { name: /Sales & SOPs/i })
    fireEvent.click(salesTab)

    // Prüfe, ob die ROI-Rechner-Karte angezeigt wird
    expect(screen.getByText('Showcase ROI-Rechner')).toBeInTheDocument()

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

  test('Wechsel zwischen verschiedenen Tabs funktioniert', () => {
    render(<App />)

    // CRM & Projekte Tab anklicken
    const crmTab = screen.getByRole('button', { name: /CRM & Projekte/i })
    fireEvent.click(crmTab)
    expect(screen.getByText('Mini-CRM & Sales-Pipeline')).toBeInTheDocument()

    // KI Prompts Tab anklicken
    const promptsTab = screen.getByRole('button', { name: /KI Prompts/i })
    fireEvent.click(promptsTab)
    expect(screen.getByText('Prompt Vault (KI-Tresor)')).toBeInTheDocument()
    expect(screen.getByText('Social Media Content-Planer')).toBeInTheDocument()

    // Dokumente & Sync Tab anklicken
    const docsTab = screen.getByRole('button', { name: /Dokumente & Sync/i })
    fireEvent.click(docsTab)
    expect(screen.getByText('Wissens-Hub (Dokumente)')).toBeInTheDocument()
    expect(screen.getByText('Supabase Cloud Sync')).toBeInTheDocument()
    expect(screen.getByText('masterLogbuch.txt (Immer offen)')).toBeInTheDocument()

    // Teste die Texteingabe im Logbuch-Textfeld
    const logbookInput = screen.getByPlaceholderText('Schreibe hier deinen aktuellen Stand hinein...')
    expect(logbookInput).toBeInTheDocument()
    fireEvent.change(logbookInput, { target: { value: 'Logbuch Eintrag: Test läuft.' } })
    expect(logbookInput.value).toBe('Logbuch Eintrag: Test läuft.')
  })

  test('Showcase-Modus toggle maskiert sensible Daten', () => {
    render(<App />)

    // CRM & Projekte Tab anklicken
    const crmTab = screen.getByRole('button', { name: /CRM & Projekte/i })
    fireEvent.click(crmTab)

    // Name vor der Aktivierung des Showcase-Modus prüfen
    expect(screen.getAllByText('Dachdeckerei Müller').length).toBeGreaterThan(0)
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

  test('Kanban-Board: Hinzufügen einer neuen Aufgabe funktioniert', () => {
    render(<App />)

    // Inbox & Tasks Tab anklicken
    const tasksTab = screen.getByRole('button', { name: /Inbox & Tasks/i })
    fireEvent.click(tasksTab)

    expect(screen.getByText('Kanban-Board')).toBeInTheDocument()

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
    expect(screen.getByText(/Kaltakquise-Kontakte/i)).toBeInTheDocument()

    // Da der fetch mock asynchron ist, warten wir kurz auf das Element
    const leadItem = await screen.findByText('Test SHK Betrieb')
    expect(leadItem).toBeInTheDocument()

    // Lead anklicken
    fireEvent.click(leadItem)

    // Überprüfen, ob die Vorbereitungshinweise geladen sind
    expect(screen.getByText(/Gesprächs-Aufhänger:/i)).toBeInTheDocument()
    expect(screen.getAllByText('Anrufen wegen SHK').length).toBe(2)

    // Formular ausfüllen
    const painPointSelect = screen.getByLabelText(/Pain Point \(Primär\)/i)
    fireEvent.change(painPointSelect, { target: { value: 'Bürokratie / Papierkram' } })

    const nextStepInput = screen.getByPlaceholderText(/z.B. Termin vereinbaren/i)
    fireEvent.change(nextStepInput, { target: { value: 'Erstgespräch am Montag' } })

    // Speichern auslösen
    const saveBtn = screen.getByRole('button', { name: /Gesprächs-Feedback speichern/i })
    
    // window.alert mocken um Fehler zu vermeiden
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    fireEvent.click(saveBtn)

    // Alert wurde getriggert (asynchron nach fetch)
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled()
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
    expect(screen.getByText('📌 Notizzettel')).toBeInTheDocument()
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
})
