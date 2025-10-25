var datanetunimKlaliXM;var datanetunimKlaliXB;var datanetunimKlaliXP;
var clickStatus;var dataIndicators = [];var dataIndicatorsSikon = [];
var tkofa;let sikonData = [];
const gufmosdixA = [
    'הראל פנסיה וגמל', 'כלל פנסיה וגמל',
    'מגדל מקפת קרנות פנסיה וקופות גמל', 'מנורה מבטחים פנסיה וגמל',
    'הפניקס פנסיה וגמל', 'אלטשולר שחם גמל ופנסיה',
    'אנליסט קופות גמל', 'ילין לפידות ניהול קופות גמל', 'מור גמל ופנסיה',
    'מיטב גמל ופנסיה', 'אינפיניטי השתלמות, גמל ופנסיה '
];
const mozAll = [
  'קרנות השתלמות', 'תגמולים ואישית לפיצויים', 'קופת גמל להשקעה',
  "קופת גמל להשקעה - חסכון לילד", "פוליסות חסכון","קרנות חדשות","מרכזית לפיצויים"
];

const fieldsToAverage = [
  "tesuam", "tesuam36", "tesuam60",
    "stiya36", "stiya60", "yitratNechasim",
    "sharp", "tusaAharona", "tesuaMitchilatshana",
    "kvutzaAhuz4751", "kvutzaAhuz4761","dmeyNihul","dmeyNihulHafkad"     
];
const fieldsToAverageSikon = [
    "stiya36", "stiya60"     
];

const pHishSmall=`קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה . בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים 
למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.`
const pHishBig=`קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. מטרת הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה . בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.
שיעורי הפקדה מקובל לעמית שכיר הינם 7.5% מהשכר על חשבון המעסיק  ו -2.5% מהשכר על חשבון העובד. מעסיקים  נוהגים להגביל את ההפקדה עד לתקרת השכר שבגינו העובד אינו
מחויב במס על חלק המעסיק.`
const pYeled=`קופת גמל להשקעה חסכון לכל ילד היא מכשיר פנסיוני ופיננסי שמנוהל על ידי המוסד לביטוח לאומי בשיתוף עם רשות שוק ההון.  המוצר פותח במטרה להבטיח עתיד כלכלי יציב עבור ילדיכם. התוכנית נפתחת על שם הילד, כאשר ההפקדות מבוצעות מידי חודש על חשבון הביטוח הלאומי, כ – 57 ₪ לחודש. ההורה מקבל הקצבה יכול לבקש להפקיד 57 ₪ נוספים על חשבון קצבת הילדים. דמי הניהול משולמים על ידי ביטוח לאומי עד גיל 21. `
const pPolisaSmall=`פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון.  פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.`
const pPolisaBig=`פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון.  פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.
המוצר פתוח להצטרפות לכל אחד בין אם הוא שכיר, עצמאי או שאינו עובד בכלל, בין אם הוא ילד או מבוגר. המוצר מהווה אלטרנטיבה לפתיחת חסכון עבור ילדים.
`
const pHashBig=`קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון בחברות הביטוח ולפיקדונות והחסכונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. ניתן לחסוך ולהשקיע בצורה גמישה, והוא מהווה פתרון לחיסכון עבור הטווח הקצר והן עבור הטווח הארוך. הכספים בקופה ניתנים למשיכה בכל עת כסכום חד פעמי או בתשלומים והכל בהתאם לצרכי העמית. הפקדות בקופה אינן מקנות הטבת מס מסוג ניכוי או זיכוי. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. תקרה זו מתעדכנת אחת לשנה בדרך כלל בהתאם לעליית המדד.`
const pHashSmall=`קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון ולפיקדונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. המוצר מהווה פתרון לחיסכון לטווח הקצר ולטווח ארוך. הכספים ניתנים למשיכה בכל עת. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. התקרה מתעדכנת אחת לשנה בצמוד לעליית המדד.`


const pPensiaBig=`קרן פנסיה היא תוכנית לביטוח פנסיוני המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה בהגיעו לגיל  פרישה וכן מספקת מענה למקרים ביטוחיים במצב של נכות ובמקרה של מוות.  תשלומים לקרן מבוצעים בתדירות חודשית כאשר תשלומים של שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו.  חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים, כאשר קיימת חובת מינימום הפקדה כשיעורים משכר העובד לרכיבי התגמולים והפיצויים.`
const pPensiaSmall=`קרן פנסיה היא תוכנית המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה וכן מספקת מענה למקרים ביטוחיים של נכות ומוות.  תשלומים לקרן מבוצעים בתדירות חודשית. תשלומי שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו.  חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים. קיימת חובת מינימום הפקדה כשיעורים משכר העובד.`

