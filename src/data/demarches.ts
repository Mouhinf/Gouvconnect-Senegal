import type { Demarche, Categorie } from '../types';

// Base de données complète et étendue des démarches administratives du Sénégal
export const demarches: Demarche[] = [
  // ÉTAT CIVIL - Démarches complètes
  {
    id: 'acte-naissance',
    titre: 'Demande d\'acte de naissance',
    categorie: 'etat-civil',
    sousCategorie: 'naissance',
    resume: 'Obtenir une copie d\'acte de naissance pour diverses démarches administratives',
    description: 'L\'acte de naissance est un document officiel qui atteste de la naissance d\'une personne sur le territoire sénégalais. Il est indispensable pour de nombreuses démarches administratives comme l\'obtention d\'un passeport, d\'une carte d\'identité, l\'inscription scolaire, le mariage, etc.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Rassembler les documents requis',
        description: 'Préparez votre pièce d\'identité et les informations précises sur la personne concernée (nom, prénom, date et lieu de naissance)',
        dureeEstimee: '15 minutes',
        conseil: 'Vérifiez l\'orthographe exacte des noms avant de vous déplacer'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Se rendre à la mairie',
        description: 'Rendez-vous à la mairie du lieu de naissance ou de résidence avec les documents',
        lieu: 'Mairie du lieu de naissance',
        dureeEstimee: '30 minutes'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Remplir le formulaire',
        description: 'Complétez le formulaire de demande avec les informations exactes',
        dureeEstimee: '10 minutes'
      },
      {
        id: '4',
        numero: 4,
        titre: 'Paiement et retrait',
        description: 'Effectuez le paiement et récupérez votre acte selon les délais annoncés',
        dureeEstimee: '5 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Pièce d\'identité du demandeur',
        type: 'obligatoire',
        description: 'Carte d\'identité nationale ou passeport en cours de validité'
      },
      {
        id: '2',
        nom: 'Justificatif de lien de parenté',
        type: 'selon_cas',
        description: 'Si la demande concerne un tiers (enfant, conjoint, parent)'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Mairie de Dakar',
        valeur: '+221 33 823 23 23',
        horaires: '8h-17h du lundi au vendredi'
      },
      {
        id: '2',
        type: 'email',
        nom: 'Service État Civil',
        valeur: 'etatcivil@mairie-dakar.sn'
      }
    ],
    documentsATelechager: [
      {
        id: '1',
        nom: 'Formulaire de demande d\'acte de naissance',
        type: 'formulaire',
        url: '/documents/formulaire-acte-naissance.pdf',
        format: 'PDF',
        taille: '245 KB'
      }
    ],
    liensExternes: [
      {
        id: '1',
        nom: 'Site officiel de l\'état civil',
        url: 'https://etatcivil.gouv.sn',
        type: 'officiel'
      }
    ],
    delais: '24h à 48h',
    cout: '1 000 FCFA',
    popularite: 150,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['acte', 'naissance', 'état civil', 'mairie', 'document'],
    difficulte: 'facile'
  },
  {
    id: 'acte-mariage',
    titre: 'Demande d\'acte de mariage',
    categorie: 'etat-civil',
    sousCategorie: 'mariage',
    resume: 'Obtenir une copie d\'acte de mariage pour justifier votre situation matrimoniale',
    description: 'L\'acte de mariage atteste de l\'union légale entre deux personnes célébrée devant l\'officier d\'état civil. Ce document est nécessaire pour de nombreuses démarches administratives.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Préparer les informations',
        description: 'Rassemblez les informations sur les époux (noms, prénoms, date et lieu de mariage)',
        dureeEstimee: '10 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Se rendre à la mairie',
        description: 'Allez à la mairie où le mariage a été célébré',
        lieu: 'Mairie du lieu de célébration',
        dureeEstimee: '20 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'Carte d\'identité ou passeport valide'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Service État Civil',
        valeur: '+221 33 823 23 24'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '24h',
    cout: '1 000 FCFA',
    popularite: 85,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['acte', 'mariage', 'état civil', 'union'],
    difficulte: 'facile'
  },
  {
    id: 'acte-deces',
    titre: 'Demande d\'acte de décès',
    categorie: 'etat-civil',
    sousCategorie: 'deces',
    resume: 'Obtenir une copie d\'acte de décès pour les démarches successorales',
    description: 'L\'acte de décès est un document officiel qui atteste du décès d\'une personne. Il est indispensable pour les démarches successorales, d\'assurance et de pension.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Rassembler les informations',
        description: 'Préparez les informations sur le défunt (nom, prénom, date et lieu de décès)',
        dureeEstimee: '15 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Se présenter à la mairie',
        description: 'Rendez-vous à la mairie du lieu de décès',
        lieu: 'Mairie du lieu de décès',
        dureeEstimee: '30 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Pièce d\'identité du demandeur',
        type: 'obligatoire',
        description: 'Carte d\'identité ou passeport valide'
      },
      {
        id: '2',
        nom: 'Justificatif de lien de parenté',
        type: 'obligatoire',
        description: 'Document prouvant le lien avec le défunt'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Service État Civil',
        valeur: '+221 33 823 23 25'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '24h',
    cout: '1 000 FCFA',
    popularite: 65,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['acte', 'décès', 'état civil', 'succession'],
    difficulte: 'facile'
  },

  // PASSEPORT ET VISA - Démarches complètes
  {
    id: 'passeport-ordinaire',
    titre: 'Demande de passeport ordinaire',
    categorie: 'passeport',
    sousCategorie: 'passeport',
    resume: 'Procédure complète pour obtenir un passeport sénégalais ordinaire',
    description: 'Le passeport ordinaire est un document de voyage officiel qui permet aux citoyens sénégalais de voyager à l\'étranger. Il est valable 5 ans et peut être renouvelé.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Constituer le dossier',
        description: 'Rassemblez tous les documents requis et faites les photocopies nécessaires',
        dureeEstimee: '45 minutes',
        conseil: 'Vérifiez que toutes vos photos respectent les normes internationales'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Dépôt du dossier',
        description: 'Déposez votre dossier complet au centre de traitement des passeports',
        lieu: 'Centre de traitement des passeports',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Prise d\'empreintes',
        description: 'Effectuez la prise d\'empreintes digitales et la photo biométrique',
        dureeEstimee: '15 minutes'
      },
      {
        id: '4',
        numero: 4,
        titre: 'Paiement des frais',
        description: 'Réglez les frais de traitement du passeport',
        dureeEstimee: '10 minutes'
      },
      {
        id: '5',
        numero: 5,
        titre: 'Retrait du passeport',
        description: 'Récupérez votre passeport selon les délais annoncés',
        dureeEstimee: '15 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Acte de naissance',
        type: 'obligatoire',
        description: 'Acte de naissance récent (moins de 3 mois)'
      },
      {
        id: '2',
        nom: 'Carte d\'identité nationale',
        type: 'obligatoire',
        description: 'CNI en cours de validité'
      },
      {
        id: '3',
        nom: 'Certificat de résidence',
        type: 'obligatoire',
        description: 'Certificat de résidence récent'
      },
      {
        id: '4',
        nom: 'Photos d\'identité',
        type: 'obligatoire',
        description: '2 photos récentes aux normes internationales'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Centre des passeports Dakar',
        valeur: '+221 33 859 73 00',
        horaires: '8h-16h du lundi au vendredi'
      }
    ],
    documentsATelechager: [
      {
        id: '1',
        nom: 'Formulaire de demande de passeport',
        type: 'formulaire',
        url: '/documents/formulaire-passeport.pdf',
        format: 'PDF',
        taille: '1.2 MB'
      }
    ],
    liensExternes: [
      {
        id: '1',
        nom: 'Site officiel des passeports',
        url: 'https://passeport.gouv.sn',
        type: 'officiel'
      }
    ],
    delais: '15 jours ouvrables',
    cout: '27 000 FCFA',
    popularite: 120,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['passeport', 'voyage', 'document', 'international'],
    difficulte: 'moyenne'
  },
  {
    id: 'visa-touristique',
    titre: 'Demande de visa touristique',
    categorie: 'passeport',
    sousCategorie: 'visa',
    resume: 'Procédure pour obtenir un visa touristique pour voyager à l\'étranger',
    description: 'Le visa touristique permet aux citoyens sénégalais de voyager dans certains pays pour des séjours de courte durée à des fins touristiques.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Choisir la destination',
        description: 'Vérifiez les exigences visa du pays de destination',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Préparer le dossier',
        description: 'Rassemblez tous les documents requis selon le pays',
        dureeEstimee: '2 heures'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt à l\'ambassade',
        description: 'Déposez votre demande à l\'ambassade ou consulat concerné',
        lieu: 'Ambassade/Consulat',
        dureeEstimee: '1 heure'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Passeport valide',
        type: 'obligatoire',
        description: 'Passeport avec au moins 6 mois de validité'
      },
      {
        id: '2',
        nom: 'Formulaire de demande',
        type: 'obligatoire',
        description: 'Formulaire rempli et signé'
      },
      {
        id: '3',
        nom: 'Photos d\'identité',
        type: 'obligatoire',
        description: '2 photos récentes aux normes du pays'
      },
      {
        id: '4',
        nom: 'Justificatifs financiers',
        type: 'obligatoire',
        description: 'Relevés bancaires, attestation de revenus'
      }
    ],
    contacts: [],
    documentsATelechager: [],
    liensExternes: [],
    delais: '5 à 15 jours ouvrables',
    cout: 'Variable selon le pays',
    popularite: 95,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['visa', 'voyage', 'tourisme', 'ambassade'],
    difficulte: 'moyenne'
  },

  // FISCALITÉ - Démarches complètes
  {
    id: 'declaration-impots',
    titre: 'Déclaration d\'impôts sur le revenu',
    categorie: 'fiscalite',
    sousCategorie: 'impots',
    resume: 'Procédure de déclaration annuelle des revenus pour les contribuables',
    description: 'La déclaration d\'impôts est une obligation fiscale annuelle pour tous les contribuables sénégalais. Elle doit être effectuée avant le 30 avril de chaque année.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Rassembler les documents fiscaux',
        description: 'Collectez tous vos justificatifs de revenus et charges déductibles',
        dureeEstimee: '2 heures'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Remplir la déclaration',
        description: 'Complétez le formulaire de déclaration en ligne ou sur papier',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Soumettre la déclaration',
        description: 'Déposez votre déclaration avant la date limite',
        dureeEstimee: '30 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Bulletins de salaire',
        type: 'obligatoire',
        description: 'Tous les bulletins de l\'année fiscale'
      },
      {
        id: '2',
        nom: 'Relevés bancaires',
        type: 'obligatoire',
        description: 'Relevés des comptes bancaires'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Direction Générale des Impôts',
        valeur: '+221 33 889 35 00'
      }
    ],
    documentsATelechager: [
      {
        id: '1',
        nom: 'Formulaire de déclaration',
        type: 'formulaire',
        url: '/documents/declaration-impots.pdf',
        format: 'PDF'
      }
    ],
    liensExternes: [
      {
        id: '1',
        nom: 'Portail fiscal en ligne',
        url: 'https://impots.gouv.sn',
        type: 'officiel'
      }
    ],
    delais: 'Avant le 30 avril',
    cout: 'Gratuit',
    popularite: 95,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['impôts', 'déclaration', 'fiscalité', 'revenus'],
    difficulte: 'moyenne'
  },
  {
    id: 'patente-commerciale',
    titre: 'Demande de patente commerciale',
    categorie: 'fiscalite',
    sousCategorie: 'patente',
    resume: 'Obtenir une licence d\'exploitation commerciale pour exercer une activité',
    description: 'La patente est une autorisation fiscale obligatoire pour exercer une activité commerciale, industrielle ou artisanale au Sénégal.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Définir l\'activité',
        description: 'Précisez la nature exacte de votre activité commerciale',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Constituer le dossier',
        description: 'Rassemblez tous les documents requis',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt et paiement',
        description: 'Déposez le dossier et payez les frais de patente',
        lieu: 'Centre des impôts',
        dureeEstimee: '45 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Formulaire de demande',
        type: 'obligatoire',
        description: 'Formulaire dûment rempli et signé'
      },
      {
        id: '2',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'CNI ou passeport du demandeur'
      },
      {
        id: '3',
        nom: 'Justificatif de domicile',
        type: 'obligatoire',
        description: 'Facture d\'électricité ou certificat de résidence'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Centre des Impôts',
        valeur: '+221 33 889 35 01'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '7 jours ouvrables',
    cout: 'Variable selon l\'activité',
    popularite: 80,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['patente', 'commerce', 'licence', 'activité'],
    difficulte: 'moyenne'
  },

  // ENTREPRISES - Démarches complètes
  {
    id: 'creation-entreprise',
    titre: 'Création d\'entreprise individuelle',
    categorie: 'entreprises',
    sousCategorie: 'creation',
    resume: 'Formalités complètes pour créer une entreprise individuelle au Sénégal',
    description: 'Guide complet pour créer votre entreprise individuelle et obtenir tous les documents nécessaires pour démarrer votre activité en toute légalité.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Choisir la dénomination',
        description: 'Vérifiez la disponibilité du nom de votre entreprise',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Constituer le dossier',
        description: 'Rassemblez tous les documents requis',
        dureeEstimee: '2 heures'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt au CFE',
        description: 'Déposez votre dossier au Centre de Formalités des Entreprises',
        lieu: 'CFE - APIX',
        dureeEstimee: '1 heure'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Formulaire M0',
        type: 'obligatoire',
        description: 'Formulaire de déclaration de création'
      },
      {
        id: '2',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'CNI ou passeport du dirigeant'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'APIX - CFE',
        valeur: '+221 33 849 05 55'
      }
    ],
    documentsATelechager: [],
    liensExternes: [
      {
        id: '1',
        nom: 'Site APIX',
        url: 'https://investinsenegal.com',
        type: 'officiel'
      }
    ],
    delais: '48 heures',
    cout: '25 000 FCFA',
    popularite: 110,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['entreprise', 'création', 'business', 'formalités'],
    difficulte: 'moyenne'
  },
  {
    id: 'modification-entreprise',
    titre: 'Modification d\'entreprise',
    categorie: 'entreprises',
    sousCategorie: 'modification',
    resume: 'Procédure pour modifier les statuts ou informations d\'une entreprise',
    description: 'Guide pour effectuer des modifications statutaires de votre entreprise (changement d\'adresse, d\'activité, de capital, etc.).',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Identifier les modifications',
        description: 'Listez précisément les éléments à modifier',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Préparer les documents',
        description: 'Rassemblez les justificatifs des modifications',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt de la demande',
        description: 'Déposez le dossier au CFE',
        lieu: 'CFE - APIX',
        dureeEstimee: '45 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Formulaire de modification',
        type: 'obligatoire',
        description: 'Formulaire M2 dûment rempli'
      },
      {
        id: '2',
        nom: 'Justificatifs des modifications',
        type: 'obligatoire',
        description: 'Documents prouvant les changements'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'APIX - CFE',
        valeur: '+221 33 849 05 55'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '72 heures',
    cout: '15 000 FCFA',
    popularite: 70,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['modification', 'entreprise', 'statuts', 'changement'],
    difficulte: 'moyenne'
  },

  // ÉDUCATION - Démarches complètes
  {
    id: 'inscription-universite',
    titre: 'Inscription à l\'université publique',
    categorie: 'education',
    sousCategorie: 'superieur',
    resume: 'Procédure d\'inscription dans les universités publiques du Sénégal',
    description: 'Guide complet pour s\'inscrire dans les universités publiques sénégalaises (UCAD, UGB, UASZ, etc.).',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Vérifier les conditions d\'admission',
        description: 'Consultez les critères d\'admission de la filière choisie',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Constituer le dossier',
        description: 'Rassemblez tous les documents requis',
        dureeEstimee: '2 heures'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt du dossier',
        description: 'Déposez votre dossier dans les délais',
        lieu: 'Université choisie',
        dureeEstimee: '1 heure'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Diplôme du baccalauréat',
        type: 'obligatoire',
        description: 'Original et photocopie du baccalauréat'
      },
      {
        id: '2',
        nom: 'Relevé de notes du bac',
        type: 'obligatoire',
        description: 'Relevé de notes officiel'
      },
      {
        id: '3',
        nom: 'Acte de naissance',
        type: 'obligatoire',
        description: 'Acte de naissance récent'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'UCAD - Scolarité',
        valeur: '+221 33 824 23 79'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: 'Selon calendrier universitaire',
    cout: '36 000 FCFA',
    popularite: 75,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['université', 'inscription', 'éducation', 'études'],
    difficulte: 'moyenne'
  },
  {
    id: 'bourse-etudes',
    titre: 'Demande de bourse d\'études',
    categorie: 'education',
    sousCategorie: 'bourses',
    resume: 'Procédure pour obtenir une bourse d\'études supérieures',
    description: 'Guide pour demander une bourse d\'études auprès du Ministère de l\'Enseignement Supérieur du Sénégal.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Vérifier l\'éligibilité',
        description: 'Consultez les critères d\'attribution des bourses',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Remplir le dossier',
        description: 'Complétez le formulaire de demande de bourse',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Soumettre la demande',
        description: 'Déposez votre dossier dans les délais',
        lieu: 'Direction des Bourses',
        dureeEstimee: '30 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Formulaire de demande',
        type: 'obligatoire',
        description: 'Formulaire officiel dûment rempli'
      },
      {
        id: '2',
        nom: 'Relevés de notes',
        type: 'obligatoire',
        description: 'Relevés des 3 dernières années'
      },
      {
        id: '3',
        nom: 'Certificat de scolarité',
        type: 'obligatoire',
        description: 'Certificat de l\'établissement actuel'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Direction des Bourses',
        valeur: '+221 33 849 56 78'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '3 mois',
    cout: 'Gratuit',
    popularite: 90,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['bourse', 'études', 'financement', 'étudiant'],
    difficulte: 'moyenne'
  },

  // SANTÉ - Démarches complètes
  {
    id: 'carte-sesame',
    titre: 'Demande de carte Sésame',
    categorie: 'sante',
    sousCategorie: 'assurance',
    resume: 'Obtenir la carte d\'assurance maladie universelle Sésame',
    description: 'La carte Sésame permet l\'accès aux soins de santé dans le cadre de la couverture maladie universelle du Sénégal.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Constituer le dossier',
        description: 'Rassemblez les documents requis',
        dureeEstimee: '30 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Dépôt de la demande',
        description: 'Déposez votre dossier au centre Sésame',
        lieu: 'Centre Sésame',
        dureeEstimee: '45 minutes'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Retrait de la carte',
        description: 'Récupérez votre carte selon les délais',
        dureeEstimee: '15 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Carte d\'identité',
        type: 'obligatoire',
        description: 'CNI en cours de validité'
      },
      {
        id: '2',
        nom: 'Certificat de résidence',
        type: 'obligatoire',
        description: 'Certificat de résidence récent'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Centre Sésame',
        valeur: '+221 33 889 67 89'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '7 jours',
    cout: '2 000 FCFA',
    popularite: 90,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['santé', 'assurance', 'sésame', 'couverture'],
    difficulte: 'facile'
  },
  {
    id: 'certificat-medical',
    titre: 'Demande de certificat médical',
    categorie: 'sante',
    sousCategorie: 'certificats',
    resume: 'Obtenir un certificat médical pour diverses démarches',
    description: 'Le certificat médical est un document officiel délivré par un médecin attestant de l\'état de santé d\'une personne.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Prendre rendez-vous',
        description: 'Prenez rendez-vous avec un médecin agréé',
        dureeEstimee: '10 minutes'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Consultation médicale',
        description: 'Effectuez la consultation et les examens requis',
        lieu: 'Cabinet médical',
        dureeEstimee: '30 minutes'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Délivrance du certificat',
        description: 'Récupérez votre certificat médical',
        dureeEstimee: '5 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'CNI ou passeport'
      },
      {
        id: '2',
        nom: 'Carnet de santé',
        type: 'optionnel',
        description: 'Si disponible'
      }
    ],
    contacts: [],
    documentsATelechager: [],
    liensExternes: [],
    delais: 'Immédiat',
    cout: '5 000 à 10 000 FCFA',
    popularite: 85,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['certificat', 'médical', 'santé', 'médecin'],
    difficulte: 'facile'
  },

  // TRANSPORT - Démarches complètes
  {
    id: 'permis-conduire',
    titre: 'Demande de permis de conduire',
    categorie: 'transport',
    sousCategorie: 'permis',
    resume: 'Procédure complète pour obtenir le permis de conduire au Sénégal',
    description: 'Guide détaillé pour passer et obtenir votre permis de conduire sénégalais, incluant la formation théorique et pratique.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Inscription en auto-école',
        description: 'Choisissez une auto-école agréée et inscrivez-vous',
        dureeEstimee: '1 heure'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Formation théorique',
        description: 'Suivez les cours de code de la route',
        dureeEstimee: '20 heures'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Examen théorique',
        description: 'Passez l\'examen du code de la route',
        dureeEstimee: '1 heure'
      },
      {
        id: '4',
        numero: 4,
        titre: 'Formation pratique',
        description: 'Effectuez les heures de conduite obligatoires',
        dureeEstimee: '20 heures'
      },
      {
        id: '5',
        numero: 5,
        titre: 'Examen pratique',
        description: 'Passez l\'épreuve de conduite',
        dureeEstimee: '30 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Certificat médical',
        type: 'obligatoire',
        description: 'Certificat d\'aptitude physique à la conduite'
      },
      {
        id: '2',
        nom: 'Photos d\'identité',
        type: 'obligatoire',
        description: '4 photos récentes'
      },
      {
        id: '3',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'CNI ou passeport'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Direction des Transports Terrestres',
        valeur: '+221 33 823 45 67'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '2 à 3 mois',
    cout: '85 000 FCFA (formation incluse)',
    popularite: 105,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['permis', 'conduire', 'transport', 'auto-école'],
    difficulte: 'difficile'
  },
  {
    id: 'carte-grise',
    titre: 'Demande de carte grise',
    categorie: 'transport',
    sousCategorie: 'vehicules',
    resume: 'Procédure pour immatriculer un véhicule et obtenir la carte grise',
    description: 'La carte grise est le document officiel d\'immatriculation d\'un véhicule. Elle est obligatoire pour circuler légalement.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Contrôle technique',
        description: 'Effectuez le contrôle technique du véhicule',
        lieu: 'Centre de contrôle technique',
        dureeEstimee: '1 heure'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Constituer le dossier',
        description: 'Rassemblez tous les documents requis',
        dureeEstimee: '30 minutes'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt de la demande',
        description: 'Déposez votre dossier au service des mines',
        lieu: 'Service des Mines',
        dureeEstimee: '45 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Certificat de dédouanement',
        type: 'obligatoire',
        description: 'Pour véhicule importé'
      },
      {
        id: '2',
        nom: 'Contrôle technique',
        type: 'obligatoire',
        description: 'Certificat de contrôle technique valide'
      },
      {
        id: '3',
        nom: 'Pièce d\'identité',
        type: 'obligatoire',
        description: 'CNI du propriétaire'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Service des Mines',
        valeur: '+221 33 823 78 90'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '7 jours ouvrables',
    cout: '25 000 FCFA',
    popularite: 75,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['carte grise', 'immatriculation', 'véhicule', 'transport'],
    difficulte: 'moyenne'
  },

  // LOGEMENT - Démarches complètes
  {
    id: 'titre-foncier',
    titre: 'Demande de titre foncier',
    categorie: 'logement',
    sousCategorie: 'foncier',
    resume: 'Procédure pour obtenir un titre de propriété foncière',
    description: 'Le titre foncier est le document officiel qui atteste de la propriété d\'un terrain. Il est délivré après immatriculation foncière.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Délimitation du terrain',
        description: 'Faites délimiter votre terrain par un géomètre',
        lieu: 'Sur le terrain',
        dureeEstimee: '2 heures'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Dépôt de la demande',
        description: 'Déposez votre demande d\'immatriculation',
        lieu: 'Conservation foncière',
        dureeEstimee: '1 heure'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Enquête publique',
        description: 'Période d\'enquête publique et d\'opposition',
        dureeEstimee: '2 mois'
      },
      {
        id: '4',
        numero: 4,
        titre: 'Délivrance du titre',
        description: 'Retrait du titre foncier définitif',
        dureeEstimee: '30 minutes'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Plan de délimitation',
        type: 'obligatoire',
        description: 'Plan établi par un géomètre agréé'
      },
      {
        id: '2',
        nom: 'Acte de vente',
        type: 'obligatoire',
        description: 'Acte notarié d\'acquisition'
      },
      {
        id: '3',
        nom: 'Certificat de non-opposition',
        type: 'obligatoire',
        description: 'Délivré par la mairie'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Conservation Foncière',
        valeur: '+221 33 823 89 12'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '6 à 12 mois',
    cout: '150 000 à 300 000 FCFA',
    popularite: 60,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['titre foncier', 'propriété', 'terrain', 'immatriculation'],
    difficulte: 'difficile'
  },
  {
    id: 'permis-construire',
    titre: 'Demande de permis de construire',
    categorie: 'logement',
    sousCategorie: 'construction',
    resume: 'Obtenir l\'autorisation de construire un bâtiment',
    description: 'Le permis de construire est une autorisation administrative obligatoire pour toute construction nouvelle ou modification importante.',
    etapes: [
      {
        id: '1',
        numero: 1,
        titre: 'Élaboration des plans',
        description: 'Faites établir les plans par un architecte',
        dureeEstimee: '2 semaines'
      },
      {
        id: '2',
        numero: 2,
        titre: 'Constitution du dossier',
        description: 'Rassemblez tous les documents techniques',
        dureeEstimee: '1 semaine'
      },
      {
        id: '3',
        numero: 3,
        titre: 'Dépôt de la demande',
        description: 'Déposez le dossier à la mairie',
        lieu: 'Mairie',
        dureeEstimee: '1 heure'
      },
      {
        id: '4',
        numero: 4,
        titre: 'Instruction du dossier',
        description: 'Examen technique par les services',
        dureeEstimee: '2 mois'
      }
    ],
    documentsRequis: [
      {
        id: '1',
        nom: 'Plans architecturaux',
        type: 'obligatoire',
        description: 'Plans établis par un architecte agréé'
      },
      {
        id: '2',
        nom: 'Titre foncier',
        type: 'obligatoire',
        description: 'Titre de propriété du terrain'
      },
      {
        id: '3',
        nom: 'Étude de sol',
        type: 'obligatoire',
        description: 'Étude géotechnique du terrain'
      }
    ],
    contacts: [
      {
        id: '1',
        type: 'telephone',
        nom: 'Service Urbanisme',
        valeur: '+221 33 823 45 78'
      }
    ],
    documentsATelechager: [],
    liensExternes: [],
    delais: '2 à 3 mois',
    cout: '50 000 à 100 000 FCFA',
    popularite: 55,
    dateCreation: '2024-01-15',
    dateMiseAJour: '2024-01-15',
    version: '1.0',
    statut: 'actif',
    motsCles: ['permis de construire', 'construction', 'bâtiment', 'urbanisme'],
    difficulte: 'difficile'
  }
];

