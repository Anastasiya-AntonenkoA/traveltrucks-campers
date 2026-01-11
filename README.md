Travel Trucks is a modern web-based camper rental platform that allows users to browse a catalog of motorhomes, filter them by features, add them to Favorites, and book trips.

Technology stack:
Framework: Next.js 15+ (App Router)
State Management: Zustand
Data Fetching: TanStack Query v5 (React Query)
Styling: CSS Modules
Icons: SVG Sprites
Notifications: React Hot Toast

API: Custom backend for retrieving camper data and reviews

Key features:
Camper Catalog: Complete list of available trucks with detailed information.
Favorites system: Ability to save campers. Data is stored in localStorage using Zustand, which allows you not to lose them after refreshing the page.
Detail page: View the gallery, reviews, and technical specifications of each camper.
Filtering: Search by location, body type, and equipment (AC, Kitchen, TV, etc.).
Booking Form: Validated form for booking a campervan for specific dates.

Installation and launch
Clone the repository:

        git clone https://github.com/your-username/travel-trucks.git
        cd travel-trucks

    Install dependencies:

        npm install

    Start the development server:

        npm run dev

    Open the project: Go to http://localhost:3000 in your browser.

Project structure
src/
├── app/ # Routing (Next.js App Router)
├── components/ # Basic UI components (Card, Header, etc.)
├── lib/ # API configuration and helper functions

Contacts
If you have any questions or suggestions, please contact me:

    GitHub: https://github.com/Anastasiya-AntonenkoA
    LinkedIn: https://www.linkedin.com/in/anastasiia-antonenko-044533387/
    E-mail: Nastyaantonenkoa@gmail.com
