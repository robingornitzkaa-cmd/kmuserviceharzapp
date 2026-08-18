import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PromptVault } from '../../components/PromptVault';

const PromptVaultTestWrapper = ({ initialPrompts = [] }) => {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [promptSearch, setPromptSearch] = useState('');
  const [promptCategoryFilter, setPromptCategoryFilter] = useState('all');
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    category: 'Sales',
    text: ''
  });
  const [contentPosts, setContentPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    topic: '',
    platform: 'LinkedIn',
    date: '',
    status: 'draft',
    content: ''
  });

  const handleAddPrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim()) return;
    const prompt = {
      id: 'p_' + Date.now(),
      title: newPrompt.title,
      category: newPrompt.category,
      text: newPrompt.text,
      isPinned: false
    };
    setPrompts([...prompts, prompt]);
    setNewPrompt({ title: '', category: 'Sales', text: '' });
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const togglePinPrompt = (id) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, isPinned: !p.isPinned } : p));
  };

  const copyPromptText = vi.fn();

  return (
    <PromptVault
      showGeminiConfig={false}
      setShowGeminiConfig={vi.fn()}
      geminiApiKey=""
      setGeminiApiKey={vi.fn()}
      newPrompt={newPrompt}
      setNewPrompt={setNewPrompt}
      handleAddPrompt={handleAddPrompt}
      handleOptimizePrompt={vi.fn()}
      ollamaLoading={false}
      customPromptBlocks={[]}
      handleDeleteCustomPromptBlock={vi.fn()}
      showCustomBlockForm={false}
      setShowCustomBlockForm={vi.fn()}
      newBlockName=""
      setNewBlockName={vi.fn()}
      newBlockCategory="custom"
      setNewBlockCategory={vi.fn()}
      newBlockContent=""
      setNewBlockContent={vi.fn()}
      handleAddCustomPromptBlock={vi.fn()}
      promptSearch={promptSearch}
      setPromptSearch={setPromptSearch}
      promptCategoryFilter={promptCategoryFilter}
      setPromptCategoryFilter={setPromptCategoryFilter}
      prompts={prompts}
      copyPromptText={copyPromptText}
      deletePrompt={deletePrompt}
      togglePinPrompt={togglePinPrompt}
      exportPromptsJSON={vi.fn()}
      importPromptsJSON={vi.fn()}
      handleSyncPromptsFromSupabase={vi.fn()}
      diffModalData={null}
      setDiffModalData={vi.fn()}
      variableModalData={null}
      setVariableModalData={vi.fn()}
      showToast={vi.fn()}
      newPost={newPost}
      setNewPost={setNewPost}
      handleAddPost={vi.fn()}
      contentPosts={contentPosts}
      deletePost={vi.fn()}
      ragPersona="general"
      setRagPersona={vi.fn()}
      ragInput=""
      setRagInput={vi.fn()}
      handleAskFirmengehirn={vi.fn()}
      ragLoading={false}
      ragResponse=""
      ragResponseMeta={null}
      applyPromptTemplate={vi.fn()}
      onInsertCustomBlockIntoPrompt={vi.fn()}
      kmuPrompts={[
        { id: 'kmu_1', title: 'Angebots-Nachfassung (Handwerk & KMU)', category: 'Sales', text: 'KMU Text...' }
      ]}
      handleAdoptKmuPrompt={(p) => setPrompts([...prompts, { id: 'p_' + Date.now(), title: p.title, category: p.category, text: p.text }])}
      gopPrompts={[
        { id: 'gop_1', title: 'Market Elasticity Analysis Prompt for ChatGPT', category: 'Strategie', subcategory: 'Market Research', text: 'Elasticity prompt text...', source: 'https://godofprompt.ai' },
        { id: 'gop_2', title: 'Fix Code Errors With Systematic Debugging', category: 'Code', subcategory: 'Debugging', text: 'Debugging prompt text...', source: 'https://godofprompt.ai' }
      ]}
      handleAdoptGopPrompt={(p) => setPrompts([...prompts, { id: 'p_' + Date.now(), title: p.title, category: p.category, text: p.text }])}
      handleImportAllGopPrompts={vi.fn()}
      handleDownloadGopExportJSON={vi.fn()}
    />
  );
};

