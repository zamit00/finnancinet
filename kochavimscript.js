
const excludedOchlosiya = ['עובדי סקטור מסויים', 'עובדי מפעל/גוף מסויים'];
const mozkoch = [
  'קרנות השתלמות', 'תגמולים ואישית לפיצויים', 'קופת גמל להשקעה',
  "קופת גמל להשקעה - חסכון לילד", "פוליסות חסכון"
];


const hishtalmot=[
  "כללי",
  "עוקב מדד s&p 500",
  "מניות",
  "אשראי ואג\"ח",
  "אשראי ואג\"ח עם מניות",
  "כספי (שקלי)",
  "עוקב מדדים - גמיש",
  "אג\"ח ממשלות",
  "הלכה יהודית",
  "משולב סחיר",
  "עוקב מדדי אג\"ח",
  "עוקב מדדי מניות",
  "אג\"ח סחיר",
  "מניות סחיר","עוקב מדדי אג\"ח עם מניות","אג\"ח סחיר עם מניות",
  "אג\"ח ממשלתי סחיר"];

const gemel=[
  "מניות",
  "עוקב מדד s&p 500",
  "עד 50", 
  "50-60",
  "60 ומעלה",
  "אשראי ואג\"ח",
  "כספי (שקלי)",
  "משולב סחיר",
  "עוקב מדדים - גמיש",
  "אג\"ח ממשלות",
  "הלכה יהודית",
  "מניות סחיר",
  "עוקב מדדי אג\"ח",
  "עוקב מדדי מניות",
  "אג\"ח סחיר",
  "עוקב מדדי אג\"ח עם מניות",
  "אג\"ח סחיר עם מניות",
  "אג\"ח ממשלתי סחיר"
  ];
const layeled=['סיכון מועט','סיכון בינוני','סיכון מוגבר','הלכה יהודית']

const bituach=['הראל פנסיה וגמל','כלל פנסיה וגמל',
  'מגדל מקפת קרנות פנסיה וקופות גמל','מנורה מבטחים פנסיה וגמל',
  'הפניקס פנסיה וגמל',"מניות סחיר","עוקב מדדי אג\"ח עם מניות","אג\"ח סחיר עם מניות"
]
const bateyhashkaot=['אינפיניטי השתלמות, גמל ופנסיה','אלטשולר שחם גמל ופנסיה',
  'אנליסט קופות גמל','ילין לפידות ניהול קופות גמל','מור גמל ופנסיה'
  ,'מיטב גמל ופנסיה','סלייס גמל'
]

