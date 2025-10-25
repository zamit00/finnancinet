// Advanced Analysis Engine - Data Management and Analysis
// מנוע ניתוח מתקדם - ניהול ואיחסון נתונים

const fieldsToAverageForAdvancedAnalysis = [
  "tesuam", "tesuam36", "tesuam60",
  "tesuaMitchilatshana",
  "dmeyNihul","dmeyNihulHafkad"        
];
async function indicationsforadvancedanalysis(mozar,maslul){
    
    let sugmuzar='' 
    if(mozar==='פוליסת ביטוח חיים משולב חיסכון'){
        sugmuzar='פוליסות חסכון';
    }else{
        sugmuzar=mozar;
    }
      const dataY = await filterMaslul(maslul, sugmuzar, 0);
      
      if (dataY.length === 0) return;
      const result = {
        mozar: sugmuzar,
        maslul: maslul
      };
      
      for (const field of fieldsToAverageForAdvancedAnalysis) {
       
        const validItems = dataY.filter(obj =>
          obj[field] !== undefined &&
          obj[field] !== null &&
          obj[field] !== '' &&
          !isNaN(obj[field]) &&
          parseFloat(obj[field]) !== 0  // לא לספור אפסים - מי שאין לו נתון לא משתתף בממוצע
        );

        if(field==='tesuam' || field==='tesuam36' || field==='tesuam60' || field==='tesuaMitchilatshana'){
            const total = validItems.reduce((sum, obj) => sum + parseFloat(obj[field]), 0);
            const avg = validItems.length > 0 ? total / validItems.length : 0;
            result[field] = avg.toFixed(2); 
        }
        else if(mozar!=='קרנות חדשות' && field==='dmeyNihulHafkad'){
        
            if(result['dmeyNihulHafkad'] && result['dmeyNihul']){
                result['dmeyNihulMeshuklal'] = (Number(result['dmeyNihulHafkad'])/10 + Number(result['dmeyNihul'])).toFixed(2);
            }
        } else {
            result['dmeyNihulHafkad'] = 0.16;
            result['dmeyNihul'] = 1.6;
            result['dmeyNihulMeshuklal'] = 0.25;
        }
      }
      return result;
    };
// ייבוא נתונים מ-sessionStorage ומחיקה מיידית
function importAndClearSessionData() {
    const gil = sessionStorage.getItem('gilForAdvancedAnalysis');
    const yearsToRetirement = sessionStorage.getItem('ageToRetirementForAdvancedAnalysis');
    const equitySum = sessionStorage.getItem('sumHonForAdvancedAnalysis');
    const pensionSum = sessionStorage.getItem('sumKitzvaForAdvancedAnalysis');
    const riskProfile = sessionStorage.getItem('riskProfile');
    const riskScore = sessionStorage.getItem('riskScore');
    const riskSource = sessionStorage.getItem('riskSource');
    const detailedDataStr = sessionStorage.getItem('advancedAnalysisData');
    
    // פענוח נתונים מפורטים
    let detailedData = null;
    if (detailedDataStr) {
        try {
            detailedData = JSON.parse(detailedDataStr);
        } catch (error) {
            console.error('❌ שגיאה בפענוח נתונים מפורטים:', error);
        }
    }
    
    // מחיקה מיידית מ-sessionStorage
    sessionStorage.removeItem('gilForAdvancedAnalysis');
    sessionStorage.removeItem('ageToRetirementForAdvancedAnalysis');
    sessionStorage.removeItem('sumHonForAdvancedAnalysis');
    sessionStorage.removeItem('sumKitzvaForAdvancedAnalysis');
    sessionStorage.removeItem('riskProfile');
    sessionStorage.removeItem('riskScore');
    sessionStorage.removeItem('riskSource');
    sessionStorage.removeItem('advancedAnalysisData');
    
    return {
        age: gil ? parseInt(gil) : null,
        yearsToRetirement: yearsToRetirement ? parseInt(yearsToRetirement) : null,
        equityTotal: equitySum ? parseFloat(equitySum) : 0,
        pensionTotal: pensionSum ? parseFloat(pensionSum) : 0,
        riskProfile: riskProfile || "",          // רמת סיכון
        riskScore: riskScore ? parseInt(riskScore) : null,  // ציון סיכון
        riskSource: riskSource || "",            // מקור רמת הסיכון
        detailedData: detailedData  // כל הנתונים המפורטים
    };
}

