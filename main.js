// Search functionality
const services = [
    { name: "Business Registration", sector: "all", location: "kampala", type: "registration", description: "Company incorporation, business names, and certificate services", tags: ["Company registration", "Business names", "Certificates"], url: "https://www.ursb.go.ug", section: "#services" },
    { name: "Tax Registration", sector: "all", location: "kampala", type: "registration", description: "VAT, PAYE registration and customs clearance services", tags: ["VAT registration", "PAYE", "Customs"], url: "https://www.ura.go.ug", section: "#services" },
    { name: "Social Security", sector: "all", location: "kampala", type: "registration", description: "Employee social security and pension services", tags: ["Employee registration", "Pension", "Benefits"], url: "https://www.nssfug.org", section: "#services" },
    { name: "Communications License", sector: "ict", location: "kampala", type: "licensing", description: "Telecommunications and broadcasting licensing services", tags: ["Telecom license", "Broadcasting", "ISP license"], url: "https://www.ucc.co.ug", section: "#services" },
    { name: "Investment Facilitation", sector: "all", location: "kampala", type: "investment", description: "One-stop investment services and incentives", tags: ["Investment license", "Tax incentives", "Facilitation"], url: "https://www.ugandainvest.go.ug", section: "#services" },
    { name: "Capital Markets", sector: "all", location: "kampala", type: "licensing", description: "Securities licensing and market regulation services", tags: ["Securities license", "Investment advisory", "Market surveillance"], url: "https://www.cmauganda.co.ug", section: "#services" },
    { name: "Agricultural Credit", sector: "agriculture", location: "kampala", type: "investment", description: "Low-interest credit for agricultural investments and value chains", tags: ["Agricultural loans", "Value chains", "Farm financing"], url: "https://www.bou.or.ug", section: "#investments" },
    { name: "Tourism Development", sector: "tourism", location: "kampala", type: "investment", description: "Hotel development and eco-tourism investment opportunities", tags: ["Hotel development", "Eco-tourism", "Tourism incentives"], url: "https://www.visituganda.com", section: "#investments" },
    { name: "Tech Innovation", sector: "ict", location: "kampala", type: "investment", description: "Startup funding and digital infrastructure investments", tags: ["Startup funding", "Digital infrastructure", "Innovation grants"], url: "https://www.nita.go.ug", section: "#investments" },
    { name: "Tax Calculator", sector: "all", location: "all", type: "calculator", description: "Calculate potential tax obligations and incentives", tags: ["Tax", "Calculator", "Incentives"], url: "", section: "#calculator" }
];

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let currentSuggestionIndex = -1;

function updateSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    historyContainer.innerHTML = '<p class="text-sm text-gray-600 mr-2">Recent searches:</p>';
    searchHistory.forEach(term => {
        const button = document.createElement('button');
        button.textContent = term;
        button.className = 'quick-search-btn';
        button.onclick = () => quickSearch(term);
        historyContainer.appendChild(button);
    });
    historyContainer.classList.toggle('hidden', searchHistory.length === 0);
}

function highlightElement(serviceName, section) {
    document.querySelectorAll('.highlight-card').forEach(el => el.classList.remove('highlight-card'));
    
    if (section === '#calculator') {
        const calculatorCard = document.querySelector('#calculator .service-card');
        if (calculatorCard) {
            calculatorCard.classList.add('highlight-card', 'selected-research-result');
            setTimeout(() => {
                calculatorCard.classList.remove('highlight-card', 'selected-research-result');
            }, 3000);
        }
    } else {
        const cards = document.querySelectorAll(`${section} .service-card`);
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            if (title.toLowerCase() === serviceName.toLowerCase()) {
                card.classList.add('highlight-card', 'selected-research-result');
                setTimeout(() => {
                    card.classList.remove('highlight-card', 'selected-research-result');
                }, 3000);
            }
        });
    }
}

