Rest :

Glossaire :

API : Acronyme d'Application Programming Interface (interface de programmation d'application), une solution logicielle qui permet à deux applications de communiquer entre elles. Chaque fois que vous utilisez une application comme Facebook, que vous envoyez un message instantané ou que vous consultez la météo sur votre téléphone, vous utilisez une API.
![Texte alternatif](/image_67165953.jpg "Fonctionnement d'une API")

api Rest :

source : https://www.redhat.com/fr/topics/api/what-is-a-rest-api

Middleware (interlogiciel) : Un logiciel qui agit comme une passerelle entre les autres applications, outils et bases de données pour offrir aux utilisateurs des services unifiés.

Sanitize : Sanitizing input in Javascript is **a process of cleaning and validating user-inputed data**. This includes ensuring that data is formatted correctly, removing any malicious code, and eliminating any errors from being entered. It also includes checking for malicious scripts and other forms of attack vectors.

Sequelize : **une bibliothèque ORM basée sur les promesses et spécialisée pour NodeJS**. Le but d'un ORM est de faciliter la manipulation des données stockées dans un système de gestion de bases de données relationnelles au sein des langages de programmation d'objets.

#### Les Routes
##### 1.1/ Articles

| Route | méthode | paramètres | retour | authentification | description | Test |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| /api/articles | GET | aucun | la liste de tous les articles | non | retourner tous les articles | code 200 et liste vide |
| /api/articles | POST | obligatoire : le titre (title), le corps (body) et la description (description) de l'article (article)<br>optionnel : tags de l'article (tagList) | code de retour 201 si ajouté, 422 si non ajouté | par token | ajouter un article à la base de donnée | code 201 et détails de l'article |
| /api/articles/:slug | GET | obligatoire : le titre de l'article (slug) | code 200 et article si trouvé 422 sinon | non | trouver un  article par nom | code 200 et détails de l'article |
| /api/articles/:slug | PATCH | obligatoire : le titre (title)<br>optionnel : corps (body), description (description) de l'article | 201 et article si article mis à jour 422 sinon | par token | modifier (mettre à jour) un article | code 200 et détails de l'article |
| /api/articles/:slug | DELETE | le titre de l'article (slug) | 404 si article non trouvé<br>200 si article supprimé<br>422 pas possible de supprimer | par token | supprimer un article |  |

##### 1.2/ Comments

| Route | méthode | paramètres | retour | authentification | description | Test |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| /:slug/comments | GET | le titre de l'article (slug) | code 201 et liste des commentaire si article valide <br>code 404 si article non trouvé<br>code 422 si impossible | non | voir la liste des commentaires |  |
| /:slug/comments | POST | le titre de l'article (slug)<br>le texte du commentaire (comment) | code 201 et le commentaire si il est ajouté<br>code 422 i il manque des données<br>code 404 si l'article n'est pas trouvé | par token | écrire un commentaire |  |
| /:slug/comments/:id | DELETE | le titre de l'article (slug)<br>l'id du commentaire (id) | code 404 si l'article n'est pas trouvé<br>code 200 si article supprimé<br>code 403 si le commentaire n'appartient pas à l'utilisateur<br>code 422 si imposssible | par token | effacer un commentaie |  |
##### 1.3 / Tag

| Route | méthode | paramètres | retour | authentification | description | Test |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| /api/tags | GET | aucun | code 200 et la liste de tous les tags | non | retourner tous les tags | code 200 et liste vide   |

#### 1.4/ User
| Route | méthode | paramètres | retour | authentification | description | Test |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| /api/users | POST | user avec nom d'utilisateur, email, et mot de passe | code 201 et l'user créé si les paramètres sont corrects. Sinon code 422 et msg erreur | non | Cree un user | code 201 et un user |
| /api/users/login | POST | user avec email et mot de passe | 200 si connection réussi sinon code 401 si l'user avec l'email donnée est trouvé dans la db et 500 sinon | non | Connecte l'utilisateur | code 200 et user avec tocken |
| /api/user | GET | user avec une adresse email | 200 si l'user est trouvé et le retourne sinon 404 et renvoie un msg d'erreur | oui | Récupère l'user a partir de son email | code 200 avec user  |
| /api/user | PATCH | user avec une adresse email et un body avec les modif du user | 200 si l'user est dans la db et le user modifié sinon 401 et msg d'erreur | oui | Modifie l'utilisateur |  |

