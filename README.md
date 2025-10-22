# 🧟‍♀️ Projet Apothéose — Zombieland

## 🗓️ Planning du projet

| **Sprint** | **Objectif principal** | **Dates** |
|-------------|------------------------|------------|
| **Sprint 0 – Conception** | Cahier des charges, maquettes, choix techniques, répartition des rôles | du **15 au 21 octobre** |
| **Sprint 1 – Mise en place et premières fonctionnalités** | Initialisation du projet, structure GIT, base front/back, premières features | du **22 au 28 octobre** |
| **Sprint 2 – Fonctionnalités (suite)** | Finalisation des fonctionnalités, tests, déploiement, préparation de la soutenance | du **29 octobre au 4 novembre** |

## 🕘 Horaires & Organisation quotidienne

- **Journée de travail :** 9h00 - 12h00 / 13h00 - 17h00  
- **Daily Meeting :** tous les matins à **9h10**  
  - Chacun partage :  
    - Ce qu’il a fait la veille  
    - Ce qu’il prévoit de faire aujourd’hui  
    - Les éventuels blocages

## 🧠 Méthodologie

Le projet suit une méthodologie **Agile / Scrum** avec :

- **Daily meetings** (10-15 min)
- **Organisation en sprints**
- **Rétrospective** à la fin de chaque sprint
- **Revue** et **démo** lors de la fin du sprint 2

## 👨‍💻👩‍💻 Répartition des rôles

| **Rôle** | **Personne** |
|----------|--------------|
| Product owner | ... |
| Scrum master | ... |
| Lead dev front | ... |
| Lead dev back | ... |

## 🌿 Gestion de versions avec Git

### 🌳 Structure des branches

```bash
main
└── develop
├── front
│ ├── feature_header
│ ├── feature_auth
│ └── feature_login
└── back
├── feature_api_users
├── feature_database
└── feature_
```

- **main** → version stable et prête pour la production  
- **develop** → version de développement intégrant les fonctionnalités validées  
- **front / back** → branches dédiées au front-end et back-end  
- **feature_*** → branches de développement d’une fonctionnalité spécifique  

### 🧩 Nommage des branches

> Format : `feature_nomdelafonctionnalite`

Exemples :  

- `feature_login`
- `feature_zombie_api`  
- `feature_dashboard`

## 🪄 Commandes Git utiles

### 🔹 Créer une nouvelle branche

```bash
git checkout -b feature_nomdelabranche
```

### 🔹 Se rendre sur une branche existante

```bash
git checkout nomdelabranche
```

### 🔹 Mettre à jour sa branche depuis `develop`

```bash
git pull origin develop
```

### 🔹 Ajouter, commit et push ses changements

```bash
git add .
git commit -m "feat: ajout du composant de login"
git push origin feature_nomdelabranche
```

### 🔹 Fusionner sa branche dans `develop` (via une Pull Request sur GitHub)

1. Créer une **Pull Request (PR)** vers `develop`  
2. Attendre la **validation et review** d’un pair  
3. Une fois approuvée, **fusionner la PR**  
4. Supprimer la branche *(facultatif mais recommandé)*  

## 💬 Conventions de commits

### 📜 Structure

`type: description courte et claire`

### 🔖 Types disponibles

| **Type** | **Signification** |
|-----------|-------------------|
| **build** | changements liés au système de build ou dépendances |
| **feat** | ajout d’une nouvelle fonctionnalité |
| **fix** | correction d’un bug |
| **perf** | amélioration des performances |
| **refactor** | refonte sans ajout ni suppression de fonctionnalité |
| **style** | modification sans impact fonctionnel (indentation, formatage…) |
| **docs** | ajout ou mise à jour de documentation |
| **test** | ajout ou modification de tests |

### 💡 Exemples de commits

```git
feat: ajout du système d’authentification utilisateur
fix: correction du bug d’affichage du score
refactor: simplification du composant Header
docs: ajout du README du projet
# projet-zombieland