// אובייקט מרכזי לאחסון נתוני הלקוח
const clientAnalysisData = {
    // מאפייני לקוח בסיסיים
    profile: {
        age: null,
        retirementAge: 67,
        yearsToRetirement: null,
        employmentStatus: null,
        investmentHorizon: 'ארוך',
        moneyGoal: 'קצבה',
        riskProfile: "", // נמוך / בינוני / גבוה
        riskScore: null,
        riskSource: "" // manual / questionnaire
    },
    
    // נתוני תיק ההשקעות
    portfolio: {
        totalValue: 0,
        equityTotal: 0,      // סך מוצרים הוניים
        pensionTotal: 0,     // סך מוצרי קצבה
        accounts: [],
        productBreakdown: {}, // פילוח לפי מוצר
        providerBreakdown: {}, // פילוח לפי ספק
        pathwayBreakdown: {} // פילוח לפי מסלול
    },
    
    // ניתוח איכות
    quality: {
        averageReturns: {},
        comparisonToMarket: {},
        rankings: {}
    },
    
    // פערים שזוהו
    gaps: {
        highFees: [],
        lowPerformance: [],
        riskMismatch: [],
        concentration: [],
        recommendations: []
    },
    
    // תאריך ניתוח
    analysisDate: null,
    lastUpdated: null,
    
    // נתונים מפורטים מהקבצים
    detailedData: null
};

// פונקציות לשמירה ושליפה מ-localStorage
const AnalysisStorage = {
    save: function() {
        try {
            clientAnalysisData.lastUpdated = new Date().toISOString();
            localStorage.setItem('clientAnalysisData', JSON.stringify(clientAnalysisData));
            return true;
        } catch (error) {
            console.error('❌ שגיאה בשמירת נתונים:', error);
            return false;
        }
    },
    
    load: function() {
        try {
            const saved = localStorage.getItem('clientAnalysisData');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(clientAnalysisData, data);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ שגיאה בטעינת נתונים:', error);
            return false;
        }
    },
    
    clear: function() {
        localStorage.removeItem('clientAnalysisData');
        // Reset to default values
        Object.keys(clientAnalysisData).forEach(key => {
            if (typeof clientAnalysisData[key] === 'object') {
                clientAnalysisData[key] = Array.isArray(clientAnalysisData[key]) ? [] : {};
            } else {
                clientAnalysisData[key] = null;
            }
        });
    }
};

// פונקציות לעדכון פרופיל לקוח
const ClientProfile = {
    updateProfile: function(data) {
        Object.assign(clientAnalysisData.profile, data);
        AnalysisStorage.save();
    },
    
    getAge: function() {
        return clientAnalysisData.profile.age;
    },
    
    getRiskProfile: function() {
        return clientAnalysisData.profile.riskProfile;
    },
    
    isComplete: function() {
        const profile = clientAnalysisData.profile;
        return profile.age !== null && 
               profile.employmentStatus !== null && 
               profile.riskProfile !== "";
    }
};

