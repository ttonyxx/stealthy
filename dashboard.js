// Dashboard functionality

// File upload handling
const uploadArea = document.getElementById('uploadArea');
const billUpload = document.getElementById('billUpload');
const uploadContainer = document.getElementById('uploadContainer');
const billResults = document.getElementById('billResults');
const insuranceProvider = document.getElementById('insuranceProvider');
const otherInsurance = document.getElementById('otherInsurance');

// Handle insurance provider selection
insuranceProvider.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherInsurance.style.display = 'block';
        otherInsurance.focus();
    } else {
        otherInsurance.style.display = 'none';
        otherInsurance.value = '';
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.background = 'var(--primary-pale)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--gray-300)';
    uploadArea.style.background = 'var(--white)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--gray-300)';
    uploadArea.style.background = 'var(--white)';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// File input change
billUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

// Handle file upload
function handleFileUpload(file) {
    // Validate file
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, JPG, or PNG file');
        return;
    }

    if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
    }

    // Check if insurance is selected
    const insurance = insuranceProvider.value;
    if (!insurance) {
        alert('Please select your insurance provider first');
        insuranceProvider.focus();
        insuranceProvider.style.borderColor = 'var(--red)';
        setTimeout(() => {
            insuranceProvider.style.borderColor = '';
        }, 2000);
        return;
    }

    // Show loading state with document analysis animation
    uploadArea.innerHTML = `
        <div class="upload-loading">
            <div class="document-scanner">
                <div class="document-icon">
                    <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                        <rect x="10" y="10" width="60" height="80" rx="4" fill="var(--white)" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="25" x2="60" y2="25" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="35" x2="60" y2="35" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="45" x2="50" y2="45" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="55" x2="60" y2="55" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="65" x2="55" y2="65" stroke="var(--gray-300)" stroke-width="2"/>
                        <line x1="20" y1="75" x2="60" y2="75" stroke="var(--gray-300)" stroke-width="2"/>
                    </svg>
                    <div class="scan-line"></div>
                </div>
                <div class="analysis-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <h3 class="analyzing-title">Analyzing Your Bill</h3>
            <div class="analyzing-tasks">
                <div class="task-item" id="task1">
                    <div class="task-spinner"></div>
                    <span>Reading document...</span>
                </div>
                <div class="task-item" id="task2">
                    <div class="task-spinner"></div>
                    <span>Extracting costs...</span>
                </div>
                <div class="task-item" id="task3">
                    <div class="task-spinner"></div>
                    <span>Calculating savings...</span>
                </div>
            </div>
            <p class="upload-filename">${file.name}</p>
        </div>
    `;

    // Animate tasks sequentially
    setTimeout(() => {
        document.getElementById('task1').classList.add('active');
    }, 300);

    setTimeout(() => {
        document.getElementById('task1').classList.add('completed');
        document.getElementById('task2').classList.add('active');
    }, 1200);

    setTimeout(() => {
        document.getElementById('task2').classList.add('completed');
        document.getElementById('task3').classList.add('active');
    }, 2000);

    // Simulate bill processing (in production, this would call your backend API)
    setTimeout(() => {
        processBill(file);
    }, 2500);
}

