# Team Refcoins Interviews assignment
# Backend 
- npm install
- npm run start:dev


# backend/.env
PORT=3001
MONGODB_URI=MONGODB_URI=mongodb+srv://amindusathsara121_db_user:207roU4GFY8ApYNH@cluster0.8p1r5zd.mongodb.net/


# API endpoints
1.(GET)-http://localhost:3001/properties ( get all properties)
2.(POST)-http://localhost:3001/properties (Create new property)
3.(GET)-http://localhost:3001/properties/:loc (Filtered by location)
4.DELETE-http://localhost:3001/properties/:id





# Frontend
- npm install
- npm run dev

# frontend/.env
(Sign up to cloudinary platform and create own preset )
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your preset name

# Third party libraries used
- cloudinary , redux toolkit


# folder strucuture 
refcoins-real-estate/
├── fe/                  # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/api.ts
│   │   └── ...
│   └── .env.local
├── be/                  # NestJS Backend
│   ├── src/
│   │   ├── properties/
│   │   └── main.ts
│   └── .env
├── README.md            # This file
└── .gitignore

## Reusable Components (FE)

* `PropertyCard` — card UI for each property
* `SearchBar` — location dropdown + filters
* `AdminForm` — add-property form with validation

## State Management & API Layer
* Redux Toolkit + RTK Query used for API calls and cache management
* `lib/api.ts` contains shared API utilities / axios wrapper

## Features Implemented

### Admin Dashboard (`/add-property`)

* Add new property with all required fields
* **Property Title** auto-generates a **slug**
* **Single Image Upload** via **Cloudinary** (unsigned preset)
* **Location**: Colombo, Kandy, Galle
* **Type**: Single Family, Villa
* **Status**: For Sale, For Rent
* **Price (LKR)**, **Area (sq ft)**, **Description**
* Form validation + real-time feedback
* Success/error toasts using `react-hot-toast`
* Image preview before submit

### Public Website (`/`)

* Responsive grid layout (3 columns on desktop)
* Search by location (dropdown filter)
* Delete property with confirmation modal
* Pagination with:


# END


