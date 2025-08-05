import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-blue-200">
              Volunteer Portal
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isAdminRoute && (
              <>
                <Link 
                  to="/register" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Apply Now
                </Link>
                <Link 
                  to="/admin/login" 
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors"
                >
                  Admin Login
                </Link>
              </>
            )}
            
            {isAdminRoute && token && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;