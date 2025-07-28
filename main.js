// Enhanced notification system
function showProfessionalNotification(title, message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">${icons[type]}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, duration);
}

// Enhanced navigation function for modules
function navigateToSection(sectionId, moduleName) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showProfessionalNotification(
            `Navigating to ${moduleName}`,
            `Accessing ${moduleName} section with comprehensive information`,
            'info'
        );
        
        section.style.background = 'rgba(255, 215, 0, 0.1)';
        setTimeout(() => {
            section.style.background = 'transparent';
        }, 2000);
    } else {
        showProfessionalNotification(
            'Navigation Error',
            `Unable to locate ${moduleName} section`,
            'error'
        );
    }
}

// Global functions - Define first for onclick handlers
function openChecklistModal() {
    console.log('Opening checklist modal');
    const modal = document.getElementById('checklistSelectionModal');
    if (modal) {
        modal.classList.remove('hidden');
        showProfessionalNotification(
            'Checklist Selection',
            'Choose from available business checklists',
            'info'
        );
    } else {
        console.error('checklistSelectionModal not found');
        showProfessionalNotification(
            'System Error',
            'Checklist modal not available',
            'error'
        );
    }
}

function closeChecklistSelection() {
    console.log('Closing checklist selection');
    const modal = document.getElementById('checklistSelectionModal');
    if (modal) {
        modal.classList.add('hidden');
        showProfessionalNotification(
            'Selection Cancelled',
            'Checklist selection closed',
            'info'
        );
    }
}

function openChecklist(type) {
    console.log('Opening checklist for type:', type);
    const modal = document.getElementById('checklistModal');
    const title = document.getElementById('checklistTitle');
    const content = document.getElementById('checklistContent');
    
    if (!modal || !title || !content) {
        console.error('Checklist modal elements not found');
        showProfessionalNotification(
            'System Error',
            'Checklist components not available',
            'error'
        );
        return;
    }
    
    let checklistItems = [];
    let checklistTitle = '';
    
    switch (type) {
        case 'services':
            checklistTitle = 'Services Checklist';
            checklistItems = [
                { name: 'Business Registration', description: 'Register your company with URSB', mandatory: true },
                { name: 'Tax Registration', description: 'Obtain TIN and register for VAT/PAYE with URA', mandatory: true },
                { name: 'Social Security', description: 'Register employees with NSSF', mandatory: true },
                { name: 'Communications License', description: 'Obtain telecom/broadcasting license from UCC (if applicable)', mandatory: false },
                { name: 'Investment Facilitation', description: 'Apply for investment license with UIA', mandatory: false },
                { name: 'Capital Markets', description: 'Obtain securities license from CMA (if applicable)', mandatory: false }
            ];
            break;
        case 'investments':
            checklistTitle = 'Investments Checklist';
            checklistItems = [
                { name: 'Agricultural Credit', description: 'Apply for low-interest loans with BOU', mandatory: false },
                { name: 'Tourism Development', description: 'Explore hotel/eco-tourism incentives with UTB', mandatory: false },
                { name: 'Tech Innovation', description: 'Apply for startup funding with NITA', mandatory: false },
                { name: 'Investment License', description: 'Secure investment license from UIA', mandatory: true }
            ];
            break;
        case 'calculator':
            checklistTitle = 'Tax Checklist';
            checklistItems = [
                { name: 'Verify Investment Amount', description: 'Ensure accurate investment figures', mandatory: true },
                { name: 'Select ATMS Sector', description: 'Choose appropriate sector for tax rates', mandatory: true },
                { name: 'Confirm Investment Type', description: 'Specify new, expansion, or acquisition', mandatory: true },
                { name: 'Consult URA', description: 'Validate calculations with URA for accuracy', mandatory: false }
            ];
            break;
        default:
            console.error('Unknown checklist type:', type);
            showProfessionalNotification(
                'Invalid Request',
                `Unknown checklist type: ${type}`,
                'error'
            );
            return;
    }

    title.textContent = checklistTitle;
    content.innerHTML = checklistItems.map(item => `
        <div class="checklist-item">
            <input type="checkbox" class="mt-1" ${item.mandatory ? 'checked disabled' : ''}>
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600">${item.description}</p>
                ${item.mandatory ? '<span class="tag tag-mandatory mt-2">Required</span>' : ''}
            </div>
        </div>
    `).join('');

    closeChecklistSelection();
    modal.classList.remove('hidden');
    showProfessionalNotification(
        `${checklistTitle} Opened`,
        `Displaying ${checklistItems.length} checklist items`,
        'success'
    );
}