// פונקציות לניתוח תיק ההשקעות
const PortfolioAnalyzer = {
    // ניתוח מהנתונים הגלובליים שכבר הועלו
    analyzeFromGlobalData: function() {
        // בדיקה אם יש נתונים גלובליים
        if (typeof DataAll === 'undefined' || !DataAll || DataAll.length === 0) {
            console.warn('⚠️ אין נתונים זמינים - נא להעלות קבצי מסלקה בדף הבית');
            return false;
        }
        
        let totalValue = 0;
        const accounts = [];
        const productBreakdown = {};
        const providerBreakdown = {};
        const pathwayBreakdown = {};
        
        // קריאה מ-sessionStorage ומחיקה מיידית
        const importedData = importAndClearSessionData();
        
        if (importedData.age) {
            clientAnalysisData.profile.age = importedData.age;
        }
        
        if (importedData.yearsToRetirement !== null) {
            clientAnalysisData.profile.yearsToRetirement = importedData.yearsToRetirement;
        }
        
        // שימוש בסכומים המוכנים
        if (importedData.equityTotal > 0 || importedData.pensionTotal > 0) {
            clientAnalysisData.portfolio.equityTotal = importedData.equityTotal;
            clientAnalysisData.portfolio.pensionTotal = importedData.pensionTotal;
            clientAnalysisData.portfolio.totalValue = importedData.equityTotal + importedData.pensionTotal;
        }
        
        // הגדרת גיל פרישה
        clientAnalysisData.profile.retirementAge = 67;
        
        // ניתוח מ-pirteiHeshbon (פרטי חשבונות)
        if (typeof pirteiHeshbon !== 'undefined' && Array.isArray(pirteiHeshbon)) {
            for (const account of pirteiHeshbon) {
                const accountInfo = {
                    provider: account.shemGoofMenahel || account.shemHevra || 'לא ידוע',
                    product: account.sugKupa || account.teurSugYeshut || 'לא ידוע',
                    accountNumber: account.msTik || account.misparTik || '',
                    balance: parseFloat(account.yitratZchuyot || account.zchuyotIshiyot || 0),
                    managementFee: parseFloat(account.shiurDmeyNihulMizchuyot || account.dmeyNihul || 0),
                    pathways: []
                };
                
                // הוסף למאזן כולל
                totalValue += accountInfo.balance;
                
                // עדכן פילוח לפי מוצר
                productBreakdown[accountInfo.product] = 
                    (productBreakdown[accountInfo.product] || 0) + accountInfo.balance;
                
                // עדכן פילוח לפי ספק
                providerBreakdown[accountInfo.provider] = 
                    (providerBreakdown[accountInfo.provider] || 0) + accountInfo.balance;
                
                accounts.push(accountInfo);
            }
        }
        
        // ניתוח מסלולי השקעה מ-masluleiHashkaa
        if (typeof masluleiHashkaa !== 'undefined' && Array.isArray(masluleiHashkaa)) {
            for (const pathway of masluleiHashkaa) {
                const pathwayInfo = {
                    name: pathway.shemMasulHashkaa || pathway.teurMaslul || 'לא ידוע',
                    value: parseFloat(pathway.schumBemislul || pathway.yitratMaslul || 0),
                    return12m: parseFloat(pathway.shiurTsua || pathway.achuzTsua || 0),
                    type: this.identifyPathwayType(pathway.shemMasulHashkaa || pathway.teurMaslul)
                };
                
                // עדכן פילוח מסלולים
                pathwayBreakdown[pathwayInfo.type] = 
                    (pathwayBreakdown[pathwayInfo.type] || 0) + pathwayInfo.value;
                
                // הוסף למסלולי החשבון המתאים
                const relatedAccount = accounts.find(acc => 
                    acc.accountNumber === pathway.msTik || acc.accountNumber === pathway.misparTik
                );
                if (relatedAccount) {
                    relatedAccount.pathways.push(pathwayInfo);
                }
            }
        }
        
        // אם לא מצאנו נתונים מפרטי חשבון, נסה מ-yitrotLefiMutzar
        if (totalValue === 0 && typeof yitrotLefiMutzar !== 'undefined') {
            Object.entries(yitrotLefiMutzar).forEach(([product, value]) => {
                totalValue += parseFloat(value) || 0;
                productBreakdown[product] = parseFloat(value) || 0;
            });
        }
        
        // קריאת סכומי מוצרים הוניים וקצבה מהמשתנים המוכנים
        let equityTotal = 0;
        let pensionTotal = 0;
        
        if (typeof sumHonForAdvancedAnalysis !== 'undefined') {
            equityTotal = sumHonForAdvancedAnalysis;
        }
        
        if (typeof sumKitzvaForAdvancedAnalysis !== 'undefined') {
            pensionTotal = sumKitzvaForAdvancedAnalysis;
        }
        
        // עדכן את הנתונים
        clientAnalysisData.portfolio = {
            totalValue,
            accounts,
            productBreakdown,
            providerBreakdown,
            pathwayBreakdown,
            equityTotal,        // סך מוצרים הוניים
            pensionTotal        // סך מוצרי קצבה
        };
        
        AnalysisStorage.save();
        return true;
    },
    
    // חישוב גיל מתאריך לידה
    calculateAge: function(birthDateString) {
        if (!birthDateString) return null;
        
        try {
            // ניסיון לפרסר תאריך במספר פורמטים
            const birthDate = new Date(birthDateString);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age > 0 && age < 120 ? age : null;
        } catch (error) {
            console.warn('שגיאה בחישוב גיל:', error);
            return null;
        }
    },
    
    // זיהוי סוג מסלול
    identifyPathwayType: function(pathwayName) {
        if (!pathwayName) return 'לא ידוע';
        
        // שימוש בפונקציה מ-data.js אם קיימת
        if (typeof getMaslulType === 'function') {
            return getMaslulType(pathwayName);
        }
        
        // fallback - זיהוי בסיסי
        const name = pathwayName.toLowerCase();
        if (name.includes('מניות')) return 'מניות';
        if (name.includes('אג"ח') || name.includes('אשראי')) return 'אג"ח';
        if (name.includes('כללי')) return 'כללי';
        if (name.includes('כספי')) return 'כספי';
        return 'אחר';
    },
    
    // קבלת סיכום התיק
    getSummary: function() {
        return {
            totalValue: clientAnalysisData.portfolio.totalValue,
            accountsCount: clientAnalysisData.portfolio.accounts.length,
            productCount: Object.keys(clientAnalysisData.portfolio.productBreakdown).length,
            providerCount: Object.keys(clientAnalysisData.portfolio.providerBreakdown).length
        };
    }
};

