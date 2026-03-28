
-- Hotels table for listing properties on the platform
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic info
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  
  -- Category & stars
  category TEXT NOT NULL DEFAULT 'Select',
  stars INTEGER NOT NULL DEFAULT 2 CHECK (stars >= 1 AND stars <= 5),
  
  -- Location
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  province TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'Argentina',
  postal_code TEXT NOT NULL DEFAULT '',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Environment
  environment TEXT NOT NULL DEFAULT 'Playa',
  
  -- Capacity
  total_rooms INTEGER NOT NULL DEFAULT 1,
  rooms_for_swap INTEGER NOT NULL DEFAULT 1,
  max_pax_per_room INTEGER NOT NULL DEFAULT 2,
  
  -- Room types (JSON array)
  room_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Amenities (text array)
  amenities TEXT[] NOT NULL DEFAULT '{}',
  
  -- Check-in/out
  check_in_time TEXT NOT NULL DEFAULT '14:00',
  check_out_time TEXT NOT NULL DEFAULT '10:00',
  
  -- Seasons available
  available_seasons TEXT[] NOT NULL DEFAULT '{Media,Baja}',
  
  -- SU per night (base value)
  su_per_night INTEGER NOT NULL DEFAULT 80,
  
  -- Contact
  contact_phone TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  website TEXT,
  
  -- Legal / fiscal
  legal_name TEXT NOT NULL DEFAULT '',
  tax_id TEXT NOT NULL DEFAULT '',
  hotel_registration_number TEXT,
  
  -- Photos (URLs stored in array)
  photos TEXT[] NOT NULL DEFAULT '{}',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  
  -- Highlights
  highlights TEXT[] NOT NULL DEFAULT '{}',
  
  -- Policies
  cancellation_policy TEXT NOT NULL DEFAULT '',
  pet_policy TEXT NOT NULL DEFAULT 'No se admiten mascotas',
  children_policy TEXT NOT NULL DEFAULT 'Se admiten niños',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- Owners can CRUD their own hotels
CREATE POLICY "Users can view their own hotels" ON public.hotels FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own hotels" ON public.hotels FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own hotels" ON public.hotels FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own hotels" ON public.hotels FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Anyone can view verified/published hotels
CREATE POLICY "Anyone can view published hotels" ON public.hotels FOR SELECT TO anon USING (status = 'published' AND is_verified = true);
CREATE POLICY "Authenticated can view published hotels" ON public.hotels FOR SELECT TO authenticated USING (status = 'published' AND is_verified = true);

-- Trigger for updated_at
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON public.hotels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
