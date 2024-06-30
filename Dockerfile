# Node image
FROM node:16

# Définition du répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json
COPY backend/package*.json ./

# Installation des dépendances de l'application
RUN npm install

# Copie de tous les fichiers du projet dans le répertoire de travail du conteneur
COPY . .

# Exposition du port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "backend/index.js"]
