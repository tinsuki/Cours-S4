**IUT La Rochelle**
**Dev api**
**Kevin Simon**

# Etape 1 :

### Mise en  place du projet

##### Créer la branche etape01

- Ouvrir le projet dans phpStorm
- cliquer sur la branche en haut à gauche 
- cliquer sur la branche d'où doit partir la nouvelle branche
- sélectionner `New branch from {nom de la branche}`
- entrer le  nom de la nouvelle branche
- appuyer sur le bouton `create`

#### Démarer 

vérifier docker
cd dans le répertoire de la stack
mkdir sfapi
docker compose up --build

vérifier : docker compose ps
```
NAME                    IMAGE                   COMMAND                                          SERVICE    CREATED         STATUS         PORTS                                                                                                                                                                     

r4-01-devapi-database   r4-01-devapi-database   "docker-entrypoint.sh mariadbd"                  database   3 minutes ago   Up 8 seconds   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp                                                                                                                                 

r4-01-devapi-nginx      r4-01-devapi-nginx      "/docker-entrypoint.sh nginx -g 'daemon off;'"   nginx      3 minutes ago   Up 8 seconds   0.0.0.0:8000->80/tcp, :::8000->80/tcp                                                                                                                                     

r4-01-devapi-sfapi      r4-01-devapi-sfapi      "docker-php-entrypoint php-fpm"                  sfapi      3 minutes ago   Up 8 seconds   9000/tcp
```



Créer le projet sfapi:

docker compose exec sfapi bash
pws
composer create-project symfony/skeleton:"6.3.*" sfapi

vérifier le l'execution du projet sfapi
localhost:8000

pousser l'etape 1 :

git add .
git commit -m "etape01 : fin"
git push --set-upstream origin etape01


Support des en-têtes CORS (Cross-Origin Ressource Sharing)
Application Symfony `sfapi`

recettes symfony https://github.com/symfony/recipes/blob/flex/main/RECIPES.md
documentation recettes
https://github.com/symfony/recipes/tree/main/nelmio/cors-bundle/1.5

dans le conteneur sfapi
cd /app/sfapi
composer req cors

git add .
git commit -m "fin install cors"
git push

bilan 

Démarrage du projet : le projet est bien démaré
Installer cors : installation de cors  


# Etape 2 *Créer les entités du modèle de domaine*:

#### 1. créer la branche `etape02` :

#### 2. créer les entités:
- se connecter au conteneur `sfapi`
- `cd /app/sfapi`
- `php bin/console make:entity` -> `  There are no commands defined in the "make" namespace. \n You may be looking for a command provided by the "MakerBundle" which is currently not installed. Try running "composer require symfony/maker-bundle --dev".`
- `composer require symfony/maker-bundle --dev` 
- `php bin/console make:entity`->  `[ERROR] Missing package: to use the make:entity command, run: composer require orm`
- `composer require orm`
- ```Do you want to include Docker configuration from recipes?
    [y] Yes
    [n] No
    [p] Yes permanently, never ask again for this project
    [x] No permanently, never ask again for this project
    (defaults to y): x```
- `php bin/console make:entity`

```
Auteur :
	nom       :    string    not null
	prenom    :    string    not null

Livre :
	titre     :    string    not null
	annee     :    integer   not null 
	auteru    :    Relation ManyToOne, not null, bidirectionnelle
```

vérifier le code source des entités `Auteur et Livre`

#### 3. Créer la migration :

- `php bin/console make:migration` -> `[critical] Error thrown while running command "make:migration". Message: "An exception occurred in the driver: could not find driver"`
- mise à jour du fichier `sfapi/.env` : `DATABASE_URL="mysql://udbsfapi:pdbsfapi@database:3306/dbsfapi?serverVersion=Mariadb-10.10.2"`
- `make:migration` -> `created: migrations/Version20240122163441.php` `Success!`
- `php bin/console d:m:m`


#### Bilan :

- création des entités : entités Auteur et livres crées et ajoutées en base de données