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

-- USERS
INSERT INTO "user" (email, lastname, firstname, password, role_id)
SELECT 'manon.thez@oclock.school', 'Thez', 'Manon', 'P@ssword123456', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'melanie.saunier@oclock.school', 'Saunier', 'Mélanie', 'P@ssword123456', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'kari.routier@oclock.school', 'Routier', 'Kari', 'P@ssword123456', r.id FROM role r WHERE r.name = 'admin'
UNION ALL
SELECT 'octave.lechat@gmail.com', 'Lechat', 'Octave', 'P@ssword123456', r.id FROM role r WHERE r.name = 'member';

-- LEVELS
INSERT INTO level (name, value) VALUES
  ('Facile', 1),
  ('Intermédiaire', 2),
  ('Difficile', 3);

-- CATEGORIES
INSERT INTO category (name, color) VALUES
  ('Frissons mécaniques', '#1BE7FF'),
  ('Instinct de survie', '#C41E3A'),
  ('Réalité inhumaine', '#7A00FF'),
  ('Freak shows', '#E3C014');

-- ACTIVITIES
-- ACTIVITIES
INSERT INTO activity (name, description, duration, min_height, pregnancy_warning, image_ref, level_id, category_id)
-- Frissons mécaniques
SELECT
  'The grinder',
  'Les visiteurs embarquent dans une machine a broyer les morts-vivants : nacelles rotatives, etincelles de metal, neons roses et verts, cris mecaniques et rires zombifies en fond sonore. Sensations garanties !',
  5, 140, false, 'the_grinder.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mecaniques'
UNION ALL SELECT
  'NeuroLoop',
  'Un coaster nouvelle generation combine a la VR : chaque passager "voit" sa propre fuite a travers un tunnel mental de neons et de zombies numeriques.',
  4, 130, false, 'neuroloop.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mecaniques'
UNION ALL SELECT
  'Toxic Swamp',
  'Une descente a bord de radeaux dans une riviere de boue verdatre. Bras de zombies surgissant de l''eau, jets de slime, vapeur phosphorescente et odeur de soufre - fun, sale et inoubliable.',
  6, 120, true, 'toxic_swamp.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mecaniques'
UNION ALL SELECT
  'Vertigo Drop',
  'Montez dans un ascenseur de recherche abandonne... qui chute apres une "panne systeme". Chute libre, flashs verts et violets, et une IA paniquee qui perd la tete a chaque descente.',
  5, 130, true, 'vertigo_drop.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Frissons mecaniques'

-- Instinct de survie
UNION ALL SELECT
  'Necropolis',
  'Un cimetiere vivant ou chaque tombe cache une surprise animatronique. Les visiteurs avancent a la lampe torche dans un decor brumeux et sonore, entre frissons, rires nerveux et jump scares elegants.',
  7, 0, false, 'necropolis.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Outbreak Ops',
  'Equipez-vous et choisissez votre camp : humains ou zombies. Zones de combat post-apocalyptiques, lumiere noire, effets de fumee et scoring en temps reel sur bracelets connectes.',
  5, 0, false, 'outbreak_ops.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Target Panic',
  'Un stand futuriste ou vous devez viser des tetes de zombies mecaniques avec des pistolets lumineux. Capteurs, sons delires et effets LED a chaque tir reussi.',
  3, 0, false, 'target_panic.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Zombie Races',
  'Course folle dans un labyrinthe brumeux infeste de zombies (acteurs). Votre mission : trouver l''antidote avant les autres equipes. Rires, cris et frissons garantis.',
  6, 0, false, 'zombie_races.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Instinct de survie'
UNION ALL SELECT
  'Infection Zero',
  'Explorez le laboratoire ou tout a commence. Resoudre des enigmes, activer des machines, eviter les contaminations... et survivez jusqu''a la desactivation du virus.',
  5, 0, false, 'infection_zero.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Instinct de survie'

-- Réalite inhumaine
UNION ALL SELECT
  'Neon Virus',
  'Plongez dans un monde virtuel electro-zombie : combattez des hordes numeriques, esquivez des eclairs verts et traversez un univers psychedelic au rythme d''une bande-son techno.',
  4, 0, false, 'neon_virus.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Realite inhumaine'
UNION ALL SELECT
  'The Last Transmission',
  'Vous recevez un dernier message d''un survivant. Suivez sa trace en VR a travers des tunnels, drones infectes et pieges lumineux. Suspense, humour noir et adrenaline.',
  4, 0, false, 'the_last_transmission.png', l.id, c.id
FROM level l, category c WHERE l.value = 3 AND c.name = 'Realite inhumaine'
UNION ALL SELECT
  'The Core',
  'Un tunnel lumineux et sonore a explorer : capteurs de mouvement, illusions lumineuses, effets sonores 3D, hologrammes de zombies et une fin humoristique inattendue.',
  3, 0, false, 'the_core.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Realite inhumaine'
UNION ALL SELECT
  'Z-Circuit',
  'Jeux interactifs, simulateurs VR, tirs laser, mini-attractions a points connectes a une appli. Classements en direct : qui sera le meilleur "dezombificateur" ?',
  3, 0, false, 'z_circuit.png', l.id, c.id
FROM level l, category c WHERE l.value = 2 AND c.name = 'Realite inhumaine'

-- Freak shows
UNION ALL SELECT
  'Rebirth Live Show',
  'Danseurs zombies, lasers verts, beats techno et projections futuristes : un show dejante entre concert electro et theatre d''outbreak.',
  8, 0, false, 'rebirth_live_show.png',
  l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Carnival of the Dead',
  'Un cirque zombie ou clowns morts-vivants, acrobates possedes et humour noir se melangent dans un show aussi drole qu''inquietant. Un cabaret apocalyptique a mourir... de rire.',
  6, 0, false, 'carnival_of_the_dead.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Rave of the Dead',
  'Une rave geante chaque soir : DJ set electro-neon, public zombifie, boissons fluo et performers phosphorescents.',
  9, 0, false, 'rave_of_the_dead.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Zombie Glam Lab',
  'Atelier maquillage FX : transformez-vous en zombie fashion avant la soiree ou le photo call. Resultat instantane : "glam-gore" garanti.',
  2, 0, false, 'zombie_glam_lab.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows'
UNION ALL SELECT
  'Undead Memories',
  'Scenes photo interactives : bus abandonne, portail du bunker, laboratoire contamine... et des zombies farceurs qui posent avec vous. Effets UV et humour decale.',
  3, 0, false, 'undead_memories.png', l.id, c.id
FROM level l, category c WHERE l.value = 1 AND c.name = 'Freak shows';


-- PRICE
INSERT INTO price (label, value)
VALUES ('Tarif unique', 30.00);

-- BOOKING
INSERT INTO booking (visit_date, nb_people, status, user_id)
SELECT 
  CURRENT_DATE + INTERVAL '7 days', 4, true, u.id
FROM "user" u WHERE u.email = 'octave.lechat@gmail.com';

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