async function maslulim(t,moz,hevra){ 
  if(t===2){
    const tkufatEl = document.getElementById("tkufatdivuach");
    if (tkufatEl) tkufatEl.scrollIntoView({ behavior: "smooth" });
    t=1;
  }
  
  // Hide elements only if they exist
  const closeinfo = document.getElementById("closeinfo");
  if (closeinfo) closeinfo.style.display='none';
  
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
  
  const menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) menuBtn.classList.remove("open");
  
  if (t===1){
    const filter = document.getElementById('filter');
    if (filter) filter.style.display='none';  
  }
  
  const allTheTables=document.getElementById('allTheTables');
  if (!allTheTables) {
    console.error('allTheTables element not found');
    return;
  }
  allTheTables.innerHTML='';
  allTheTables.style.display='flex';
  
  const kothasifot = document.getElementById('kothasifot');
  if (kothasifot) kothasifot.style.display='none';
  var z = 0;var dataY;
  for(let r=0;r<=4;r++){
    if(z!==0 && Number(z) % 3 !==0){
      z++;
    }
    const sugmuzar=mozkoch[r]
  if(sugmuzar==='תגמולים ואישית לפיצויים'){
   mozA='קופות גמל' 
    }
    else if(sugmuzar===
  "קופת גמל להשקעה - חסכון לילד"){
   mozA='קופת חסכון לילד'}
    else{mozA=sugmuzar}  
    if(moz!==0 && sugmuzar!==moz){continue}
    const msll=`<h2 id="h2Hish" name="h2Hish" style="font-size:1rem;
    line-height:1.8rem;vertical-align:middle; margin-top:15px;text-align:right;
    padding-right:5px;">${mozA} <a onclick=" maslulim(30,'${sugmuzar}',0);"
    class="txta" id="spanHish" name="spanHish">כל המסלולים</a></h2>`
    allTheTables.innerHTML+=msll;
    const mesanen=document.getElementById('sanenMosdy')
    const sinonHevra=document.getElementById('sinonHevra')
    var hadashim=document.getElementById('hadashim');
    //sinonHevra.selectedIndex = 0
    if (mesanen) mesanen.style.display='none'
    if (t===30){
      const h2Elements = document.querySelectorAll('[name="h2Hish"]');
      const aElements = document.querySelectorAll('[name="spanHish"]');
       if(sugmuzar!=="פוליסות חסכון" && mesanen){mesanen.style.display='flex'}
    // עבור על כל ה-h2
    for (let i = 0; i < h2Elements.length; i++) {
        const a = aElements[i];
        // שנה את ה- onclick ב-a
        a.setAttribute('onclick', 'maslulim(1,0,0); if(typeof backtop === \"function\") backtop(); if(typeof showMabaatar === \"function\") showMabaatar(); if(typeof hideMabaatarSpecific === \"function\") hideMabaatarSpecific();');
        // שנה את הטקסט של ה-a
        
    }
    } 
    var typamas;
        if(r===0 || r===2 || r===4){typamas=hishtalmot}
        else if(r===1){typamas=gemel} 
        else if(r===3){typamas=layeled}
    for (let i = 0; i < typamas.length; i++) {  
      if (i>t && i>2){continue;}
         dataY = await filterMaslul(typamas[i], sugmuzar,hevra);
         if (hadashim && hadashim.checked===false){
          dataY.sort((a, b) => b.tesuam - a.tesuam);}
          else if (hadashim){dataY.sort((a, b) => b.tusaAharona - a.tusaAharona);}
          else{dataY.sort((a, b) => b.tesuam - a.tesuam);}
        if(dataY.length===0){continue}
         addtble(z,typamas[i])
            const table = document.getElementById(`klalikoch${z}`);
            if (!table){continue;}
            table.innerHTML='';
            table.innerHTML=`<tr style="font-weight: bold;background-color: var(--main-color);color: white;
            border:none;">						
						<td style="text-align:center;" >מה</td>
            <td>שם המסלול</td>
						<td style="text-align:center;" >חודש</td>
						<td style="text-align:center;" onclick='sortTable(this)'>שנה<i class="fa fa-sort"></i></td>
						<td style="text-align:center;" onclick='sortTable(this)'>3 שנים<i class="fa fa-sort"></i></td>
						<td style="text-align:center;" onclick='sortTable(this)'>5 שנים<i class="fa fa-sort"></i></td>
					</tr>`
          if (!dataY || !Array.isArray(dataY)) {
            console.error(`Data is not valid for typamas: ${typamas}, sugmuzar: ${sugmuzar}`);
            return; 
        }
            for (let tb = 0; tb < dataY.length; tb++) {
                //if (dataY[tb].tesuam) {
                    const trm = document.createElement('tr');
                    // יצירת תא ראשון
                    let td = document.createElement('td');
                    td.style.color = '#333';
		    td.style.textAlign='center';
                    td.className="tdmh";
                    td.style.boxSizing="border-box";
                    td.textContent = dataY[tb].mh;
                    trm.appendChild(td);
                    // יצירת תא שני עם קישור
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdbig";
                    td.style.boxSizing="border-box";
                    td.style.textAlign = "right";
                    td.style.boxSizing="border-box";
                    td.style.paddingRight = "5px";
                    let link = document.createElement('a');
                    link.href = '#';
                    link.className="linktdbig";
                  
                    link.textContent = dataY[tb].shemkupa;
              td.appendChild(link);
              trm.appendChild(td);
                
                    td = document.createElement('td');
                    
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="center";
                    td.textContent = dataY[tb].tusaAharona.toFixed(2) + "%";
                    trm.appendChild(td);
                    // יצירת תאים נוספים
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="center"
                    td.textContent = dataY[tb].tesuam.toFixed(2) + "%";
                    trm.appendChild(td);
                    td = document.createElement('td');
                    
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="center"
                    if (dataY[tb].tesuam36) { td.textContent = dataY[tb].tesuam36.toFixed(2) + "%"; }
                    trm.appendChild(td);
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="center"
                    if (dataY[tb].tesuam60) { td.textContent = dataY[tb].tesuam60.toFixed(2) + "%"; }
                    trm.appendChild(td);
                    table.appendChild(trm);
                //}
            }
            z++;           
    }
  } 

    addclick(); tablerek()
    // Don't auto-load pension data when showing all routes (t=30)
    // if(t!==30 && typeof maslulimP === 'function'){await maslulimP(1,0,0)};
    document.querySelectorAll('[class^="klalikoch"] td').forEach(td => {
      let text = td.textContent.trim();
      if (text.startsWith("-")) {
          td.innerHTML = `<span style="direction: ltr; display: inline-block;">${text}</span>`;
          td.style.color="red";
      }
      //window.scrollTo({ top: 0, behavior: "smooth" }); 
      if(t===30){
        const mabaatarEl = document.getElementById("mabaatarSpecific");
        if (mabaatarEl) mabaatarEl.scrollIntoView({ behavior: "smooth" });
      }   
  });
};
function addtble(x,mas){
	

  if(mas.includes('עם מניות')){mas+=` (עד 25% מניות)` }; 
  const allTheTables=document.getElementById('allTheTables');
  const htmlt=`<div class="tblMuzarim" id="tblMuzarim${x}">`
	const tbladd=
  `<div class="tbl">
		    <h4 style='color:var(--main-color);'>${mas}</h4>	
		    <div class="divTblNetunim">
			      <table class="klalikoch" id="klalikoch${x}"> 
			      </table>	
	      </div>
  </div>`
  const sgira=`</div>`
  if (Number(x)===0 || Number(x) % 3 ===0){
      allTheTables.innerHTML+=htmlt;
      document.getElementById(`tblMuzarim${x}`).innerHTML+=tbladd;
     // allTheTables.innerHTML+=tbladd;
  }
  else{
    if( Number(x-1) % 3 ===0){document.getElementById(`tblMuzarim${x-1}`).innerHTML+=tbladd;}
	else{document.getElementById(`tblMuzarim${x-2}`).innerHTML+=tbladd;}  
  }
}
function addclick(){
  const elements = document.querySelectorAll(".linktdbig"); 
  elements.forEach((element) => {
    const aTag = element.outerHTML.match(/<a [^>]+>/)[0];
    const updatedATag = aTag.replace(/<a /, `<a onclick="bringinfo(this)" `);
    element.outerHTML = updatedATag + element.innerHTML + "</a>";
  });
  }
  function tablerek(){
    const elements = document.querySelectorAll("[id^='klalikoch']"); 
    elements.forEach((element) => {
      let rowCount=0;
      const parent = element.parentNode.parentNode;
      const h4 = parent.querySelector("h4"); 
       rowCount = element.rows.length - 1; 
      if(rowCount < 1) {
        h4.style.display = "none";
        element.style.display = "none";
      }
    });
    }
