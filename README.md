# Social Media Account Analytics and Engagement Tool

A cross-platform social media analytics dashboard built as a Final Year Project for BSc Computer Science & Mathematics at Nottingham Trent University (2025).

The dashboard provides interactive visualisations, sentiment analysis, and engagement metrics across Twitter, Instagram, and TikTok — designed to be accessible for non-technical users without requiring a large budget.

---

## Features

- **Cross-platform analytics** — engagement metrics for Twitter, Instagram, and TikTok in one place
- **Interactive charts** — line, bar, and pie charts powered by Chart.js with customisable date filters
- **Sentiment analysis** — classifies user comments as positive, neutral, or negative
- **Educational tooltips** — built-in guidance to help non-technical users interpret metrics
- **User management** — secure login and registration system with admin panel
- **Role-based access** — separate admin and standard user roles

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | HTML, CSS, JavaScript, Chart.js |
| Database | MySQL (via mysql2) |
| Auth | bcryptjs (password hashing) |
| Data | CSV datasets from Kaggle (simulated platform data) |

---

## Project Structure

```
social-media-dashboard/
├── index.js          # Express server & API routes
├── db.js             # Database connection
├── initializeDB.js   # Database table setup
├── public/
│   ├── index.html    # Login page
│   ├── dashboard.html # Main analytics dashboard
│   ├── admin.html    # Admin user management panel
│   ├── 404.html      # Error page
│   ├── style.css     # Stylesheet
│   ├── data.json     # Processed engagement data
│   ├── tiktok.csv    # TikTok dataset
│   └── sentimentdataset.csv # Sentiment analysis data
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- A MySQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/social-media-dashboard.git
   cd social-media-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   PORT=3000
   ```

4. Initialise the database tables:
   ```bash
   node initializeDB.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:3000`

---

## Usage

- **Login page** (`/`) — sign in as a standard user or admin
- **Dashboard** (`/dashboard`) — view charts, apply filters, and explore engagement data
- **Admin panel** (`/admin`) — manage registered users (admin accounts only)

---

## Data Sources

Due to API access restrictions from social media platforms, this project uses publicly available datasets from Kaggle to simulate real-world data:

- Twitter and Instagram engagement data
- TikTok metrics dataset
- Sentiment analysis dataset

---

## Future Improvements

- Real-time data integration via official platform APIs
- AI-driven content recommendations
- Advanced sentiment analysis using NLP models
- Enhanced security and session management

---

## Author

**Muhamed Kinteh**  
BSc Computer Science & Mathematics — Nottingham Trent University, 2025  
Supervised by Dr Vishal A. Thakor