// פונקציות לניתוח איכות השקעות
const QualityAnalyzer = {
    // השוואה לממוצע השוק
    compareToMarket: function() {
        if (!clientAnalysisData.portfolio.accounts.length) {
            console.warn('⚠️ אין נתוני חשבונות');
            return null;
        }
        
        const comparisons = [];
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            for (const pathway of account.pathways) {
                // חיפוש ממוצע בדאטה אינדיקטורס
                if (typeof dataIndicators !== 'undefined' && dataIndicators.length > 0) {
                    const avgData = dataIndicators.find(item => 
                        item.maslul === pathway.type && item.mozar === account.product
                    );
                    
                    if (avgData) {
                        const comparison = {
                            pathwayName: pathway.name,
                            pathwayType: pathway.type,
                            product: account.product,
                            clientReturn: pathway.return12m,
                            marketAverage: parseFloat(avgData.tesuam),
                            difference: pathway.return12m - parseFloat(avgData.tesuam),
                            performance: this.getPerformanceRating(
                                pathway.return12m, 
                                parseFloat(avgData.tesuam)
                            )
                        };
                        
                        comparisons.push(comparison);
                    }
                }
            }
        }
        
        clientAnalysisData.quality.comparisonToMarket = comparisons;
        AnalysisStorage.save();
        return comparisons;
    },
    
    // דירוג ביצועים
    getPerformanceRating: function(clientReturn, marketAverage) {
        const diff = clientReturn - marketAverage;
        if (diff > 2) return 'מצוין';
        if (diff > 0) return 'טוב';
        if (diff > -2) return 'סביר';
        return 'נמוך';
    },
    
    // חישוב ציון איכות כולל
    calculateQualityScore: function() {
        const comparisons = clientAnalysisData.quality.comparisonToMarket;
        if (!comparisons || comparisons.length === 0) return null;
        
        let totalDiff = 0;
        let above = 0;
        
        comparisons.forEach(comp => {
            totalDiff += comp.difference;
            if (comp.difference > 0) above++;
        });
        
        return {
            averageDifference: totalDiff / comparisons.length,
            percentAboveAverage: (above / comparisons.length) * 100,
            rating: above / comparisons.length > 0.6 ? 'מצוין' : 
                   above / comparisons.length > 0.4 ? 'טוב' : 'דורש שיפור'
        };
    }
};

