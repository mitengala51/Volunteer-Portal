# Volunteer Application System (MERN Stack)

A full-stack web application for managing volunteer/intern applications built with MongoDB, Express.js, React.js, and Node.js.

## 🚀 Features

- **Public Registration**: Volunteers can submit applications with their details and interests
- **Admin Authentication**: JWT-based authentication for admin access
- **Admin Dashboard**: View, filter, and manage all applications
- **Application Management**: Mark applications as reviewed/unreviewed
- **Responsive Design**: Works on desktop and mobile devices
- **Search & Filter**: Advanced filtering by name, email, interests, and review status

## 📁 Project Structure

```
project-root/
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/               # Main pages
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/            # API configuration
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
├── backend/                    # Node/Express API
│   ├── controllers/            # Business logic
│   │   ├── applicantController.js
│   │   └── adminController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── Applicant.js
│   │   └── Admin.js
│   ├── routes/                 # Express routers
│   │   ├── applicantRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── config/                 # Configuration files
│   │   └── database.js
│   ├── server.js               # App entry point
│   ├── .env
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
    MONGO_URI="mongodb+srv://mitengala51:MMokr7y4K4QxQmAP@cluster0.ssvr2zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    JWT_SECRET="fhP#A&GY4Os@PwIjNaG$0jaErvSxZ43WlqW"
    PORT=5000
    NODE_ENV=development
   ```

5. **Start the backend server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Or production mode
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### Initial Admin Setup

1. **Create an admin account** by making a POST request to `/api/admin/register`:
   ```bash
   curl -X POST http://localhost:5000/api/admin/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "AdminPassword123"
     }'
   ```

   Or use a tool like Postman/Insomnia to make the request.

2. **Remove the register route** from `backend/routes/adminRoutes.js` in production for security.

## 🌐 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Public Endpoints

#### Create Applicant
- **POST** `/applicants`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "555-0123",
    "interests": ["Education", "Tech"],
    "availability": "Part-time",
    "bio": "Passionate about helping others..."
  }
  ```

#### Admin Login
- **POST** `/admin/login`
- **Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "...",
      "email": "admin@example.com",
      "token": "jwt_token_here"
    }
  }
  ```

### Protected Endpoints (Require JWT Token)

#### Get All Applicants
- **GET** `/applicants`
- **Query Parameters:**
  - `search` - Search by name or email
  - `interest` - Filter by interest area
  - `reviewed` - Filter by review status (true/false)
- **Headers:** `Authorization: Bearer <token>`

#### Get Single Applicant
- **GET** `/applicants/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Toggle Review Status
- **PUT** `/applicants/:id/review`
- **Headers:** `Authorization: Bearer <token>`

#### Get Admin Profile
- **GET** `/admin/profile`
- **Headers:** `Authorization: Bearer <token>`

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Admin logs in with email/password
2. Server validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in Authorization header for protected routes
5. Token expires after 7 days

## 📊 Database Schema

### Applicant Model
```javascript
{
  fullName: String (required, max 100 chars),
  email: String (required, unique, validated),
  phone: String (optional, max 20 chars),
  interests: [String] (required, at least 1),
  availability: String (required, enum: Full-time/Part-time/Weekends),
  bio: String (optional, max 300 chars),
  reviewed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model
```javascript
{
  email: String (required, unique, validated),
  password: String (required, hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Features

### Pages
- **Home (`/`)**: Landing page with navigation
- **Register (`/register`)**: Volunteer application form
- **Admin Login (`/admin/login`)**: Admin authentication
- **Admin Dashboard (`/admin/dashboard`)**: Protected admin panel

### Components
- **Navbar**: Navigation with dynamic links based on auth status
- **ProtectedRoute**: HOC for protecting admin routes
- **Loading**: Reusable loading spinner component

### State Management
- React Hooks (useState, useEffect) for local state
- localStorage for JWT token persistence
- Axios interceptors for automatic token attachment

## 🚦 Running in Production

### Backend Production Setup
1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB database (MongoDB Atlas recommended)
3. Set strong JWT_SECRET
4. Configure CORS for your frontend domain
5. Use PM2 or similar for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "volunteer-backend"
   ```

### Frontend Production Build
1. Update `VITE_API_BASE_URL` to your production API URL
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## 🧪 Testing the Application

### Test Volunteer Registration
1. Visit `http://localhost:5173`
2. Click "Apply Now"
3. Fill out the registration form
4. Submit and check for success message

### Test Admin Dashboard
1. Create an admin account (see Initial Admin Setup)
2. Visit `http://localhost:5173/admin/login`
3. Login with admin credentials
4. View and manage applications in the dashboard

## 📝 Available Interest Areas
- Education
- Tech
- Outreach
- Healthcare
- Environment
- Community Service

## 🔧 Customization

### Adding New Interest Areas
1. Update `interestOptions` array in `frontend/src/pages/Register.jsx`
2. Update validation in `backend/routes/applicantRoutes.js`

### Modifying Application Fields
1. Update the Applicant model in `backend/models/Applicant.js`
2. Update the registration form in `frontend/src/pages/Register.jsx`
3. Update validation rules in `backend/routes/applicantRoutes.js`

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

**CORS Error:**
- Check CORS configuration in `backend/server.js`
- Ensure frontend URL is allowed

**JWT Token Issues:**
- Check if token is being stored in localStorage
- Verify JWT_SECRET matches between requests
- Check token expiration

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console and server logs
4. Verify environment configuration

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
  - Volunteer registration
  - Admin authentication
  - Application management
  - Search and filtering
  - Responsive design
