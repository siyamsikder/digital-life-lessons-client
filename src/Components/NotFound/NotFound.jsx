import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="text-center max-w-md">
        {/* Image */}
        <img
          src="https://i.ibb.co.com/V0nyXF92/404-error-with-people-holding-the-numbers-bro-removebg-preview.png"
          alt="404 Not Found"
          className="w-full max-w-sm mx-auto mb-8"
        />

        {/* Text */}
        <h2 className="text-3xl font-bold mb-3 text-heading">
          Page Not Found
        </h2>
        <p className="text-text-soft mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
