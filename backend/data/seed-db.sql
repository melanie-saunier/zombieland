BEGIN;

-- Réinitialiser les tables
TRUNCATE TABLE 
  "booking_price",
  "booking",
  "price",
  "activity",
  "level",
  "category",
  "user",
  "role"
RESTART IDENTITY CASCADE;

-- Insertion dans les tables
-- ROLES
INSERT INTO role (name) VALUES
  ('member'),
  ('admin'),
  ('super admin');

-- USERS (même mot de passe pour tous les users : P@ssword123456)
INSERT INTO "user" (email, lastname, firstname, password, role_id)
SELECT 'manon.thez@oclock.school', 'Thez', 'Manon', '$argon2id$v=19$m=65536,t=3,p=4$gKBIYhzNHFdrCwiip1N86Q$0JR3AHHzTnfdyNr5ZBU8uUGTpXuqRa0wMV4YwzxwogI', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'melanie.saunier@oclock.school', 'Saunier', 'Mélanie', '$argon2id$v=19$m=65536,t=3,p=4$gKBIYhzNHFdrCwiip1N86Q$0JR3AHHzTnfdyNr5ZBU8uUGTpXuqRa0wMV4YwzxwogI', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'kari.routier@oclock.school', 'Routier', 'Kari', '$argon2id$v=19$m=65536,t=3,p=4$gKBIYhzNHFdrCwiip1N86Q$0JR3AHHzTnfdyNr5ZBU8uUGTpXuqRa0wMV4YwzxwogI', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'maximilien.berbudeau@oclock.school', 'Berbudeau', 'Maximilien', '$argon2id$v=19$m=65536,t=3,p=4$gKBIYhzNHFdrCwiip1N86Q$0JR3AHHzTnfdyNr5ZBU8uUGTpXuqRa0wMV4YwzxwogI', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'octave.lechat@gmail.com', 'Lechat', 'Octave', '$argon2id$v=19$m=65536,t=3,p=4$gKBIYhzNHFdrCwiip1N86Q$0JR3AHHzTnfdyNr5ZBU8uUGTpXuqRa0wMV4YwzxwogI', r.id FROM role r WHERE r.name = 'member';

-- LEVELS
INSERT INTO level (name, value) VALUES
  ('Facile', 1),
  ('Intermédiaire', 2),
  ('Difficile', 3);

-- CATEGORIES
INSERT INTO category (name, color) VALUES
  ('Frissons mécaniques', '#0077AA'),
  ('Instinct de survie', '#C41E3A'),
  ('Réalité inhumaine', '#7A00FF'),
  ('Freak shows', '#8E7200');

-- ACTIVITIES
INSERT INTO activity (name, description, duration, min_height, pregnancy_warning, image_ref, level_id, category_id)
-- Frissons mécaniques
SELECT
  'The grinder',
  'Les visiteurs embarquent dans une machine à broyer les morts-vivants : nacelles rotatives, étincelles de métal, néons roses et verts, cris mécaniques et rires zombifiés en fond sonore. Sensations garanties !',
  5, 140, true, 'the_grinder.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mécaniques'
UNION ALL SELECT
  'NeuroLoop',
  'Un coaster nouvelle génération combiné à la VR : chaque passager "voit" sa propre fuite à travers un tunnel mental de néons et de zombies numériques.',
  5, 130, true, 'neuroloop.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mécaniques'
UNION ALL SELECT
  'Toxic Swamp',
  'Une descente à bord de radeaux dans une rivière de boue verdâtre. Bras de zombies surgissant de l''eau, jets de slime, vapeur phosphorescente et odeur de soufre - fun, sale et inoubliable.',
  5, 120, true, 'toxic_swamp.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mécaniques'
UNION ALL SELECT
  'Vertigo Drop',
  'Montez dans un ascenseur de recherche abandonné... qui chute après une "panne système". Chute libre, flashs verts et violets, et une IA paniquée qui perd la tête à chaque descente.',
  5, 130, true, 'vertigo_drop.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mécaniques'