const pGemelBig=`קופת גמל היא שם כולל לקבוצת אפיקי חסכון פנסיוניים לטווח בינוני או ארוך.  קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה  או בדרך של היוון קצבה. קופת הגמל במקור הינה תכנית לחסכון בלבד ללא מרכיב ביטוחי.  כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`
const pGemelSmall=`קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה  או בדרך של היוון קצבה. כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`

const gufmosdiA = gufmosdixA.sort((a, b) => a.localeCompare(b, 'he'));

// Function to load all data (can be called from other pages)
async function loadalldata() {
  try {
        
        await Promise.all([
            fetchdataJasonB(),
            fetchdataJasonP(),
             fetchdataJasonM(),
        ]);
        
        await indications();
        await fetchInvestmentData();
        
        const tkofaItem = datanetunimKlaliXM.filter(item=>item.mh==='579')[0].tesua12
        ;
        if (tkofaItem) {
           tkofa = tkofaItem.split('=')[1].slice(4,6) +"/"+tkofaItem.split('=')[1].slice(0,4)
        } else {
           //console.error('לא נמצא פריט עם mh=579');
        }
  } catch (error) {
        console.error("❌ שגיאה בטעינת הנתונים:", error);
  }
}

window.onload = async function() {
  await loadalldata();
}

async function fetchInvestmentData() {
  const response = await fetch("ofihashkaa.xml");
  const text = await response.text();

  // ממיר את ה־XML למסמך קריא
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  // אוסף את כל הרשומות
  const rows = xml.getElementsByTagName("Row");
  

  for (let row of rows) {
    const name = row.getElementsByTagName("ID")[0]?.textContent.trim();
    
    // חיפוש SIKON - קודם בתוך Row, אחר כך אחרי Row
    let risk = row.getElementsByTagName("SIKON")[0]?.textContent.trim();
    
    // אם לא נמצא בתוך Row, חפש את האלמנט הבא אחרי Row
    if (!risk && row.nextElementSibling) {
      if (row.nextElementSibling.tagName === "SIKON") {
        risk = row.nextElementSibling.textContent.trim();
      }
    }
    
    if (name && risk) {
      sikonData.push({ name, risk });
    } else if (name) {
      console.warn(`⚠️ חסר SIKON עבור: ${name}`);
    }
  }

  return sikonData;
}

// קריאה לפונקציה



