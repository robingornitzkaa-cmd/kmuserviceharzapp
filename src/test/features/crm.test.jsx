import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CrmPipeline } from '../../components/CrmPipeline';

const CrmTestWrapper = ({ initialContacts = [], initialProjects = [] }) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [crmStageFilter, setCrmStageFilter] = useState('all');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [newContact, setNewContact] = useState({
    name: '',
    company: '',
    industry: '',
    system: '',
    stage: 'erstkontakt'
  });

  const handleAddContact = (e) => {
    e.preventDefault();
    const contact = {
      id: 'contact_' + Date.now(),
      ...newContact,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', company: '', industry: '', system: '', stage: 'erstkontakt' });
  };

  const updateContactStage = (id, newStage) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, stage: newStage } : c));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <CrmPipeline
      handleAddContact={handleAddContact}
      newContact={newContact}
      setNewContact={setNewContact}
      contacts={contacts}
      crmStageFilter={crmStageFilter}
      setCrmStageFilter={setCrmStageFilter}
      isLeadInactive={() => false}
      setSelectedContactId={setSelectedContactId}
      mask={(t) => t}
      updateContactStage={updateContactStage}
      deleteContact={deleteContact}
      projects={projects}
      toggleProjectStep={vi.fn()}
      updateProjectPrice={vi.fn()}
      updateProjectHours={vi.fn()}
      stopProjectTracking={vi.fn()}
      startProjectTracking={vi.fn()}
    />
  );
};

describe('CRM Feature - Mini-CRM & Sales-Pipeline', () => {
  it('rendert die CRM-Hauptkarte und das Formular für neue Kontakte', () => {
    render(<CrmTestWrapper />);
    expect(screen.getByText(/Mini-CRM & Sales-Pipeline/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Firma')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Neu/i })).toBeInTheDocument();
  });

  it('erstellt erfolgreich einen neuen Kontakt und zeigt ihn in der Pipeline an', () => {
    render(<CrmTestWrapper />);

    const nameInput = screen.getByPlaceholderText('Name');
    const companyInput = screen.getByPlaceholderText('Firma');
    const industryInput = screen.getByPlaceholderText('Branche (z.B. Handwerk)');
    const submitBtn = screen.getByRole('button', { name: /Neu/i });

    fireEvent.change(nameInput, { target: { value: 'Max Mustermann' } });
    fireEvent.change(companyInput, { target: { value: 'Harz Haustechnik GmbH' } });
    fireEvent.change(industryInput, { target: { value: 'SHK' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Harz Haustechnik GmbH')).toBeInTheDocument();
    expect(screen.getByText(/Max Mustermann/)).toBeInTheDocument();
    expect(screen.getByText('SHK')).toBeInTheDocument();
  });

  it('erlaubt das Ändern der Pipeline-Phase eines Kontakts', () => {
    const initialContacts = [
      {
        id: 'c_1',
        name: 'Anna Schmidt',
        company: 'Schmidt Bedachungen',
        industry: 'Dachdecker',
        system: 'Lexware',
        stage: 'erstkontakt'
      }
    ];

    render(<CrmTestWrapper initialContacts={initialContacts} />);
    expect(screen.getByText('Schmidt Bedachungen')).toBeInTheDocument();

    const stageSelects = screen.getAllByRole('combobox');
    const contactStageSelect = stageSelects.find(sel => sel.value === 'erstkontakt');
    expect(contactStageSelect).toBeDefined();

    fireEvent.change(contactStageSelect, { target: { value: 'gespräch' } });
    expect(contactStageSelect.value).toBe('gespräch');
  });

  it('löscht einen Kontakt aus der Pipeline bei Klick auf den Löschen-Button', () => {
    const initialContacts = [
      {
        id: 'c_2',
        name: 'Klaus Meier',
        company: 'Meier Elektro',
        industry: 'Elektro',
        system: 'DATEV',
        stage: 'erstkontakt'
      }
    ];

    render(<CrmTestWrapper initialContacts={initialContacts} />);
    expect(screen.getByText('Meier Elektro')).toBeInTheDocument();

    const card = screen.getByText('Meier Elektro').closest('.contact-card');
    const deleteBtn = card.querySelector('button.btn-icon-only');
    expect(deleteBtn).toBeTruthy();
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Meier Elektro')).not.toBeInTheDocument();
  });
});
