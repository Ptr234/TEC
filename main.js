// Enhanced Search functionality with fuzzy matching and intelligent suggestions
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

// Enhanced search history with localStorage fallback
let searchHistory = [];
try {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
} catch (e) {
    searchHistory = [];
}

let currentSuggestionIndex = -1;

// Fuzzy search algorithm - calculates similarity between strings
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

// Levenshtein distance algorithm for fuzzy matching
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    const costs = [];
    for (let i = 0; i <= s2.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s1.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(j - 1) !== s2.charAt(i - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s1.length] = lastValue;
    }
    return costs[s1.length];
}

// Enhanced search with multiple matching strategies
function searchServices(query) {
    if (!query || query.trim() === '') return [];
    
    const searchTerm = query.toLowerCase().trim();
    const results = [];
    
    services.forEach(service => {
        let score = 0;
        let matchType = '';
        let matchedField = '';
        
        // 1. Exact matches (highest priority)
        if (service.name.toLowerCase() === searchTerm) {
            score = 100;
            matchType = 'exact';
            matchedField = 'name';
        } else if (service.tags.some(tag => tag.toLowerCase() === searchTerm)) {
            score = 95;
            matchType = 'exact';
            matchedField = 'tag';
        }
        
        // 2. Starts with matches
        else if (service.name.toLowerCase().startsWith(searchTerm)) {
            score = 90;
            matchType = 'starts_with';
            matchedField = 'name';
        } else if (service.tags.some(tag => tag.toLowerCase().startsWith(searchTerm))) {
            score = 85;
            matchType = 'starts_with';
            matchedField = 'tag';
        }
        
        // 3. Contains matches
        else if (service.name.toLowerCase().includes(searchTerm)) {
            score = 80;
            matchType = 'contains';
            matchedField = 'name';
        } else if (service.description.toLowerCase().includes(searchTerm)) {
            score = 75;
            matchType = 'contains';
            matchedField = 'description';
        } else if (service.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
            score = 70;
            matchType = 'contains';
            matchedField = 'tag';
        }
        
        // 4. Fuzzy matches for typos and similar words
        else {
            const nameSimilarity = calculateSimilarity(service.name.toLowerCase(), searchTerm);
            const descSimilarity = calculateSimilarity(service.description.toLowerCase(), searchTerm);
            const tagSimilarity = Math.max(...service.tags.map(tag => 
                calculateSimilarity(tag.toLowerCase(), searchTerm)
            ));
            
            const maxSimilarity = Math.max(nameSimilarity, descSimilarity, tagSimilarity);
            
            if (maxSimilarity >= 0.6) { // 60% similarity threshold
                score = Math.round(maxSimilarity * 65); // Scale to 0-65 points
                matchType = 'fuzzy';
                matchedField = nameSimilarity === maxSimilarity ? 'name' : 
                              descSimilarity === maxSimilarity ? 'description' : 'tag';
            }
        }
        
        // 5. Keyword extraction and matching
        if (score === 0) {
            const keywords = extractKeywords(searchTerm);
            const serviceKeywords = extractKeywords(
                `${service.name} ${service.description} ${service.tags.join(' ')}`
            );
            
            const keywordMatches = keywords.filter(keyword => 
                serviceKeywords.some(serviceKeyword => 
                    serviceKeyword.includes(keyword) || calculateSimilarity(serviceKeyword, keyword) >= 0.7
                )
            );
            
            if (keywordMatches.length > 0) {
                score = Math.min(60, keywordMatches.length * 20);
                matchType = 'keyword';
                matchedField = 'keywords';
            }
        }
        
        if (score > 0) {
            results.push({
                ...service,
                score,
                matchType,
                matchedField,
                matchedText: getMatchedText(service, searchTerm, matchedField)
            });
        }
    });
    
    // Sort by score (highest first) and return top 8 results
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

// Extract meaningful keywords from search query
function extractKeywords(text) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    return text.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word))
        .map(word => word.replace(/[^\w]/g, ''))
        .filter(word => word.length > 0);
}

// Get the text that matched for highlighting
function getMatchedText(service, query, field) {
    const searchTerm = query.toLowerCase();
    
    switch (field) {
        case 'name':
            return service.name;
        case 'description':
            return service.description;
        case 'tag':
            return service.tags.find(tag => 
                tag.toLowerCase().includes(searchTerm) || 
                calculateSimilarity(tag.toLowerCase(), searchTerm) >= 0.6
            ) || service.tags[0];
        default:
            return service.name;
    }
}

