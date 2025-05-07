-- Create roles table for more complex role-based permissions
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create role_capabilities table for granular permissions
CREATE TABLE IF NOT EXISTS role_capabilities (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  capability TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role_id, capability)
);

-- Insert default roles
INSERT INTO roles (name, description)
VALUES 
  ('admin', 'Administrator with full access to all features'),
  ('teacher', 'Teacher with access to create content and manage students'),
  ('user', 'Regular user with access to learning features')
ON CONFLICT (name) DO NOTHING;

-- Insert default capabilities for admin role
INSERT INTO role_capabilities (role_id, capability)
VALUES 
  ((SELECT id FROM roles WHERE name = 'admin'), 'manage_users'),
  ((SELECT id FROM roles WHERE name = 'admin'), 'manage_content'),
  ((SELECT id FROM roles WHERE name = 'admin'), 'view_statistics'),
  ((SELECT id FROM roles WHERE name = 'admin'), 'manage_settings')
ON CONFLICT (role_id, capability) DO NOTHING;

-- Insert default capabilities for teacher role
INSERT INTO role_capabilities (role_id, capability)
VALUES 
  ((SELECT id FROM roles WHERE name = 'teacher'), 'create_content'),
  ((SELECT id FROM roles WHERE name = 'teacher'), 'view_student_progress'),
  ((SELECT id FROM roles WHERE name = 'teacher'), 'provide_feedback')
ON CONFLICT (role_id, capability) DO NOTHING;

-- Insert default capabilities for user role
INSERT INTO role_capabilities (role_id, capability)
VALUES 
  ((SELECT id FROM roles WHERE name = 'user'), 'access_learning_tools'),
  ((SELECT id FROM roles WHERE name = 'user'), 'track_progress'),
  ((SELECT id FROM roles WHERE name = 'user'), 'participate_in_community')
ON CONFLICT (role_id, capability) DO NOTHING;

-- Basic RLS policies for roles and role_capabilities
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_capabilities ENABLE ROW LEVEL SECURITY;

-- All users can read roles
CREATE POLICY "All users can read roles" ON roles
  FOR SELECT USING (true);

-- All users can read role_capabilities
CREATE POLICY "All users can read role_capabilities" ON role_capabilities
  FOR SELECT USING (true);

-- Only admins can modify roles
CREATE POLICY "Only admins can modify roles" ON roles
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Only admins can modify role_capabilities
CREATE POLICY "Only admins can modify role_capabilities" ON role_capabilities
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );
