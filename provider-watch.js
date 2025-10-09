// Provider Watch Page JavaScript

// Mock provider data
const providers = [
    {
        id: 1,
        name: "Bay Area Imaging Center",
        price: 285,
        location: "Mission District, San Francisco",
        lat: 37.7599,
        lng: -122.4148,
        distance: "1.2 mi",
        rating: 4.8,
        reviews: 156,
        insurance: "Blue Cross",
        waitTime: "< 1 week",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
        sponsored: true
    },
    {
        id: 2,
        name: "SF Medical Diagnostics",
        price: 320,
        location: "Financial District, San Francisco",
        lat: 37.7946,
        lng: -122.4014,
        distance: "2.5 mi",
        rating: 4.6,
        reviews: 203,
        insurance: "Aetna",
        waitTime: "2-3 days",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Pacific Heights Health",
        price: 495,
        location: "Pacific Heights, San Francisco",
        lat: 37.7936,
        lng: -122.4356,
        distance: "1.8 mi",
        rating: 4.9,
        reviews: 412,
        insurance: "UnitedHealthcare",
        waitTime: "Same day",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Castro Diagnostic Lab",
        price: 245,
        location: "Castro, San Francisco",
        lat: 37.7609,
        lng: -122.4350,
        distance: "3.1 mi",
        rating: 4.5,
        reviews: 89,
        insurance: "Cigna",
        waitTime: "1-2 weeks",
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Sunset Radiology",
        price: 310,
        location: "Sunset District, San Francisco",
        lat: 37.7594,
        lng: -122.4959,
        distance: "5.2 mi",
        rating: 4.7,
        reviews: 134,
        insurance: "Blue Cross",
        waitTime: "3-5 days",
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Marina Medical Center",
        price: 420,
        location: "Marina District, San Francisco",
        lat: 37.8021,
        lng: -122.4377,
        distance: "2.8 mi",
        rating: 4.8,
        reviews: 267,
        insurance: "Aetna",
        waitTime: "Next day",
        image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "SOMA Quick Care",
        price: 225,
        location: "SOMA, San Francisco",
        lat: 37.7786,
        lng: -122.4039,
        distance: "1.5 mi",
        rating: 4.4,
        reviews: 178,
        insurance: "Cigna",
        waitTime: "< 1 week",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Richmond Health Clinic",
        price: 380,
        location: "Richmond District, San Francisco",
        lat: 37.7799,
        lng: -122.4834,
        distance: "4.3 mi",
        rating: 4.6,
        reviews: 95,
        insurance: "UnitedHealthcare",
        waitTime: "2-4 days",
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Noe Valley Medical",
        price: 295,
        location: "Noe Valley, San Francisco",
        lat: 37.7503,
        lng: -122.4311,
        distance: "2.1 mi",
        rating: 4.7,
        reviews: 221,
        insurance: "Blue Cross",
        waitTime: "1 week",
        image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Downtown Diagnostics Plus",
        price: 525,
        location: "Downtown, San Francisco",
        lat: 37.7879,
        lng: -122.4075,
        distance: "1.9 mi",
        rating: 4.9,
        reviews: 534,
        insurance: "All Major",
        waitTime: "Walk-in",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
    }
];

// Global variables
let map;
let markers = [];
let filteredProviders = [...providers];

// Initialize map
function initMap() {
    // Center on San Francisco
    map = L.map('map').setView([37.7749, -122.4194], 12);

    // Add simplified tile layer (using CartoDB Voyager - clean with more color)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 18,
        subdomains: 'abcd'
    }).addTo(map);

    // Add markers for all providers
    updateMapMarkers(filteredProviders);
}

// Create custom marker HTML
function createMarkerIcon(price) {
    let className = 'price-marker';
    if (price < 300) {
        className += ' affordable';
    } else if (price < 450) {
        className += ' moderate';
    }

    const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="${className}">$${price}</div>`,
        iconSize: [60, 30],
        iconAnchor: [30, 30]
    });

    return icon;
}

// Update map markers
function updateMapMarkers(providerList) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    providerList.forEach(provider => {
        const marker = L.marker([provider.lat, provider.lng], {
            icon: createMarkerIcon(provider.price)
        }).addTo(map);

        // Add popup
        marker.bindPopup(`
            <div style="padding: 8px;">
                <strong style="font-size: 16px;">${provider.name}</strong><br>
                <span style="color: #2D6A4F; font-weight: 700; font-size: 18px;">$${provider.price}</span><br>
                <span style="color: #4A4A4A; font-size: 13px;">${provider.location}</span><br>
                <span style="color: #999999; font-size: 12px;">★ ${provider.rating} (${provider.reviews} reviews)</span>
            </div>
        `);

        // Highlight corresponding card on marker click
        marker.on('click', () => {
            scrollToProviderCard(provider.id);
        });

        markers.push(marker);
    });

    // Adjust map bounds to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Scroll to provider card
function scrollToProviderCard(providerId) {
    const card = document.querySelector(`.provider-card[data-id="${providerId}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.borderColor = 'var(--primary-color)';
        setTimeout(() => {
            card.style.borderColor = 'transparent';
        }, 2000);
    }
}

