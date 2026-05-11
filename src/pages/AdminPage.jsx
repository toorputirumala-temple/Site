import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [imageLinks, setImageLinks] = useState(['', '']); // Start with 2 empty fields
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.info('Logged out.');
  };

  const handleAddImageLink = () => {
    setImageLinks([...imageLinks, '']);
  };

  const handleImageLinkChange = (index, value) => {
    const newLinks = [...imageLinks];
    newLinks[index] = value;
    setImageLinks(newLinks);
  };

  const handleRemoveImageLink = (index) => {
    if (imageLinks.length <= 2) {
      toast.warning('Minimum 2 images are required.');
      return;
    }
    const newLinks = imageLinks.filter((_, i) => i !== index);
    setImageLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty links and validate count
    const validLinks = imageLinks.filter(link => link.trim() !== '');
    if (validLinks.length < 2) {
      toast.error('Minimum 2 valid image links are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'events'), {
        name: eventName,
        date: eventDate,
        details: eventDetails,
        images: validLinks,
        createdAt: serverTimestamp(),
      });

      toast.success('Event added successfully!');
      // Reset form
      setEventName('');
      setEventDate('');
      setEventDetails('');
      setImageLinks(['', '']);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#182856] mb-8">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#f47728] focus:border-[#f47728]"
                placeholder="admin@temple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#f47728] focus:border-[#f47728]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#f47728] text-white py-3 rounded-xl font-bold hover:bg-[#d66620] transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-[#f47728] transition-colors">
              &larr; Back to Temple Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#182856]">Event Management</h1>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-sm"
            >
              Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#182856] py-6 px-8">
            <h2 className="text-2xl font-bold text-white">Add New Event</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Event Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maha Shivaratri 2024"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f47728] outline-none"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Event Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f47728] outline-none"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Event Details</label>
              <textarea
                required
                rows="4"
                placeholder="Describe the event, rituals, and timings..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f47728] outline-none resize-none"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 flex justify-between items-center">
                <span>Google Drive Image Links (Min 2)</span>
                <button
                  type="button"
                  onClick={handleAddImageLink}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                >
                  <span className="text-lg font-bold">+</span> Add Image
                </button>
              </label>
              
              <div className="space-y-3">
                {imageLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      required
                      placeholder="Paste Google Drive shareable link here..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f47728] outline-none"
                      value={link}
                      onChange={(e) => handleImageLinkChange(index, e.target.value)}
                    />
                    {imageLinks.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImageLink(index)}
                        className="bg-red-50 text-red-500 px-4 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">
                * Note: Ensure the Google Drive file has "Anyone with the link" access.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f47728] hover:bg-[#d66620]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Publish Event'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
