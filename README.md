# Volunteer-Portal (MERN Stack)

A comprehensive full-stack web application for managing volunteer and intern applications, built with MongoDB, Express.js, React.js, and Node.js. This system provides a seamless experience for volunteers to apply and administrators to manage applications efficiently.

## 🚀 Key Features

### For Volunteers
- **Intuitive Registration**: Simple, user-friendly application form
- **Interest-Based Applications**: Select from predefined interest areas
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Real-time Validation**: Instant feedback on form submission

### For Administrators
- **Secure Authentication**: JWT-based login system with session management
- **Comprehensive Dashboard**: View and manage all applications in one place
- **Advanced Filtering**: Search by name, email, interests, and review status
- **Application Status Management**: Mark applications as reviewed/unreviewed
- **Real-time Updates**: Live application counts and status updates

## 🎯 Demo Access

### Demo Admin Account
For testing purposes, use these credentials to access the admin dashboard:

**Email:** `abc123@gmail.com`  
**Password:** `Asdfghjkl@123`

> **Note:** This demo account is pre-configured and ready to use. You can log in immediately after setting up the application.

## 📁 Project Architecture

```
volunteer-application-system/
├── frontend/                    # React.js Client Application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   └── ProtectedRoute.jsx # Route protection HOC
│   │   ├── pages/               # Application Pages
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Register.jsx     # Volunteer registration form
│   │   │   ├── AdminLogin.jsx   # Admin authentication
│   │   │   └── AdminDashboard.jsx # Admin management panel
│   │   ├── services/            # External Services
│   │   │   └── api.js           # Axios configuration & API calls
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies & scripts
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── vite.config.js           # Vite build configuration
├── backend/                     # Node.js/Express.js API Server
│   ├── controllers/             # Business Logic Controllers
│   │   ├── applicantController.js # Applicant management
│   │   └── adminController.js   # Admin authentication & management
│   ├── models/                  # Mongoose Data Models
│   │   ├── Applicant.js         # Volunteer application schema
│   │   └── Admin.js             # Admin user schema
│   ├── routes/                  # Express Route Handlers
│   │   ├── applicantRoutes.js   # Applicant-related endpoints
│   │   └── adminRoutes.js       # Admin-related endpoints
│   ├── middleware/              # Custom Middleware
│   │   └── auth.js              # JWT authentication middleware
│   ├── config/                  # Configuration Files
│   │   └── database.js          # MongoDB connection setup
│   ├── utils/                   # Server utilities
│   ├── server.js                # Express server entry point
│   ├── .env                     # Environment variables
│   └── package.json             # Dependencies & scripts
├── docs/                        # Additional documentation
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### System Requirements

- **Node.js**: v16.0.0 or higher
- **MongoDB**: v4.4 or higher (local installation or MongoDB Atlas)
- **npm**: v8.0.0 or higher (or yarn equivalent)
- **Git**: Latest version

### Quick Start Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/mitengala51/Volunteer-Portal.git
cd Volunteer-Portal
```

#### 2. Backend Configuration

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**
```env
# Database Configuration
MONGO_URI="mongodb+srv://mitengala51:MMokr7y4K4QxQmAP@cluster0.ssvr2zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Security
JWT_SECRET="fhP#A&GY4Os@PwIjNaG$0jaErvSxZ43WlqW"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional)
FRONTEND_URL="http://localhost:5173"
```

**Start the backend server:**
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```
✅ Backend server will be running on `http://localhost:5000`

#### 3. Frontend Configuration

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file (if needed)
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
```

**Start the frontend development server:**
```bash
npm run dev
```
✅ Frontend application will be running on `http://localhost:5173`

#### 4. Initial Setup & Testing

1. **Access the application:** Open `http://localhost:5173` in your browser
2. **Test volunteer registration:** Click "Apply Now" and submit a test application
3. **Test admin access:** 
   - Navigate to `http://localhost:5173/admin/login`
   - Use demo credentials: `abc123@gmail.com` / `Asdfghjkl@123`
   - Verify you can see and manage applications

## 🌐 API Reference

### Base Configuration
- **Base URL:** `http://localhost:5000/api`
- **Content-Type:** `application/json`
- **Authentication:** Bearer Token (JWT)

### Public Endpoints