function closeChecklist() {
    console.log('Closing checklist');
    const modal = document.getElementById('checklistModal');
    if (modal) {
        modal.classList.add('hidden');
        showProfessionalNotification(
            'Checklist Closed',
            'Requirements checklist has been closed',
            'info'
        );
    }
}

function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    showProfessionalNotification(
        'Mobile Navigation',
        'Mobile menu toggled',
        'info',
        2000
    );
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showProfessionalNotification(
        'Navigation',
        'Scrolling to top of page',
        'info',
        2000
    );
}

function makeCall(phone) {
    window.location.href = `tel:${phone}`;
    showProfessionalNotification(
        'Initiating Call',
        `Connecting to ${phone}`,
        'success'
    );
}

function openChat() {
    window.location.href = 'https://wa.me/+256775692335';
    showProfessionalNotification(
        'WhatsApp Support',
        'Opening WhatsApp chat for instant support',
        'success'
    );
}

function downloadBankableProjects() {
    const downloadUrl = 'https://github.com/Ptr234/TEC/raw/main/Bankable%20Projects%20-%202025.3%20comp.pdf';
    
    try {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Bankable Projects - 2025.3 comp.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showProfessionalNotification(
            'Download Started',
            'Bankable Projects PDF download initiated',
            'success'
        );
    } catch (error) {
        console.error('Download error:', error);
        window.open(downloadUrl, '_blank');
        showProfessionalNotification(
            'Download Alternative',
            'Opening PDF in new tab - download may follow',
            'warning'
        );
    }
}

function calculateTax() {
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const sector = document.getElementById('sector').value;
    const type = document.getElementById('investmentType').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = '<p class="text-red-600">Please enter a valid investment amount.</p>';
        resultDiv.classList.remove('hidden');
        showProfessionalNotification(
            'Input Error',
            'Please provide a valid investment amount',
            'error'
        );
        return;
    }

    let taxRate, taxHoliday, vatRate;
    switch (sector) {
        case 'agriculture':
            taxRate = type === 'new' ? 0.1 : 0.15;
            taxHoliday = type === 'new' ? 10 : 5;
            vatRate = 0.18;
            break;
        case 'tourism':
            taxRate = type === 'new' ? 0.12 : 0.18;
            taxHoliday = type === 'new' ? 8 : 4;
            vatRate = 0.18;
            break;
        case 'minerals':
            taxRate = type === 'new' ? 0.15 : 0.2;
            taxHoliday = type === 'new' ? 7 : 3;
            vatRate = 0.18;
            break;
        case 'ict':
            taxRate = type === 'new' ? 0.08 : 0.12;
            taxHoliday = type === 'new' ? 10 : 5;
            vatRate = 0.16;
            break;
        default:
            taxRate = 0.3;
            taxHoliday = 0;
            vatRate = 0.18;
    }

    const corporateTax = amount * taxRate;
    const vat = amount * vatRate;
    const totalTax = corporateTax + vat;

    resultDiv.innerHTML = `
        <h3 class="text-lg md:text-xl font-bold mb-4">Tax Calculation Results</h3>
        <p><strong>Sector:</strong> ${sector.charAt(0).toUpperCase() + sector.slice(1)}</p>
        <p><strong>Investment Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p><strong>Investment Amount:</strong> USD ${amount.toLocaleString()}</p>
        <p><strong>Corporate Tax Rate:</strong> ${(taxRate * 100).toFixed(2)}%</p>
        <p><strong>VAT Rate:</strong> ${(vatRate * 100).toFixed(2)}%</p>
        <p><strong>Estimated Corporate Tax:</strong> USD ${corporateTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p><strong>Estimated VAT:</strong> USD ${vat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p><strong>Total Estimated Tax:</strong> USD ${totalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p><strong>Tax Holiday:</strong> ${taxHoliday} years</p>
        <p class="text-sm text-gray-600 mt-4">Note: These are estimated figures. Consult with URA for precise calculations.</p>
    `;
    resultDiv.classList.remove('hidden');
    showProfessionalNotification(
        'Calculation Complete',
        `Tax calculation for USD ${amount.toLocaleString()} in ${sector} sector`,
        'success'
    );
}

function openEmail(service, email) {
    document.getElementById('modalService').value = service;
    document.getElementById('modalEmail').dataset.email = email;
    document.getElementById('emailModal').classList.remove('hidden');
    showProfessionalNotification(
        'Email Form Opened',
        `Composing email for ${service}`,
        'info'
    );
}

