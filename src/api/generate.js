import fs from 'fs';
import crypto from 'crypto';

// 1. Charger les IDs depuis ton fichier customers.json
const customers = JSON.parse(fs.readFileSync('customers.json', 'utf8'));
const customerIds = customers.map(c => c.id);

// 2. Dictionnaires de données
const marques = ['Trek', 'Giant', 'Specialized', 'Cannondale', 'Peugeot', 'B\'Twin', 'Orbea', 'Scott'];
const modeles = ['Domane', 'TCR', 'Roubaix', 'Synapse', 'Legend', 'Triban', 'Orca', 'Addict'];
const couleurs = ['Rouge', 'Noir', 'Blanc', 'Bleu', 'Gris', 'Jaune', 'Vert'];
function randomDate(start, end) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  
  const randomTime = startTime + Math.random() * (endTime - startTime);
  const dateAléatoire = new Date(randomTime);
  
  // Formate la date en JJ/MM/AAAA
  return dateAléatoire.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
// Fonction pour générer un numéro de série entre 8 et 12 caractères
const generateSerialNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.floor(Math.random() * 5) + 8; // 8 à 12
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const bicycles = [];

// 3. Génération des 1000 vélos
for (let i = 0; i < 2000; i++) {
  const marque = marques[Math.floor(Math.random() * marques.length)];
  const modele = modeles[Math.floor(Math.random() * modeles.length)];
  const annee = Math.floor(Math.random() * (2025 - 2010 + 1)) + 2010;
  const couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
  
  // Attribution d'un propriétaire au hasard parmi tes clients
  const owner = customerIds[Math.floor(Math.random() * customerIds.length)];
  
  // Règle des 30% (absence du modèle et de l'année)
  let designation;
  if (Math.random() < 0.3) {
    designation = `${marque} ${couleur}`;
  } else {
    designation = `${marque} ${modele} ${annee} ${couleur}`;
  }

  const changeDate = randomDate('2020-01-01', '2026-09-15')
  const bicycle = {
    id: crypto.randomUUID(),
    designation,
    owner,
    changeDate
  };

  // Numéro de série aléatoire (ajouté dans 80% des cas pour illustrer le côté optionnel)
  if (Math.random() < 0.8) {
    bicycle.serialnumber = generateSerialNumber();
  }

  bicycles.push(bicycle);
}

// 4. Écriture du fichier final
fs.writeFileSync('bicycles.json', JSON.stringify(bicycles, null, 2));
console.log('✅ 1000 vélos ont été générés avec succès dans le fichier bicycles.json !');