#### 📝 Create Volunteer Application
```http
POST /api/applicants
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "interests": ["Education", "Technology"],
  "availability": "Part-time",
  "bio": "Passionate about education and helping others learn new technologies..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 🔐 Admin Authentication
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "abc123@gmail.com",
  "password": "Asdfghjkl@123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "email": "abc123@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Endpoints

> **Authentication Required:** Include `Authorization: Bearer <token>` header

#### 📊 Get All Applications
```http
GET /api/applicants?search=john&interest=Education&reviewed=false&page=1&limit=10
Authorization: Bearer <your_jwt_token>
```

**Query Parameters:**
- `search` (optional): Search by name or email
- `interest` (optional): Filter by specific interest area
- `reviewed` (optional): Filter by review status (`true`/`false`)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)

#### 👤 Get Single Application
```http
GET /api/applicants/{applicantId}
Authorization: Bearer <your_jwt_token>
```

#### ✅ Toggle Review Status
```http
PUT /api/applicants/{applicantId}/review
Authorization: Bearer <your_jwt_token>
```

#### 👨‍💼 Get Admin Profile
```http
GET /api/admin/profile
Authorization: Bearer <your_jwt_token>
```

## 🔐 Security & Authentication

### JWT Token Management
1. **Token Generation**: Upon successful login, server generates JWT with 7-day expiration
2. **Token Storage**: Frontend stores token in localStorage
3. **Automatic Inclusion**: Axios interceptor automatically includes token in requests
4. **Token Validation**: Server middleware validates token on protected routes
5. **Automatic Logout**: Invalid/expired tokens trigger automatic logout

### Security Features
- Password hashing using bcrypt (12 rounds)
- JWT token expiration (7 days)
- Input validation and sanitization
- CORS protection
- Rate limiting (production recommended)
- Environment variable protection

## 📊 Database Schemas

### Applicant Collection
```javascript
{
  _id: ObjectId,
  fullName: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  phone: {
    type: String,
    maxLength: 20,
    trim: true
  },
  interests: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'At least one interest required']
  },
  availability: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Weekends']
  },
  bio: {
    type: String,
    maxLength: 300,
    trim: true
  },
  reviewed: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## 🎨 Frontend Architecture

### Technology Stack
- **React 18**: Component-based UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing

### Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── Register
│   │   ├── ApplicationForm
│   │   └── SuccessMessage
│   ├── AdminLogin
│   │   └── LoginForm
│   └── ProtectedRoute
│       └── AdminDashboard
│           ├── StatsCards
│           ├── FilterControls
│           └── ApplicationsList
└── Loading (conditional)
```

### State Management Strategy
- **Local State**: useState for component-specific data
- **API State**: useEffect for data fetching
- **Global State**: Context API for authentication
- **Persistent State**: localStorage for JWT tokens

## 🚀 Deployment Guide

### Backend Deployment (Production)

#### Environment Configuration
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_super_secure_jwt_secret_here
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start server.js --name "volunteer-backend"

# Monitor application
pm2 monit

# View logs
pm2 logs volunteer-backend

# Restart application
pm2 restart volunteer-backend
```

#### Docker Deployment
```dockerfile
# Dockerfile (backend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Deployment

#### Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

#### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Deploy to Netlify
```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: VITE_API_BASE_URL
```

## 🧪 Testing Guide

### Manual Testing Scenarios

#### Volunteer Registration Flow
1. ✅ **Navigate to registration page**
2. ✅ **Fill out all required fields**
3. ✅ **Test form validation** (empty fields, invalid email)
4. ✅ **Submit application** and verify success message
5. ✅ **Test duplicate email prevention**

#### Admin Dashboard Flow
1. ✅ **Login with demo credentials**
2. ✅ **View applications list**
3. ✅ **Test search functionality**
4. ✅ **Test filter options**
5. ✅ **Toggle application review status**
6. ✅ **Test pagination** (if many applications)
7. ✅ **Logout and verify token removal**

### API Testing with cURL

```bash
# Test volunteer registration
curl -X POST http://localhost:5000/api/applicants \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "555-0123",
    "interests": ["Education"],
    "availability": "Part-time",
    "bio": "Test bio"
  }'

# Test admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "abc123@gmail.com",
    "password": "Asdfghjkl@123"
  }'

# Test protected route (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/applicants \
  -H "Authorization: Bearer TOKEN"
