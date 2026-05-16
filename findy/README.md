# Job Scraper to Google Sheets Chrome Extension

A lightweight Chrome Extension (Manifest V3) that injects a "Save to Sheet" button into job cards and parses Company Name, Role, and Salary directly to a Google Sheet via Google Apps Script.

## Installation

### 1. Google Apps Script Setup
1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script** and paste the code found in `/google-apps-script/code.js`.
3. Replace `SPREADSHEET_ID` with your actual Sheet ID.
4. Deploy the script as a **Web App**, set access to **Anyone**, and copy the Web App URL.

### 2. Chrome Extension Setup
1. Clone or download this repository.
2. Open `extension/background.js` and paste your Web App URL into the `WEB_APP_URL` variable.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** (top-left button) and select the `extension` folder from this project.

## How to Use
Navigate to your target job board webpage. Click the green *Save to Sheet* button on any job card to instantly send its details to your spreadsheet tracker.

![](https://github.com/user-attachments/assets/610c85d0-5c96-4a3d-81dc-85d8f18227f5)