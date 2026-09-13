import axios from 'axios';

const CLE_API_GEMINI = 'AQ.Ab8RN6Jmxhrqk5GerxRD7suRDkdkNn7ivzlpjOF7Gt_rjB-GBg'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent`

const getBicyclePartsFromPicture = async (picture: string, mimeType: string) => {
  try {
    const reponse = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: 'Identifie positivement les composants du vélo présents sur cette photo (dérailleur, levier de frein, etc.). ' +
              'Pour chaque composant trouvé, liste uniquement la marque et le modèle. ' +
              'Ne fais aucun commentaire sur l\'état des composants en question. ' 
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: picture
              }
            },
            
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY", // On attend une liste (un tableau)
          description: "Liste des composants de vélo identifiés positivement",
          items: {
            type: "OBJECT",
            properties: {
              composant: { 
                type: "STRING", 
                description: "Le nom du composant (ex: dérailleur arrière, levier de frein, étrier, cassette)" 
              },
              marque: { 
                type: "STRING", 
                description: "Le fabricant (ex: Shimano, SRAM, Campagnolo)" 
              },
              modele: { 
                type: "STRING", 
                description: "Le modèle précis ou la gamme (ex: Ultegra, Deore, Deore XT, GX Eagle)" 
              },
              groupe: { 
                type: "STRING", 
                description: "La catégorie générale",
                enum: ["FREINAGE", "TRANSMISSION", "ROUES", "PERIPHERIQUES", "CADRE_SUSPENSION"] // Optionnel: force des catégories fixes
              }
            },
            required: ["composant", "marque", "modele", "groupe"]
          }
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        "X-goog-api-key": CLE_API_GEMINI
      }
    });

    // Extraction de la réponse textuelle de Gemini
    const texteBrut = reponse.data.candidates[0].content.parts[0].text;
    return JSON.parse(texteBrut); 
  } catch (err) {
    console.error(err);
  } finally {
  }
}

export { getBicyclePartsFromPicture };