async function fetchdataJasonM() {
    try {
        const response = await fetch('dataJasonM.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXM = data;
	    datanetunimKlaliXM= datanetunimKlaliXM.filter(item=>!item.menahelet.includes('סלייס'));    

        //let tkofa = document.getElementById('tkufatdivuach');
        //var tkf = data.filter(item => item.mh === '579');
        //tkf=tkf[0].tesua12;
        //tkf = tkf.split("=")[1].substring(4, 6) + "/" + tkf.split("=")[1].substring(0, 4);
        //tkofa.innerText = 'הנתונים נכונים ל ' + tkf;

        return data;  // חובה להחזיר נתונים כדי שהפונקציה תחכה באמת
    } catch (error) {
        console.error('שגיאה בשליפת הנתונים:', error);
        throw error;  // נזרוק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
    
}
async function fetchdataJasonB() {
    try {
        const response = await fetch('dataJasonB.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXB = data; 
        return data;  // החזרת הנתונים כדי ש-`await` יעבוד נכון
    } catch (error) {
        console.error('❌ שגיאה בשליפת dataJasonB.json:', error);
        throw error;  // זורק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
}
async function fetchdataJasonP() {
    try {
        const response = await fetch('dataJasonP.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXP = data; 
        return data;  // מחזיר את הנתונים כדי שהפונקציה תהיה באמת אסינכרונית
    } catch (error) {
        console.error('❌ שגיאה בשליפת dataJasonP.json:', error);
        throw error;  // זורק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
}
async function indications(){ 
  for(let r=0;r<=5;r++){
    const sugmuzar=mozAll[r] 
  var typamas;
  if(r===0 || r===2 || r===4){typamas=hishtalmot}
  else if(r===1){typamas=gemel}
  else if(r===3){typamas=layeled}
  else if(r===5){typamas=pensia}  // קרנות פנסיה
  
  
  for (let i = 0; i < typamas.length; i++) {
    const dataY = await filterMaslul(typamas[i], sugmuzar, 0);
    if (dataY.length === 0) continue;
  
    const result = {
      mozar: sugmuzar,
      maslul: typamas[i]
    };
    
    for (const field of fieldsToAverage) {
      const validItems = dataY.filter(obj =>
        obj[field] !== undefined &&
        obj[field] !== null &&
        obj[field] !== '' &&
        !isNaN(obj[field]) &&
        parseFloat(obj[field]) !== 0  // לא לספור אפסים - מי שאין לו נתון לא משתתף בממוצע
      );
      const total = validItems.reduce((sum, obj) => sum + parseFloat(obj[field]), 0);
      const avg = validItems.length > 0 ? total / validItems.length : 0;
      result[field] = avg.toFixed(2); 
    }
      
    // חישוב דמי ניהול משוקלל
    if(result['dmeyNihulHafkad'] && result['dmeyNihul']){
        result['dmeyNihulMeshuklal'] = (Number(result['dmeyNihulHafkad'])/10 + Number(result['dmeyNihul'])).toFixed(2);
    }
    
    // חישוב יחסי תשואה לסטייה
    if (result["tesuam36"] && result["stiya36"]) {
    result["tesuaLestiya36"] = parseFloat(result["tesuam36"] / result["stiya36"]).toFixed(2);
  }
  
  if (result["tesuam60"] && result["stiya60"]) {
    result["tesuaLestiya60"] = parseFloat(result["tesuam60"] / result["stiya60"]).toFixed(2);
    }
    
    // בדיקה שלא קיים כבר שילוב של mozar+maslul זהה
    const isDuplicate = dataIndicators.some(item => 
        item.mozar === result.mozar && item.maslul === result.maslul
    );
    
    if (!isDuplicate) {
        dataIndicators.push(result);
    }

    
    
    
  } 
  
  // חישוב ממוצע סטיות ברמת מוצר (ממוצע הממוצעים)
  const resultSikon = {
    mozar: sugmuzar
  };
  
  // סינון כל המסלולים של המוצר הנוכחי מ-dataIndicators
  const productPathways = dataIndicators.filter(item => item.mozar === sugmuzar);
  
  // חישוב ממוצע של הסטיות מכל המסלולים
  
    const validItemsStiya36 = productPathways.filter(item => 
      item["stiya36"] !== undefined &&
      item["stiya36"] !== null &&
      item["stiya36"] !== '' &&
      !isNaN(item["stiya36"]) &&
      parseFloat(item["stiya36"]) !== 0
    );
    
    const total36 = validItemsStiya36.reduce((sum, item) => sum + parseFloat(item["stiya36"]), 0);
    const avg36 = validItemsStiya36.length > 0 ? total36 / validItemsStiya36.length : 0;
    let stiya36Avg = avg36.toFixed(2);
    let stiya36Min = Math.min(...validItemsStiya36.map(item=>Number(item['stiya36']))).toFixed(2);
    let stiya36Max = Math.max(...validItemsStiya36.map(item=>Number(item['stiya36']))).toFixed(2);
     
    const validItemsStiya60 = productPathways.filter(item => 
      item["stiya60"] !== undefined &&
      item["stiya60"] !== null &&
      item["stiya60"] !== '' &&
      !isNaN(item["stiya60"]) &&
      parseFloat(item["stiya60"]) !== 0
    );
    
    const total60 = validItemsStiya60.reduce((sum, item) => sum + parseFloat(item["stiya60"]), 0);
    const avg60 = validItemsStiya60.length > 0 ? total60 / validItemsStiya60.length : 0;
    let stiya60Avg = avg60.toFixed(2);
    let stiya60Min = Math.min(...validItemsStiya60.map(item=>Number(item['stiya60']))).toFixed(2);
    let stiya60Max = Math.max(...validItemsStiya36.map(item=>Number(item['stiya60']))).toFixed(2);
  
    const lowCombined=Number(stiya36Min*0.6)+Number(stiya60Min)*0.4;
    const highCombined=Number(stiya36Max*0.6)+Number(stiya60Max)*0.4;
    const avgCombined=Number(stiya36Avg*0.6)+Number(stiya60Avg)*0.4;
    resultSikon["stiyaCombinedMin"]=(Number(lowCombined)+Number((avgCombined-lowCombined)*0.66)).toFixed(2);
    resultSikon["stiyaCombinedMax"]=(Number(highCombined)-Number((highCombined-avgCombined)*0.66)).toFixed(2);
    resultSikon["lowCombined"]=lowCombined.toFixed(2);
    resultSikon["highCombined"]=highCombined.toFixed(2);
    resultSikon["avgCombined"]=avgCombined.toFixed(2);

    // בדיקה שלא קיים כבר מוצר זהה
    const isSikonDuplicate = dataIndicatorsSikon.some(item => item.mozar === resultSikon.mozar);
    
    if (!isSikonDuplicate) {
        dataIndicatorsSikon.push(resultSikon);
    }
    
    }
    
  }
  