describe('Prompt Vault Feature - KI-Tresor & Content-Planer', () => {
  it('rendert den Prompt-Vault und die Eingabemaske für neue Prompts', () => {
    render(<PromptVaultTestWrapper />);
    expect(screen.getByText('Prompt Vault (KI-Tresor)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Titel des Prompts...')).toBeInTheDocument();
  });

  it('erstellt erfolgreich einen neuen KI-Prompt', () => {
    render(<PromptVaultTestWrapper />);

    const titleInput = screen.getByPlaceholderText('Titel des Prompts...');
    const contentInput = screen.getByPlaceholderText('Prompt Text... (Nutze {{Variable}} für dynamische Ausfüllfelder)');
    const submitBtn = screen.getByRole('button', { name: /Prompt sichern/i });

    fireEvent.change(titleInput, { target: { value: 'Handwerker Kaltakquise Pitch' } });
    fireEvent.change(contentInput, { target: { value: 'Du bist Vertriebsexperte für Handwerker...' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Handwerker Kaltakquise Pitch')).toBeInTheDocument();
    expect(screen.getByText('Du bist Vertriebsexperte für Handwerker...')).toBeInTheDocument();
  });

  it('filtert gespeicherte Prompts über das Suchfeld', () => {
    const initialPrompts = [
      { id: 'p1', title: 'SEO Blog Post Generator', category: 'Marketing', text: 'Schreibe SEO...' },
      { id: 'p2', title: 'Cold Call Script', category: 'Sales', text: 'Telefonskript...' }
    ];

    render(<PromptVaultTestWrapper initialPrompts={initialPrompts} />);
    expect(screen.getByText('SEO Blog Post Generator')).toBeInTheDocument();
    expect(screen.getByText('Cold Call Script')).toBeInTheDocument();
  });

  it('löscht einen Prompt bei Klick auf den Papierkorb', () => {
    const initialPrompts = [
      { id: 'p_del', title: 'Temporärer Test-Prompt', category: 'Sales', text: 'Inhalt...' }
    ];

    render(<PromptVaultTestWrapper initialPrompts={initialPrompts} />);
    expect(screen.getByText('Temporärer Test-Prompt')).toBeInTheDocument();

    const card = screen.getByText('Temporärer Test-Prompt').closest('.prompt-card');
    const deleteBtn = card.querySelector('button.btn-icon-only');
    expect(deleteBtn).toBeTruthy();

    fireEvent.click(deleteBtn);
    expect(screen.queryByText('Temporärer Test-Prompt')).not.toBeInTheDocument();
  });

  it('wechselt zum God of Prompt Tab und übernimmt eine Vorlage in den Tresor', () => {
    render(<PromptVaultTestWrapper />);
    
    // Switch to God of Prompt tab
    const gopTabBtn = screen.getByRole('button', { name: /God of Prompt/i });
    fireEvent.click(gopTabBtn);

    // Verify GOP prompt is displayed with its subcategory tag
    expect(screen.getByText('Market Elasticity Analysis Prompt for ChatGPT')).toBeInTheDocument();
    expect(screen.getByText('Market Research')).toBeInTheDocument();

    // Click "In meinen Tresor übernehmen"
    const adoptBtns = screen.getAllByRole('button', { name: /In meinen Tresor übernehmen/i });
    fireEvent.click(adoptBtns[0]);

    // Switch back to "Alle" tab and verify the adopted prompt is now in the user's active vault
    const allTabBtn = screen.getByRole('button', { name: /^Alle\s*\(/i });
    fireEvent.click(allTabBtn);

    expect(screen.getByText('Market Elasticity Analysis Prompt for ChatGPT')).toBeInTheDocument();
  });
});
