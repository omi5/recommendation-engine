# Bento Recommendation Engine

### Main Features

Based on the customer location and taste profiles/preferences, returns a list of restaurants
based on the following factors

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

### How to run the app on Local Machine

`npm i`

`npm run dev`

Make POST API Call: `https://bento-recommender.onrender.com/get-all-restaurants`

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
