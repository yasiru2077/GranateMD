export let treatment = {
  plant_diseases: [
    {
      name: "Alternaria",
      symptoms: [
        "Small, dark brown to black spots with concentric rings on leaves.",
        "Lesions may develop on stems, flowers, and fruits.",
        "In severe cases, it leads to leaf drop.",
      ],
      treatment: {
        cultural_practices: [
          {
            practice: "Remove Infected Plant Debris",
            description:
              "Regularly clear away fallen leaves, twigs, and any plant debris to reduce the source of inoculum.",
          },
          {
            practice: "Proper Spacing",
            description:
              "Ensure adequate spacing between plants to promote air circulation and reduce humidity, which favors Alternaria growth.",
          },
          {
            practice: "Watering Practices",
            description:
              "Water plants early in the day to allow foliage to dry before nightfall. Avoid overhead irrigation; instead, use drip irrigation to keep leaves dry.",
          },
        ],
        chemical_control: [
          {
            method: "Fungicides",
            description:
              "Apply fungicides such as chlorothalonil, mancozeb, or copper-based fungicides at the first sign of disease. Follow the manufacturer's instructions regarding dosage and frequency of application.",
          },
        ],
        resistant_varieties:
          "Consider planting resistant or tolerant plant varieties if available.",
      },
    },
    {
      name: "Anthracnose",
      symptoms: [
        "Dark, sunken lesions on leaves, stems, flowers, and fruits.",
        "Spots may be surrounded by a yellow halo.",
        "Infected leaves may curl and fall off.",
      ],
      treatment: {
        cultural_practices: [
          {
            practice: "Sanitation",
            description:
              "Remove and destroy infected plant parts immediately to prevent the spread of the disease.",
          },
          {
            practice: "Crop Rotation",
            description:
              "Avoid planting susceptible crops in the same area year after year. Practice crop rotation with non-host plants.",
          },
          {
            practice: "Mulching",
            description:
              "Use mulch to prevent soil from splashing onto leaves, which can spread the fungal spores.",
          },
        ],
        chemical_control: [
          {
            method: "Fungicides",
            description:
              "Use fungicides such as azoxystrobin, chlorothalonil, or copper-based fungicides. Start applications at the first sign of disease and continue as recommended.",
          },
        ],
        resistant_varieties:
          "Opt for disease-resistant varieties or cultivars that are less susceptible to Anthracnose.",
      },
    },
    {
      name: "Bacterial Blight",
      symptoms: [
        "Water-soaked lesions that eventually turn brown or black on leaves, stems, and fruits.",
        "The disease often spreads rapidly in warm, wet conditions.",
        "Leaves may wilt, turn yellow, and drop prematurely.",
      ],
      treatment: {
        cultural_practices: [
          {
            practice: "Remove Infected Plant Material",
            description:
              "Prune out and destroy affected leaves, stems, and fruits to reduce the spread of bacteria.",
          },
          {
            practice: "Proper Spacing",
            description:
              "Ensure good airflow between plants to reduce humidity levels.",
          },
          {
            practice: "Avoid Overhead Irrigation",
            description:
              "Water plants at the base to avoid wetting the foliage, which can spread the bacteria.",
          },
          {
            practice: "Disinfect Tools",
            description:
              "Clean pruning shears and other gardening tools with a bleach solution (1 part bleach to 9 parts water) after use to prevent the spread of bacteria.",
          },
        ],
        chemical_control: [
          {
            method: "Bactericides",
            description:
              "Copper-based bactericides can help manage the disease. Apply them during early stages of the infection and repeat as necessary, following the label instructions.",
          },
          {
            method: "Antibiotics",
            description:
              "Streptomycin-based products can be effective, but their use may be restricted, so check local regulations.",
          },
        ],
        resistant_varieties:
          "Plant resistant varieties if available, and rotate crops to prevent the buildup of the pathogen in the soil.",
      },
    },
    {
      name: "Cercospora",
      symptoms: [
        "Small, round to irregular brown spots on leaves, often with a gray or white center.",
        "Spots may coalesce, leading to large areas of dead tissue and eventual leaf drop.",
        "Stems and fruit may also show signs of infection.",
      ],
      treatment: {
        cultural_practices: [
          {
            practice: "Remove Affected Leaves",
            description:
              "Regularly remove and dispose of infected leaves to minimize the spread of spores.",
          },
          {
            practice: "Improve Air Circulation",
            description:
              "Space plants adequately to enhance airflow and reduce humidity.",
          },
          {
            practice: "Watering Practices",
            description:
              "Water at the base of the plants to keep foliage dry. Avoid overhead watering, especially in the late afternoon or evening.",
          },
        ],
        chemical_control: [
          {
            method: "Fungicides",
            description:
              "Apply fungicides such as thiophanate-methyl, chlorothalonil, or mancozeb at the first sign of infection. Repeat applications as per the product's instructions.",
          },
          {
            method: "Protective Sprays",
            description:
              "In regions where Cercospora is common, preventive fungicidal sprays may be necessary during high-risk periods.",
          },
        ],
        resistant_varieties:
          "Consider using resistant cultivars or varieties, which are less likely to succumb to Cercospora.",
      },
    },
    {
      name: "Healthy",
      symptoms: [
        "Leaves are vibrant green with no discoloration",
        "Stems are firm and strong",
        "Growth is consistent and vigorous",
        "No spots, lesions, or unusual markings",
        "Leaves maintain proper shape without curling or wilting",
      ],
      treatment: {
        cultural_practices: [
          {
            practice: "Proper Watering",
            description:
              "Water deeply but infrequently to encourage strong root growth. Check soil moisture before watering.",
          },
          {
            practice: "Adequate Nutrition",
            description:
              "Provide balanced fertilization based on plant needs and soil tests.",
          },
          {
            practice: "Regular Monitoring",
            description:
              "Inspect plants weekly for any signs of stress or disease to catch problems early.",
          },
          {
            practice: "Good Air Circulation",
            description:
              "Maintain proper spacing between plants to ensure adequate airflow.",
          },
        ],
        chemical_control: [
          {
            practice: "Sanitation",
            description: "Keep growing area clean and free of debris.",
          },
          {
            practice: "Proper Pruning",
            description:
              "Remove dead or overcrowded branches to maintain plant health.",
          },
        ],
        resistant_varieties:
          "Consider using resistant cultivars or varieties, which are less likely to succumb to Cercospora.",
      },
    },
  ],
};
