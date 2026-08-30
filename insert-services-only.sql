-- Insert Services Only (Simple Version)
-- Delete existing and insert fresh

DELETE FROM services;

INSERT INTO services (id, name, slug, description, published, display_order, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Technology Strategy & Planning', 'technology-strategy', 'Strategic technology planning that aligns with your business objectives and creates competitive advantage.', true, 1, NOW(), NOW()),
(uuid_generate_v4(), 'AI Consulting & Implementation', 'ai-consulting', 'Practical AI consulting focused on real business problems and measurable outcomes, not hype.', true, 2, NOW(), NOW()),
(uuid_generate_v4(), 'Business Process Automation', 'business-automation', 'Intelligent automation that eliminates repetitive work and improves operational efficiency.', true, 3, NOW(), NOW()),
(uuid_generate_v4(), 'Digital Transformation', 'digital-transformation', 'Comprehensive digital transformation that modernizes operations and creates new business capabilities.', true, 4, NOW(), NOW()),
(uuid_generate_v4(), 'Software & Systems Advisory', 'software-systems', 'Expert guidance on software selection, implementation, and optimization.', true, 5, NOW(), NOW()),
(uuid_generate_v4(), 'Technology Advisory Services', 'technology-advisory', 'Ongoing technology advisory and fractional CTO services for growing organizations.', true, 6, NOW(), NOW());

-- Verify
SELECT COUNT(*) as total_services FROM services;
SELECT name, slug, published FROM services ORDER BY display_order;
