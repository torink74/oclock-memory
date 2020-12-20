# Projet O'clock : Memory
***
Hello camarade ! Tu t'apprêtes à décourvir le code d'un jeu ancestral.<br/>
Les règles sont simples; il y a face à toi des cartes retournées. Chaque carte possède un double qu'il faut retrouver afin de former la paire. Si les deux cartes que tu retournes ne sont pas les mêmes, alors elle reviennent face cachée.<br/>Pour gagner, il faut trouver toutes les paires.

### Pour pouvoir y jouer, il faudra suivre ces étapes :

1. Installer composer, il permet de récupérer les libraires définies dans le fichier composer.json :
<br/>https://getcomposer.org/download/
<!-- -->
2. Une fois fait, il faut lancer cette commande à la racine du projet (au même endroit où se trouve le fichier que tu es en train de lire) :<br/>
   `composer install`
<!-- -->
3. Ce jeu fonctionne avec une configuration particulière, il faudra créer un fichier `.env` à la racine du projet.
   <!-- -->
   Ce fichier contient les informations nécessaires pour se connecter à la base de données.
   <!-- -->
   Un exemple des données à fournir est présent dans le fichier : <br/>`.env-default`
 <!-- -->
4. Une base de données est fournie via le fichier `dbexport.sql`.
Il faut importer ces données dans votre base pour que le projet fonctionne.
<!-- -->
5. Il faut configurer le vhost pour que le *documentRoot* pointe vers le dossier **app**.

### Informations complétementaires
Ce jeu utilise Twig pour afficher le contenu HTML.
Twig permet de garder un code HTML propre en ne mélangeant pas du PHP avec du HTML.
https://twig.symfony.com/
<!-- -->
Il est possible de modifier le css et le js en utilisant gulp.
Pour cela, il faut au préalable installer **npm** sur sa machine.
<br/>Ensuite, lancer la commande `npm install` pour installer les différentes librairies présentes dans le fichier "package.json".
<br/>Enfin, installer et lancer la commande **gulp** pour pouvoir modifier les fichiers présents dans `/app/assets/src`. Quand ces fichiers seront modifiés, cela va automatiquement générer les fichiers js et css minifiés et concaténés dans le dossier `/app/assets/dist`. Cette fonctionnalité est dictée par le fichier `gulpfile.js`.
<br/>https://la-cascade.io/gulp-pour-les-debutants/