async function bringinfo(x) {
  
const hadashimEl = document.getElementById('hadashim');
if(hadashimEl && hadashimEl.checked){return;}

// Call functions only if they exist
if(typeof hidefooter === 'function') hidefooter();
if(typeof hideAllimages === 'function') hideAllimages();
if(typeof hideMaBaatar === 'function') hideMaBaatar();
if(typeof hideMabaatarSpecific === 'function') hideMabaatarSpecific();

const sanenEl = document.getElementById('sanenMosdy');
if (sanenEl) sanenEl.style.display='none';

const closeinfoEl = document.getElementById("closeinfo");
if (closeinfoEl) closeinfoEl.style.display='block';

const allTablesEl = document.getElementById('allTheTables');
if (allTablesEl) allTablesEl.style.display='none';

const kupaInfoEl = document.getElementById('kupaInfo');
if (kupaInfoEl) kupaInfoEl.style.display='block';

if(typeof hidkot === 'function') hidkot();

    const table = x.closest("table"); // מקבל את אלמנט הטבלה
    const mhkupaf = x.parentNode.firstElementChild.textContent.trim(); ;// מקבל את הערך מהתא הראשון בשורה
   console.log(mhkupaf)
   
    const rows = table.getElementsByTagName('tr'); // כל השורות בטבלה
    for (let i = 0; i < rows.length; i++) {
        const secondCell = rows[i].children[1];
        if (secondCell && secondCell.textContent.trim() === mhkupaf) {
            var mikom=i;break;
        }
    }
    var data;
  data = datanetunimKlaliXM.filter(item => 
      String(item.shemkupa).trim() === String(mhkupaf).trim() 
  );
  if(data.length===0){
    data = datanetunimKlaliXB.filter(item => 
      String(item.shemkupa).trim() === String(mhkupaf).trim()
  );
  }
  if(data.length===0){
    data = datanetunimKlaliXP.filter(item => 
      String(item.shemkupa).trim() === String(mhkupaf).trim()
  );
 
  }
 await bring(data,mikom);
  }
  

