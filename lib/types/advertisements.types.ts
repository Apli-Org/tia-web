export type MediaType = 'image' | 'video'

export interface Advertisement {
  id: string
  title: string
  description: string | null
  image_url: string | null
  video_url: string | null
  media_type: MediaType
  target_url: string | null
  is_active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
  created_by: string | null
}

export interface AdvertisementWithStats extends Advertisement {
  impressions_count: number
  clicks_count: number
  unique_users: number
  ctr: number
}

export interface AdImpression {
  id: string
  ad_id: string
  user_id: string | null
  session_id: string | null
  ip_address: string | null
  user_agent: string | null
  page_url: string | null
  created_at: string
}

export interface AdClick {
  id: string
  ad_id: string
  user_id: string | null
  session_id: string | null
  ip_address: string | null
  user_agent: string | null
  referrer: string | null
  created_at: string
  user?: {
    id: string
    email: string
    full_name: string | null
  }
}

export interface AdStats {
  total_impressions: number
  total_clicks: number
  unique_impressions: number
  unique_clicks: number
  ctr: number
  impressions_by_day: { date: string; count: number }[]
  clicks_by_day: { date: string; count: number }[]
  top_referrers: { referrer: string; count: number }[]
  recent_clicks: AdClick[]
}

export interface AdvertisementFilters {
  search?: string
  status?: 'all' | 'active' | 'inactive'
  page?: number
  limit?: number
}

export interface CreateAdvertisementData {
  title: string
  description?: string
  image_url?: string
  video_url?: string
  media_type: MediaType
  target_url?: string
  is_active?: boolean
  start_date?: string
  end_date?: string
}

export interface UpdateAdvertisementData extends Partial<CreateAdvertisementData> {
  id: string
}

export interface AdvertisementListResult {
  data: AdvertisementWithStats[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AdvertisementStatsResult {
  total_ads: number
  active_ads: number
  total_impressions: number
  total_clicks: number
  overall_ctr: number
}
