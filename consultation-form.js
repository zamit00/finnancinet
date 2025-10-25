// Consultation Form Functions

function openConsultationForm() {
    const modal = document.getElementById('consultationFormModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeConsultationForm() {
    const modal = document.getElementById('consultationFormModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        // ניקוי הטופס
        const form = document.getElementById('consultationForm');
        if (form) {
            form.reset();
        }
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('consultationFormModal');
    if (event.target === modal) {
        closeConsultationForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeConsultationForm();
    }
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // איסוף הנתונים מהטופס
            const formData = {
                fullName: document.getElementById('fullName')?.value,
                phoneNumber: document.getElementById('phoneNumber')?.value,
                email: document.getElementById('email')?.value,
                message: document.getElementById('message')?.value
            };
            
            // כאן תוכל להוסיף קוד לשליחת הנתונים לשרת
            console.log('Form submitted:', formData);
            
            // הצגת הודעת הצלחה
            alert('תודה! פנייתך נקלטה בהצלחה. ניצור איתך קשר בהקדם.');
            
            // סגירת המודאל
            closeConsultationForm();
        });
    }
});

