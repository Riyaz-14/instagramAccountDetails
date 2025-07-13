import React, { useState } from 'react';
import { Search, User, Users, Heart, MessageCircle, Share, Lock, Globe } from 'lucide-react';

interface ProfileData {
  username: string;
  fullName: string;
  biography: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  profilePictureUrl: string;
  isPrivate: boolean;
  isVerified: boolean;
}

const mockProfiles: { [key: string]: ProfileData } = {
  'tech_enthusiast': {
    username: 'tech_enthusiast',
    fullName: 'Alex Rodriguez',
    biography: '🚀 Software Developer | Tech Blogger | Coffee Enthusiast ☕\n📍 San Francisco, CA\n💻 Building the future, one line of code at a time',
    followerCount: 15420,
    followingCount: 892,
    postCount: 156,
    profilePictureUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    isPrivate: false,
    isVerified: true,
  },
  'travel_explorer': {
    username: 'travel_explorer',
    fullName: 'Emma Johnson',
    biography: '✈️ Digital Nomad | 📸 Travel Photographer\n🌍 Exploring 50 countries before 30\n📧 emma@travelwithme.com',
    followerCount: 28930,
    followingCount: 1203,
    postCount: 342,
    profilePictureUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    isPrivate: false,
    isVerified: false,
  },
  'private_user': {
    username: 'private_user',
    fullName: 'John Smith',
    biography: '',
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
    profilePictureUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    isPrivate: true,
    isVerified: false,
  },
};

const ProfileViewer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setProfileData(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockProfile = mockProfiles[username.toLowerCase()];
    
    if (mockProfile) {
      setProfileData(mockProfile);
    } else {
      setError('User not found. Try: tech_enthusiast, travel_explorer, or private_user');
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Instagram Profile Viewer
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Educational demo showing profile data visualization. This tool uses mock data for demonstration purposes only.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> This is an educational demonstration. Real Instagram scraping violates terms of service. 
              Use Instagram Graph API for legitimate development.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Instagram username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-all duration-300 shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search Profile'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Profile Data */}
        {profileData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-8 text-white">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <img
                      src={profileData.profilePictureUrl}
                      alt={`${profileData.username}'s profile`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    {profileData.isPrivate && (
                      <div className="absolute -top-2 -right-2 bg-gray-700 text-white p-2 rounded-full">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                      <h2 className="text-2xl md:text-3xl font-bold">@{profileData.username}</h2>
                      {profileData.isVerified && (
                        <div className="bg-blue-500 text-white p-1 rounded-full">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-medium opacity-90 mb-2">{profileData.fullName}</h3>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      {profileData.isPrivate ? (
                        <div className="flex items-center space-x-1 bg-black bg-opacity-20 px-3 py-1 rounded-full">
                          <Lock className="w-4 h-4" />
                          <span>Private Account</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 bg-green-500 px-3 py-1 rounded-full">
                          <Globe className="w-4 h-4" />
                          <span>Public Account</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              {!profileData.isPrivate ? (
                <>
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                          {formatNumber(profileData.postCount)}
                        </div>
                        <div className="text-gray-600 text-sm md:text-base">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                          {formatNumber(profileData.followerCount)}
                        </div>
                        <div className="text-gray-600 text-sm md:text-base">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                          {formatNumber(profileData.followingCount)}
                        </div>
                        <div className="text-gray-600 text-sm md:text-base">Following</div>
                      </div>
                    </div>

                    {/* Biography */}
                    {profileData.biography && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Biography</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {profileData.biography}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Technical Details */}
                    <div className="border-t pt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Technical Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <span className="font-medium text-gray-600">Profile Picture URL:</span>
                          <div className="text-blue-600 mt-1 break-all text-xs">
                            {profileData.profilePictureUrl}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <span className="font-medium text-gray-600">Account Type:</span>
                          <div className="mt-1">
                            {profileData.isPrivate ? (
                              <span className="text-red-600 font-medium">Private</span>
                            ) : (
                              <span className="text-green-600 font-medium">Public</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Private Account</h3>
                  <p className="text-gray-600">
                    This account is private. Profile data is not accessible through scraping methods.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Educational Information */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Educational Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-3">Why This Demo?</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Demonstrates UI/UX principles</li>
                  <li>• Shows error handling patterns</li>
                  <li>• Illustrates responsive design</li>
                  <li>• Teaches API integration concepts</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-pink-600 mb-3">Legitimate Alternatives</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Instagram Graph API</li>
                  <li>• Instagram Basic Display API</li>
                  <li>• Official Instagram widgets</li>
                  <li>• Third-party authorized services</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Try These Demo Usernames:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(mockProfiles).map((username) => (
                  <button
                    key={username}
                    onClick={() => setUsername(username)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {username}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;