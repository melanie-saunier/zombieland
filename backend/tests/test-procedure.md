# Procédure pour lancer les tests E2E

Cette procédure décrit comment préparer et lancer les tests End-to-End (E2E) pour le projet **Zombieland**.

---

## 1️⃣ Créer la base de données de test

1. Se connecter à PostgreSQL.
2. Créer la base de données `zombieland_test` avec le propriétaire `zombieland` :

```sql
CREATE DATABASE zombieland_test OWNER zombieland;
```

3. Se placer dans le dossier `backend/data`.
4. Créer les tables à l’aide du fichier `create-table.sql` :

```bash
psql postgres://zombieland:zombieland@localhost:5432/zombieland_test -f create-table.sql
```

> ⚙️ Cette étape initialise la structure de la base de données avant l’insertion des données de test.

---

## 2️⃣ Seeder la base de données

1. Se placer dans le dossier `backend/data`.
2. Lancer le seed avec le fichier `seed-db-test.sql` :

```bash
psql postgres://zombieland:zombieland@localhost:5432/zombieland_test -f seed-db-test.sql
```

> ⚠️ Attention : cette opération réinitialise la BDD de test. À chaque nouveau jeu de tests, il faudra reseeder la BDD.

---

## 3️⃣ Lancer les tests E2E

1. Se placer dans le dossier `backend` :

```bash
cd backend
```

2. Lancer les tests avec PNPM :

```bash
pnpm test:e2e
```

* Les tests utiliseront automatiquement la BDD `zombieland_test` grâce au fichier `.env.test`.
* Les logs détaillés des tests s’afficheront dans la console.

---

## 4️⃣ Notes importantes

* Vérifier que le fichier `.env.test` existe à la racine de `backend` et contient bien :

```env
PORT=3001
NODE_ENV=test
PG_URL=postgres://zombieland:zombieland@localhost:5432/zombieland_test
JWT_SECRET=<ton_secret>
```

* Les tests E2E peuvent modifier les données : **toujours reseeder la BDD avant un nouveau lancement**.
* ⚠️ **Ne pas démarrer le back manuellement avant les tests** : il sera lancé automatiquement pendant le processus de test.