```

## 📝 Available Interest Categories

The system supports the following volunteer interest areas:
- **Education** - Teaching, tutoring, educational programs
- **Technology** - IT support, web development, digital literacy
- **Outreach** - Community engagement, public relations
- **Healthcare** - Medical assistance, wellness programs
- **Environment** - Conservation, sustainability projects
- **Community Service** - General community support and assistance

## 🔧 Customization Guide

### Adding New Interest Categories
1. **Update frontend options** in `src/pages/Register.jsx`:
   ```javascript
   const interestOptions = [
     'Education', 'Technology', 'Outreach',
     'Healthcare', 'Environment', 'Community Service',
     'New Category Here' // Add your new category
   ];
   ```

2. **Update backend validation** in `routes/applicantRoutes.js`:
   ```javascript
   const validInterests = [
     'Education', 'Technology', 'Outreach',
     'Healthcare', 'Environment', 'Community Service',
     'New Category Here' // Add the same category
   ];
   ```

### Modifying Application Fields
1. **Update Mongoose model** (`models/Applicant.js`)
2. **Update frontend form** (`pages/Register.jsx`)
3. **Update validation rules** (`routes/applicantRoutes.js`)
4. **Update admin dashboard display** (`pages/AdminDashboard.jsx`)

### Customizing UI Theme
Modify `tailwind.config.js` to customize colors, fonts, and spacing:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color'
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Backend Issues

**❌ MongoDB Connection Failed**
```bash
Error: MongoNetworkError: failed to connect to server
```
**✅ Solutions:**
- Verify MongoDB service is running: `brew services start mongodb-community` (macOS)
- Check connection string in `.env` file
- Ensure network access for MongoDB Atlas
- Verify database credentials and permissions

**❌ JWT Token Invalid**
```bash
Error: JsonWebTokenError: invalid token
```
**✅ Solutions:**
- Check JWT_SECRET consistency between requests
- Verify token format: `Bearer <token>`
- Check token expiration (7 days)
- Clear localStorage and login again

**❌ Port Already in Use**
```bash
Error: listen EADDRINUSE: address already in use :::5000
```
**✅ Solutions:**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

#### Frontend Issues

**❌ API Connection Refused**
```bash
Error: Network Error / Connection refused
```
**✅ Solutions:**
- Ensure backend server is running on correct port
- Check `VITE_API_BASE_URL` in frontend `.env`
- Verify CORS configuration in backend
- Check browser network tab for actual request URLs

**❌ Build Errors**
```bash
Error: Module not found
```
**✅ Solutions:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for version conflicts in `package.json`
- Clear npm cache: `npm cache clean --force`

### Performance Optimization

#### Backend Optimization
- Add database indexing for frequently queried fields
- Implement request rate limiting
- Use compression middleware
- Enable MongoDB connection pooling

#### Frontend Optimization
- Implement React.memo for component optimization
- Add lazy loading for routes
- Optimize bundle size with code splitting
- Implement proper error boundaries

## 📈 Monitoring & Analytics

### Recommended Production Monitoring
- **Application Monitoring**: PM2 Dashboard
- **Database Monitoring**: MongoDB Atlas monitoring
- **Error Tracking**: Sentry or similar service
- **Performance Monitoring**: New Relic or DataDog
- **Uptime Monitoring**: Pingdom or UptimeRobot

### Key Metrics to Track
- Application response times
- Database query performance
- User registration conversion rates
- Admin login frequency
- Error rates and types

## 🤝 Contributing Guidelines

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Follow existing code style and conventions
4. Write tests for new functionality
5. Update documentation as needed
6. Submit pull request with detailed description

### Code Style Standards
- Use ESLint and Prettier for code formatting
- Follow React best practices and hooks patterns
- Use meaningful variable and function names
- Add comments for complex business logic
- Maintain consistent file and folder structure

## 📞 Support & Documentation

### Getting Help
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Comprehensive guides and API reference
- **Code Comments**: Inline documentation for complex logic
- **Community**: Discussion forums and chat channels

### Additional Resources
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🏆 Version History & Roadmap

### Current Version: v1.0.0
#### Features
- ✅ Volunteer registration system
- ✅ Admin authentication and dashboard
- ✅ Application management (review/unreviewed)
- ✅ Advanced search and filtering
- ✅ Responsive design
- ✅ JWT-based security
- ✅ Demo admin account

### Planned Features (v1.1.0)
- 📧 Email notifications for new applications
- 📊 Analytics dashboard with charts
- 📱 Mobile app version
- 🔄 Bulk operations for admins
- 📋 Export applications to CSV/PDF
- 🌐 Multi-language support

### Future Roadmap (v2.0.0)
- 👥 Multiple admin roles and permissions
- 📅 Event management integration
- 💬 Messaging system between admins and volunteers
- 📈 Advanced reporting and analytics
- 🔗 Integration with popular CRM systems
- ⚡ Real-time notifications

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Designed for scalability and maintainability
- Community-driven development approach
- Open source contributions welcome

---

**Happy Volunteering! 🌟**

For questions, suggestions, or contributions, please reach out through GitHub issues or pull requests.