export const categories: Categorie[] = [
  {
    id: 'etat-civil',
    nom: 'État Civil',
    description: 'Actes de naissance, mariage, décès et autres documents d\'état civil essentiels pour vos démarches administratives',
    icone: 'Users',
    couleur: '#3B82F6',
    sousCategories: [
      { 
        id: 'naissance', 
        nom: 'Actes de naissance', 
        description: 'Demande et renouvellement d\'actes de naissance, copies conformes et extraits' 
      },
      { 
        id: 'mariage', 
        nom: 'Actes de mariage', 
        description: 'Procédures de mariage civil, actes de mariage et certificats de célibat' 
      },
      { 
        id: 'deces', 
        nom: 'Actes de décès', 
        description: 'Déclaration de décès, actes de décès et formalités successorales' 
      },
      { 
        id: 'adoption', 
        nom: 'Adoption', 
        description: 'Procédures d\'adoption, actes d\'adoption et changement de filiation' 
      },
      { 
        id: 'reconnaissance', 
        nom: 'Reconnaissance', 
        description: 'Reconnaissance de paternité, légitimation et rectifications d\'état civil' 
      }
    ],
    ordre: 1,
    nombreDemarches: 15
  },
  {
    id: 'passeport',
    nom: 'Passeport & Voyages',
    description: 'Documents de voyage, passeports, visas et autorisations pour vos déplacements à l\'étranger',
    icone: 'Plane',
    couleur: '#059669',
    sousCategories: [
      { 
        id: 'passeport', 
        nom: 'Passeport ordinaire', 
        description: 'Demande, renouvellement et remplacement de passeport ordinaire' 
      },
      { 
        id: 'passeport-diplomatique', 
        nom: 'Passeport diplomatique', 
        description: 'Passeport diplomatique et de service pour les agents de l\'État' 
      },
      { 
        id: 'visa', 
        nom: 'Visas', 
        description: 'Demandes de visa touristique, d\'affaires et de transit' 
      },
      { 
        id: 'laissez-passer', 
        nom: 'Laissez-passer', 
        description: 'Document de voyage temporaire et laissez-passer d\'urgence' 
      },
      { 
        id: 'autorisation-sortie', 
        nom: 'Autorisation de sortie', 
        description: 'Autorisation de sortie du territoire pour mineurs' 
      }
    ],
    ordre: 2,
    nombreDemarches: 12
  },
  {
    id: 'fiscalite',
    nom: 'Fiscalité & Impôts',
    description: 'Déclarations fiscales, impôts, taxes et obligations fiscales pour particuliers et entreprises',
    icone: 'Calculator',
    couleur: '#DC2626',
    sousCategories: [
      { 
        id: 'impots-revenus', 
        nom: 'Impôts sur le revenu', 
        description: 'Déclaration annuelle, acomptes et régularisation des impôts' 
      },
      { 
        id: 'patente', 
        nom: 'Patente commerciale', 
        description: 'Licence d\'exploitation commerciale et industrielle' 
      },
      { 
        id: 'tva', 
        nom: 'TVA', 
        description: 'Taxe sur la valeur ajoutée, déclarations et remboursements' 
      },
      { 
        id: 'impots-fonciers', 
        nom: 'Impôts fonciers', 
        description: 'Contribution foncière sur les propriétés bâties et non bâties' 
      },
      { 
        id: 'droits-douane', 
        nom: 'Droits de douane', 
        description: 'Formalités douanières et droits d\'importation/exportation' 
      },
      { 
        id: 'certificats-fiscaux', 
        nom: 'Certificats fiscaux', 
        description: 'Quitus fiscal, attestations de non-redevance et certificats' 
      }
    ],
    ordre: 3,
    nombreDemarches: 18
  },
  {
    id: 'entreprises',
    nom: 'Entreprises & Commerce',
    description: 'Création, gestion et formalités d\'entreprises, commerce et activités économiques',
    icone: 'Building2',
    couleur: '#7C3AED',
    sousCategories: [
      { 
        id: 'creation', 
        nom: 'Création d\'entreprise', 
        description: 'Formalités de création, immatriculation et démarrage d\'activité' 
      },
      { 
        id: 'modification', 
        nom: 'Modifications statutaires', 
        description: 'Changements d\'adresse, d\'activité, de capital et de dirigeants' 
      },
      { 
        id: 'fermeture', 
        nom: 'Cessation d\'activité', 
        description: 'Fermeture d\'entreprise, liquidation et radiation' 
      },
      { 
        id: 'licences', 
        nom: 'Licences et autorisations', 
        description: 'Autorisations sectorielles et licences d\'exploitation' 
      },
      { 
        id: 'registre-commerce', 
        nom: 'Registre du commerce', 
        description: 'Inscription, modifications et extraits du registre' 
      },
      { 
        id: 'propriete-industrielle', 
        nom: 'Propriété industrielle', 
        description: 'Brevets, marques et dessins industriels' 
      }
    ],
    ordre: 4,
    nombreDemarches: 22
  },
  {
    id: 'education',
    nom: 'Éducation & Formation',
    description: 'Inscriptions scolaires, universitaires, bourses d\'études et formations professionnelles',
    icone: 'GraduationCap',
    couleur: '#F59E0B',
    sousCategories: [
      { 
        id: 'primaire', 
        nom: 'Enseignement primaire', 
        description: 'Inscriptions dans les écoles primaires publiques et privées' 
      },
      { 
        id: 'secondaire', 
        nom: 'Enseignement secondaire', 
        description: 'Inscriptions dans les collèges et lycées' 
      },
      { 
        id: 'superieur', 
        nom: 'Enseignement supérieur', 
        description: 'Universités, grandes écoles et instituts supérieurs' 
      },
      { 
        id: 'bourses', 
        nom: 'Bourses d\'études', 
        description: 'Bourses nationales et internationales pour étudiants' 
      },
      { 
        id: 'formation-professionnelle', 
        nom: 'Formation professionnelle', 
        description: 'Centres de formation et apprentissage professionnel' 
      },
      { 
        id: 'equivalences', 
        nom: 'Équivalences de diplômes', 
        description: 'Reconnaissance et équivalence de diplômes étrangers' 
      }
    ],
    ordre: 5,
    nombreDemarches: 16
  },
  {
    id: 'sante',
    nom: 'Santé & Protection Sociale',
    description: 'Assurance maladie, couverture sanitaire, certificats médicaux et services de santé',
    icone: 'Heart',
    couleur: '#EF4444',
    sousCategories: [
      { 
        id: 'assurance-maladie', 
        nom: 'Assurance maladie', 
        description: 'Couverture maladie universelle et mutuelles de santé' 
      },
      { 
        id: 'certificats-medicaux', 
        nom: 'Certificats médicaux', 
        description: 'Certificats d\'aptitude, de non-contagion et médicaux divers' 
      },
      { 
        id: 'carnet-sante', 
        nom: 'Carnet de santé', 
        description: 'Délivrance et renouvellement du carnet de santé' 
      },
      { 
        id: 'vaccinations', 
        nom: 'Vaccinations', 
        description: 'Certificats de vaccination et carnets de vaccination' 
      },
      { 
        id: 'handicap', 
        nom: 'Handicap', 
        description: 'Cartes d\'invalidité et allocations pour personnes handicapées' 
      }
    ],
    ordre: 6,
    nombreDemarches: 13
  },
  {
    id: 'transport',
    nom: 'Transport & Circulation',
    description: 'Permis de conduire, immatriculation des véhicules et transport public',
    icone: 'Car',
    couleur: '#8B5CF6',
    sousCategories: [
      { 
        id: 'permis-conduire', 
        nom: 'Permis de conduire', 
        description: 'Obtention, renouvellement et duplicata du permis de conduire' 
      },
      { 
        id: 'immatriculation', 
        nom: 'Immatriculation véhicules', 
        description: 'Cartes grises, changement de propriétaire et duplicata' 
      },
      { 
        id: 'controle-technique', 
        nom: 'Contrôle technique', 
        description: 'Contrôle technique obligatoire et contre-visite' 
      },
      { 
        id: 'transport-public', 
        nom: 'Transport public', 
        description: 'Licences de transport et autorisations de circulation' 
      },
      { 
        id: 'infractions', 
        nom: 'Infractions routières', 
        description: 'Contraventions, amendes et récupération de points' 
      }
    ],
    ordre: 7,
    nombreDemarches: 14
  },
  {
    id: 'logement',
    nom: 'Logement & Urbanisme',
    description: 'Titres fonciers, permis de construire, urbanisme et gestion immobilière',
    icone: 'Home',
    couleur: '#10B981',
    sousCategories: [
      { 
        id: 'titres-fonciers', 
        nom: 'Titres fonciers', 
        description: 'Immatriculation foncière et titres de propriété' 
      },
      { 
        id: 'permis-construire', 
        nom: 'Permis de construire', 
        description: 'Autorisations de construire et de lotir' 
      },
      { 
        id: 'urbanisme', 
        nom: 'Urbanisme', 
        description: 'Plans d\'urbanisme et certificats d\'urbanisme' 
      },
      { 
        id: 'logement-social', 
        nom: 'Logement social', 
        description: 'Demandes de logement social et allocations logement' 
      },
      { 
        id: 'copropriete', 
        nom: 'Copropriété', 
        description: 'Gestion de copropriété et syndics' 
      }
    ],
    ordre: 8,
    nombreDemarches: 11
  }
];