// פונקציות לזיהוי פערים
const GapAnalyzer = {
    // זיהוי דמי ניהול גבוהים
    identifyHighFees: function() {
        
        const highFees = [];
        const feeThresholds = {
            'קרנות השתלמות': { צבירה: 0.5, הפקדה: 4 },
            'קופת גמל': { צבירה: 0.5, הפקדה: 6 },
            'קרן פנסיה': { צבירה: 0.5, הפקדה: 6 },
            'ביטוח מנהלים': { צבירה: 1, הפקדה: 4 }
        };
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            const threshold = feeThresholds[account.product] || { צבירה: 1, הפקדה: 6 };
            
            if (account.managementFee > threshold.צבירה) {
                highFees.push({
                    provider: account.provider,
                    product: account.product,
                    currentFee: account.managementFee,
                    threshold: threshold.צבירה,
                    excess: account.managementFee - threshold.צבירה,
                    annualCost: account.balance * (account.managementFee / 100),
                    severity: account.managementFee > threshold.צבירה * 1.5 ? 'גבוה' : 'בינוני'
                });
            }
        }
        
        clientAnalysisData.gaps.highFees = highFees;
        AnalysisStorage.save();
        return highFees;
    },
    
    // זיהוי ביצועים נמוכים
    identifyLowPerformance: function() {
        
        const lowPerf = [];
        const comparisons = clientAnalysisData.quality.comparisonToMarket;
        
        if (comparisons) {
            comparisons.forEach(comp => {
                if (comp.difference < -2) {
                    lowPerf.push({
                        pathway: comp.pathwayName,
                        product: comp.product,
                        clientReturn: comp.clientReturn,
                        marketAverage: comp.marketAverage,
                        gap: comp.difference,
                        severity: comp.difference < -5 ? 'גבוה' : 'בינוני'
                    });
                }
            });
        }
        
        clientAnalysisData.gaps.lowPerformance = lowPerf;
        AnalysisStorage.save();
        return lowPerf;
    },
    
    // בדיקת התאמת סיכון
    checkRiskAlignment: function() {
        
        const riskProfile = clientAnalysisData.profile.riskProfile;
        const age = clientAnalysisData.profile.age;
        const mismatches = [];
        
        if (!riskProfile || !age) {
            console.warn('⚠️ חסרים נתוני פרופיל');
            return [];
        }
        
        // הגדרת חשיפה מתאימה למניות לפי גיל וסיכון
        const recommendedEquityExposure = this.calculateRecommendedEquity(age, riskProfile);
        
        // חישוב חשיפה נוכחית למניות
        let totalEquity = 0;
        let totalValue = clientAnalysisData.portfolio.totalValue;
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            for (const pathway of account.pathways) {
                if (pathway.type.includes('מניות') || pathway.type === 'כללי') {
                    totalEquity += pathway.value;
                }
            }
        }
        
        const currentEquityPercent = (totalEquity / totalValue) * 100;
        const gap = currentEquityPercent - recommendedEquityExposure.target;
        
        if (Math.abs(gap) > 15) {
            mismatches.push({
                type: 'חשיפה למניות',
                current: currentEquityPercent.toFixed(1),
                recommended: recommendedEquityExposure.target,
                gap: gap.toFixed(1),
                severity: Math.abs(gap) > 25 ? 'גבוה' : 'בינוני',
                reason: gap > 0 ? 'חשיפה עודפת לסיכון' : 'חשיפה נמוכה מדי לצמיחה'
            });
        }
        
        clientAnalysisData.gaps.riskMismatch = mismatches;
        AnalysisStorage.save();
        return mismatches;
    },
    
    // חישוב חשיפה מומלצת למניות
    calculateRecommendedEquity: function(age, riskProfile) {
        // כלל אצבע: 100 - גיל = אחוז מניות מקסימלי
        let baseEquity = Math.max(20, Math.min(80, 100 - age));
        
        // התאמה לפי פרופיל סיכון
        if (riskProfile === 'נמוך') {
            baseEquity -= 20;
        } else if (riskProfile === 'גבוה') {
            baseEquity += 10;
        }
        
        return {
            target: Math.max(10, Math.min(90, baseEquity)),
            min: Math.max(5, baseEquity - 15),
            max: Math.min(95, baseEquity + 15)
        };
    },
    
    // בדיקת ריכוזיות
    checkConcentration: function() {
        const concentration = [];
        const providerBreakdown = clientAnalysisData.portfolio.providerBreakdown;
        const totalValue = clientAnalysisData.portfolio.totalValue;
        
        Object.entries(providerBreakdown).forEach(([provider, value]) => {
            const percentage = (value / totalValue) * 100;
            if (percentage > 50) {
                concentration.push({
                    provider,
                    value,
                    percentage: percentage.toFixed(1),
                    severity: percentage > 70 ? 'גבוה' : 'בינוני',
                    risk: 'חשיפה מוגזמת ליצרן אחד'
                });
            }
        });
        
        clientAnalysisData.gaps.concentration = concentration;
        AnalysisStorage.save();
        return concentration;
    },
    
    // ניתוח מקיף של כל הפערים
    performFullGapAnalysis: function() {
        
        this.identifyHighFees();
        this.identifyLowPerformance();
        this.checkRiskAlignment();
        this.checkConcentration();
        
        // יצירת המלצות
        this.generateRecommendations();
        
        return clientAnalysisData.gaps;
    },
    
    // יצירת המלצות
    generateRecommendations: function() {
        const recommendations = [];
        
        // המלצות לדמי ניהול
        if (clientAnalysisData.gaps.highFees.length > 0) {
            recommendations.push({
                category: 'דמי ניהול',
                priority: 'גבוהה',
                icon: '💰',
                title: 'דמי ניהול גבוהים',
                description: `זוהו ${clientAnalysisData.gaps.highFees.length} חשבונות עם דמי ניהול גבוהים מהממוצע`,
                action: 'מומלץ לנהל משא ומתן עם הספקים או לשקול מעבר לספק עם עמלות נמוכות יותר',
                potentialSaving: clientAnalysisData.gaps.highFees.reduce((sum, fee) => sum + fee.annualCost * 0.3, 0)
            });
        }
        
        // המלצות לביצועים
        if (clientAnalysisData.gaps.lowPerformance.length > 0) {
            recommendations.push({
                category: 'ביצועים',
                priority: 'גבוהה',
                icon: '📈',
                title: 'ביצועים מתחת לממוצע',
                description: `זוהו ${clientAnalysisData.gaps.lowPerformance.length} מסלולים עם ביצועים נמוכים`,
                action: 'שקול החלפת מסלולים או מעבר ליצרן עם ביצועים עקביים יותר'
            });
        }
        
        // המלצות לסיכון
        if (clientAnalysisData.gaps.riskMismatch.length > 0) {
            recommendations.push({
                category: 'סיכון',
                priority: 'בינונית',
                icon: '⚖️',
                title: 'אי-התאמה בפרופיל סיכון',
                description: `החשיפה הנוכחית אינה מתאימה לפרופיל הסיכון והגיל שלך`,
                action: 'מומלץ לאזן מחדש את התיק להתאמת רמת הסיכון'
            });
        }
        
        // המלצות לריכוזיות
        if (clientAnalysisData.gaps.concentration.length > 0) {
            recommendations.push({
                category: 'פיזור',
                priority: 'בינונית',
                icon: '🎯',
                title: 'ריכוזיות ביצרן',
                description: `חלק גדול מהתיק מרוכז אצל יצרן אחד`,
                action: 'שקול פיזור נוסף על ידי העברת חלק מהכספים ליצרן אחר'
            });
        }
        
        clientAnalysisData.gaps.recommendations = recommendations;
        AnalysisStorage.save();
    }
};

