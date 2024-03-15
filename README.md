# Bento Recommendation Engine

### Main Features

Based on the customer location and taste profiles/preferences, returns a sorted list of restaurants
on the basis of following factors:

- Restaurant proximity
- Current utilization rate
- Matching preferences
- Ratings.

### Folder Structure

```
└── 📁controllers
    └── recommendation.controller.ts
└── 📁interfaces
    └── customer.interface.ts
    └── hub.interface.ts
        |
        |
    └── utilizationData.interface.ts
└── 📁routers
    └── recommendation.router.ts
└── 📁services
    └── external.service.ts
└── 📁utils
    └── recommenderUtil.ts
└── config.ts
└── index.ts
└── package.json
└── README.md

```

### Deployed Backend

`https://bento-recommender.onrender.com`

### How to Run the App Locally

1. Clone the repository: `git clone https://github.com/omi5/recommendation-engine.git`
2. Install dependencies: `npm install`
3. Create a `.env` based on the given `.env.example`
4. Start the development server: `npm run dev`
5. Make POST API Call: `localhost:5000/get-all-restaurants/get-all-restaurants`

body:

```
{
    "_id": "65cb1244bcf523adff87da56",
    "currentLatLong": {
        "longitude": -0.12715638773914495,
        "latitude": 51.52503786295292
    },
    "customerPreference": {
        "tastyTags": [
            "Sour",
            "Tangy"
        ],
        "category": []
    }
}
```
