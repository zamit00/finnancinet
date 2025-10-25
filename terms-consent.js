// Terms Consent - Shows only on first visit

// Debug function - you can delete this later
// To reset and see the consent again, run: resetTermsConsent()
function resetTermsConsent() {
    localStorage.removeItem('termsAccepted');
    localStorage.removeItem('termsAcceptedDate');
    console.log('Terms consent reset - refresh page to see overlay');
}

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the HTML to be loaded via fetch
    setTimeout(function() {
        const overlay = document.getElementById('termsConsentOverlay');
        const acceptBtn = document.getElementById('acceptTermsBtn');
        
        // Check if user already accepted terms
        const hasAcceptedTerms = localStorage.getItem('termsAccepted');
        
        console.log('Terms accepted:', hasAcceptedTerms); // Debug
        console.log('Overlay element found:', !!overlay); // Debug
        
        if (!hasAcceptedTerms && overlay) {
            // Show overlay on first visit
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('Showing terms consent overlay'); // Debug
        } else if (overlay) {
            // Hide overlay if already accepted
            overlay.classList.add('hidden');
            console.log('Terms already accepted, hiding overlay'); // Debug
        }
        
        // Handle accept button click
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                // Save acceptance to localStorage
                localStorage.setItem('termsAccepted', 'true');
                localStorage.setItem('termsAcceptedDate', new Date().toISOString());
                
                console.log('Terms accepted, saving to localStorage'); // Debug
                
                // Hide overlay with animation
                if (overlay) {
                    overlay.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        overlay.classList.remove('show');
                        overlay.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }
    }, 500); // Wait 500ms for fetch to complete
    
    // Allow opening terms modal from consent box
    const termsLinks = document.querySelectorAll('.terms-link');
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof openTermsModal === 'function') {
                openTermsModal();
            }
        });
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