function closeEmail() {
    document.getElementById('emailModal').classList.add('hidden');
    document.getElementById('modalName').value = '';
    document.getElementById('modalEmail').value = '';
    document.getElementById('modalMessage').value = '';
    showProfessionalNotification(
        'Email Form Closed',
        'Email composition cancelled',
        'info'
    );
}

function sendEmail() {
    const service = document.getElementById('modalService').value;
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const message = document.getElementById('modalMessage').value;
    const recipient = document.getElementById('modalEmail').dataset.email;

    if (!name || !email || !message) {
        showProfessionalNotification(
            'Incomplete Form',
            'Please fill in all required fields',
            'error'
        );
        return;
    }

    const subject = encodeURIComponent(`Inquiry about ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    closeEmail();
    showProfessionalNotification(
        'Email Prepared',
        'Opening default email client with pre-filled message',
        'success'
    );
}

function filterServices() {
    const sector = document.getElementById('sectorFilter').value;
    const location = document.getElementById('locationFilter').value;
    const serviceType = document.getElementById('serviceTypeFilter').value;
    const servicesList = document.getElementById('servicesList');
    const cards = servicesList.getElementsByClassName('service-card');

    let visibleCount = 0;
    Array.from(cards).forEach(card => {
        const cardSector = card.dataset.sector;
        const cardLocation = card.dataset.location;
        const cardType = card.dataset.type;

        const matchesSector = sector === 'all' || cardSector === sector;
        const matchesLocation = location === 'all' || cardLocation === location;
        const matchesType = serviceType === 'all' || cardType === serviceType;

        const isVisible = matchesSector && matchesLocation && matchesType;
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });
    
    showProfessionalNotification(
        'Filters Applied',
        `Showing ${visibleCount} matching services`,
        'success'
    );
}

function clearFilters() {
    document.getElementById('sectorFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('serviceTypeFilter').value = 'all';
    filterServices();
    showProfessionalNotification(
        'Filters Reset',
        'All filters cleared - showing all services',
        'info'
    );
}

// Legacy notification function for backwards compatibility
function showNotification(message, type = 'info') {
    const titles = {
        success: 'Success',
        error: 'Error',
        info: 'Information',
        warning: 'Warning'
    };
    showProfessionalNotification(titles[type], message, type, 3000);
}

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1, // deletion
                matrix[j - 1][i] + 1, // insertion
                matrix[j - 1][i - 1] + indicator // substitution
            );
        }
    }
    return matrix[b.length][a.length];
}

// Search functionality
const services = [
    { name: "Business Registration", sector: "all", location: "kampala", type: "registration", description: "Company incorporation, business names, and certificate services", tags: ["Company registration", "Business names", "Certificates"], url: "https://www.ursb.go.ug", section: "#services", weight: 2 },
    { name: "Tax Registration", sector: "all", location: "kampala", type: "registration", description: "VAT, PAYE registration and customs clearance services", tags: ["VAT registration", "PAYE", "Customs"], url: "https://www.ura.go.ug", section: "#services", weight: 2 },
    { name: "Social Security", sector: "all", location: "kampala", type: "registration", description: "Employee social security and pension services", tags: ["Employee registration", "Pension", "Benefits"], url: "https://www.nssfug.org", section: "#services", weight: 1 },
    { name: "Communications License", sector: "ict", location: "kampala", type: "licensing", description: "Telecommunications and broadcasting licensing services", tags: ["Telecom license", "Broadcasting", "ISP license"], url: "https://www.ucc.co.ug", section: "#services", weight: 1 },
    { name: "Investment Facilitation", sector: "all", location: "kampala", type: "investment", description: "One-stop investment services and incentives", tags: ["Investment license", "Tax incentives", "Facilitation"], url: "https://www.ugandainvest.go.ug", section: "#services", weight: 1 },
    { name: "Capital Markets", sector: "all", location: "kampala", type: "licensing", description: "Securities licensing and market regulation services", tags: ["Securities license", "Investment advisory", "Market surveillance"], url: "https://www.cmauganda.co.ug", section: "#services", weight: 1 },
    { name: "Agricultural Credit", sector: "agriculture", location: "kampala", type: "investment", description: "Low-interest credit for agricultural investments and value chains", tags: ["Agricultural loans", "Value chains", "Farm financing"], url: "https://www.bou.or.ug", section: "#investments", weight: 1 },
    { name: "Tourism Development", sector: "tourism", location: "kampala", type: "investment", description: "Hotel development and eco-tourism investment opportunities", tags: ["Hotel development", "Eco-tourism", "Tourism incentives"], url: "https://www.visituganda.com", section: "#investments", weight: 1 },
    { name: "Tech Innovation", sector: "ict", location: "kampala", type: "investment", description: "Startup funding and digital infrastructure investments", tags: ["Startup funding", "Digital infrastructure", "Innovation grants"], url: "https://www.nita.go.ug", section: "#investments", weight: 1 },
    { name: "Tax Calculator", sector: "all", location: "all", type: "calculator", description: "Calculate potential tax obligations and incentives", tags: ["Tax", "Calculator", "Incentives"], url: "", section: "#calculator", weight: 2 }
];

let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
let currentSuggestionIndex = -1;

function updateSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '<p class="text-sm text-gray-600 mr-2">Recent searches:</p>';
    searchHistory.forEach(term => {
        const button = document.createElement('button');
        button.textContent = term;
        button.className = 'quick-search-btn';
        button.onclick = () => quickSearch(term);
        historyContainer.appendChild(button);
    });
    historyContainer.classList.toggle('hidden', searchHistory.length === 0);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function highlightElement(serviceName, section) {
    document.querySelectorAll('.highlight-card').forEach(el => el.classList.remove('highlight-card'));
    
    const sectionElement = document.querySelector(section);
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (section === '#calculator') {
            const calculatorCard = sectionElement.querySelector('.service-card');
            if (calculatorCard) {
                calculatorCard.classList.add('highlight-card');
                setTimeout(() => calculatorCard.classList.remove('highlight-card'), 3000);
            }
        } else {
            const cards = sectionElement.querySelectorAll('.service-card');
            cards.forEach(card => {
                const title = card.querySelector('h3');
                if (title && title.textContent.toLowerCase().includes(serviceName.toLowerCase())) {
                    card.classList.add('highlight-card');
                    setTimeout(() => card.classList.remove('highlight-card'), 3000);
                }
            });
        }
    }
}

function performSearch(query) {
    const suggestions = document.getElementById('suggestions');
    const searchInput = document.getElementById('searchInput');
    if (!suggestions || !searchInput) {
        console.error('Suggestions or searchInput element not found');
        showProfessionalNotification(
            'System Error',
            'Search components not available',
            'error'
        );
        return;
    }
    
    suggestions.innerHTML = '';
    
    if (query.trim() === '') {
        suggestions.style.display = 'none';
        showProfessionalNotification(
            'Search',
            'Start typing to search for services',
            'info',
            2000
        );
        return;
    }

    const queryLower = query.toLowerCase().trim();
    const queryWords = queryLower.split(/\s+/);

    const scoredServices = services.map(service => {
        let score = service.weight || 1; // Base score from weight
        const nameLower = service.name.toLowerCase();
        const descLower = service.description.toLowerCase();
        const tagsLower = service.tags.map(tag => tag.toLowerCase());
        const sectorLower = service.sector.toLowerCase();
        const typeLower = service.type.toLowerCase();

        // Scoring for each word in the query
        queryWords.forEach(word => {
            if (nameLower.includes(word)) score += 4; // High weight for name
            if (descLower.includes(word)) score += 2; // Medium weight for description
            tagsLower.forEach(tag => {
                if (tag.includes(word)) score += 1.5; // Weight for tags
            });
            if (sectorLower.includes(word)) score += 1; // Bonus for sector
            if (typeLower.includes(word)) score += 1; // Bonus for type
            if (nameLower.startsWith(word)) score += 2; // Boost for prefix match
            if (descLower.startsWith(word)) score += 1; // Boost for description prefix
        });

        // Fuzzy matching for typos (queries >= 3 chars)
        if (queryWords.some(word => word.length >= 3)) {
            queryWords.forEach(word => {
                if (word.length < 3) return;
                const nameDistance = Math.min(...nameLower.split(' ').map(w => levenshteinDistance(word, w)));
                if (nameDistance <= 2) score += 2 / (nameDistance + 1); // Fuzzy match on name
                const tagDistance = Math.min(...tagsLower.map(tag => levenshteinDistance(word, tag)));
                if (tagDistance <= 2) score += 1 / (tagDistance + 1); // Fuzzy match on tags
            });
        }

        // Boost for recent searches
        if (searchHistory.some(term => term.includes(queryLower) || queryLower.includes(term))) {
            score += 1;
        }

        return { ...service, score };
    });

    // Filter and sort services
    const filteredServices = scoredServices
        .filter(service => service.score > 1) // Include any service with a score above base weight
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

    // Fallback to popular services if no matches
    const results = filteredServices.length > 0 
        ? filteredServices.slice(0, 5)
        : services
            .map(service => ({ ...service, score: service.weight || 1 }))
            .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
            .slice(0, 3);

    // Populate suggestions
    results.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            ${highlightMatch(service.name, query)}
            <span class="text-sm text-gray-500 ml-2">(${service.section.replace('#', '')})</span>
        `;
        div.onclick = () => {
            highlightElement(service.name, service.section);
            if (service.url) {
                window.open(service.url, '_blank');
                showProfessionalNotification(
                    'External Link',
                    `Opening ${service.name} website`,
                    'info'
                );
            }
            addToSearchHistory(query);
            suggestions.style.display = 'none';
            searchInput.value = ''; // Clear input
        };
        suggestions.appendChild(div);
    });

    suggestions.style.display = results.length > 0 ? 'block' : 'none';
    currentSuggestionIndex = -1;
    
    showProfessionalNotification(
        filteredServices.length > 0 ? 'Search Results' : 'Suggested Services',
        filteredServices.length > 0 
            ? `Found ${filteredServices.length} matching services`
            : `No exact matches for "${query}". Showing popular services.`,
        filteredServices.length > 0 ? 'success' : 'info',
        2000
    );
}

