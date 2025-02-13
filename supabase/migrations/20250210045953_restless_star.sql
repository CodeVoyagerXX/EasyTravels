/*
  # Initial Schema Setup for Van Hire System

  1. Tables
    - users (handled by Supabase Auth)
    - vehicles
      - Complete vehicle information
      - Inventory tracking
    - bookings
      - Booking records
      - Status tracking
    - payments
      - Payment records
      - Transaction history
    
  2. Security
    - RLS policies for all tables
    - Secure access patterns
*/

-- Vehicles table
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  passenger_capacity integer NOT NULL,
  luggage_capacity text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]',
  price_per_day decimal NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  is_available boolean NOT NULL DEFAULT true,
  maintenance_due timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  vehicle_id uuid REFERENCES vehicles NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  pickup_location text NOT NULL,
  dropoff_location text NOT NULL,
  total_price decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings NOT NULL,
  amount decimal NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  status text NOT NULL,
  payment_method text NOT NULL,
  transaction_id text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Vehicles policies
CREATE POLICY "Vehicles are viewable by everyone"
  ON vehicles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');

-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.user_id = auth.uid()
  ));

CREATE POLICY "Users can create payments for their bookings"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_id
    AND bookings.user_id = auth.uid()
  ));