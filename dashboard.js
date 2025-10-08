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

// Initiate call
function initiateCall() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const callButton = document.getElementById('callButton');

    // Disable button
    callButton.disabled = true;
    callButton.style.opacity = '0.6';

    // Show loading overlay
    loadingOverlay.style.display = 'flex';

    // Simulate call process
    setTimeout(() => {
        document.getElementById('step1').classList.add('completed');
        document.getElementById('step2').classList.add('active');
    }, 2000);

    setTimeout(() => {
        document.getElementById('step2').classList.add('completed');
        document.getElementById('step3').classList.add('active');
    }, 4000);

    setTimeout(() => {
        document.getElementById('step3').classList.add('completed');

        // Show success message
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="success-checkmark">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 class="loading-title">Negotiation Initiated!</h3>
                <p class="loading-text">We've contacted the provider and started the negotiation process. You'll receive an email update within 24-48 hours.</p>
                <button class="btn-primary-large" onclick="closeLoading()">Got it</button>
            </div>
        `;
    }, 6000);
}

// Close loading overlay
function closeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';

    // Show success message on button
    const callButtonText = document.getElementById('callButtonText');
    callButtonText.textContent = 'Negotiation Started ✓';

    document.getElementById('callButton').style.background = 'var(--green)';
}

console.log('🏥 Stealthy Dashboard - Bill Negotiation Tool');
