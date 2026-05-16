function doPost(e) {
  var SPREADSHEET_ID = "SPREADSHEET_ID";

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0]; // Targets the first tab

    // Parse the incoming payload from the Chrome Extension
    var data = JSON.parse(e.postData.contents);

    var company = data.company || "";
    var role = data.role || "";
    var statusDefault = "Scouted"; // Sets default status
    var techStack = "";            // Keeps Tech Stack column empty

    // Parse the salary string (e.g., "360万円〜700万円") into Min and Max millions
    var salaryData = parseSalaryToMillions(data.salary || "");

    // Map data EXACTLY to your column layout:
    // A: Company | B: Role Type | C: Status | D: Tech Stack | E: Salary Min | F: Salary Max
    sheet.appendRow([
      company,
      role,
      statusDefault,
      techStack,
      salaryData.min,
      salaryData.max
    ]);

    return ContentService.createTextOutput("Success");

  } catch(error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

/**
 * Helper function to split "360万円〜700万円" into 3.6 and 7
 */
function parseSalaryToMillions(salaryStr) {
  var min = "";
  var max = "";

  if (!salaryStr) return { min: min, max: max };

  // Split the string using common Japanese tilde separators (〜 or ~)
  var parts = salaryStr.split(/[〜~]/);

  if (parts.length >= 1) {
    min = convertToMillionsNumber(parts[0]);
  }
  if (parts.length >= 2) {
    max = convertToMillionsNumber(parts[1]);
  }

  return { min: min, max: max };
}

/**
 * Helper function to turn "360万円" into 3.6
 */
function convertToMillionsNumber(str) {
  // Look for numbers/decimals before the '万' character
  var match = str.match(/([0-9.]+)\s*万/);
  if (match) {
    var value = parseFloat(match[1]);
    // 360万 divided by 100 equals 3.6 million
    return value >= 100 ? value / 100 : value;
  }

  // Fallback fallback if it's already a clean number format
  var rawMatch = str.match(/[0-9.]+/);
  return rawMatch ? parseFloat(rawMatch[0]) : "";
}