// Render provider cards
function renderProviderCards(providerList) {
    const grid = document.getElementById('providerGrid');
    grid.innerHTML = '';

    providerList.forEach(provider => {
        const card = document.createElement('div');
        card.className = provider.sponsored ? 'provider-card sponsored-card' : 'provider-card';
        card.setAttribute('data-id', provider.id);

        card.innerHTML = `
            <div class="provider-image-wrapper">
                <img src="${provider.image}" alt="${provider.name}" class="provider-image">
                <div class="provider-price-badge">$${provider.price}</div>
                ${provider.sponsored ? '<div class="sponsored-badge">Sponsored</div>' : ''}
                <button class="provider-save-btn" onclick="toggleSave(${provider.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                </button>
            </div>
            <div class="provider-info">
                <h3 class="provider-name">${provider.name}</h3>
                <div class="provider-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${provider.location} • ${provider.distance}
                </div>
                <div class="provider-details">
                    <div class="detail-row">
                        <span class="detail-label">Insurance:</span>
                        <span class="provider-insurance">${provider.insurance}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Wait Time:</span>
                        <span class="detail-value">${provider.waitTime}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Rating:</span>
                        <div class="provider-rating">
                            <span class="stars">★ ${provider.rating}</span>
                            <span>(${provider.reviews})</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add click event to show on map
        card.addEventListener('click', () => {
            const marker = markers.find(m => {
                const latlng = m.getLatLng();
                return latlng.lat === provider.lat && latlng.lng === provider.lng;
            });
            if (marker) {
                map.setView([provider.lat, provider.lng], 14);
                marker.openPopup();
            }
        });

        grid.appendChild(card);
    });

    // Update results count
    document.querySelector('.results-count').textContent = `${providerList.length} results`;
}

// Toggle save/favorite
function toggleSave(providerId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const svg = btn.querySelector('svg');

    if (svg.getAttribute('fill') === 'currentColor') {
        svg.setAttribute('fill', 'none');
    } else {
        svg.setAttribute('fill', 'currentColor');
    }
}

// Apply filters
function applyFilters() {
    const priceFilter = document.getElementById('priceFilter').value;

    filteredProviders = providers.filter(provider => {
        if (priceFilter === 'all') return true;

        const [min, max] = priceFilter.split('-').map(v => {
            if (v.includes('+')) return [parseInt(v), Infinity];
            return parseInt(v);
        });

        if (max) {
            return provider.price >= min && provider.price <= max[1];
        } else {
            return provider.price >= min[0];
        }
    });

    renderProviderCards(filteredProviders);
    updateMapMarkers(filteredProviders);
}

// Sort providers
function sortProviders(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProviders.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProviders.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProviders.sort((a, b) => b.rating - a.rating);
            break;
        case 'distance':
            filteredProviders.sort((a, b) => {
                const distA = parseFloat(a.distance);
                const distB = parseFloat(b.distance);
                return distA - distB;
            });
            break;
    }

    renderProviderCards(filteredProviders);
}

// Reset map bounds
function resetMapBounds() {
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    initMap();

    // Render initial provider cards
    renderProviderCards(filteredProviders);

    // Add filter listeners
    document.getElementById('procedureFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);
    document.getElementById('insuranceFilter').addEventListener('change', applyFilters);
});

// Waitlist modal functions (reused from main site)
function openWaitlist() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWaitlist() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    const form = document.querySelector('.waitlist-form');
    const successMessage = document.getElementById('successMessage');
    form.style.display = 'flex';
    successMessage.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeWaitlist();
            }
        });
    }
});

// Handle waitlist form submission
function handleWaitlistSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    fetch('https://formsubmit.co/ajax/tony@kikoff.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            _subject: 'New Stealthy Waitlist Signup!',
            _template: 'box',
            _cc: 'tyler@kikoff.com,gregroie@kikoff.com',
            _captcha: 'false'
        })
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('active');

        form.reset();

        setTimeout(() => {
            closeWaitlist();
        }, 3000);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your email. Please try again.');
    });
}

console.log('🗺️ Provider Watch - Find Affordable Care Near You');
