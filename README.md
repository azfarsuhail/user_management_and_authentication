Here's a concise README with usage instructions:

---

# Panaversity Authentication System

This project is a Next.js application integrated with a FastAPI backend to handle user authentication for Panaversity, a Generative AI University.

## Features

- User Registration and Login
- JWT-based Authentication
- Profile Management
- Support for Multiple User Types (Students, Teachers, etc.)

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js & npm
- Python & FastAPI

### Installation

1. **Clone the Repository:**

   ```bash
   https://github.com/HamzaAhmedSheikh/user_management_and_authentication.git
   cd user_management_and_authentication
   ```

2. **Environment Variables:**

   Create a `.env` file in the root directory with the following:

   ```bash
    BACKEND_AUTH_SERVER_URL = "http://localhost:8000"
    FASTAPI_URL= "http://localhost:8000"
    NEXT_PUBLIC_API_URL= "http://localhost:3000"
   ```

3. **Docker Compose:**

   Build and start the services:

   ```bash
   docker-compose up --build -d
   ```


### Registration

Register a new user through the FastAPI `/register` endpoint using the form on the frontend.

## API Endpoints

- **Register:** `POST /api/v1/user/register`
- **Login:** `POST /api/v1/user/login`
- **Profile:** `GET /api/v1/user/profile`

## Running the Project

- **Next.js Frontend:**

  ```bash
  npm run dev
  ```

- **FastAPI Backend:**

  ```bash
  uvicorn app.main:app --reload
  ```

Access the application at `http://localhost:3000`.

## Contributing

Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.