-- Instinct de survie
UNION ALL SELECT
  'Necropolis',
  'Un cimetière vivant où chaque tombe cache une surprise animatronique. Les visiteurs avancent à la lampe torche dans un décor brumeux et sonore, entre frissons, rires nerveux et jump scares élégants.',
  15, 0, false, 'necropolis.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Outbreak Ops',
  'Equipez-vous et choisissez votre camp : humains ou zombies. Zones de combat post-apocalyptiques, lumière noire, effets de fumée et scoring en temps réel sur bracelets connectés.',
  15, 0, true, 'outbreak_ops.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Target Panic',
  'Un stand futuriste où vous devez viser des têtes de zombies mécaniques avec des pistolets lumineux. Capteurs, sons délires et effets LED à chaque tir réussi.',
  3, 0, false, 'target_panic.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Zombie Races',
  'Course folle dans un labyrinthe brumeux infesté de zombies (acteurs). Votre mission : trouver l''antidote avant les autres équipes. Rires, cris et frissons garantis.',
  15, 0, true, 'zombie_races.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Infection Zero',
  'Explorez le laboratoire où tout a commencé. Résoudre des énigmes, activer des machines, éviter les contaminations... et survivez jusqu''à la désactivation du virus.',
  60, 0, false, 'infection_zero.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Instinct de survie'

-- Réalité inhumaine
UNION ALL SELECT
  'Neon Virus',
  'Plongez dans un monde virtuel électro-zombie : combattez des hordes numériques, esquivez des éclairs verts et traversez un univers psychedelic au rythme d''une bande-son techno.',
  20, 0, false, 'neon_virus.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Réalité inhumaine'
UNION ALL SELECT
  'The Last Transmission',
  'Vous recevez un dernier message d''un survivant. Suivez sa trace en VR à travers des tunnels, drones infecteés et pièges lumineux. Suspense, humour noir et adrénaline.',
  20, 0, false, 'the_last_transmission.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Réalité inhumaine'
UNION ALL SELECT
  'The Core',
  'Un tunnel lumineux et sonore à explorer : capteurs de mouvement, illusions lumineuses, effets sonores 3D, hologrammes de zombies et une fin humoristique inattendue.',
  20, 0, false, 'the_core.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Réalité inhumaine'
UNION ALL SELECT
  'Z-Circuit',
  'Jeux interactifs, simulateurs VR, tirs laser, mini-attractions à points connectés à une appli. Classements en direct : qui sera le meilleur "dézombificateur" ?',
  20, 0, false, 'z_circuit.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Réalité inhumaine'

-- Freak shows
UNION ALL SELECT
  'Rebirth Live Show',
  'Danseurs zombies, lasers verts, beats techno et projections futuristes : un show déjanté entre concert électro et théâtre d''outbreak.',
  45, 0, false, 'rebirth_live_show.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Carnival of the Dead',
  'Un cirque zombie où clowns morts-vivants, acrobates possédés et humour noir se mélangent dans un show aussi drôle qu''inquiétant. Un cabaret apocalyptique à mourir... de rire.',
  30, 0, false, 'carnival_of_the_dead.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Rave of the Dead',
  'Une rave géante chaque soir : DJ set électro-néon, public zombifié, boissons fluo et performers phosphorescents.',
  60, 0, false, 'rave_of_the_dead.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Zombie Glam Lab',
  'Atelier maquillage FX : transformez-vous en zombie fashion avant la soirée ou le photo call. Résultat instantané : "glam-gore" garanti.',
  15, 0, false, 'zombie_glam_lab.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Undead Memories',
  'Scènes photo interactives : bus abandonné, portail du bunker, laboratoire contaminé... et des zombies farceurs qui posent avec vous. Effets UV et humour decalé.',
  15, 0, false, 'undead_memories.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows';


-- PRICE
INSERT INTO price (label, value)
VALUES ('Tarif unique', 30.00);

-- BOOKING
INSERT INTO booking (visit_date, nb_people, status, user_id)
SELECT CURRENT_DATE + INTERVAL '7 days', 4, true, u.id FROM "user" u WHERE u.email = 'octave.lechat@gmail.com'
UNION ALL
SELECT CURRENT_DATE + INTERVAL '7 days', 2, true, u.id FROM "user" u WHERE u.email = 'octave.lechat@gmail.com'
UNION ALL
SELECT CURRENT_DATE + INTERVAL '10 days', 3, false, u.id FROM "user" u WHERE u.email = 'octave.lechat@gmail.com'
UNION ALL
SELECT CURRENT_DATE - INTERVAL '5 days', 2, true, u.id FROM "user" u WHERE u.email = 'octave.lechat@gmail.com';

-- BOOKING_PRICE
INSERT INTO booking_price (applied_price, booking_id, price_id)
SELECT 
  30.00, 
  b.id, 
  p.id
FROM booking b
JOIN "user" u ON b.user_id = u.id
JOIN price p ON p.label = 'Tarif unique'
WHERE u.email = 'octave.lechat@gmail.com';

COMMIT;