// Enhanced search suggestions with better UX
function generateSearchSuggestions(query) {
    if (!query || query.trim() === '') return [];
    
    const commonSearches = [
        'business registration', 'tax registration', 'investment license', 
        'startup funding', 'agriculture loans', 'tourism development',
        'telecom license', 'tax calculator', 'social security', 'VAT registration'
    ];
    
    const suggestions = [];
    const searchTerm = query.toLowerCase().trim();
    
    // Add matching common searches
    commonSearches.forEach(search => {
        if (search.includes(searchTerm) || calculateSimilarity(search, searchTerm) >= 0.6) {
            suggestions.push({
                text: search,
                type: 'suggestion',
                icon: '💡'
            });
        }
    });
    
    // Add "Did you mean?" suggestions for potential typos
    if (suggestions.length === 0 && searchTerm.length > 3) {
        const didYouMean = findDidYouMean(searchTerm);
        if (didYouMean.length > 0) {
            didYouMean.forEach(suggestion => {
                suggestions.push({
                    text: suggestion,
                    type: 'correction',
                    icon: '🔍'
                });
            });
        }
    }
    
    return suggestions.slice(0, 3);
}

// Find "Did you mean?" suggestions
function findDidYouMean(query) {
    const allTerms = [];
    
    services.forEach(service => {
        allTerms.push(service.name);
        allTerms.push(...service.tags);
        allTerms.push(...service.description.split(' ').filter(word => word.length > 4));
    });
    
    const uniqueTerms = [...new Set(allTerms)];
    const suggestions = [];
    
    uniqueTerms.forEach(term => {
        const similarity = calculateSimilarity(term.toLowerCase(), query.toLowerCase());
        if (similarity >= 0.5 && similarity < 0.9) {
            suggestions.push({ term, similarity });
        }
    });
    
    return suggestions
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map(s => s.term.toLowerCase());
}

// Enhanced search history management
function updateSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '<p class="text-sm text-gray-600 mr-2">Recent searches:</p>';
    
    searchHistory.slice(0, 5).forEach(term => {
        const button = document.createElement('button');
        button.textContent = term;
        button.className = 'quick-search-btn';
        button.onclick = () => quickSearch(term);
        historyContainer.appendChild(button);
    });
    
    historyContainer.classList.toggle('hidden', searchHistory.length === 0);
}

// Enhanced search performance with better UI feedback
function performSearch(query) {
    const suggestions = document.getElementById('suggestions');
    const noResultsDiv = document.getElementById('noResults') || createNoResultsDiv();
    
    suggestions.innerHTML = '';
    noResultsDiv.style.display = 'none';
    
    if (query.trim() === '') {
        suggestions.style.display = 'none';
        return;
    }

    const searchResults = searchServices(query);
    const searchSuggestions = generateSearchSuggestions(query);
    
    // Display search results
    if (searchResults.length > 0) {
        searchResults.forEach((service, index) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            
            const matchIcon = getMatchIcon(service.matchType);
            const confidenceClass = getConfidenceClass(service.score);
            
            div.innerHTML = `
                <div class="flex items-center justify-between w-full">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">${matchIcon}</span>
                            <span class="font-medium">${highlightMatch(service.name, query)}</span>
                            <span class="text-xs px-2 py-1 rounded-full ${confidenceClass}">
                                ${service.score >= 90 ? 'Exact' : service.score >= 70 ? 'Good' : 'Similar'}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${highlightMatch(service.matchedText, query)}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${service.sector}</span>
                            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${service.type}</span>
                        </div>
                    </div>
                    <span class="match-location">${service.location.charAt(0).toUpperCase() + service.location.slice(1)}</span>
                </div>
            `;
            
            div.onclick = () => selectService(service, query);
            div.dataset.index = index;
            suggestions.appendChild(div);
        });
    }
    
    // Add search suggestions if no exact matches
    if (searchResults.length === 0 || (searchResults.length > 0 && searchResults[0].score < 80)) {
        if (searchSuggestions.length > 0) {
            const suggestionHeader = document.createElement('div');
            suggestionHeader.className = 'suggestion-header';
            suggestionHeader.innerHTML = '<p class="text-xs text-gray-500 font-medium">Suggestions:</p>';
            suggestions.appendChild(suggestionHeader);
            
            searchSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion-item suggestion-item-alt';
                div.innerHTML = `
                    <span class="text-sm">${suggestion.icon}</span>
                    <span class="text-sm">${suggestion.text}</span>
                    <span class="text-xs text-gray-500">${suggestion.type === 'correction' ? 'Did you mean?' : 'Try this'}</span>
                `;
                div.onclick = () => {
                    document.getElementById('searchInput').value = suggestion.text;
                    performSearch(suggestion.text);
                };
                suggestions.appendChild(div);
            });
        }
    }
    
    // Show no results message if nothing found
    if (searchResults.length === 0 && searchSuggestions.length === 0) {
        showNoResults(query);
    } else {
        suggestions.style.display = 'block';
        currentSuggestionIndex = -1;
    }
}

