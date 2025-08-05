import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to Our Volunteer Program
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
              Join our community of dedicated volunteers and make a meaningful impact. 
              Whether you're passionate about education, technology, community outreach, 
              or healthcare, we have opportunities that match your interests and schedule.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-blue-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Become a Volunteer</h3>
                <p className="text-gray-600 mb-6">
                  Ready to make a difference? Fill out our application form and let us know 
                  about your interests, availability, and how you'd like to contribute.
                </p>
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Apply Now
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-indigo-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admin Access</h3>
                <p className="text-gray-600 mb-6">
                  Administrative access for reviewing applications, managing volunteers, 
                  and coordinating programs. Authorized personnel only.
                </p>
                <Link
                  to="/admin/login"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Admin Login
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Focus Areas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-green-600 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                  <p className="text-gray-600 text-sm">Tutoring, mentoring, and educational support programs</p>
                </div>
                
                <div className="text-center">
                  <div className="text-purple-600 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technology</h4>
                  <p className="text-gray-600 text-sm">Digital literacy, coding workshops, and tech support</p>
                </div>
                
                <div className="text-center">
                  <div className="text-red-600 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Community Service</h4>
                  <p className="text-gray-600 text-sm">Outreach programs, healthcare support, and environmental initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;