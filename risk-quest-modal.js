// Risk Quest Modal Functions

let currentQuestion = 0;
let riskAnswers = {};

function openRiskQuestModal() {
    const modal = document.getElementById('riskQuestModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        resetRiskQuest();
    }
}

function closeRiskQuestModal() {
    const modal = document.getElementById('riskQuestModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function startRiskQuest() {
    document.getElementById('riskIntro').style.display = 'none';
    document.getElementById('riskQuestion1').classList.add('active');
    currentQuestion = 1;
    updateProgress();
}

function selectRiskOption(questionNum, value, element) {
    // Save answer
    riskAnswers[`q${questionNum}`] = value;
    
    // Update UI
    const container = element.closest('.risk-question-container');
    container.querySelectorAll('.risk-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Check the radio button
    const radio = element.querySelector('input[type="radio"]');
    if (radio) {
        radio.checked = true;
    }
    
    // Enable next button
    const nextBtn = document.getElementById(`nextBtn${questionNum}`);
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextRiskQuestion(nextNum) {
    // Hide current question
    const currentContainer = document.getElementById(`riskQuestion${currentQuestion}`);
    if (currentContainer) {
        currentContainer.classList.remove('active');
    }
    
    // Show next question
    const nextContainer = document.getElementById(`riskQuestion${nextNum}`);
    if (nextContainer) {
        nextContainer.classList.add('active');
        currentQuestion = nextNum;
        updateProgress();
    }
}

function prevRiskQuestion(prevNum) {
    // Hide current question
    const currentContainer = document.getElementById(`riskQuestion${currentQuestion}`);
    if (currentContainer) {
        currentContainer.classList.remove('active');
    }
    
    // Show previous question
    const prevContainer = document.getElementById(`riskQuestion${prevNum}`);
    if (prevContainer) {
        prevContainer.classList.add('active');
        currentQuestion = prevNum;
        updateProgress();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('riskProgressFill');
    const progressText = document.getElementById('riskProgressText');
    
    if (currentQuestion === 0) {
        progressFill.style.width = '0%';
        progressText.textContent = 'הקדמה';
    } else {
        const percentage = (currentQuestion / 6) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `שאלה ${currentQuestion} מתוך 6`;
    }
}

function calculateRiskScore() {
    // Check all questions answered
    if (Object.keys(riskAnswers).length < 6) {
        alert('אנא ענה על כל השאלות');
        return;
    }
    
    // Calculate total score
    let totalScore = 0;
    for (let key in riskAnswers) {
        totalScore += riskAnswers[key];
    }
    
    // Hide question 6
    document.getElementById('riskQuestion6').classList.remove('active');
    
    // Determine risk level and explanation
    let riskLevel, explanation, icon, levelClass;
    
    if (totalScore <= 7) {
        riskLevel = "סיכון נמוך";
        levelClass = "low";
        icon = "🛡️";
        explanation = 'בהתאם לתשובותיך לשאלון נראה כי אתה משקיע סולידי אשר אינו אוהב סיכון והכספים שמיועדים להשקעה אינם יכולים לסבול הפסדים מבחינתך. המסלולים המתאימים להשקעתך הם אלה אשר בעלי תנודתיות נמוכה עם חשיפה נמוכה למניות. מסלולים כמו כספי שקלי, אג"ח ממשלות ואפילו אשראי ואג"ח. בבחירת ההשקעה חשוב להתייעץ עם בעל רישיון פנסיוני או יועץ השקעות מוסמך כדי שיתאים לך את ההשקעה המתאימה לצרכים שלך.';
    } else if (totalScore <= 12) {
        riskLevel = "סיכון בינוני";
        levelClass = "medium";
        icon = "⚖️";
        explanation = "בהתאם לתשובותיך לשאלון נראה כי אתה משקיע אשר מוכן לקחת סיכונים אבל במידת מה. אתה מסוגל לספוג ולהכיל הפסדים אבל עד גבול מסוים. אני מניח שאתה מחפש רווחים מעבר לרווחים הניתנים במסלולים השיקליים כגון פיקדונות בנקאיים וקרנות כספיות. המסלולים המתאימים להשקעתך הם אלה אשר בעלי תנודתיות בינונית עם חשיפה בינונית למניות. מסלולים כמו כללי, לבני 50 עד 60. בבחירת ההשקעה חשוב להתייעץ עם בעל רישיון פנסיוני או יועץ השקעות מוסמך כדי שיתאים לך את ההשקעה המתאימה לצרכים שלך.";
    } else {
        riskLevel = "סיכון גבוה";
        levelClass = "high";
        icon = "🚀";
        explanation = "בהתאם לתשובותיך לשאלון נראה כי אתה משקיע אשר מצפה לתשואה גבוהה על ההשקעה שלך תוך לקיחת סיכונים ברמה גבוהה. אתה מסוגל לספוג ולהכיל הפסדים. חשוב להבין שהשקעה כזו צריכה להיות מאופיינת כהשקעה לטווח הארוך כדי לדעת להכיל גם ירידות בשוק ההון ותקופות משבר. המסלולים המתאימים להשקעתך הם אלה אשר בעלי תנודתיות גבוהה עם חשיפה גבוהה למניות. מסלולים כמו מנייתי, עוקב מדד sp500, עוקבי מדדי מניות, מניות סחיר. בבחירת ההשקעה חשוב להתייעץ עם בעל רישיון פנסיוני או יועץ השקעות מוסמך כדי שיתאים לך את ההשקעה המתאימה לצרכים שלך.";
    }
    
    // Update progress to 100%
    document.getElementById('riskProgressFill').style.width = '100%';
    document.getElementById('riskProgressText').textContent = 'הושלם! ✅';
    
    // Show results
    document.getElementById('riskResultIcon').textContent = icon;
    document.getElementById('riskResultLevel').textContent = riskLevel;
    document.getElementById('riskResultLevel').className = `risk-result-level ${levelClass}`;
    document.getElementById('riskResultExplanation').textContent = explanation;
    document.getElementById('riskResult').classList.add('show');
    
    // שליחת event עם התוצאה
    const event = new CustomEvent('riskQuestComplete', {
        detail: {
            riskLevel: riskLevel.replace('סיכון ', ''), // "נמוך", "בינוני", "גבוה"
            score: totalScore,
            explanation: explanation
        }
    });
    window.dispatchEvent(event);
    console.log('✅ שאלון סיכון הושלם - רמת סיכון:', riskLevel);
}

function resetRiskQuest() {
    // Reset all data
    currentQuestion = 0;
    riskAnswers = {};
    
    // Reset UI
    document.querySelectorAll('.risk-question-container').forEach(container => {
        container.classList.remove('active');
    });
    
    document.querySelectorAll('.risk-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    document.querySelectorAll('[id^="nextBtn"]').forEach(btn => {
        btn.disabled = true;
    });
    
    // Show intro
    document.getElementById('riskIntro').style.display = 'block';
    document.getElementById('riskResult').classList.remove('show');
    
    // Reset progress
    updateProgress();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('riskQuestModal');
    if (event.target === modal) {
        closeRiskQuestModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('riskQuestModal');
        if (modal && modal.classList.contains('show')) {
            closeRiskQuestModal();
        }
    }
});

