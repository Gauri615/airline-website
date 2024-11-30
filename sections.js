/* header section js */
 const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

// Dark Mode Toggle Functionality
  const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Update icon based on current mode
    themeToggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

const langButton = document.querySelector('.lang-btn');
const langContent = document.querySelector('.language-content');

langButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing immediately
    langContent.classList.toggle('show'); // Use class to toggle visibility
});

// Close the dropdown when clicking outside
document.addEventListener('click', () => {
    langContent.classList.remove('show');
});

// Update Button Text on Language Selection
const langLinks = document.querySelectorAll('.language-content a');
langLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation
        const selectedLanguage = link.textContent.trim();
        langButton.textContent = `🌐 ${selectedLanguage}`;
        langContent.classList.remove('show'); // Close dropdown
    });
});




/* Hero section */
  // Welcome Message Based on Time
    const heroTitle = document.querySelector('.hero-title');
    const hours = new Date().getHours();
    heroTitle.textContent = 
      hours < 12 ? "Good Morning, Ready to Fly?" :
      hours < 18 ? "Good Afternoon, Let's Plan Your Trip!" : 
                   "Good Evening, Where Will You Go Next?";

    // Change Video Background and Add Book Now Button
    document.getElementById('destination-selector').addEventListener('change', (event) => {
      const destination = event.target.value;
      const video = document.querySelector('.hero-video');
      const buttonContainer = document.getElementById('dynamic-button-container');
      
      // Clear previous content
      buttonContainer.innerHTML = '';

      if (destination !== "default") {
        video.src = `airoplane.mp4`;
     
        
     // Create and append the "Book Now" button
    const bookNowButton = document.createElement('button');
    bookNowButton.textContent = `Book Now for ${destination.charAt(0).toUpperCase() + destination.slice(1)}`;
    bookNowButton.className = 'book-now-btn';
    bookNowButton.onclick = () => {
      // Redirect to corresponding booking page based on the selected destination
      window.location.href = `${destination}-booking.html`;
    };
    buttonContainer.appendChild(bookNowButton);
  }
});
    // Countdown Timer for Promotions
    const timerElement = document.getElementById('countdown-timer');
    const promotionEndTime = new Date().getTime() + 86400000; // 24 hours from now

    setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = promotionEndTime - now;

      if (timeLeft > 0) {
        const hours = Math.floor((timeLeft % 86400000) / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        timerElement.textContent = "Offer expired";
      }
    }, 1000);

    // Currency Converter: USD to INR
    const exchangeRateElement = document.getElementById('exchange-rate');
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        exchangeRateElement.textContent = `${data.rates.INR}`;
      })
      .catch(() => {
        exchangeRateElement.textContent = "Unavailable";
      });


/* Features section*/
AOS.init();  // Initialize AOS animations

    // Toggle expandable feature cards
    function toggleExpand(card) {
      card.classList.toggle('expanded');
    }

    // Show modal for feature
    function showModal(id) {
      document.getElementById(`${id}-modal`).style.display = 'flex';
    }

    // Close modal for feature
    function closeModal(id) {
      document.getElementById(`${id}-modal`).style.display = 'none';
    }

    // Live counter for happy customers
    let count = 0;
    const counterElement = document.getElementById('customer-counter');
    const interval = setInterval(() => {
      if (count < 5000) {
        count++;
        counterElement.textContent = count;
      } else {
        clearInterval(interval);
      }
    }, 1);

/* popular section */
  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 30,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  });


// Add event listeners to buttons in the Popular Section
document.addEventListener('DOMContentLoaded', () => {
  // Select all "Add to Wishlist" buttons
  const wishlistButtons = document.querySelectorAll('.quick-add:not(.book-now)');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', handleAddToWishlist);
  });

  // Select all "Book Now" buttons
  const bookNowButtons = document.querySelectorAll('.quick-add.book-now');
  bookNowButtons.forEach(button => {
    button.addEventListener('click', handleBookNow);
  });
});

