# 🚀 Coding Hive

**Coding Hive** is your personalized dashboard for everything competitive programming. It integrates multiple coding platforms to help users stay updated with contests, practice daily problems, learn from past contests via YouTube, and track progress across sites — all in one place.
---
## 🌐 Live Demo  
👉 [Visit Coding Hive](https://codinghive-frontend.onrender.com)

## 🔑 Features

- 🔐 **OAuth Login with Google**  
  Secure authentication through Google Sign-In.

- 📅 **Contest Calendar**  
  Displays upcoming contests from:
  - Codeforces
  - LeetCode
  - CodeChef  
  *(Fetched using public APIs and GitHub-hosted APIs)*

- 🎥 **YouTube-Based Post-Contest Video Solutions**  
  Automatically fetched using the YouTube Data API.

- 📧 **Email Notifications (Nodemailer)**  
  - 🔔 Login alerts  
  - 🔄 Password resets  
  - 💡 Feature and feedback submissions

- 📌 **Problem of the Day (POTD)**  
  Daily problems curated from integrated coding platforms.

- 📊 **User Profile Stats**  
  View ratings and number of problems solved for each platform (e.g., CodeChef, Codeforces) on the profile page.

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js with Express  
- **Database**: MongoDB  
- **Authentication**: Google OAuth 2.0  
- **Email Services**: Nodemailer  
- **APIs**:
  - clist API – for fetching upcoming contests  
  - GitHub-hosted APIs – for POTDs  
  - YouTube Data API v3 – for editorial and solution videos

---

## 📬 Email Triggers via Nodemailer

- Upon successful login and registration  
- For password reset requests  

---

## 🎯 Future Enhancements

- 📧 Contest reminder emails  
- ✅ Display of attempted problems:
  - Grouped by difficulty (Easy / Medium / Hard)
  - Categorized by problem tags (e.g., Arrays, Graphs, DP)
  - Shows problem status (Attempted, Solved, Unsolved)
---
# 📝 Prerequisites

-MongoDB connection URI
MONGO_URI=your_mongodb_connection_string

-YouTube Data API Key
YOUTUBE_API_KEY=your_youtube_data_api_key

-Gmail credentials for Nodemailer (use App Password if 2FA is enabled)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_gmail_app_password

- Google OAuth 2.0 credentials
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

## 🧑‍💻 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Deekshi05/code_Tracker.git
cd coding-hive
npm install