// Process and display bill information
function processBill(file) {
    // Get insurance info
    let insurance = insuranceProvider.value;
    if (insurance === 'other') {
        insurance = otherInsurance.value || 'Other';
    }

    // Map insurance values to display names
    const insuranceNames = {
        'blue-cross': 'Blue Cross Blue Shield',
        'unitedhealth': 'UnitedHealthcare',
        'aetna': 'Aetna',
        'cigna': 'Cigna',
        'humana': 'Humana',
        'kaiser': 'Kaiser Permanente',
        'anthem': 'Anthem',
        'centene': 'Centene',
        'medicare': 'Medicare',
        'medicaid': 'Medicaid',
        'none': 'No Insurance'
    };

    const insuranceName = insuranceNames[insurance] || insurance;

    // Mock data - in production, this would come from OCR/AI processing
    const billData = {
        provider: 'Memorial Hospital',
        serviceDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        billNumber: 'INV-' + Math.floor(Math.random() * 1000000),
        originalCost: (Math.random() * 5000 + 2000).toFixed(2),
        insuranceCovered: insurance === 'none' ? '0.00' : (Math.random() * 2000 + 500).toFixed(2),
        insurance: insuranceName
    };

    billData.amountDue = (billData.originalCost - billData.insuranceCovered).toFixed(2);
    billData.estimatedSavings = (billData.amountDue * (0.25 + Math.random() * 0.15)).toFixed(2);
    billData.savingsPercentage = ((billData.estimatedSavings / billData.amountDue) * 100).toFixed(0);

    // Update UI
    document.getElementById('provider').textContent = billData.provider;
    document.getElementById('insuranceDisplay').textContent = billData.insurance;
    document.getElementById('serviceDate').textContent = billData.serviceDate;
    document.getElementById('billNumber').textContent = billData.billNumber;
    document.getElementById('originalCost').textContent = '$' + parseFloat(billData.originalCost).toLocaleString();
    document.getElementById('insuranceCovered').textContent = '$' + parseFloat(billData.insuranceCovered).toLocaleString();
    document.getElementById('amountDue').textContent = '$' + parseFloat(billData.amountDue).toLocaleString();
    document.getElementById('estimatedSavings').textContent = '$' + parseFloat(billData.estimatedSavings).toLocaleString();
    document.getElementById('savingsPercentage').textContent = billData.savingsPercentage + '% potential savings';

    // Set confidence bar
    const confidenceFill = document.getElementById('confidenceFill');
    confidenceFill.style.width = (70 + Math.random() * 25) + '%';

    // Hide upload, show results
    uploadContainer.style.display = 'none';
    billResults.style.display = 'block';

    // Animate cards
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Reset upload
function resetUpload() {
    uploadContainer.style.display = 'block';
    billResults.style.display = 'none';

    uploadArea.innerHTML = `
        <svg class="upload-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 class="upload-title">Upload Your Medical Bill</h3>
        <p class="upload-text">Drag and drop your bill here, or click to browse</p>
        <p class="upload-formats">Supports PDF, JPG, PNG (max 10MB)</p>
        <input type="file" id="billUpload" accept=".pdf,.jpg,.jpeg,.png" hidden>
        <button class="btn-primary" onclick="document.getElementById('billUpload').click()">
            Choose File
        </button>
    `;

    // Re-attach event listener
    const newBillUpload = document.getElementById('billUpload');
    newBillUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    billUpload.value = '';
}

// Dispute letter text template
const disputeLetterText = `Dear Billing Department at Memorial Hospital,

I am writing to formally dispute the charges outlined in bill #[BILL_NUMBER] dated [SERVICE_DATE].

After careful review of the itemized statement, I have identified several discrepancies that require immediate attention:

1. OVERCHARGING: Several line items appear to be billed at rates significantly higher than the Medicare-approved amounts for similar procedures in this geographic area.

2. DUPLICATE CHARGES: I have noticed what appears to be duplicate billing for certain services that should only have been charged once.

3. LACK OF PRIOR AUTHORIZATION: Some procedures were not pre-authorized by my insurance provider, yet were performed without my explicit consent or knowledge of potential out-of-pocket costs.

4. CODING ERRORS: The CPT codes used may not accurately reflect the services actually rendered.

Under the Fair Debt Collection Practices Act and the No Surprises Act, I am entitled to an accurate and itemized bill. I request the following:

• A detailed, itemized breakdown of all charges
• Documentation supporting the medical necessity of each service
• Evidence that all charges comply with my insurance contract
• Adjustment of any erroneous or excessive charges

I am prepared to pay all legitimate charges once these discrepancies are resolved. Please respond within 30 days as required by law.

Sincerely,
[Your Name]`;

// Track completion status of both modals
let negotiationLoadingComplete = false;
let letterLoadingComplete = false;
let callInitiated = false;
let letterSent = false;

// Start the modal flow - now shows dual modals
function initiateCall() {
    const dualModalOverlay = document.getElementById('dualModalOverlay');
    const callButton = document.getElementById('callButton');

    // Reset completion status
    negotiationLoadingComplete = false;
    letterLoadingComplete = false;
    callInitiated = false;
    letterSent = false;

    // Disable button
    callButton.disabled = true;
    callButton.style.opacity = '0.6';

    // Show dual modal overlay
    dualModalOverlay.style.display = 'flex';

    // Start AI negotiation process
    startNegotiationProcess();

    // Start typewriter effect for dispute letter
    startTypewriterEffect();
}

// Start the AI negotiation process
function startNegotiationProcess() {
    // Simulate negotiation steps
    setTimeout(() => {
        document.getElementById('negStep1').classList.add('completed');
        document.getElementById('negStep2').classList.add('active');
    }, 1500);

    setTimeout(() => {
        document.getElementById('negStep2').classList.add('completed');
        document.getElementById('negStep3').classList.add('active');
    }, 3000);

    setTimeout(() => {
        document.getElementById('negStep3').classList.add('completed');

        // Mark loading as complete
        negotiationLoadingComplete = true;

        // Hide spinner and show button
        const aiModal = document.getElementById('aiNegotiationModal');
        const spinner = aiModal.querySelector('.loading-spinner-small');
        if (spinner) spinner.style.display = 'none';

        // Show the "Initiate Call" button
        document.getElementById('aiModalFooter').style.display = 'flex';
    }, 4500);
}

// Initiate the phone call with audio visualizer
function initiatePhoneCall() {
    const aiModalBody = document.getElementById('aiModalBody');
    const aiModalFooter = document.getElementById('aiModalFooter');

    // Hide existing content and button
    aiModalBody.style.display = 'none';
    aiModalFooter.style.display = 'none';

    // Create audio visualizer container
    const visualizerContainer = document.createElement('div');
    visualizerContainer.className = 'audio-visualizer-container';
    visualizerContainer.innerHTML = `
        <div class="call-status">
            <div class="call-icon-pulse">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
            </div>
            <p class="call-text">Call Initiated</p>
        </div>
        <div class="audio-visualizer" id="audioVisualizer">
            ${Array(20).fill(0).map((_, i) => `<div class="audio-bar" id="bar-${i}"></div>`).join('')}
        </div>
    `;

    const aiModal = document.getElementById('aiNegotiationModal');
    aiModal.querySelector('.modal-body').parentNode.insertBefore(visualizerContainer, aiModal.querySelector('.modal-body').nextSibling);

    // Start randomized audio animation
    startAudioVisualization();

    // Mark call as initiated immediately
    callInitiated = true;
    checkBothActionsComplete();
}

// Animate audio bars with random heights
function startAudioVisualization() {
    const bars = document.querySelectorAll('.audio-bar');

    function animateBars() {
        bars.forEach((bar, index) => {
            // Generate random height between 20% and 100%
            const randomHeight = Math.random() * 80 + 20;
            bar.style.height = randomHeight + '%';

            // Vary the transition speed for more natural feel
            const transitionSpeed = 0.1 + Math.random() * 0.15;
            bar.style.transition = `height ${transitionSpeed}s ease`;
        });
    }

    // Initial animation
    animateBars();

    // Continue animating at random intervals
    setInterval(() => {
        animateBars();
    }, 150); // Update every 150ms for smooth, realistic audio effect
}

// Typewriter effect for dispute letter (writes in chunks)
function startTypewriterEffect() {
    const letterContent = document.getElementById('disputeLetterContent');
    letterContent.textContent = ''; // Clear any existing content

    // Split text into words for chunked typing
    const words = disputeLetterText.split(' ');
    let wordIndex = 0;

    // Calculate timing to complete in ~4.5 seconds (matching negotiation)
    const totalDuration = 4500; // milliseconds
    const intervalSpeed = totalDuration / words.length; // distribute evenly

    function typeChunk() {
        if (wordIndex < words.length) {
            // Add 1-2 words at a time for faster, more natural typing
            const wordsToAdd = Math.min(2, words.length - wordIndex);
            const chunk = words.slice(wordIndex, wordIndex + wordsToAdd).join(' ') + ' ';

            letterContent.textContent += chunk;
            wordIndex += wordsToAdd;

            // Auto-scroll to bottom as text appears
            letterContent.scrollTop = letterContent.scrollHeight;

            setTimeout(typeChunk, intervalSpeed);
        } else {
            // Typing complete - show button
            letterLoadingComplete = true;
            document.getElementById('letterModalFooter').style.display = 'flex';
        }
    }

    // Start typing after a brief delay
    setTimeout(typeChunk, 500);
}

// Send dispute letter with animation
function sendDisputeLetter() {
    const letterModalBody = document.getElementById('letterModalBody');
    const letterModalFooter = document.getElementById('letterModalFooter');

    // Hide existing content and button
    letterModalBody.style.display = 'none';
    letterModalFooter.style.display = 'none';

    // Create letter animation container
    const animationContainer = document.createElement('div');
    animationContainer.className = 'letter-animation-container';
    animationContainer.innerHTML = `
        <div class="letter-envelope">
            <svg class="envelope-icon" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div class="letter-paper">
                <div class="letter-lines"></div>
                <div class="letter-lines"></div>
                <div class="letter-lines"></div>
            </div>
        </div>
        <p class="sending-text">Scheduling letter...</p>
    `;

    const letterModal = document.getElementById('disputeLetterModal');
    letterModal.querySelector('.modal-body').parentNode.insertBefore(animationContainer, letterModal.querySelector('.modal-body').nextSibling);

    // Show scheduled message after brief animation
    setTimeout(() => {
        animationContainer.innerHTML = `
            <div class="letter-scheduled">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <p style="color: var(--primary-color); font-weight: 700; font-size: 18px; margin-top: 1rem;">Letter Scheduled</p>
                <p style="color: var(--gray-700); font-size: 14px; margin-top: 0.5rem;">Dispute letter will be sent in the next 24 hours</p>
            </div>
        `;

        // Mark letter as sent (scheduled)
        letterSent = true;
        checkBothActionsComplete();
    }, 1500);
}

// Check if both actions are complete and show proceed button
function checkBothActionsComplete() {
    if (callInitiated && letterSent) {
        const confirmContainer = document.getElementById('confirmButtonContainer');
        confirmContainer.style.display = 'flex';

        // Animate button appearance
        setTimeout(() => {
            confirmContainer.style.opacity = '1';
        }, 100);
    }
}

// Handle confirmation
function confirmNegotiation() {
    const dualModalOverlay = document.getElementById('dualModalOverlay');

    // Show success message
    dualModalOverlay.innerHTML = `
        <div class="success-overlay">
            <div class="success-checkmark">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h3 class="success-title">Negotiation Initiated!</h3>
            <p class="success-text">We've contacted the provider with your dispute letter and started the AI negotiation process. You'll receive an email update within 24-48 hours.</p>
            <button class="btn-primary-large" onclick="closeModals()">Got it</button>
        </div>
    `;
}

// Close modals
function closeModals() {
    const dualModalOverlay = document.getElementById('dualModalOverlay');
    dualModalOverlay.style.display = 'none';

    // Show success message on button
    const callButtonText = document.getElementById('callButtonText');
    callButtonText.textContent = 'Negotiation Started ✓';

    document.getElementById('callButton').style.background = 'var(--green)';
}

console.log('🏥 Stitches Dashboard - Bill Negotiation Tool');
