// פונקציה שמזהה את סוג המסלול לפי שם המסלול
function getMaslulType(shemkupa) {
 
    if (!shemkupa) return 'לא ידוע';
    
    const name = String(shemkupa).trim();
    
    // כללי - בדיקה ראשונה
    if (name.includes('כללי') && !name.includes('כללי ב')) {
        return 'כללי';
    }
    
    // S&P 500
    if (name.includes('500')) {
        return 'עוקב מדד s&p 500';
    }
    
    // מניות (ללא מדד/עוקב/סחיר/משולב/25/אג"ח/פאסיבי)
    if (name.includes('מניות') && 
        !name.includes('מדד') && 
        !name.includes('עוקב') && 
        !name.includes('סחיר') && 
        !name.includes('משולב') && 
        !name.includes('25') && 
        !name.includes('אג"ח') && 
        !name.includes('פאסיבי')) {
        return 'מניות';
    }
    
    // אשראי ואג"ח (ללא מניות/עוקב/סחיר)
    if (name.includes('אשראי') && 
        !name.includes('מניות') && 
        !name.includes('עוקב') && 
        !name.includes('סחיר')) {
        return 'אשראי ואג"ח';
    }
    
    // אשראי ואג"ח עם מניות (עם 25)
    if (name.includes('אשראי') && name.includes('25')) {
        return 'אשראי ואג"ח עם מניות';
    }
    
    // כספי שקלי
    if (name.includes('כספי (שקלי)')) {
        return 'כספי (שקלי)';
    }
    
    // עוקב מדדים - גמיש
    if (name.includes('עוקב') && name.includes('גמיש')) {
        return 'עוקב מדדים - גמיש';
    }
    
    // אג"ח ממשלות
    if (name.includes('ממשלות')) {
        return 'אג"ח ממשלות';
    }
    
    // הלכה יהודית
    if (name.includes('הלכה')) {
        return 'הלכה יהודית';
    }
    
    // משולב סחיר
    if (name.includes('משולב סחיר')) {
        return 'משולב סחיר';
    }
    
    // עוקב מדדי אג"ח (ללא מניות)
    if (name.includes('עוקב') && name.includes('אג"ח') && !name.includes('מניות')) {
        return 'עוקב מדדי אג"ח';
    }
    
    // עוקב מדדי מניות (ללא אג"ח ו-25)
    if (name.includes('מניות') && 
        !name.includes('אג"ח') && 
        name.includes('עוקב') && 
        !name.includes('25')) {
        return 'עוקב מדדי מניות';
    }
    
    // מניות סחיר (ללא 25)
    if (name.includes('מניות') && name.includes('סחיר') && !name.includes('25')) {
        return 'מניות סחיר';
    }
    
    // אג"ח סחיר (ללא מניות ולא ממשלתי)
    if (name.includes('סחיר') && 
        name.includes('אג"ח') && 
        !name.includes('מניות') && 
        !name.includes('ממשלתי')) {
        return 'אג"ח סחיר';
    }
    
    // אג"ח ממשלתי סחיר
    if (name.includes('סחיר') && name.includes('אג"ח') && name.includes('ממשלתי')) {
        return 'אג"ח ממשלתי סחיר';
    }
    
    // אג"ח סחיר עם מניות
    if (name.includes('סחיר') && name.includes('אג"ח') && name.includes('מניות')) {
        return 'אג"ח סחיר עם מניות';
    }
    
    // עוקב מדדי אג"ח עם מניות
    if (!name.includes('סחיר') && 
        name.includes('אג"ח') && 
        name.includes('מניות') && 
        name.includes('עוקב')) {
        return 'עוקב מדדי אג"ח עם מניות';
    }
    
    // 50-60 (כולל ווריאציות: "לבני 50 עד 60", "בני 50-60", "50 עד 60")
    if ((name.includes('50') && name.includes('60')) || 
        name.includes('לבני 50') || 
        name.includes('בני 50') ||
        name.includes('50-60')) {
        return '50-60';
    }
    
    // עד 50 (ללא עוקב ו-60) (כולל ווריאציות: "עד גיל 50", "עד 50")
    if ((name.includes('50') && !name.includes('עוקב') && !name.includes('60')) ||
        name.includes('עד גיל 50') ||
        name.includes('עד 50')) {
        return 'עד 50';
    }
    
    // 60 ומעלה (ללא 50) (כולל ווריאציות: "מגיל 60", "בני 60")
    if ((!name.includes('50') && name.includes('60')) ||
        name.includes('מגיל 60') ||
        name.includes('בני 60 ומעלה')) {
        return '60 ומעלה';
    }
    
    // סיכון מוגבר
    if (name.includes('מוגבר')) {
        return 'סיכון מוגבר';
    }
    
    // סיכון מועט
    if (name.includes('מועט')) {
        return 'סיכון מועט';
    }
    
    // סיכון בינוני
    if (name.includes('בינוני')) {
        return 'סיכון בינוני';
    }
    
    // אם לא התאים לשום קטגוריה - מחזיר "כללי"
    return 'כללי';
}

