-- =============================================================================
-- HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)
-- PostgreSQL DDL für Supabase (Region EU-Frankfurt / eu-central-1)
-- Dateiname: 01_schema_harzblitz_orders.sql
-- =============================================================================

-- 1. UUID Erweiterung sicherstellen
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabelle harzblitz_orders
CREATE TABLE IF NOT EXISTS public.harzblitz_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('NOTFALL', 'DRINGEND', 'STANDARD')),
    photo_urls TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('NEU', 'IN_ARBEIT', 'ERLEDIGT')) DEFAULT 'NEU',
    lexoffice_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabellen- und Spaltenkommentare (Dokumentation)
COMMENT ON TABLE public.harzblitz_orders IS 'Notdienst- und Einsatzaufträge der HarzBlitz Notdienst & Gebäudetechnik GmbH Goslar';
COMMENT ON COLUMN public.harzblitz_orders.id IS 'Eindeutige Auftrags-UUID (v4)';
COMMENT ON COLUMN public.harzblitz_orders.customer_name IS 'Vollständiger Kundenname (Vor- und Nachname)';
COMMENT ON COLUMN public.harzblitz_orders.customer_phone IS 'Rückrufnummer im normalisierten E.164-Format (+49...)';
COMMENT ON COLUMN public.harzblitz_orders.address IS 'Einsatzadresse im Großraum Goslar / Landkreis Harz';
COMMENT ON COLUMN public.harzblitz_orders.issue_description IS 'Detaillierte Schadensmeldung (z.B. Rohrbruch, Heizungsausfall)';
COMMENT ON COLUMN public.harzblitz_orders.urgency IS 'Dringlichkeitsstufe: NOTFALL, DRINGEND oder STANDARD';
COMMENT ON COLUMN public.harzblitz_orders.photo_urls IS 'Array von Storage-URLs der über WhatsApp empfangenen Schadensfotos';
COMMENT ON COLUMN public.harzblitz_orders.status IS 'Auftragsstatus: NEU -> IN_ARBEIT -> ERLEDIGT';
COMMENT ON COLUMN public.harzblitz_orders.lexoffice_id IS 'UUID des in Lexoffice generierten Rechnungsentwurfs';
COMMENT ON COLUMN public.harzblitz_orders.created_at IS 'Erstellungszeitpunkt des Auftrags';
COMMENT ON COLUMN public.harzblitz_orders.updated_at IS 'Letzter Änderungszeitpunkt (automatisch via Trigger gepflegt)';

-- 3. Performance & Lookup Indices
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_phone ON public.harzblitz_orders (customer_phone);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_status ON public.harzblitz_orders (status);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_urgency ON public.harzblitz_orders (urgency);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_created ON public.harzblitz_orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_lexoffice_id ON public.harzblitz_orders (lexoffice_id);

-- 4. Automatischer Trigger für updated_at
CREATE OR REPLACE FUNCTION public.handle_harzblitz_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_harzblitz_updated_at ON public.harzblitz_orders;
CREATE TRIGGER trigger_harzblitz_updated_at
BEFORE UPDATE ON public.harzblitz_orders
FOR EACH ROW
EXECUTE FUNCTION public.handle_harzblitz_updated_at();

-- 5. Row Level Security (RLS) aktivieren
ALTER TABLE public.harzblitz_orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Service Role (Backend / n8n / Vapi Webhooks Vollzugriff)
DROP POLICY IF EXISTS "harzblitz_orders_service_role_all" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_service_role_all"
    ON public.harzblitz_orders
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 2: Authenticated Users (Meister Marc Schneider, Disponenten, Monteure)
DROP POLICY IF EXISTS "harzblitz_orders_authenticated_select" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_authenticated_select"
    ON public.harzblitz_orders
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "harzblitz_orders_authenticated_update" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_authenticated_update"
    ON public.harzblitz_orders
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy 3: Anon Role hat standardmäßig KEINEN Zugriff
-- Expliziter DSGVO-Schutz: Anonyme API-Anfragen erhalten 0 Zeilen / 403 Forbidden.
-- Keine SELECT/INSERT/UPDATE Rechte für anon auf public.harzblitz_orders.
