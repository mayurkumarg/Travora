🌍 TRAVORA – Travel Listing & Review Platform

TRAVORA is a full-stack web application built with Node.js, Express, MongoDB, and EJS.
It allows users to explore, create, and review travel listings (like hotels, destinations, or activities).
The platform also supports user authentication, sessions, image uploads, reviews, and map integration.

🚀 Features

  *🔑 User Management

    > User signup, login, and logout with authentication using Passport.js (Local Strategy).
    
    > Secure session handling with cookies & MongoDB session store.
    
    > Flash messages for success/error feedback across the platform.

  *🏨 Listings

    > Browse all travel listings on the home page.
    
    > Add new listings (requires login).
    
    > View details of each listing with description, location, and uploaded image.
    
    > Edit or delete listings (only by the listing owner).
    
    > Geolocation powered by Mapbox API for mapping listings.

  *⭐ Reviews

    > Authenticated users can add reviews to listings.
    
    > Reviews include author tracking (linked to user).
    
    > Ability to delete reviews (by author).

📌 Extras

    > Error handling with custom error middleware.
    
    > Flash messages for interactive user feedback.
    
    > Terms & Privacy policy pages included.
    
    > Responsive views using EJS templates.
    
    > Middleware for validation & authorization.


🗂️ Project Structure

    TRAVORA/
    │── controllers/       # Controllers for listings, reviews, and users
    │── init/              # Initialization utilities
    │── models/            # Mongoose models (User, Listing, Review)
    │── public/            # Static assets (CSS, JS, images)
    │── routes/            # Express route handlers
    │── utils/             # Utility functions (custom error, async wrappers)
    │── views/             # EJS templates for pages
    │── app.js             # Main entry point
    │── cloudConfig.js     # Cloudinary / storage config
    │── middleware.js      # Custom middleware (auth, validation)
    │── schema_validation.js # Joi validation schemas
    │── .env               # Environment variables
    │── package.json       # Dependencies & scripts


⚙️ Tech Stack

  Backend: Node.js, Express.js
  
  Database: MongoDB (Mongoose ODM)
  
  Authentication: Passport.js (Local Strategy)
  
  Session Management: express-session, connect-mongo
  
  Template Engine: EJS + ejs-mate
  
  Styling: Custom CSS + public assets
  
  File Uploads: Cloudinary storage integration
  
  Maps & Geocoding: Mapbox API
  
  Validation: Joi schemas
  
  Flash Messages: connect-flash

🛠️ Installation & Setup

1. Clone the repository
git clone https://github.com/your-username/travora.git
cd travora

2. Install dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory:

NODE_ENV=development
MONGO_ATLAS_URL=your_mongo_connection_url
MY_SECRET_CODE=your_secret_key
MAP_TOKEN=your_mapbox_token
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret

4. Run the application
npm start


Server will start on: http://localhost:3000

📸 Screens & Flow (Overview)

Home Page → View all listings.

Sign Up / Login → Create an account to access features.

Add Listing → Upload new places with location & image.

Listing Details → View full description + reviews.

Add Review → Share feedback about a listing.

Edit/Delete → Modify or remove owned listings.

Flash Messages → Get instant feedback after actions.


🌟 Future Improvements

Social login (Google/Facebook).

Advanced search & filtering for listings.

Responsive mobile-first UI improvements.

Admin panel for managing all listings/reviews.

👨‍💻 Author

Mayur Kumar G
A passionate full-stack developer building practical, real-world applications with Node.js, Express, and MongoDB.