// Intelligent search with ranking and context
function performSearch(query) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    
    if (query.trim() === '') {
        suggestions.style.display = 'none';
        return;
    }

    // Enhanced search with ranking
    const filteredServices = services
        .map(service => {
            let score = 0;
            const queryLower = query.toLowerCase();
            
            // Scoring based on matches
            if (service.name.toLowerCase().includes(queryLower)) score += 3;
            if (service.description.toLowerCase().includes(queryLower)) score += 2;
            const tagMatches = service.tags.filter(tag => tag.toLowerCase().includes(queryLower)).length;
            score += tagMatches;
            
            // Boost score based on context (recent searches, sector relevance)
            if (searchHistory.includes(queryLower)) score += 1;
            if (service.sector === document.getElementById('sectorFilter')?.value) score += 1;
            
            return { ...service, score };
        })
        .filter(service => service.score > 0)
        .sort((a, b) => b.score - a.score); // Sort by score descending

    filteredServices.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = `suggestion-item ${index === 0 ? 'top-suggestion' : ''}`;
        div.innerHTML = `
            ${highlightMatch(service.name, query)}
            <span class="match-location">${service.location.charAt(0).toUpperCase() + service.location.slice(1)}</span>
            <span class="match-score">Relevance: ${Math.round((service.score / 7) * 100)}%</span>
        `;
        div.onclick = () => {
            const section = document.querySelector(service.section);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            highlightElement(service.name, service.section);
            if (service.url) {
                window.open(service.url, '_blank');
                showNotification(`Navigating to ${service.name} website`, 'info');
            }
            addToSearchHistory(query);
            suggestions.style.display = 'none';
        };
        div.dataset.index = index;
        suggestions.appendChild(div);
    });

    suggestions.style.display = filteredServices.length > 0 ? 'block' : 'none';
    currentSuggestionIndex = -1;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function addToSearchHistory(term) {
    if (!searchHistory.includes(term)) {
        searchHistory.unshift(term);
        if (searchHistory.length > 5) searchHistory.pop();
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateSearchHistory();
        showNotification(`Added "${term}" to search history`, 'success');
    }
}

function handleKeyNavigation(event) {
    const suggestions = document.getElementById('suggestions');
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
        const selectedService = services.find((_, index) => index === parseInt(suggestionItems[currentSuggestionIndex].dataset.index));
        if (selectedService) {
            const section = document.querySelector(selectedService.section);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            highlightElement(selectedService.name, selectedService.section);
            if (selectedService.url) {
                window.open(selectedService.url, '_blank');
                showNotification(`Navigating to ${selectedService.name} website`, 'info');
            }
            addToSearchHistory(document.getElementById('searchInput').value);
            suggestions.style.display = 'none';
        }
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

function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    performSearch(term);
    addToSearchHistory(term);
    const service = services.find(s => s.name.toLowerCase() === term.toLowerCase());
    if (service && service.section) {
        const section = document.querySelector(service.section);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            highlightElement(service.name, service.section);
            showNotification(`Viewing ${service.name} in ${service.section}`, 'info');
        }
    }
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const debouncedSearch = debounce(performSearch, 300);

// Enhanced reset functionality
function resetSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    suggestions.style.display = 'none';
    currentSuggestionIndex = -1;
    
    searchHistory = [];
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateSearchHistory();
    
    document.getElementById('sectorFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('serviceTypeFilter').value = 'all';
    filterServices();
    
    showNotification('Search and filters have been reset', 'success');
}

// Filter functionality
function filterServices() {
    const sector = document.getElementById('sectorFilter').value;
    const location = document.getElementById('locationFilter').value;
    const serviceType = document.getElementById('serviceTypeFilter').value;
    const servicesList = document.getElementById('servicesList');
    const cards = servicesList.getElementsByClassName('service-card');

    Array.from(cards).forEach(card => {
        const cardSector = card.dataset.sector;
        const cardLocation = card.dataset.location;
        const cardType = card.dataset.type;

        const matchesSector = sector === 'all' || cardSector === sector;
        const matchesLocation = location === 'all' || cardLocation === location;
        const matchesType = serviceType === 'all' || cardType === serviceType;

        card.style.display = matchesSector && matchesLocation && matchesType ? 'block' : 'none';
    });
    showNotification('Filters applied successfully', 'success');
}