// Helper functions for enhanced search
function getMatchIcon(matchType) {
    switch (matchType) {
        case 'exact': return '🎯';
        case 'starts_with': return '⭐';
        case 'contains': return '🔍';
        case 'fuzzy': return '🎯';
        case 'keyword': return '🔑';
        default: return '📄';
    }
}

function getConfidenceClass(score) {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
}

function createNoResultsDiv() {
    const div = document.createElement('div');
    div.id = 'noResults';
    div.className = 'no-results';
    div.style.display = 'none';
    document.querySelector('.search-container').appendChild(div);
    return div;
}

function showNoResults(query) {
    const suggestions = document.getElementById('suggestions');
    const noResultsDiv = document.getElementById('noResults') || createNoResultsDiv();
    
    suggestions.style.display = 'none';
    
    noResultsDiv.innerHTML = `
        <div class="p-4 bg-gray-50 rounded-lg border text-center">
            <p class="text-gray-600 mb-2">No results found for "<strong>${query}</strong>"</p>
            <p class="text-sm text-gray-500 mb-3">Try these suggestions:</p>
            <div class="flex flex-wrap gap-2 justify-center">
                <button onclick="quickSearch('business registration')" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200">Business Registration</button>
                <button onclick="quickSearch('tax registration')" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200">Tax Registration</button>
                <button onclick="quickSearch('investment')" class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200">Investment</button>
                <button onclick="quickSearch('startup')" class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200">Startup</button>
            </div>
        </div>
    `;
    
    noResultsDiv.style.display = 'block';
}

function selectService(service, query) {
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
    document.getElementById('suggestions').style.display = 'none';
}

// Enhanced highlight function with better matching
function highlightMatch(text, query) {
    if (!query || !text) return text;
    
    const searchTerm = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Find the best match position
    let matchStart = textLower.indexOf(searchTerm);
    let matchEnd = matchStart + searchTerm.length;
    
    if (matchStart === -1) {
        // Try partial matches
        const words = searchTerm.split(' ');
        let highlightedText = text;
        
        words.forEach(word => {
            if (word.length > 2) {
                const regex = new RegExp(`(${word})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
            }
        });
        
        return highlightedText;
    }
    
    return text.substring(0, matchStart) + 
           '<span class="highlight">' + 
           text.substring(matchStart, matchEnd) + 
           '</span>' + 
           text.substring(matchEnd);
}

function addToSearchHistory(term) {
    if (!term || term.trim() === '') return;
    
    const cleanTerm = term.trim();
    if (!searchHistory.includes(cleanTerm)) {
        searchHistory.unshift(cleanTerm);
        if (searchHistory.length > 8) searchHistory.pop();
        
        try {
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        } catch (e) {
            console.warn('Could not save search history to localStorage');
        }
        
        updateSearchHistory();
        showNotification(`Added "${cleanTerm}" to search history`, 'success');
    }
}

// Enhanced keyboard navigation
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

function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    performSearch(term);
    addToSearchHistory(term);
}

// Debounced search for better performance
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const debouncedSearch = debounce(performSearch, 200);

// Enhanced reset functionality
function resetSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    suggestions.style.display = 'none';
    currentSuggestionIndex = -1;
    
    const noResultsDiv = document.getElementById('noResults');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
    
    searchHistory = [];
    try {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    } catch (e) {
        console.warn('Could not clear search history in localStorage');
    }
    updateSearchHistory();
    
    document.getElementById('sectorFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('serviceTypeFilter').value = 'all';
    filterServices();
    
    showNotification('Search and filters have been reset', 'success');
}

// Keep all other existing functions (filterServices, calculateTax, etc.)
// ... [Rest of the original functions remain the same]

// Initialize enhanced search
document.addEventListener('DOMContentLoaded', () => {
    updateSearchHistory();
    
    // Add enhanced search input event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
        searchInput.addEventListener('keydown', handleKeyNavigation);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Enhanced click outside to close suggestions
    document.addEventListener('click', (e) => {
        const suggestions = document.getElementById('suggestions');
        const noResults = document.getElementById('noResults');
        
        if (!e.target.closest('.search-container')) {
            suggestions.style.display = 'none';
            if (noResults) noResults.style.display = 'none';
            currentSuggestionIndex = -1;
        }
    });
    
    // Add CSS for enhanced search styling
    const style = document.createElement('style');
    style.textContent = `
        .suggestion-item {
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
        }
        
        .suggestion-item:hover,
        .suggestion-item.selected {
            background-color: #f8fafc;
            border-left-color: #3b82f6;
            transform: translateX(2px);
        }
        
        .suggestion-item-alt {
            background-color: #fefce8;
            border-left-color: #eab308;
        }
        
        .suggestion-header {
            padding: 8px 16px;
            background-color: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .highlight {
            background-color: #fef3c7;
            font-weight: 600;
            padding: 0 2px;
            border-radius: 2px;
        }
        
        .no-results {
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