function filterIncludes(text, includes = [], excludes = []) {
    return includes.every(i => text.includes(i)) && excludes.every(e => !text.includes(e));
  }
  
  function applyFilters(item, { includes = [], excludes = [] }) {
    return filterIncludes(item.shemkupa, includes, excludes);
  }
  
  const maslulFilters = {
  
    "כללי": {
      includes: ["כללי"],
    },
    "עוקב מדד s&p 500": {
      includes: ["500"]
    },
    "מניות": {
      includes: ["מניות"],
      excludes: ["מדד", "עוקב", "סחיר", "משולב", "25", '"אג\"ח"', "פאסיבי"]
    },
  "אשראי ואג\"ח": {
      includes: ["אג\"ח", "אשראי"],
      excludes: ["מניות", "סחיר", "עוקב", "פאסיבי"]
    },
  "אשראי ואג\"ח עם מניות": {
      includes: ["אשראי", "25"]
    },
  "כספי (שקלי)": {
      includes: ["כספי", "שקלי"]
    },
    "עוקב מדדים - גמיש": {
      includes: ["עוקב", "גמיש"],
    },
    "אג\"ח ממשלות": {
      includes: ["ממשלות"]
    },
     "הלכה יהודית": {
      includes: ["הלכה"]
    },
  "משולב סחיר": {
      includes: ["משולב", "סחיר"]
    },
  "עוקב מדדי אג\"ח": {
      includes: ["עוקב", "אג\"ח"],
      excludes: ["מניות"]
    },
  "עוקב מדדי מניות": {
      includes: ["עוקב", "מניות"],
      excludes: ["אג\"ח", "25"]
    },
  "מניות סחיר": {
      includes: ["מניות", "סחיר"],
      excludes: ["25"]
    },
    "אג\"ח סחיר עם מניות": {
      includes: ["אג\"ח", "סחיר", "מניות"]
    },
  "עוקב מדדי אג\"ח עם מניות": {
      includes: ["עוקב", "אג\"ח", "מניות","סחיר"]
    },
  "50-60": {
      includes: ["50", "60"]
    },
    "עד 50": {
      includes: ["50"],
      excludes: ["60", "עוקב"]
    },
    "60 ומעלה": {
      includes: ["60"],
      excludes: ["50"]
    },
    'סיכון מוגבר': {
      includes: ["מוגבר"]
    },
    "סיכון בינוני": {
      includes: ["בינוני"]
    },
    "סיכון מועט": {
      includes: ["נמוך"]
    }  
  };
  
  async function filterMaslul(mas, moza, hevra) {
    
  
    let dataforfilter =
      moza === "פוליסות חסכון" || moza === "פוליסת ביטוח חיים משולב חיסכון" ? datanetunimKlaliXB :
      moza === "קרנות חדשות" ? datanetunimKlaliXP :
      datanetunimKlaliXM;
  
    if (dataforfilter === datanetunimKlaliXM) {
      dataforfilter = dataforfilter.filter(item =>
        !item.ochlosiyayaad.includes("עובדי סקטור") &&
        !item.ochlosiyayaad.includes("עובדי מפעל")
      );
    }
  
      
    let filtered = dataforfilter.filter(item =>
      item.mozar === moza 
    );
    
    const masFilter = maslulFilters[mas];
    if (masFilter) {
      filtered = filtered.filter(item => applyFilters(item, masFilter));
    } else if (mas !== "כללי") {
      filtered = filtered.filter(item => item.shemkupa.includes(mas));
    }
  
    filtered.sort((a, b) => b.tesuam - a.tesuam);
    return filtered;
  }

// פונקציית עזר לבדיקת זיהוי מסלולים
function testMaslulType(shemkupa) {
    const result = getMaslulType(shemkupa);
    return result;
}