// פונקציות עזר
const AnalysisUtils = {
    // פורמט מספרים
    formatCurrency: function(value) {
        return `₪${Math.round(value).toLocaleString('he-IL')}`;
    },
    
    // פורמט אחוזים
    formatPercent: function(value, decimals = 1) {
        return `${value.toFixed(decimals)}%`;
    },
    
    // קבלת צבע לפי ביצועים
    getPerformanceColor: function(value, threshold = 0) {
        if (value > threshold + 2) return 'var(--success)';
        if (value > threshold) return '#28a745';
        if (value > threshold - 2) return 'var(--warning)';
        return 'var(--danger)';
    },
    
    // בדיקה אם יש נתונים
    hasPortfolioData: function() {
        return clientAnalysisData.portfolio.accounts.length > 0;
    },
    
    // קבלת תאריך עדכון
    getLastUpdate: function() {
        if (!clientAnalysisData.lastUpdated) return 'מעולם לא';
        const date = new Date(clientAnalysisData.lastUpdated);
        return date.toLocaleString('he-IL');
    }
};

// טעינת נתונים בעת טעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    AnalysisStorage.load();
});

// ייצוא לשימוש גלובלי
window.clientAnalysisData = clientAnalysisData;
window.AnalysisStorage = AnalysisStorage;
window.ClientProfile = ClientProfile;
window.PortfolioAnalyzer = PortfolioAnalyzer;
window.QualityAnalyzer = QualityAnalyzer;
window.GapAnalyzer = GapAnalyzer;
window.AnalysisUtils = AnalysisUtils;

