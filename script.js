// Global variables
let selectedDate = null;
let selectedTime = null;
let selectedPlace = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    createSparkles();
    generateCalendar();
    generateTimeSlots();
    
    // Auto-change bear expression periodically
    setInterval(autoChangeBear, 5000);
});

// Create floating hearts
function createHearts() {
    const container = document.getElementById('heartsBg');
    const heartSymbols = ['❤️', '💕', '💗', '💖', '💘', '💝', '😍', '🥰', '💓'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 4 + 's';
            heart.style.animationDuration = (3 + Math.random() * 3) + 's';
            heart.style.fontSize = (15 + Math.random() * 25) + 'px';
            container.appendChild(heart);
        }, i * 100);
    }
}

// Create sparkles
function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            sparkle.style.animationDuration = (1 + Math.random() * 2) + 's';
            container.appendChild(sparkle);
        }, i * 50);
    }
}

// Auto change bear expression
function autoChangeBear() {
    const bear = document.querySelector('.bear');
    if (bear && bear.innerHTML === '🐻') {
        const bears = ['😊', '🥰', '😘'];
        bear.innerHTML = bears[Math.floor(Math.random() * bears.length)];
        setTimeout(() => bear.innerHTML = '🐻', 2000);
    }
}

// Bear hug interaction
function bearHug() {
    const bear = document.querySelector('.bear');
    const speechBubble = document.querySelector('.speech-bubble');
    
    bear.innerHTML = '🤗';
    speechBubble.textContent = 'Hugs! 💕';
    
    // Create heart burst
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = (50 + (Math.random() - 0.5) * 30) + '%';
            heart.style.top = (50 + (Math.random() - 0.5) * 30) + '%';
            heart.style.fontSize = '30px';
            heart.style.animation = 'floatUp 1s ease-out forwards';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
    
    setTimeout(() => {
        bear.innerHTML = '🐻';
        speechBubble.textContent = 'Click me! 🤗';
    }, 2000);
}

// Move button functionality
function moveButton() {
    const btnNo = document.getElementById('btnNo');
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Calculate new random position
    const maxX = containerRect.width - 100;
    const maxY = containerRect.height - 50;
    
    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = Math.random() * maxY - (maxY / 2);
    
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Try to click NO button
function tryClickNo() {
    moveButton();
}

// Say YES - show date page
function sayYes() {
    const landingPage = document.getElementById('landingPage');
    const datePage = document.getElementById('datePage');
    
    // Change bear to happy
    document.querySelector('.bear').innerHTML = '😍';
    document.querySelector('.speech-bubble').textContent = 'Yay! 💕';
    
    // Add celebration effects
    createCelebration();
    
    // Show date page after animation
    setTimeout(() => {
        landingPage.classList.add('hidden');
        datePage.classList.add('active');
    }, 500);
}

// Create celebration effects
function createCelebration() {
    const container = document.getElementById('heartsBg');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = '1.5s';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            container.appendChild(heart);
        }, i * 30);
    }
}

// Generate calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Add header row
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Disable past dates
        const date = new Date(currentYear, currentMonth, day);
        if (date < today) {
            dayCell.classList.add('disabled');
        } else {
            dayCell.onclick = () => selectDate(day, dayCell);
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

// Select date
function selectDate(day, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    
    // Add selection
    element.classList.add('selected');
    
    const today = new Date();
    selectedDate = new Date(today.getFullYear(), today.getMonth(), day);
    
    checkConfirmButton();
}

// Generate time slots
function generateTimeSlots() {
    const timeGrid = document.getElementById('timeGrid');
    const times = [
        '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM', '06:00 PM',
        '07:00 PM', '08:00 PM', '09:00 PM'
    ];
    
    times.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        timeSlot.onclick = () => selectTime(time, timeSlot);
        timeGrid.appendChild(timeSlot);
    });
}

// Select time
function selectTime(time, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    
    // Add selection
    element.classList.add('selected');
    selectedTime = time;
    
    checkConfirmButton();
}

// Select place
function selectPlace(element, place) {
    // Remove previous selection
    document.querySelectorAll('.place-card').forEach(p => p.classList.remove('selected'));
    
    // Add selection
    element.classList.add('selected');
    selectedPlace = place;
    
    checkConfirmButton();
}

// Check if confirm button should be enabled
function checkConfirmButton() {
    const confirmBtn = document.querySelector('.btn-confirm');
    confirmBtn.disabled = !(selectedDate && selectedTime && selectedPlace);
}

// Confirm date
function confirmDate() {
    if (!selectedDate || !selectedTime || !selectedPlace) return;
    
    const datePage = document.getElementById('datePage');
    const successPage = document.getElementById('successPage');
    const dateSummary = document.getElementById('dateSummary');
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    // Format place
    const placeNames = {
        'movie': '🎬 Movie Date',
        'cafe': '☕ Cafe Date',
        'ramen': '🍜 Ramen Date'
    };
    
    // Update summary
    dateSummary.innerHTML = `
        <p><strong>📅 Date:</strong> ${formattedDate}</p>
        <p><strong>🕐 Time:</strong> ${selectedTime}</p>
        <p><strong>📍 Place:</strong> ${placeNames[selectedPlace]}</p>
    `;
    
    // Show success page
    datePage.classList.remove('active');
    successPage.classList.add('active');
    
    // Create celebration
    createSuccessCelebration();
}

// Create success celebration
function createSuccessCelebration() {
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.innerHTML = ['❤️', '💕', '💗', '💖', '💘'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = '2s';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            container.appendChild(heart);
        }, i * 50);
    }
}

// Click anywhere for heart effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) return;
    if (e.target.classList.contains('calendar-day') && !e.target.classList.contains('header')) return;
    if (e.target.classList.contains('time-slot')) return;
    if (e.target.classList.contains('place-card')) return;
    
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 0.6s ease-out forwards';
    heart.style.zIndex = '1000';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 600);
});