function highlightMatch(text, query) {
    const queryWords = query.toLowerCase().trim().split(/\s+/);
    let highlightedText = text;
    queryWords.forEach(word => {
        if (word.length >= 1) {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
        }
    });
    return highlightedText;
}

function addToSearchHistory(term) {
    term = term.toLowerCase().trim();
    if (term && !searchHistory.includes(term)) {
        searchHistory.unshift(term);
        if (searchHistory.length > 5) searchHistory.pop();
        updateSearchHistory();
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        showProfessionalNotification(
            'Search History Updated',
            `"${term}" added to recent searches`,
            'info',
            2000
        );
    }
}

function quickSearch(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        performSearch(term);
        addToSearchHistory(term);
        
        const service = services.find(s => s.name.toLowerCase().includes(term.toLowerCase()));
        if (service && service.section) {
            highlightElement(service.name, service.section);
            showProfessionalNotification(
                'Quick Search',
                `Navigating to ${service.name}`,
                'success'
            );
        }
    }
}

function handleKeyNavigation(event) {
    const suggestions = document.getElementById('suggestions');
    if (!suggestions) return;
    
    const suggestionItems = suggestions.getElementsByClassName('suggestion-item');
    
    if (suggestionItems.length === 0) return;

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, suggestionItems.length - 1);
        updateSuggestionSelection(suggestionItems);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
        updateSuggestionSelection(suggestionItems);
    } else if (event.key === 'Enter' && currentSuggestionIndex >= 0) {
        event.preventDefault();
        suggestionItems[currentSuggestionIndex].click();
    } else if (event.key === 'Escape') {
        suggestions.style.display = 'none';
        currentSuggestionIndex = -1;
    }
}

