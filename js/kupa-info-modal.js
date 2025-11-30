// Kupa Info Modal Functions

function openKupaInfoModal(kupaName) {
    const modal = document.getElementById('kupaInfoModal');
    const title = document.getElementById('kupaModalTitle');
    
    if (kupaName) {
        title.textContent = `מידע מפורט על ${kupaName}`;
    }
    
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeKupaInfoModal() {
    const modal = document.getElementById('kupaInfoModal');
    const kupaInfo = document.getElementById('kupaInfo');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Clear content after animation
    setTimeout(() => {
        if (kupaInfo) {
            kupaInfo.innerHTML = '';
        }
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('kupaInfoModal');
    if (event.target === modal) {
        closeKupaInfoModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('kupaInfoModal');
        if (modal && modal.classList.contains('show')) {
            closeKupaInfoModal();
        }
    }
});

// Override hidekupainfo from kupaInfoScript.js to use modal
function hidekupainfo() {
    closeKupaInfoModal();
}

// Show all tables in modal
function showAllimages() {
    // Keep content visible in modal
}

function showMabaatar() {
    // Keep modal open
}

