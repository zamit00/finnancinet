const fieldNames = {
  tesuam: 'תשואה ל - 12 חודשים',
  tesuam36: 'תשואה 3 שנים',
  tesuam60: 'תשואה 5 שנים',
  stiya36: 'סטיית תקן 3 שנים',
  stiya60: 'סטיית תקן 5 שנים',
  yitratNechasim: 'יתרת נכסים',
  sharp: 'מדד שארפ',
  tusaAharona: 'תשואה חודש אחרון',
  tesuaMitchilatshana: 'תשואה מתחילת שנה',
  kvutzaAhuz4751: 'שיעור חשיפה למניות',
  kvutzaAhuz4761: 'שיעור חשיפה למטבע חוץ',
  tesuaLestiya36: 'תשואה לסטייה 3 שנים',
  tesuaLestiya60: 'תשואה לסטייה 5 שנים',
    1:'ראשון', 2:'שני',3:'שלישי',4:'רביעי',5:'חמישי',6:'שישי'
    ,7:'שביעי',8:'שמיני',9:'תשיעי',10:'עשירי',
    11:'אחדעשרה', 12:'שנייםעשר'

};
const fieldsToCompare = [
    "yitratNechasim",
    "tusaAharona", "tesuaMitchilatshana",
    "tesuam", "tesuam36", "tesuam60",
    "stiya36", "stiya60", "sharp", 
    "kvutzaAhuz4751", "kvutzaAhuz4761", 
    "tesuaLestiya36", "tesuaLestiya60"
  ];
  