function clearFilters() {
    document.getElementById('sectorFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('serviceTypeFilter').value = 'all';
    filterServices();
    showNotification('Filters cleared', 'success');
}

// Tax Calculator
function calculateTax() {
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const sector = document.getElementById('sector').value;
    const type = document.getElementById('investmentType').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = '<p class="text-red-600">Please enter a valid investment amount.</p>';
        resultDiv.classList.remove('hidden');
        showNotification('Invalid investment amount entered', 'error');
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
    showNotification('Tax calculation completed', 'success');
}

// Modal handling
function openEmail(service, email) {
    document.getElementById('modalService').value = service;
    document.getElementById('modalEmail').dataset.email = email;
    document.getElementById('emailModal').classList.remove('hidden');
    showNotification(`Opening email form for ${service}`, 'info');
}

function closeEmail() {
    document.getElementById('emailModal').classList.add('hidden');
    document.getElementById('modalName').value = '';
    document.getElementById('modalEmail').value = '';
    document.getElementById('modalMessage').value = '';
    showNotification('Email form closed', 'info');
}

function sendEmail() {
    const service = document.getElementById('modalService').value;
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const message = document.getElementById('modalMessage').value;
    const recipient = document.getElementById('modalEmail').dataset.email;

    if (!name || !email || !message) {
        showNotification('Please fill in all email fields', 'error');
        return;
    }

    const subject = encodeURIComponent(`Inquiry about ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    closeEmail();
    showNotification('Email sent successfully', 'success');
}

function openChecklistModal() {
    document.getElementById('checklistSelectionModal').classList.remove('hidden');
    showNotification('Opening checklist selection', 'info');
}

function closeChecklistSelection() {
    document.getElementById('checklistSelectionModal').classList.add('hidden');
    showNotification('Checklist selection closed', 'info');
}

function openChecklist(type) {
    const modal = document.getElementById('checklistModal');
    const title = document.getElementById('checklistTitle');
    const content = document.getElementById('checklistContent');
    
    let checklistItems = [];
    
    switch (type) {
        case 'services':
            title.textContent = 'Services Checklist';
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
            title.textContent = 'Investments Checklist';
            checklistItems = [
                { name: 'Agricultural Credit', description: 'Apply for low-interest loans with BOU', mandatory: false },
                { name: 'Tourism Development', description: 'Explore hotel/eco-tourism incentives with UTB', mandatory: false },
                { name: 'Tech Innovation', description: 'Apply for startup funding with NITA', mandatory: false },
                { name: 'Investment License', description: 'Secure investment license from UIA', mandatory: true }
            ];
            break;
        case 'calculator':
            title.textContent = 'Tax Checklist';
            checklistItems = [
                { name: 'Verify Investment Amount', description: 'Ensure accurate investment figures', mandatory: true },
                { name: 'Select ATMS Sector', description: 'Choose appropriate sector for tax rates', mandatory: true },
                { name: 'Confirm Investment Type', description: 'Specify new, expansion, or acquisition', mandatory: true },
                { name: 'Consult URA', description: 'Validate calculations with URA for accuracy', mandatory: false }
            ];
            break;
    }

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
    showNotification(`Opened ${type} checklist`, 'success');
}

function closeChecklist() {
    document.getElementById('checklistModal').classList.add('hidden');
    showNotification('Checklist closed', 'info');
}

// Navigation and utility functions
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('active');
    showNotification('Mobile navigation toggled', 'info');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Scrolling to top', 'info');
}

function makeCall(phone) {
    window.location.href = `tel:${phone}`;
    showNotification(`Initiating call to ${phone}`, 'info');
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
        showNotification('Downloading Bankable Projects PDF...', 'success');
    } catch (error) {
        console.error('Download error:', error);
        window.open(downloadUrl, '_blank');
        showNotification('Unable to download directly. Opening PDF in new tab...', 'error');
    }
}

// Notification function for user feedback
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function openChat() {
    window.location.href = 'https://wa.me/+256775692335';
    showNotification('Opening WhatsApp chat', 'info');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSearchHistory();
    
    // Apply crown crane background to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.backgroundImage = 'url("https://images.unsplash.com/photo-1617634666710-6d62372d6f8b")'; // Crown crane image
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center';
        section.style.backgroundAttachment = 'fixed';
        section.style.backgroundRepeat = 'no-repeat';
        // Add semi-transparent overlay for better text readability
        section.style.position = 'relative';
        section.style.zIndex = '1';
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        overlay.style.zIndex = '-1';
        section.insertBefore(overlay, section.firstChild);
    });

    window.addEventListener('scroll', () => {
        const backToTop = document.getElementById('backToTop');
        backToTop.classList.toggle('active', window.scrollY > 300);
    });

    document.addEventListener('click', (e) => {
        const suggestions = document.getElementById('suggestions');
        if (!e.target.closest('#searchInput') && !e.target.closest('.suggestions')) {
            suggestions.style.display = 'none';
            currentSuggestionIndex = -1;
        }
    });

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', resetSearch);
    }
});

// CSS for unique selected research result and intelligent search
const styles = `
<style>
    .selected-research-result {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 255, 255, 0.3);
        border: 2px solid #00CED1;
        background: linear-gradient(45deg, rgba(0, 206, 209, 0.1), rgba(255, 255, 255, 0.9));
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .selected-research-result::after {
        content: '★ Selected';
        position: absolute;
        top: 10px;
        right: -45px;
        background: #00CED1;
        color: white;
        padding: 5px 45px;
        transform: rotate(45deg);
        font-size: 0.9rem;
        font-weight: bold;
    }

    .suggestion-item {
        padding: 12px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background 0.2s;
    }

    .suggestion-item:hover {
        background: #f0f8ff;
    }

    .top-suggestion {
        background: linear-gradient(to right, #e6f3ff, #fff);
        border-left: 4px solid #00CED1;
        font-weight: 600;
    }

    .match-score {
        float: right;
        font-size: 0.8rem;
        color: #00CED1;
        font-weight: 500;
    }

    .highlight {
        background: #00CED1;
        color: white;
        padding: 0 4px;
        border-radius: 3px;
    }
</style>
`;

// Inject styles into document
document.addEventListener('DOMContentLoaded', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles.replace('<style>', '').replace('</style>', '');
    document.head.appendChild(styleSheet);
});
