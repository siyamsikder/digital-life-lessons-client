# LifeNotes – Capture Your Life Lessons, Simply

**Live Site URL:** [https://life-notes.netlify.app](https://life-notes.netlify.app)

## 💡 Project Overview
LifeNotes is a digital sanctuary designed for individuals to document, preserve, and share the wisdom they gather throughout their life journey. It bridges the gap between personal reflection and community learning, allowing users to organize their insights, discover lessons from others, and grow through shared experiences.

## 🚀 Key Features
* **Dual Access Levels:** Users can categorize lessons as "Free" or "Premium." Premium content is blurred for free users, encouraging community growth and monetization.
* **Secure Stripe Integration:** A seamless "Upgrade to Premium" flow using Stripe, granting users lifetime access to exclusive wisdom and advanced features.
* **Dynamic Dashboards:** Dedicated management panels for both Users (to track personal lessons and favorites) and Admins (to moderate content and manage users).
* **Emotional & Categorical Filtering:** Advanced search and filter system that allows users to find lessons based on "Emotional Tone" (e.g., Motivational, Realization) or "Category."
* **Community Engagement:** Interactive features including a "Like" system, "Save to Favorites," and a "Reporting" mechanism to ensure platform quality and safety.

## 🛠️ Technologies Used
* **Frontend:** React.js, Tailwind CSS, TanStack Query
* **Authentication:** Firebase (Email/Password & Google Social Login)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Payment Gateway:** Stripe API
* **Notifications:** SweetAlert2 / React-Toastify

## 📦 Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/siyamsikder/digital-life-lessons-client.git](https://github.com/siyamsikder/digital-life-lessons-client.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase and Stripe credentials:
    ```env
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_stripe_public_key=your_stripe_key
    ```
4.  **Run the application:**
    ```bash
    npm run dev
    ```

## 📋 Packages Used
* `axios`: For handling API requests.
* `stripe`: To process secure lifetime premium payments.
* `react-router-dom`: For navigation and protected routing.
* `lottie-react`: For engaging animations when adding lessons.
* `react-share`: To enable social media sharing of life wisdom.
