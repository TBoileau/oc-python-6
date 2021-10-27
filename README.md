![JustStreamIt](assets/images/logo.png)

# JustStreamIt

## Installation
Dans un premier temps, cloner le repository :
```
git clone https://github.com/TBoileau/oc-python-6.git
cd oc-python-6
```

Installer les dépendances et préparer l'environnement de développement :
```
make install
```

*Note : assurez-vous d'avoir bien installé NodeJS (LTS) ainsi que Yarn.*

## Usage
Lancer le serveur de développement :
```
yarn run dev-server
```

Rendez-vous sur [http://localhost:8001](http://localhost:8001).

*Note : N'oubliez pas de lancer en amont le serveur de l'API.*

## Tests
Lancer la suite de tests :
```
make tests
```

*Note : Pour le bon fonctionnement des tests, le serveur HTTP est bouchonné (mock). Vous trouverez dans le dossier `fixtures` les fichiers servies par le serveur HTTP créé spécialement pour les tests.*

## Contribuer
Veuillez prendre un moment pour lire le [guide sur la contribution](CONTRIBUTING.md).

## Changelog
[CHANGELOG.md](CHANGELOG.md) liste tous les changements effectués lors de chaque release.

## À propos
Book To Scrape a été conçu initialement par [Thomas Boileau](https://github.com/TBoileau). 
Ceci est un projet du parcours **Développeur d'application - Python** de la plateforme [Openclassrooms](https://openclassrooms.com/).
Ce projet n'a donc pas vocation a être utilisé.
Si vous avez le moindre question, contactez [Thomas Boileau](mailto:t-boileau@email.com?subject=[Github]%20JustStreamIt)
