-- =============================================
-- ADVERTISEMENTS MANAGEMENT TABLES
-- =============================================

-- 1. Main advertisements table
CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    target_url TEXT,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL
);

-- 2. Ad impressions (views) tracking table
CREATE TABLE IF NOT EXISTS public.ad_impressions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_id UUID NOT NULL REFERENCES public.advertisements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    page_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Ad clicks tracking table
CREATE TABLE IF NOT EXISTS public.ad_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_id UUID NOT NULL REFERENCES public.advertisements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Advertisements indexes
CREATE INDEX IF NOT EXISTS idx_advertisements_is_active ON public.advertisements(is_active);
CREATE INDEX IF NOT EXISTS idx_advertisements_dates ON public.advertisements(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_advertisements_created_at ON public.advertisements(created_at DESC);

-- Impressions indexes
CREATE INDEX IF NOT EXISTS idx_ad_impressions_ad_id ON public.ad_impressions(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_created_at ON public.ad_impressions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_user_id ON public.ad_impressions(user_id) WHERE user_id IS NOT NULL;

-- Clicks indexes
CREATE INDEX IF NOT EXISTS idx_ad_clicks_ad_id ON public.ad_clicks(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_created_at ON public.ad_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_user_id ON public.ad_clicks(user_id) WHERE user_id IS NOT NULL;

-- =============================================
-- AUTO-UPDATE TRIGGER FOR updated_at
-- =============================================

CREATE OR REPLACE FUNCTION update_advertisements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_advertisements_updated_at ON public.advertisements;
CREATE TRIGGER trigger_advertisements_updated_at
    BEFORE UPDATE ON public.advertisements
    FOR EACH ROW
    EXECUTE FUNCTION update_advertisements_updated_at();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_clicks ENABLE ROW LEVEL SECURITY;

-- Advertisements: Admins can manage, public can read active ads
CREATE POLICY "Authenticated users can view active advertisements"
    ON public.advertisements FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Service role can manage all advertisements"
    ON public.advertisements FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Impressions: Anyone can insert, admins can read
CREATE POLICY "Anyone can create impressions"
    ON public.ad_impressions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view impressions"
    ON public.ad_impressions FOR SELECT
    USING (auth.role() = 'authenticated');

-- Clicks: Anyone can insert, admins can read
CREATE POLICY "Anyone can create clicks"
    ON public.ad_clicks FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view clicks"
    ON public.ad_clicks FOR SELECT
    USING (auth.role() = 'authenticated');

-- =============================================
-- ADMIN ACTIONS FOR PERMISSIONS
-- =============================================

INSERT INTO public.admin_actions (code, name, description, category)
VALUES
    ('view_advertisements', 'Voir les publicités', 'Accès à la liste des publicités', 'advertisements'),
    ('manage_advertisements', 'Gérer les publicités', 'Créer, modifier, supprimer des publicités', 'advertisements')
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- STORAGE BUCKET FOR AD IMAGES
-- =============================================
-- Note: Run this in Supabase Dashboard or via API:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('advertisements', 'advertisements', true);

COMMENT ON TABLE public.advertisements IS 'Stores advertisement campaigns with their metadata';
COMMENT ON TABLE public.ad_impressions IS 'Tracks every time an advertisement is viewed';
COMMENT ON TABLE public.ad_clicks IS 'Tracks every click on an advertisement';
