import React, { useState, useMemo } from 'react';
import { Star, StarHalf, User, Send, MessageSquare, X } from 'lucide-react';

// --- Helper Components ---

/**
 * Renders a star rating based on a score (0 to 5).
 * @param {number} rating - The score to display.
 * @param {string} size - Tailwind size class for the icons.
 */
const StarRatingDisplay = ({ rating, size = 'w-5 h-5' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className={`${size} fill-yellow-500 text-yellow-500`} />);
  }
  // Half star
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className={`${size} fill-yellow-500 text-yellow-500`} />);
  }
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className={`${size} text-gray-300`} />);
  }

  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

/**
 * Component for submitting a new review.
 */
const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !title || !content) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit({ rating, title, content });
      // Reset form
      setRating(0);
      setTitle('');
      setContent('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" /> Write a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  starValue <= rating
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
                onClick={() => setRating(starValue)}
              />
            ))}
          </div>
          {rating === 0 && <p className="text-red-500 text-xs mt-1">Please select a rating.</p>}
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700">
            Review Title
          </label>
          <input
            id="reviewTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Excellent product quality!"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 transition duration-150"
            required
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="reviewContent" className="block text-sm font-medium text-gray-700">
            Your detailed review
          </label>
          <textarea
            id="reviewContent"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with the product..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 transition duration-150"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ${
            rating === 0 || isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" /> Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

/**
 * Component for displaying a single review card.
 */
const ReviewCard = ({ review }) => {
  return (
    <div className="p-5 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-gray-500 bg-gray-100 p-1 rounded-full" />
          <div>
            <p className="font-semibold text-gray-800">{review.user}</p>
            <StarRatingDisplay rating={review.rating} size="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
      <h4 className="text-lg font-bold mt-2 mb-1 text-gray-900">{review.title}</h4>
      <p className="text-gray-600 leading-relaxed">{review.content}</p>
    </div>
  );
};

/**
 * Main component for displaying the product review section.
 */
export default function ProductReviewSection() {
  // Mock Data
  const initialReviews = [
    { id: 1, user: "Ahmed M.", rating: 5, date: "2024-07-15", title: "Amazing Quality!", content: "The product exceeded my expectations. Highly recommend it to everyone looking for durability and style." },
    { id: 2, user: "Sarah K.", rating: 4, date: "2024-07-10", title: "Great value, minor issue.", content: "It's a fantastic product for the price. Docked one star because the shipping was slightly delayed." },
    { id: 3, user: "Omar H.", rating: 5, date: "2024-06-28", title: "Perfect fit and finish.", content: "Exactly as described. The materials feel premium and the design is sleek. Five stars!" },
    { id: 4, user: "Lina Z.", rating: 3.5, date: "2024-06-01", title: "Decent, but not perfect.", content: "It does the job, but I found the instructions a bit confusing. Overall average experience." },
  ];

  const [reviews, setReviews] = useState(initialReviews);

  // Calculate Summary Statistics
  const { averageRating, totalReviews } = useMemo(() => {
    const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
    const count = reviews.length;
    const avg = count > 0 ? (totalScore / count).toFixed(1) : 0;
    return { averageRating: parseFloat(avg), totalReviews: count };
  }, [reviews]);

  const handleNewReview = (newReviewData) => {
    const newReview = {
      id: reviews.length + 1,
      user: "You (Pending Approval)", // Placeholder for the current user
      date: new Date().toISOString().split('T')[0],
      ...newReviewData,
    };
    // In a real application, this would trigger a re-fetch or update state after server confirmation
    setReviews([newReview, ...reviews]);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
        Customer Reviews ({totalReviews})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Column 1: Summary and Form (Sticky on larger screens) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Review Summary Card */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg text-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Overall Rating</p>
            <p className="text-6xl font-bold text-gray-900 mt-2">{averageRating}</p>
            <div className="flex justify-center my-3">
              <StarRatingDisplay rating={averageRating} size="w-7 h-7" />
            </div>
            <p className="text-sm text-gray-600">Based on {totalReviews} verified ratings</p>
          </div>

          {/* Review Submission Form */}
          <ReviewForm onSubmit={handleNewReview} />
        </div>

        {/* Column 2: Review List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <h3 className="text-2xl font-semibold p-5 border-b text-gray-800">
            All Customer Feedback
          </h3>
          <div className="divide-y divide-gray-100">
            {totalReviews === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <X className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p>Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}