function sortTable(x) {
    var data = [];
    const table = x.closest('table');
    
    if (!table) {
        console.error('לא נמצאה טבלה.');
        return;
    }

    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const tds = rows[i].getElementsByTagName('td');

        if (tds.length >= 6) {
            data.push({
                mh: tds[0].textContent.trim(),
                shemkupa: tds[1]?.children[0]?.textContent.trim() || '',
                hodshi: cleanNumber(tds[2].textContent),
                tesuam: cleanNumber(tds[3].textContent),
                tesuam36: cleanNumber(tds[4].textContent),
                tesuam60: cleanNumber(tds[5].textContent)
            });
        } else {
            console.warn(`שורה ${i} אינה מכילה מספיק עמודות.`);
        }
    }

    // מיון לפי הכותרת שנלחצה
    const options = ['חודשי', 'שנה', '3 שנים', '5 שנים'];
    const selectedKey = options.find(opt => x.innerHTML.includes(opt));

    const sortKey = selectedKey ? {
        'חודשי': 'hodshi',
        'שנה': 'tesuam',
        '3 שנים': 'tesuam36',
        '5 שנים': 'tesuam60'
    }[selectedKey] : null;

    if (sortKey) {
        data.sort((a, b) => b[sortKey] - a[sortKey]);
    }

    // עדכון הנתונים בטבלה
    for (let i = 1; i < rows.length; i++) {
        const tds = rows[i].children;
        if (data[i - 1]) {
            tds[0].textContent = data[i - 1].mh;
            if (tds[1]?.children[0]) tds[1].children[0].textContent = data[i - 1].shemkupa;
            tds[2].textContent = formatNumber(data[i - 1].hodshi);
            tds[3].textContent = formatNumber(data[i - 1].tesuam);
            tds[4].textContent = formatNumber(data[i - 1].tesuam36);
            tds[5].textContent = formatNumber(data[i - 1].tesuam60);
        }
    }
}

// פונקציה שמנקה את הערכים וממירה אותם למספרים
function cleanNumber(value) {
    let num = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
}

// פונקציה שמחזירה מספר בפורמט הנכון
function formatNumber(value) {
    return value.toFixed(2) + '%';
}






