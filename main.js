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
    const mobileNav = document.getElementById('mobileNav');
    
    if (section) {
        // Hide mobile navigation menu if open
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        
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
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
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
    { name: "Business Registration", sector: "all", location: "kampala", type: "registration", description: "Company incorporation, business names, and certificate services", tags: ["Company registration", "Business names", "Certificates"], section: "#services", weight: 2 },
    { name: "Tax Registration", sector: "all", location: "kampala", type: "registration", description: "VAT, PAYE registration and customs clearance services", tags: ["VAT registration", "PAYE", "Customs"], section: "#services", weight: 2 },
    { name: "Social Security", sector: "all", location: "kampala", type: "registration", description: "Employee social security and pension services", tags: ["Employee registration", "Pension", "Benefits", "NSSF"], section: "#services", weight: 2 },
    { name: "Communications License", sector: "ict", location: "kampala", type: "licensing", description: "Telecommunications and broadcasting licensing services", tags: ["Telecom license", "Broadcasting", "ISP license", "UCC"], section: "#services", weight: 1 },
    { name: "Investment Facilitation", sector: "all", location: "kampala", type: "investment", description: "One-stop investment services and incentives", tags: ["Investment license", "Tax incentives", "Facilitation", "UIA"], section: "#services", weight: 1 },
    { name: "Capital Markets", sector: "all", location: "kampala", type: "licensing", description: "Securities licensing and market regulation services", tags: ["Securities license", "Investment advisory", "Market surveillance", "CMA"], section: "#services", weight: 1 },
    { name: "Agricultural Credit", sector: "agriculture", location: "kampala", type: "investment", description: "Low-interest credit for agricultural investments and value chains", tags: ["Agricultural loans", "Value chains", "Farm financing", "BOU"], section: "#investments", weight: 1 },
    { name: "Tourism Development", sector: "tourism", location: "kampala", type: "investment", description: "Hotel development and eco-tourism investment opportunities", tags: ["Hotel development", "Eco-tourism", "Tourism incentives", "UTB"], section: "#investments", weight: 1 },
    { name: "Tech Innovation", sector: "ict", location: "kampala", type: "investment", description: "Startup funding and digital infrastructure investments", tags: ["Startup funding", "Digital infrastructure", "Innovation grants", "NITA"], section: "#investments", weight: 1 },
    { name: "Minerals Development", sector: "minerals", location: "kampala", type: "investment", description: "Mining and mineral processing investment opportunities", tags: ["Mining", "Mineral processing", "Extraction", "Geology"], section: "#investments", weight: 1 },
    { name: "SME Development", sector: "all", location: "kampala", type: "investment", description: "Small and medium enterprise development funding", tags: ["SME", "Small business", "Startup funding", "Entrepreneurship"], section: "#investments", weight: 1 },
    { name: "Export Development", sector: "all", location: "kampala", type: "investment", description: "Export-oriented business development opportunities", tags: ["Export", "Trade", "International business", "Market access"], section: "#investments", weight: 1 },
    { name: "Infrastructure Development", sector: "infrastructure", location: "kampala", type: "investment", description: "Infrastructure projects and development investments", tags: ["Infrastructure", "Construction", "Roads", "Utilities"], section: "#investments", weight: 1 },
    { name: "Manufacturing Development", sector: "manufacturing", location: "kampala", type: "investment", description: "Manufacturing and industrial development opportunities", tags: ["Manufacturing", "Industrial", "Production", "Factory"], section: "#investments", weight: 1 },
    { name: "Energy Development", sector: "energy", location: "kampala", type: "investment", description: "Renewable energy and power generation investments", tags: ["Energy", "Solar", "Hydroelectric", "Power generation"], section: "#investments", weight: 1 },
    { name: "Healthcare Investment", sector: "healthcare", location: "kampala", type: "investment", description: "Healthcare facilities and medical services investments", tags: ["Healthcare", "Medical", "Hospital", "Clinic"], section: "#investments", weight: 1 },
    { name: "Tax Calculator", sector: "all", location: "all", type: "calculator", description: "Calculate potential tax obligations and incentives", tags: ["Tax", "Calculator", "Incentives", "ATMS"], section: "#calculator", weight: 2 }
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
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
    
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

// Enhanced mobile search functionality
function createMobileSuggestions() {
    let mobileSuggestions = document.getElementById('mobileSuggestions');
    if (!mobileSuggestions) {
        mobileSuggestions = document.createElement('div');
        mobileSuggestions.id = 'mobileSuggestions';
        mobileSuggestions.className = 'mobile-suggestions';
        mobileSuggestions.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-height: 60vh;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            margin: 0 1rem;
        `;
        document.body.appendChild(mobileSuggestions);
    }
    return mobileSuggestions;
}

function performSearch(query, isMobile = false) {
    const suggestions = isMobile ? createMobileSuggestions() : 
                      (document.getElementById('suggestions') || document.querySelector('.suggestions-desktop'));
    const searchInput = document.getElementById('searchInput');
    
    if (!suggestions) {
        console.error('Suggestions element not found');
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
        if (!isMobile) {
            showProfessionalNotification(
                'Search',
                'Start typing to search for services',
                'info',
                2000
            );
        }
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

    // Populate suggestions with enhanced mobile support
    results.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = isMobile ? 'mobile-suggestion-item' : 'suggestion-item';
        div.style.cssText = isMobile ? `
            padding: 12px 16px;
            border-bottom: 1px solid #f3f4f6;
            cursor: pointer;
            transition: background-color 0.2s;
        ` : '';
        
        div.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    ${highlightMatch(service.name, query)}
                    <div class="text-sm text-gray-500">${service.description.slice(0, 60)}...</div>
                </div>
                <span class="text-xs text-gray-400">${service.section.replace('#', '')}</span>
            </div>
        `;
        
        div.onmouseover = () => {
            if (!isMobile) div.style.backgroundColor = '#f9fafb';
        };
        div.onmouseout = () => {
            if (!isMobile) div.style.backgroundColor = 'transparent';
        };
        
        div.onclick = () => {
            highlightElement(service.name, service.section);
            addToSearchHistory(query);
            suggestions.style.display = 'none';
            
            // Clear all search inputs
            const allSearchInputs = document.querySelectorAll('input[type="text"]');
            allSearchInputs.forEach(input => {
                if (input.placeholder && input.placeholder.toLowerCase().includes('search')) {
                    input.value = '';
                    input.blur();
                }
            });
            
            showProfessionalNotification(
                'Navigation',
                `Navigating to ${service.name}`,
                'success'
            );
        };
        suggestions.appendChild(div);
    });

    suggestions.style.display = results.length > 0 ? 'block' : 'none';
    currentSuggestionIndex = -1;
    
    if (!isMobile) {
        showProfessionalNotification(
            filteredServices.length > 0 ? 'Search Results' : 'Suggested Services',
            filteredServices.length > 0 
                ? `Found ${filteredServices.length} matching services`
                : `No exact matches for "${query}". Showing popular services.`,
            filteredServices.length > 0 ? 'success' : 'info',
            2000
        );
    }
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
                `Navigating to ${service.name} in ${service.section.replace('#', '')} section`,
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
const debouncedMobileSearch = debounce((query) => performSearch(query, true), 200);

// Swipe Gesture System
class SwipeGestureHandler {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        this.maxVerticalDistance = 100;
        this.swipeActions = {
            left: this.defaultSwipeLeft.bind(this),
            right: this.defaultSwipeRight.bind(this),
            up: this.defaultSwipeUp.bind(this),
            down: this.defaultSwipeDown.bind(this)
        };
        this.isEnabled = true;
        this.init();
    }

    init() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
        if (!this.isEnabled) return;
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
    }

    handleTouchEnd(e) {
        if (!this.isEnabled) return;
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
    }

    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Determine swipe direction
        if (absDeltaX > this.minSwipeDistance && absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (Math.abs(deltaY) < this.maxVerticalDistance) {
                if (deltaX > 0) {
                    this.swipeActions.right();
                } else {
                    this.swipeActions.left();
                }
            }
        } else if (absDeltaY > this.minSwipeDistance && absDeltaY > absDeltaX) {
            // Vertical swipe
            if (deltaY > 0) {
                this.swipeActions.down();
            } else {
                this.swipeActions.up();
            }
        }
    }

    // Visual feedback for swipe actions
    showSwipeFeedback(message, icon) {
        let feedback = document.getElementById('swipeFeedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'swipeFeedback';
            feedback.className = 'swipe-feedback';
            document.body.appendChild(feedback);
        }
        
        feedback.innerHTML = `<span style="font-size: 18px; margin-right: 8px;">${icon}</span>${message}`;
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 1500);
    }

    // Default swipe actions
    defaultSwipeLeft() {
        // Navigate to next section or close mobile menu
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            this.showSwipeFeedback('Menu Closed', '✕');
        } else {
            this.navigateToNextSection();
        }
    }

    defaultSwipeRight() {
        // Open mobile menu or navigate to previous section
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && !mobileNav.classList.contains('active')) {
            mobileNav.classList.add('active');
            this.showSwipeFeedback('Menu Opened', '☰');
        } else {
            this.navigateToPreviousSection();
        }
    }

    defaultSwipeUp() {
        // Scroll to top or close modals
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        if (modals.length > 0) {
            modals.forEach(modal => modal.classList.add('hidden'));
            this.showSwipeFeedback('Modals Closed', '↑');
        } else {
            scrollToTop();
            this.showSwipeFeedback('Scroll to Top', '⬆️');
        }
    }

    defaultSwipeDown() {
        // Open search or scroll down
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInputs = document.querySelectorAll('.search-input-mobile');
        
        if (searchInput && document.activeElement !== searchInput) {
            if (mobileSearchInputs.length > 0) {
                mobileSearchInputs[0].focus();
                this.showSwipeFeedback('Search Activated', '🔍');
            } else {
                searchInput.focus();
                this.showSwipeFeedback('Search Activated', '🔍');
            }
        } else {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            this.showSwipeFeedback('Scroll Down', '⬇️');
        }
    }

    navigateToNextSection() {
        const sections = ['#hero', '#services', '#investments', '#calculator', '#support'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        
        document.querySelector(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
        this.showSwipeFeedback(`${sections[nextIndex].replace('#', '').toUpperCase()}`, '→');
    }

    navigateToPreviousSection() {
        const sections = ['#hero', '#services', '#investments', '#calculator', '#support'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = currentIndex <= 0 ? sections.length - 1 : currentIndex - 1;
        
        document.querySelector(sections[prevIndex])?.scrollIntoView({ behavior: 'smooth' });
        this.showSwipeFeedback(`${sections[prevIndex].replace('#', '').toUpperCase()}`, '←');
    }

    getCurrentSection() {
        const sections = ['#hero', '#services', '#investments', '#calculator', '#support'];
        let current = '#hero';
        
        sections.forEach(sectionId => {
            const element = document.querySelector(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    current = sectionId;
                }
            }
        });
        
        return current;
    }

    // Configuration methods
    setSwipeAction(direction, action) {
        if (typeof action === 'function') {
            this.swipeActions[direction] = action;
        }
    }

    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    setMinSwipeDistance(distance) {
        this.minSwipeDistance = distance;
    }
}

// Initialize swipe handler
let swipeHandler;

// Swipe Configuration Panel
function createSwipeConfigurationPanel() {
    const panel = document.createElement('div');
    panel.id = 'swipeConfigPanel';
    panel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 200px;
        backdrop-filter: blur(10px);
    `;
    
    panel.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 14px; font-weight: 600; color: #374151;">Swipe Actions</span>
            <button id="toggleSwipeConfig" style="margin-left: auto; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
        </div>
        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
            <div>← Left: Next section</div>
            <div>→ Right: Menu/Previous</div>
            <div>↑ Up: Close modals/Top</div>
            <div>↓ Down: Search/Scroll</div>
        </div>
        <div style="margin-top: 8px; display: flex; gap: 4px;">
            <button id="enableSwipes" style="padding: 4px 8px; background: #10b981; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;">Enable</button>
            <button id="disableSwipes" style="padding: 4px 8px; background: #ef4444; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;">Disable</button>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Show panel initially for 3 seconds, then hide
    setTimeout(() => {
        panel.style.transform = 'translateX(0)';
        setTimeout(() => {
            panel.style.transform = 'translateX(100%)';
        }, 3000);
    }, 1000);
    
    // Panel controls
    document.getElementById('toggleSwipeConfig').onclick = () => {
        const isVisible = panel.style.transform === 'translateX(0px)';
        panel.style.transform = isVisible ? 'translateX(100%)' : 'translateX(0)';
    };
    
    document.getElementById('enableSwipes').onclick = () => {
        swipeHandler.enable();
        showProfessionalNotification('Swipe Gestures', 'Enabled', 'success', 2000);
    };
    
    document.getElementById('disableSwipes').onclick = () => {
        swipeHandler.disable();
        showProfessionalNotification('Swipe Gestures', 'Disabled', 'info', 2000);
    };
    
    // Show/hide panel on double tap in bottom-right corner
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        const touch = e.changedTouches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        
        if (tapLength < 500 && tapLength > 0 && 
            x > window.innerWidth - 100 && y > window.innerHeight - 100) {
            const isVisible = panel.style.transform === 'translateX(0px)';
            panel.style.transform = isVisible ? 'translateX(100%)' : 'translateX(0)';
        }
        lastTap = currentTime;
    });
}

// Mobile Performance Enhancements
function enhanceMobilePerformance() {
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate mobile suggestions position
            const mobileSuggestions = document.getElementById('mobileSuggestions');
            if (mobileSuggestions) {
                mobileSuggestions.style.maxHeight = `${window.innerHeight * 0.6}px`;
            }
        }, 100);
    }, { passive: true });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
    
    // Enable hardware acceleration for animations
    const animatedElements = document.querySelectorAll('.notification, .swipe-feedback, .mobile-suggestion-item');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        el.style.transform = 'translateZ(0)'; // Force hardware acceleration
    });
    
    // Intersection Observer for better scroll performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        document.querySelectorAll('section, .service-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Reduce motion for users who prefer it
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        swipeHandler.setMinSwipeDistance(30); // Shorter swipe distance for accessibility
    }
    
    // Optimize touch events for better responsiveness
    let lastTouchTime = 0;
    document.addEventListener('touchstart', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTouchTime < 50) {
            e.preventDefault(); // Prevent double-tap zoom
        }
        lastTouchTime = currentTime;
    }, { passive: false });
}

// Resource Loading Error Handler
function handleResourceError(resourceType, fallback = null) {
    console.warn(`${resourceType} failed to load, using fallback`);
    if (fallback) {
        return fallback;
    }
}

// Font Loading with Fallback
function loadFontsWithFallback() {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            console.log('Fonts loaded successfully');
        }).catch(() => {
            console.warn('Font loading failed, using system fonts');
            document.body.style.fontFamily = 'Arial, sans-serif';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Load fonts with fallback
    loadFontsWithFallback();
    
    // Bind search inputs with error handling
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInputs = document.querySelectorAll('.search-input-mobile');
    
    if (searchInput) {
        try {
            searchInput.addEventListener('input', () => debouncedSearch(searchInput.value));
            searchInput.addEventListener('keydown', handleKeyNavigation);
        } catch (error) {
            console.error('Error binding search input:', error);
            showProfessionalNotification(
                'System Error',
                'Search functionality may be limited',
                'warning'
            );
        }
    } else {
        console.error('searchInput not found');
        showProfessionalNotification(
            'System Notice',
            'Search input loading...',
            'info'
        );
    }
    
    // Bind mobile search inputs with enhanced functionality
    mobileSearchInputs.forEach((input, index) => {
        try {
            input.addEventListener('input', () => {
                // Sync with desktop search and trigger mobile-optimized search
                if (searchInput) {
                    searchInput.value = input.value;
                }
                debouncedMobileSearch(input.value);
            });
            
            input.addEventListener('focus', () => {
                // Show mobile-friendly search interface
                input.style.transform = 'scale(1.02)';
                input.style.transition = 'transform 0.2s';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                // Hide mobile suggestions after a delay
                setTimeout(() => {
                    const mobileSuggestions = document.getElementById('mobileSuggestions');
                    if (mobileSuggestions) {
                        mobileSuggestions.style.display = 'none';
                    }
                }, 200);
            });
            
            input.addEventListener('keydown', handleKeyNavigation);
        } catch (error) {
            console.error(`Error binding mobile search input ${index}:`, error);
        }
    });
    
    updateSearchHistory();
    
    // Initialize swipe gesture handler for mobile
    swipeHandler = new SwipeGestureHandler();
    
    // Add mobile-specific optimizations
    if ('ontouchstart' in window) {
        // Enable fast tap for mobile
        document.body.style.touchAction = 'manipulation';
        
        // Add mobile swipe configuration UI
        createSwipeConfigurationPanel();
        
        // Optimize scroll behavior for mobile
        let isScrolling = false;
        let scrollTimeout;
        
        document.addEventListener('touchmove', () => {
            isScrolling = true;
            swipeHandler.disable();
            clearTimeout(scrollTimeout);
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            if (isScrolling) {
                scrollTimeout = setTimeout(() => {
                    swipeHandler.enable();
                    isScrolling = false;
                }, 300);
            }
        }, { passive: true });
        
        // Enhance mobile performance
        enhanceMobilePerformance();
    }
    
    // Hide loading overlay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        showProfessionalNotification(
            'Welcome to OneStopCentre Uganda',
            'Your gateway to simplified business services',
            'success',
            5000
        );
    }, 1500);

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
            const mobileNav = document.getElementById('mobileNav');
            
            if (target) {
                // Hide mobile navigation menu if open
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                }
                
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