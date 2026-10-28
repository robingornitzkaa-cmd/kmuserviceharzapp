-- =============================================================================
-- HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)
-- Supabase Storage Bucket Konfiguration & Storage RLS Policies
-- Dateiname: 02_storage_harzblitz_damage_photos.sql
-- =============================================================================

-- 1. Storage Bucket in storage.buckets anlegen bzw. aktualisieren
-- Bucket: harzblitz-damage-photos
-- Maximale Dateigröße: 25 MB (26.214.400 Bytes) für hochauflösende Fotos & kurze MP4-Videos
-- Whitelist für MIME-Types: JPEG, PNG, WEBP, HEIC, MP4, QuickTime (MOV)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'harzblitz-damage-photos',
    'harzblitz-damage-photos',
    false, -- Privater Bucket: Kein anonymer Zugriff zum Schutz von Schadensfotos (DSGVO/GDPR)
    26214400, -- 25 MB
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'video/mp4',
        'video/quicktime'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects RLS Policies für storage.objects

-- Policy 1: Service Role (Vollzugriff für n8n Inbound-Media Pipeline und Backend-Jobs)
DROP POLICY IF EXISTS "harzblitz_storage_service_role_all" ON storage.objects;
CREATE POLICY "harzblitz_storage_service_role_all"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'harzblitz-damage-photos')
    WITH CHECK (bucket_id = 'harzblitz-damage-photos');

-- Policy 2: Authentifizierte Mitarbeiter (Meister Marc Schneider / Monteure) Lesezugriff
DROP POLICY IF EXISTS "harzblitz_storage_authenticated_select" ON storage.objects;
CREATE POLICY "harzblitz_storage_authenticated_select"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'harzblitz-damage-photos');

-- Policy 3: Authentifizierte Mitarbeiter Upload-Rechte (z.B. Nachdokumentation vor Ort)
DROP POLICY IF EXISTS "harzblitz_storage_authenticated_insert" ON storage.objects;
CREATE POLICY "harzblitz_storage_authenticated_insert"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'harzblitz-damage-photos');

-- Policy 4: Öffentlicher Lesezugriff widerrufen (DSGVO-Compliance: keine anonyme Enumeration)
DROP POLICY IF EXISTS "harzblitz_storage_public_select" ON storage.objects;
-- Anonymer Zugriff (anon / public) ist strikt gesperrt. Objektzugriff erfolgt via getSignedUrl() oder service_role.