// Handle Add to Wishlist
function handleAddToWishlist(event) {
  const button = event.target;
  const cardInfo = button.closest('.card-info');
  const itemTitle = cardInfo.querySelector('h3')?.textContent || 'Unknown Item';

  // Save to localStorage
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (!wishlist.includes(itemTitle)) {
    wishlist.push(itemTitle);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Show confirmation message
    showToast(`${itemTitle} added to your wishlist!`, 'success');
  } else {
    showToast(`${itemTitle} is already in your wishlist.`, 'info');
  }
}

// Handle Book Now
function handleBookNow(event) {
  const button = event.target;
  const cardInfo = button.closest('.card-info');
  const itemTitle = cardInfo.querySelector('h3')?.textContent || 'Unknown Destination';

  // Show confirmation message
  showToast(`Booking started for ${itemTitle}. Redirecting...`, 'success');

  // Simulate a redirect or booking action (you can replace this with actual logic)
  setTimeout(() => {
    window.location.href = '#book'; // Replace with your booking page URL
  }, 1500);
}

// Utility function to show toast notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 100);

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add basic styles for toast notifications
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
  }
  .toast.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
    pointer-events: auto;
  }
  .toast-success {
    background-color: #28a745;
  }
  .toast-info {
    background-color: #17a2b8;
  }
  .toast-error {
    background-color: #dc3545;
  }
`;
document.head.appendChild(toastStyles);


/* api tracker */
// Initialize WebSocket for real-time updates
    const socket = new WebSocket('ws://localhost:3000'); // Change to your WebSocket server URL

    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 2); // Default map center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let airplaneMarker = L.marker([51.505, -0.09]).addTo(map); // Default marker for airplane

    // WebSocket Message Handler
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.airplaneId && data.location) {
        const { latitude, longitude } = data.location;
        document.getElementById('location').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        airplaneMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], 10); // Zoom to the airplane's location
      }
    };

    // Update airplane location
    document.getElementById('update-location-btn').addEventListener('click', async () => {
      const id = document.getElementById('airplane-id').value;
      const latitude = parseFloat(document.getElementById('latitude').value);
      const longitude = parseFloat(document.getElementById('longitude').value);

      if (!id || isNaN(latitude) || isNaN(longitude)) {
        alert('Please fill all fields correctly.');
        return;
      }

      // Show loading spinner
      document.getElementById('loading-spinner').style.display = 'block';

      // Send location update via WebSocket
      socket.send(JSON.stringify({
        type: 'update-location',
        airplaneId: id,
        location: { latitude, longitude }
      }));

      // Hide loading spinner after a short delay (simulate data processing)
      setTimeout(() => {
        document.getElementById('loading-spinner').style.display = 'none';
      }, 1000);
    });

    // Retrieve airplane info (for a specific ID)
    document.getElementById('get-info-btn').addEventListener('click', async () => {
      const id = document.getElementById('info-id').value;

      if (!id) {
        alert('Please enter an Airplane ID.');
        return;
      }

      // Show loading spinner
      document.getElementById('loading-spinner').style.display = 'block';

      // Simulate getting location from the API (This would be replaced with a real API call)
      socket.send(JSON.stringify({ type: 'get-location', airplaneId: id }));

      // Hide loading spinner after a short delay
      setTimeout(() => {
        document.getElementById('loading-spinner').style.display = 'none';
      }, 1000);
    });



/* blog section */
// Initialize AOS
AOS.init({
  duration: 1000, // Global animation duration
  once: true, // Only animate once
});

// Function to toggle the hidden content when "Read More" is clicked
function toggleContent(cardId) {
  const content = document.getElementById(`content-${cardId}`);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
}


/* faq section */
 // Add toggle functionality to the FAQ section
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        if (answer.classList.contains('show')) {
          answer.classList.remove('show');
        } else {
          answer.classList.add('show');
        }
      });
    });

/* newsletter section */
 // Countdown Timer Script
    function startCountdown() {
      const targetDate = new Date("2024-12-31T23:59:59").getTime(); // Set the target date for countdown
      const countdownElement = document.getElementById("countdown");

      const interval = setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
          clearInterval(interval);
          countdownElement.innerHTML = "Offer Expired!";
        } else {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          
          countdownElement.innerHTML = `Hurry up! Sign up within ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      }, 1000);
    }

    startCountdown();
