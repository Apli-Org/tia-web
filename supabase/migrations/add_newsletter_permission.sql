-- Add newsletter permission action
-- This migration adds the "send_newsletter" action and assigns it to all roles except support

-- Insert the new action
INSERT INTO admin_actions (code, name, category, description)
VALUES (
  'send_newsletter',
  'Envoyer des newsletters',
  'newsletter',
  'Permet d''envoyer des emails à tous les abonnés de la newsletter'
);

-- Assign to super_admin role
INSERT INTO admin_role_actions (role_id, action_id)
SELECT
  ar.id as role_id,
  aa.id as action_id
FROM admin_roles ar
CROSS JOIN admin_actions aa
WHERE ar.code = 'super_admin'
  AND aa.code = 'send_newsletter'
  AND NOT EXISTS (
    SELECT 1 FROM admin_role_actions ara
    WHERE ara.role_id = ar.id AND ara.action_id = aa.id
  );

-- Assign to moderator role
INSERT INTO admin_role_actions (role_id, action_id)
SELECT
  ar.id as role_id,
  aa.id as action_id
FROM admin_roles ar
CROSS JOIN admin_actions aa
WHERE ar.code = 'moderator'
  AND aa.code = 'send_newsletter'
  AND NOT EXISTS (
    SELECT 1 FROM admin_role_actions ara
    WHERE ara.role_id = ar.id AND ara.action_id = aa.id
  );

-- Note: support role is intentionally excluded from having this permission
