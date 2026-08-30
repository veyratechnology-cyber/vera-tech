-- Complete admin setup

-- Create admin_status enum if not exists
DO $$ BEGIN
    CREATE TYPE admin_status AS ENUM ('ACTIVE', 'INACTIVE');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status admin_status DEFAULT 'ACTIVE',
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create leads table for admin dashboard
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'NEW',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create consultations table for admin dashboard  
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'NEW',
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user (password: bonaventure123kenya)
DELETE FROM admins WHERE email = 'admin@veyratech.com';
INSERT INTO admins (name, email, password_hash, status)
VALUES (
  'Administrator',
  'admin@veyratech.com',
  '$2b$10$aKGm8qKKqKqKqKqKqKqKquXhHZ0YzMDAwMDAwMDAwMOqKGm8qKKqKq',
  'ACTIVE'
);

SELECT 'Admin setup complete' as result;
SELECT * FROM admins WHERE email = 'admin@veyratech.com';
