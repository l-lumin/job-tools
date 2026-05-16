function injectScraperButtons() {
  // Find all job cards on the page matching your template element
  const cards = document.querySelectorAll('[data-testid="job-description-card"]');

  cards.forEach(card => {
    // Prevent duplicating the button if it's already injected
    if (card.querySelector('.sheet-scraper-btn')) return;

    // Create our clean, custom button element
    const btn = document.createElement('button');
    btn.className = 'sheet-scraper-btn';
    btn.innerText = 'Save to Sheet';

    // Style the button to fit neatly inside the card layout
    btn.style.backgroundColor = '#107c41'; // Spreadsheet Green
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.padding = '8px 14px';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.fontSize = '13px';
    btn.style.marginTop = '12px';
    btn.style.display = 'inline-block';

    // Click event handler dedicated strictly to this single card instance
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      btn.innerText = 'Sending';
      btn.style.backgroundColor = '#e0a800';
      btn.disabled = true;

      // Scrape elements relative ONLY to this specific card element block
      const companyEl = card.querySelector('p[data-font="heading-m"]');
      const company = companyEl ? companyEl.innerText.trim() : "Unknown Company";

      const infoItems = card.querySelectorAll('ul > li');
      let role = "Unknown Role";
      let salary = "Unknown Salary";

      if (infoItems.length >= 2) {
        role = infoItems[0].innerText.trim();
        salary = infoItems[1].innerText.trim();
      }

      const jobData = { company, role, salary };

      // Pass the scraped target data to our background script
      chrome.runtime.sendMessage({ action: "sendToSheets", data: jobData }, (response) => {
        if (chrome.runtime.lastError) {
          btn.innerText = 'Error';
          btn.style.backgroundColor = '#dc3545';
        } else {
          btn.innerText = 'Saved';
          btn.style.backgroundColor = '#6c757d';
        }
      });
    });

    // Inject the button at the bottom wrapper of the card layout
    card.appendChild(btn);
  });
}

// Initial execution when the page first loads
injectScraperButtons();

// Dynamic pages often lazy-load more cards as you scroll down.
setInterval(injectScraperButtons, 10000);