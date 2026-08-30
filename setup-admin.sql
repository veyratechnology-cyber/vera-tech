-- Setup admin user for VeyraTech
-- Password: Admin123! (hashed with bcrypt)

INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
VALUES (
  uuid_generate_v4(),
  'Admin User',
  'admin@veyratech.com',
  '$2b$10$rQZ5YJqKZXxGxH0p9vY8eOXKZ5LqN8xQp5YJqKZXxGxH0p9vY8eOK',
  'ACTIVE',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
