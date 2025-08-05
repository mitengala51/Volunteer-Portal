import { useState, useEffect } from 'react';
import { applicantAPI } from '../services/api';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    interest: '',
    reviewed: ''
  });

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [applicants, filters]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await applicantAPI.getAll();
      setApplicants(response.data.data);
    } catch (error) {
      console.error('Fetch applicants error:', error);
      setError('Failed to load applicants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterApplicants = () => {
    let filtered = [...applicants];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(applicant => 
        applicant.fullName.toLowerCase().includes(searchTerm) ||
        applicant.email.toLowerCase().includes(searchTerm) ||
        applicant.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Interest filter
    if (filters.interest) {
      filtered = filtered.filter(applicant => 
        applicant.interests.includes(filters.interest)
      );
    }

    // Reviewed status filter
    if (filters.reviewed !== '') {
      const isReviewed = filters.reviewed === 'true';
      filtered = filtered.filter(applicant => applicant.reviewed === isReviewed);
    }

    setFilteredApplicants(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleReviewStatus = async (id) => {
    try {
      await applicantAPI.toggleReview(id);
      
      // Update local state
      setApplicants(prev => 
        prev.map(applicant => 
          applicant._id === id 
            ? { ...applicant, reviewed: !applicant.reviewed }
            : applicant
        )
      );

      // Update selected applicant if it's the one being toggled
      if (selectedApplicant && selectedApplicant._id === id) {
        setSelectedApplicant(prev => ({
          ...prev,
          reviewed: !prev.reviewed
        }));
      }
    } catch (error) {
      console.error('Toggle review error:', error);
      setError('Failed to update review status. Please try again.');
    }
  };

  const openModal = async (applicant) => {
    try {
      const response = await applicantAPI.getById(applicant._id);
      setSelectedApplicant(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error('Get applicant details error:', error);
      setError('Failed to load applicant details.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUniqueInterests = () => {
    const interests = new Set();
    applicants.forEach(applicant => {
      applicant.interests.forEach(interest => interests.add(interest));
    });
    return Array.from(interests).sort();
  };

  if (loading) {
    return <Loading message="Loading applicants..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage volunteer applications and review candidate information
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">{applicants.length}</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {applicants.filter(a => a.reviewed).length}
            </div>
            <div className="text-gray-600">Reviewed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-orange-600">
              {applicants.filter(a => !a.reviewed).length}
            </div>
            <div className="text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-purple-600">
              {getUniqueInterests().length}
            </div>
            <div className="text-gray-600">Interest Areas</div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name, email, or interest..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Area
              </label>
              <select
                value={filters.interest}
                onChange={(e) => handleFilterChange('interest', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Interests</option>
                {getUniqueInterests().map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Status
              </label>
              <select
                value={filters.reviewed}
                onChange={(e) => handleFilterChange('reviewed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Applications</option>
                <option value="true">Reviewed</option>
                <option value="false">Pending Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplicants.length})
            </h2>
          </div>
          
          {filteredApplicants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">No applications found</div>
              <div className="text-sm text-gray-400">
                {applicants.length === 0 
                  ? 'No applications have been submitted yet.'
                  : 'Try adjusting your filters to see more results.'
                }
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{applicant.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {applicant.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.interests.slice(0, 2).map((interest, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {interest}
                            </span>
                          ))}
                          {applicant.interests.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{applicant.interests.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {applicant.availability}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          applicant.reviewed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {applicant.reviewed ? 'Reviewed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(applicant.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => openModal(applicant)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => toggleReviewStatus(applicant._id)}
                          className={`font-medium ${
                            applicant.reviewed
                              ? 'text-yellow-600 hover:text-yellow-900'
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {applicant.reviewed ? 'Mark Unreviewed' : 'Mark Reviewed'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedApplicant && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplicant.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedApplicant.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplicant.availability}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interests</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedApplicant.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedApplicant.bio && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                      {selectedApplicant.bio}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Application Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedApplicant.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Review Status</label>
                    <span className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedApplicant.reviewed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedApplicant.reviewed ? 'Reviewed' : 'Pending Review'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => toggleReviewStatus(selectedApplicant._id)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedApplicant.reviewed
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {selectedApplicant.reviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;