async function bring(data,mikom) {
  
    const mhkupa = data[0].mh;
    const muzar = data[0].mozar; 
    const shemkupa = data[0].shemkupa;
    const maslul = getMaslulType(shemkupa);
    console.log(maslul);
    
var menahelet = data[0].menahelet;
   

if (data[0]["tesuam36"] && data[0]["stiya36"] && data[0]["stiya36"] !== 0) {
  data[0]["tesuaLestiya36"] = parseFloat(data[0]["tesuam36"] / data[0]["stiya36"]).toFixed(2);
}

if (data[0]["tesuam60"] && data[0]["stiya60"] && data[0]["stiya60"] !== 0) {
  data[0]["tesuaLestiya60"] = parseFloat(data[0]["tesuam60"] / data[0]["stiya60"]).toFixed(2);
}

    const kupaInfo = document.getElementById('kupaInfo');
    kupaInfo.innerHTML = '';
    kupaInfo.innerHTML+=
    `<div class='closekupainfo' id="closeinfo" onclick='hidekupainfo(); showAllimages();showMabaatar()'
		style="margin-right:10px;display:block"><i class="fa-solid fa-rotate-left"></i>
    </div>`

    kupaInfo.innerHTML +=`<h3 style="text-align:center; color:blue;">נתונים כלליים</h3>
    <table id="tableklali" style="width:clamp(300px,90vw, 800px); margin:0 auto;
     border-collapse: collapse; font-size: 16px;">
		<tbody></tbody>
	</table>`
    const tbody = document.querySelector('#tableklali tbody');
    if(!menahelet || menahelet === 'undefined' || menahelet === 'null'){
        menahelet = matchHevra(shemkupa);
    }
    tbody.innerHTML += `
    <tr>
    <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">שם המסלול:</td>
    <td id="shemkupa" style="padding:8px; border:1px solid #ccc;font-weight:bold;
    color:orangered;font-size:16px;">${shemkupa}</td>
  </tr>
  <tr>
    <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">מספר אוצר:</td>
    <td style="padding:8px; border:1px solid #ccc;">${mhkupa}</td>
  </tr>

  <tr>
    <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">סוג מוצר:</td>
    <td style="padding:8px; border:1px solid #ccc;">${muzar}</td>
  </tr>
  <tr>
    <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">חברה מנהלת:</td>
    <td style="padding:8px; border:1px solid #ccc;">${menahelet}</td>
  </tr>
`;

kupaInfo.innerHTML +=`<h3 style="text-align:center; color:blue;margin:10px auto">אופי השקעה</h3>
<table id="tableOfi" style="width:clamp(300px,90vw, 800px); margin:0 auto;
     border-collapse: collapse; font-size: 16px;">
		<tbody></tbody>
	</table>`
const tbodyOfi = document.querySelector('#tableOfi tbody');
const mas = await maslultype(maslul);
tbodyOfi.innerHTML += `
    <tr>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">אפיק השקעה:</td>
        <td style="padding:8px; border:1px solid #ccc;">${maslul}</td>
    </tr>
    <tr>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;">אופי מסלול השקעה:</td>
        <td style="padding:8px; border:1px solid #ccc;">${mas[0]}</td>
    </tr>
  `
kupaInfo.innerHTML +=`<h3 style="text-align:center; color:blue;margin:10px auto">נתוני נכסים, תשואה וסיכון</h3>
<h3>המסלול מדורג במקום ה - <span style="color:orangered;"> ${mikom} </span> בתשואה ל - 12 חודשים אחרונים</h3>
<table id="tableTesuot" style="width:clamp(300px,90vw, 800px); margin:0 auto;
     border-collapse: collapse; font-size: 16px;">
		<tbody></tbody>
	</table>`
const tableTesuot = document.querySelector('#tableTesuot tbody');
const analysisScore= analyzeMaslulAgainstAverage(data[0]);
tableTesuot.innerHTML += `
    <tr>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;text-align:center">נושא</td>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;text-align:center">נתון במסלול</td>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;text-align:center"> ממוצע ענף</td>
        <td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;text-align:center">ביחס לממוצע</td>
    </tr>
  `
 
  // Check if analysisScore is valid
  if (analysisScore && analysisScore.fields && Array.isArray(analysisScore.fields)) {
    for (const field of fieldsToCompare) {
      const fieldData = analysisScore.fields.find(f => f.field === field);
      if (!fieldData) continue;
      
      const val = fieldData.value || 0;
      const avg = fieldData.average || 0; 
      const result = fieldData.result || "";

    if (isNaN(val) || isNaN(avg)) continue;

      tableTesuot.innerHTML += `
      <tr>
          <td style="padding:8px; border:1px solid #ccc;text-align:right">${fieldNames[field] || field}</td>
          <td style="padding:8px; border:1px solid #ccc;text-align:center">
          ${val.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:8px; border:1px solid #ccc;text-align:center">
          ${avg.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:8px; border:1px solid #ccc;text-align:center">${result}</td>
      </tr>
      `
    }
  } else {
    // If no analysis data, show message
    tableTesuot.innerHTML += `
    <tr>
        <td colspan="4" style="padding:15px; text-align:center; color:#666;">
        לא נמצאו נתוני השוואה לממוצע ענף
        </td>
    </tr>
    `
  }
  kupaInfo.innerHTML+=`<canvas id="myChartkupa" style="width:100%;max-width:1000px;max-height: 200px;"></canvas>
  	<canvas id="myChart"  style="width:100%;max-width: 1000px;
 		 max-height: 200px;margin:30px auto;"></canvas>
  	<h3 id="nehasimkot" class="nehasimkot" style="text-align:center; color:blue;margin:10px auto"></h3>
  	<div id="tblnehasim" class="tblnehasim">
    <table id="nehasim" style="width:clamp(300px,90vw, 800px); margin:15px auto;
     border-collapse: collapse; font-size: 16px;"></table>
		<canvas id="pieChartkupa" 
			style="width:clamp(250px,80vw,300px);
	  	 	max-height: 400px;">
		 </canvas> 
	</div>`
   // document.getElementById('pdf').style.display='block';
    document.getElementById('kupaInfo').style.display='block';
    document.getElementById('kupaInfo').style.margin='0 auto';
    
    // Open modal with kupa info
    if (typeof openKupaInfoModal === 'function') {
        openKupaInfoModal(shemkupa);
    }

    /*const tospeak=`המסלול ${shemkupa} של ${menahelet} מדורג במקום ה${fieldNames[mikom]} 
    בתשואה ל - 12 חודשים אחרונים עם תשואה של ${data[0].tesuam} אחוזים.
    תשואת המסלול לתקופה של 3 שנים עומדת על ${data[0].tesuam36} אחוזים.
     ותשואת המסלול לתקופה של 5 שנים עומדת על ${data[0].tesuam60} אחוזים.
   בנתוני השנה הנוכחית: 
    תשואת המסלול מתחילת השנה עומדת על ${data[0].tesuaMitchilatshana} 
    אחוזים. תשואת המסלול לחודש האחרון עומדת על ${data[0].tusaAharona} אחוזים.`
   speakClick();speakLater(tospeak);*/
    var yValues = [];
    var xValues = [];
    var yValuesM = [];
    var miztaberet=1;var numpush;
    var numString; var year;var month;var formattedDate;
    for (let r = 1; r <= 12; r ++) {
        const kvutza=`tesua${r}`
        let parts = data[0][kvutza].split("=");
        yValues.push(Number(parts[0]));
        miztaberet=miztaberet*(1+Number(parts[0]/100));
        numpush=Number(((miztaberet-1).toFixed(4)*100).toFixed(2));
        yValuesM.push(numpush);
        numString = parts[1].toString();
        year = numString.substring(0, 4);
        month = numString.substring(4, 6);
        formattedDate = month + '/' + year;
        xValues.push(formattedDate);
    }
    
    var barColors = yValues.map(function (value) {
        return value >= 0 ? "green" : "red"; // Green for positive values, red for negative values
    });
var existingChart = Chart.getChart("myChartkupa"); // מחפש אם יש גרף קיים
if (existingChart) {
    existingChart.destroy(); // הורס את הגרף הקודם
}
    new Chart("myChartkupa", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "תשואות 12 חודשים אחרונים"
                    ,font: {
                size: 20,  
                family: 'Arial',  // Optional: set the font family
                weight: 'bold'  // Optional: set the font weight
            },
            color: 'blue'  // Set the text color
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: Math.min(0, Math.min(...yValues))
                },
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    // גרף תשואה חודשית מצטברת
    existingChart = Chart.getChart("myChart"); // מחפש אם יש גרף קיים
        if (existingChart) {
                    existingChart.destroy(); // הורס את הגרף הקודם
        }
     
     existingChart = Chart.getChart("myChart"); // מחפש אם יש גרף קיים
        if (existingChart) {
            existingChart.destroy(); // הורס את הגרף הקודם
        }    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart("myChart", {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                data: yValuesM,
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'green',
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'תשואה חודשית מצטברת 12 חודשים',
                    color: 'blue',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'חודש'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'תשואה (%)'
                    }
                }
            }
        }
    });

    
    
    
    var nehasim=[];
    for (let i = 4701; i <= 4710; i++) {
      const keySchum = `kvutzaSchum${i}`;
      const keyAhuz = `kvutzaAhuz${i}`;
      const keySug = `kvutzaSug${i}`;
    if (data[0][keySchum]>0) {
        nehasim.push(data[0][keySug]);
        nehasim.push(data[0][keySchum]);
        nehasim.push(data[0][keyAhuz]);
    }
}
       pie(nehasim);    
}
// פונקציות tesua ו-maslultype ללא שינוי

