# 🚀 Coding Hive

**Coding Hive** is your personalized dashboard for everything competitive programming. It integrates multiple coding platforms to help users stay updated with contests, practice daily problems, learn from past contests via YouTube, and track progress across sites — all in one place.

## 🔑 Features

- 🔐 **OAuth Login with Google**  
  Secure authentication through Google Sign-In.

- 📅 **Contest Calendar**  
  Displays upcoming contests from:
  - Codeforces
  - LeetCode
  - CodeChef  
  (Fetched using public APIs and github hosted APIs)

- 🎥 **YouTube-Based Post-Contest Video Solutions**  
  Automatically fetched using the YouTube Data API.

- 📧 **Email Notifications (Nodemailer)**  
  - 🔔 Login alerts  
  - 🔄 Password resets  
  - 💡 Feature and feedback submissions

- 📌 **Problem of the Day (POTD)**  
  Daily problems curated from integrated coding platforms.

- 📊 **User Profile Stats**  
  View ratings and number of problems solved for each platform (e.g., codechef, Codeforces) on the profile page.

## 🛠 Tech Stack

* **Frontend**:React,Tailwind
* **Backend**: Node.js with Express
* **Database**: MongoDB
* **Authentication**: Google OAuth 2.0
* **Email Services**: Nodemailer
* **APIs**:
  - **Clist.by API** – for fetching upcoming contests
  - **GitHub-hosted APIs** – for POTDs
  - **YouTube Data API v3** – for editorial and solution videos

## 📬 Email Triggers via Nodemailer

- Upon successful login and register
- For password reset requests

## 🎯 Future Enhancements

- Contest reminder emails
- GitHub integration to track solved problems
- Difficulty-based POTD customization
- Leaderboards and user groups
- Push notifications for contest start

## 📸 Screenshots

*(Add screenshots or a demo GIF here to visually showcase the UI and features)*

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js
- MongoDB
- Google Developer Console credentials for OAuth
- YouTube Data API key

### Installation

```bash
git clone https://github.com/yourusername/coding-hive.git
cd coding-hive
npm install
