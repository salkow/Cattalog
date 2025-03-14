# GlobalWebIndex Engineering Challenge

## Installation

### Docker Setup
This application requires Docker to run in a containerized environment. 
To get started, ensure Docker is installed on your system. After cloning the repository, create a .env file in the root directory with the following contents:

```
VITE_API_KEY=<your_cat_api_key_here>  
VITE_BASE_URL=https://api.thecatapi.com/v1/  
VITE_USERNAME=<your_username_here>  
```

Replace <your_cat_api_key_here> with your API key from The Cat API and <your_username_here> with your preferred username. Once configured, run the app using:
```
docker compose up --build -d  
```
This command will build and start the application in detached mode. The app will be accessible at 
```http://localhost:3000```

### Technologies Used
- **Vite**: Bootstrapped the project with Vite 
- **React Query**: Utilized for efficient data fetching, caching, and synchronization.
- **Masonic Library**: Used the Masonic to display images in a dynamic, responsive masonry grid layout. Virtualization ensures only visible images are rendered, reducing memory usage and improving performance.  
- **Tailwind CSS**: Handled styling with tailwind.  
- **React Router**: Used for managed client-side routing.
- **Eslint**: Configured for code quality enforcement, ensuring consistent formatting and adherence to React best practices.
- **Husky**: Used for performing typescript and eslint tests before commiting the code. 

### 
