Projet 7 de Open Classroom : Création d'un sites web réseau social type reddit

Langage utilisé : JS, CSS, HTML

Framework : Vue.js, Node.JS et Express

Compétences évaluées :

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL

Etape 1) : MySQL Workbench

Pour ce projet vous aller avoir besoin de MySQL Workbench
Installer le via ce lien : https://www.mysql.com/fr/products/workbench/

Etape 2) : Installation et Set Up 

1-1 set up de la Database :

- Lancer votre server MySQL 

- Utiliser le script disponible dans le dossier /backend/database_installation  sur votre MySQL WorkBENCH

- Creer un ficher .ENV dans le dossier Backend, copier et coller dans le fichier le texte suivant et changer le DB_USER et le DB_PASS avec vos infos:

DB_HOST=localhost
DB_USER=your_databse_user
DB_PASS=your_user_password
DB_NAME=groupomania
TOKEN=hHpK79ZV4N7YAbdj

- Pour acceder au compte ADMIN de groupomania, rentrer les informations suivante dans la page de login

Email:
admin@admin.com

Password:
admin


1-2 installation du Back-end 

- Ouvrer un terminal

- cd backend

- npm install

- nodemon server


1-3 installation du Front

- Ouvrer un deuxieme terminal

- cd frontend

- npm install -g @vue/cli (si vous l'avez pas deja installé de base)

- npm install

- npm run serve



Maintenant plus que a vous connecter ou créer votre compte ! Enjoy