async function maslultype(y) {
  
    try {
        const response = await fetch('ofihashkaa.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const rows = xmlDoc.getElementsByTagName("Row");
        var databack=[];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const mhkupa = row.getElementsByTagName("ID")[0]?.textContent || '';
            const shemkupa = row.getElementsByTagName("SHM_KUPA")[0]?.textContent || '';
            const sikon = row.getElementsByTagName("SIKON")[0]?.textContent || '';
            if (mhkupa === y) {
                databack.push(shemkupa);
                databack.push(sikon)
                return databack;
            }
        }
        return [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
   

let pieChartInstance; 

function pie(nehasim) {

    const tbl = document.getElementById('nehasim');   
    document.getElementById('nehasimkot').innerText = 'חלוקת נכסים לקבוצות ראשיות:';  
    tbl.innerHTML = ""; // איפוס הטבלה לפני הוספת נתונים חדשים
    

    var shemhaneches = [], ahuzhaneches = [];
    for (let i = 0; i < nehasim.length; i += 3) {
        
       tbl.innerHTML +=`<td style="background:aliceblue;color:#333;padding:8px; border:1px solid #ccc;text-align:right">
       ${nehasim[i]}</td>
       <td style="padding:8px; border:1px solid #ccc;text-align:center">
       ${Number(nehasim[i + 2]).toFixed(2)}%</td>`

        shemhaneches.push(nehasim[i]);
        ahuzhaneches.push(Number(nehasim[i + 2]));
       
    }
    
    var existingChart = Chart.getChart("pieChartkupa"); // מחפש אם יש גרף קיים
    if (existingChart) {
        existingChart.destroy(); // הורס את הגרף הקודם
    }  
    const ctx = document.getElementById("pieChartkupa");
    
    // אם קיים גרף קודם - הורסים אותו
    
    // יצירת גרף חדש
    pieChartInstance = new Chart("pieChartkupa", {
        type: "pie",
        data: {
            labels: shemhaneches,
            datasets: [{
                data: ahuzhaneches,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
                    "#9966FF", "#FF9F40", "#C9CBCF", "#8B0000", "#FFD700"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "פיזור נכסים",
                    font: {
                        size: 25,
                        family: "Arial",
                        weight: "bold",
                       
                    },
                    color: "blue"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    align: "end"
                }
            }
        }
    });
}


/*    function exportToPDF() {
        document.getElementById('closeinfo').style.display='none';
        const element = document.getElementById('kupaInfo');
        const originalDisplay = element.style.display;
    
        element.style.display = 'block';
        window.print();
        element.style.display = originalDisplay;
        document.getElementById('closeinfo').style.display='block';
}*/
function exportToPDF() {
    const element = document.getElementById('kupaInfo');
    const kupa = document.getElementById('shemkupa');
    const opt = {
        margin:       0.5,
        filename:     `${kupa.innerText}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
    
function analyzeMaslulAgainstAverage(maslulData) {
  const analysis = {
    mozar: maslulData.mozar || '',
    maslul: maslulData.mas || '',
    totalAboveAvg: 0,
    totalFields: 0,
    fields: []
  };

  // Check if dataIndicators exists
  if (typeof dataIndicators === 'undefined' || !Array.isArray(dataIndicators)) {
    console.warn('dataIndicators not found or not an array');
    return analysis;
  }

  // Use getMaslulType to identify the track type from the full track name
  const maslulType = typeof getMaslulType === 'function' 
    ? getMaslulType(maslulData.shemkupa) 
    : maslulData.mas;
  
  console.log('Track name:', maslulData.shemkupa, '→ Track type:', maslulType);

  var averageData = dataIndicators.find(item =>
    item.maslul === maslulType && item.mozar === maslulData.mozar);
  if (!averageData) {
    console.warn('No average data found for:', maslulType, maslulData.mozar);
    console.log('Available tracks in dataIndicators:', dataIndicators.map(i => ({maslul: i.maslul, mozar: i.mozar})));
    return analysis;
  }
  if (averageData["tesuam36"] && averageData["stiya36"] && averageData["stiya36"] !== 0) {
  averageData["tesuaLestiya36"] = parseFloat(averageData["tesuam36"] / averageData["stiya36"]).toFixed(2);
}

if (averageData["tesuam60"] && averageData["stiya60"] && averageData["stiya60"] !== 0) {
  averageData["tesuaLestiya60"] = parseFloat(averageData["tesuam60"] / averageData["stiya60"]).toFixed(2);
}
  
  for (const field of fieldsToCompare) {
    const val = parseFloat(maslulData[field]);
    const avg = parseFloat(averageData[field]);

    if (isNaN(val) || isNaN(avg)) {
        analysis.fields.push({
      field,
      value: "",
      average: '',
      result: 'לא נותח'
    });
        continue;}

    const betterIfHigher = ["tesuam", "tesuam36", "tesuam60", "sharp", "tusaAharona",
         "tesuaMitchilatshana", "kvutzaAhuz4751", "kvutzaAhuz4761","tesuaLestiya36", "tesuaLestiya60",
         "yitratNechasim"];
    const betterIfLower = ["stiya36", "stiya60"];

    let comparison = '';

    if (betterIfHigher.includes(field)) {
      if (val > avg) {
        comparison = 'מעל הממוצע';
        analysis.totalAboveAvg++;
      } else if (val < avg) {
        comparison = 'מתחת לממוצע';
      } else {
        comparison = 'שווה לממוצע';
      }
    } else if (betterIfLower.includes(field)) {
      if (val < avg) {
        comparison = 'מעל הממוצע (סטייה נמוכה)';
        analysis.totalAboveAvg++;
      } else if (val > avg) {
        comparison = 'מתחת לממוצע (סטייה גבוהה)';
      } else {
        comparison = 'שווה לממוצע';
      }
    } else {
      comparison = 'לא נותח';
    }

    analysis.fields.push({
      field,
      value: val,
      average: avg,
      result: comparison
    });


    analysis.totalFields++;
  }

  analysis.score = ((analysis.totalAboveAvg / analysis.totalFields) * 100).toFixed(1) + '% ביצועים מעל הממוצע';

  return analysis;
}


