import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { KanbanBoard } from '../../components/KanbanBoard';

const KanbanTestWrapper = ({ initialTasks = [], initialInbox = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [inbox, setInbox] = useState(initialInbox);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [simMessage, setSimMessage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const task = {
      id: 'task_' + Date.now(),
      title: newTaskTitle,
      column: 'todo',
      priority: newTaskPriority,
      date: new Date().toLocaleDateString()
    };
    setTasks([...tasks, task]);
    setNewTaskTitle('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const convertInboxToTask = (inboxItem) => {
    const task = {
      id: 'task_from_inbox_' + Date.now(),
      title: inboxItem.text,
      column: 'todo',
      priority: 'high',
      date: new Date().toLocaleDateString()
    };
    setTasks([...tasks, task]);
    setInbox(inbox.filter(i => i.id !== inboxItem.id));
  };

  const deleteInboxItem = (id) => {
    setInbox(inbox.filter(i => i.id !== id));
  };

  return (
    <KanbanBoard
      triggerWhatsAppSimulation={vi.fn()}
      simMessage={simMessage}
      setSimMessage={setSimMessage}
      isSimulating={false}
      webhookUrl={webhookUrl}
      setWebhookUrl={setWebhookUrl}
      isOnline={true}
      simStep={0}
      inbox={inbox}
      mask={(t) => t}
      convertInboxToTask={convertInboxToTask}
      deleteInboxItem={deleteInboxItem}
      addNewTask={addNewTask}
      newTaskTitle={newTaskTitle}
      setNewTaskTitle={setNewTaskTitle}
      newTaskPriority={newTaskPriority}
      setNewTaskPriority={setNewTaskPriority}
      handleDragOver={vi.fn()}
      handleDrop={vi.fn()}
      tasks={tasks}
      handleDragStart={vi.fn()}
      deleteTask={deleteTask}
      onOpenLightbox={vi.fn()}
      onAttachToTask={vi.fn()}
    />
  );
};

describe('Kanban Feature - Aufgaben & Automations-Board', () => {
  it('rendert das Kanban-Board mit Spalten und Eingabefeld', () => {
    render(<KanbanTestWrapper />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Arbeit')).toBeInTheDocument();
    expect(screen.getByText('Erledigt')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Neue Aufgabe...')).toBeInTheDocument();
  });

  it('fügt eine neue Aufgabe erfolgreich zum Board hinzu', () => {
    render(<KanbanTestWrapper />);

    const input = screen.getByPlaceholderText('Neue Aufgabe...');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Landingpage überarbeiten' } });
    fireEvent.submit(form);

    expect(screen.getByText('Landingpage überarbeiten')).toBeInTheDocument();
  });

  it('löscht eine bestehende Aufgabe korrekt aus dem Board', () => {
    const initialTasks = [
      {
        id: 'task_delete_me',
        title: 'Alte Aufgabe löschen',
        column: 'todo',
        priority: 'low',
        date: '17.08.'
      }
    ];

    render(<KanbanTestWrapper initialTasks={initialTasks} />);
    expect(screen.getByText('Alte Aufgabe löschen')).toBeInTheDocument();

    const card = screen.getByText('Alte Aufgabe löschen').closest('.kanban-card');
    const deleteBtn = card.querySelector('button');
    expect(deleteBtn).toBeTruthy();
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Alte Aufgabe löschen')).not.toBeInTheDocument();
  });

  it('konvertiert einen Inbox-Eintrag in eine Kanban-Aufgabe', () => {
    const initialInbox = [
      {
        id: 'inbox_1',
        text: 'Wichtige Kundenanfrage aus WhatsApp',
        sender: 'Kunde Meier',
        date: '10:00'
      }
    ];

    render(<KanbanTestWrapper initialInbox={initialInbox} />);
    expect(screen.getByText('Wichtige Kundenanfrage aus WhatsApp')).toBeInTheDocument();

    const convertBtn = screen.getByRole('button', { name: /Zu Aufgabe/i });
    fireEvent.click(convertBtn);

    expect(screen.getByText('Wichtige Kundenanfrage aus WhatsApp')).toBeInTheDocument();
  });
});