function updateSuggestionSelection(suggestionItems) {
    Array.from(suggestionItems).forEach((item, index) => {
        item.classList.toggle('selected', index === currentSuggestionIndex);
        if (index === currentSuggestionIndex) {
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const debouncedSearch = debounce(performSearch, 300);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Bind search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => debouncedSearch(searchInput.value));
    } else {
        console.error('searchInput not found');
        showProfessionalNotification(
            'System Error',
            'Search input not available',
            'error'
        );
    }
    
    updateSearchHistory();
    
    setTimeout(() => {
        showProfessionalNotification(
            'Welcome to OneStopCentre Uganda',
            'Your gateway to simplified business services',
            'success',
            5000
        );
    }, 1000);

    window.addEventListener('scroll', () => {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('active', window.scrollY > 300);
        }
    });

    document.addEventListener('click', (e) => {
        const suggestions = document.getElementById('suggestions');
        if (suggestions && !e.target.closest('#searchInput') && !e.target.closest('.suggestions')) {
            suggestions.style.display = 'none';
            currentSuggestionIndex = -1;
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                showProfessionalNotification(
                    'Navigation',
                    `Scrolling to ${target.id || 'section'}`,
                    'info',
                    2000
                );
            }
        });
    });

    console.log('Initialization complete');
});
