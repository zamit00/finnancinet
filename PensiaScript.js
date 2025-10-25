
const mozkochX = [
  'קרנות חדשות'
];

const pensia=[
  "מניות",
  "עד 50",
  "50-60", 
  "60 ומעלה",
  "עוקב מדד s&p 500",
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
  "אג\"ח סחיר עם מניות"
  ];



async function maslulimP(t,moz,hev){ 
  
  const allTheTables=document.getElementById('allTheTables');
  if (!allTheTables) {
    console.error('allTheTables element not found');
    return;
  }
  if(t===30){allTheTables.innerHTML='';}
  allTheTables.style.display='flex';
  

  var z = 0;var dataY;
    const sugmuzar=mozkochX[0];const sugmozP='קרנות פנסיה - מקיפה'
    const msll=`<h2 id="h2Hish" name="h2Hish" style="font-size:1rem;
    line-height:1.8rem;vertical-align:middle; margin-top:15px;text-align:right;
    padding-right:5px;">${sugmozP} <a onclick="maslulimP(30,'${sugmuzar}',0)"
    class="txta" id="spanHish" name="spanHish">כל המסלולים</a></h2>`
    allTheTables.innerHTML+=msll;
    const mesanen=document.getElementById('sanenMosdy')
    const sinonHevra=document.getElementById('sinonHevra')
    if (sinonHevra) sinonHevra.selectedIndex = 0
    if (mesanen) mesanen.style.display='none'
    if (t===30){
      const h2Elements = document.querySelectorAll('[name="h2Hish"]');
      const aElements = document.querySelectorAll('[name="spanHish"]');
       if (mesanen) mesanen.style.display='flex'
    // עבור על כל ה-h2
    for (let i = 0; i < h2Elements.length; i++) {
        const a = aElements[i];
        // שנה את ה- onclick ב-a
        a.setAttribute('onclick', 'maslulim(1,0,0); if(typeof backtop === \"function\") backtop(); if(typeof showMabaatar === \"function\") showMabaatar(); if(typeof hideMabaatarSpecific === \"function\") hideMabaatarSpecific();');
        // שנה את הטקסט של ה-a
        a.textContent = 'חזור';
        a.className='spanHish back';
        a.style.color="#333";
        a.style.fontWeight = "bold";
    }
    } 
    var typamas;     
    typamas= pensia;
    for (let i = 0; i < typamas.length; i++) {  
      if (i>t && i>2){continue;}
         dataY = await filterMaslul(typamas[i], sugmuzar,hev);
          dataY.sort((a, b) => b.tesuam - a.tesuam);
        if(dataY.length===0){continue}
         addtbleX(z,typamas[i])
            const table = document.getElementById(`klalikochX${z}`);
            if (!table){continue;}
            table.innerHTML='';
            table.innerHTML=`<tr style="font-weight: bold;background-color: var(--main-color);color: white;
            border:none;">						
						<td >מה</td>
            <td>שם המסלול</td>
	   <td>חודש</td>
	    <td onclick='sortTablez(this)'>שנה<i class="fa fa-sort"></i></td>
	    <td onclick='sortTablez(this)'>3 שנים<i class="fa fa-sort"></i></td>
	    <td onclick='sortTablez(this)'>5 שנים<i class="fa fa-sort"></i></td>
        <td onclick='sortTablez(this)'>אקטוארי<i class="fa fa-sort"></i></td>
					</tr>`
          if (!dataY || !Array.isArray(dataY)) {
            console.error(`Data is not valid for typamas: ${typamas}, sugmuzar: ${sugmuzar}`);
            return; 
        }
        let datalengh;
        if(t!==30){datalengh=3}
        else{datalengh=dataY.length}
            for (let tb = 0; tb < datalengh; tb++) {
                if (dataY[tb].tesuam) {
                    const trm = document.createElement('tr');
                    // יצירת תא ראשון
                    let td = document.createElement('td');
                    td.style.color = '#333';
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
                    link.className="linktdbigX";
                    link.style.textDecoration = "none";
                    link.textContent = dataY[tb].shemkupa;
                    td.appendChild(link);
                    trm.appendChild(td);
               
                    td = document.createElement('td');
                    td.style.color = '#333';
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
                    td.style.color = '#333';
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
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="center"
                    if (dataY[tb].aktoari) { td.textContent = dataY[tb].aktoari + "%";}
                    trm.appendChild(td);
                    table.appendChild(trm);
                }
            }
            z++;           
    }
   
    addclickX(); tablerekX()
    document.querySelectorAll('[class^="klalikoch"] td').forEach(td => {
      let text = td.textContent.trim();
      if (text.startsWith("-")) {
          td.innerHTML = `<span style="direction: ltr; display: inline-block;">${text}</span>`;
          td.style.color="red";
      }
  });
  if(t===30){
    const mabaatarEl = document.getElementById("mabaatarSpecific");
    if (mabaatarEl) mabaatarEl.scrollIntoView({ behavior: "smooth" });
  }
};
function addtbleX(x,mas){
    
  const allTheTables=document.getElementById('allTheTables');
  const htmlt=`<div class="tblMuzarim" id="tblMuzarimX${x}">`
	const tbladd=
  `<div class="tbl">
		    <h4>${mas}</h4>	
		    <div class="divTblNetunim">
			      <table class="klalikoch" id="klalikochX${x}"> 
			      </table>	
	      </div>
  </div>`
  const sgira=`</div>`
  if (Number(x)===0 || Number(x) % 3 ===0){
   
      allTheTables.innerHTML+=htmlt;
      document.getElementById(`tblMuzarimX${x}`).innerHTML+=tbladd;
      
     // allTheTables.innerHTML+=tbladd;
  }
  else{
    if( Number(x-1) % 3 ===0 || Number(x-1)===0){document.getElementById(`tblMuzarimX${x-1}`).innerHTML+=tbladd;}
	else{document.getElementById(`tblMuzarimX${x-2}`).innerHTML+=tbladd;}  
    
  }
}
function addclickX(){
    
  const elements = document.querySelectorAll(".linktdbigX"); 
  elements.forEach((element) => {
    const aTag = element.outerHTML.match(/<a [^>]+>/)[0];
    const updatedATag = aTag.replace(/<a /, `<a onclick="bringinfoX(this)" `);
    element.outerHTML = updatedATag + element.innerHTML + "</a>";
    //  element.addEventListener('click', function (event) {
   //       event.preventDefault();
   //       bringinfo(this);
   //   });
  });
  }
  function tablerekX(){
    const elements = document.querySelectorAll("[id^='klalikochX']"); 
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
async function bringinfoX(x) {
// Call functions only if they exist
if(typeof hidefooter === 'function') hidefooter();
if(typeof hideAllimages === 'function') hideAllimages();
if(typeof hideMaBaatar === 'function') hideMaBaatar();
if(typeof hideMabaatarSpecific === 'function') hideMabaatarSpecific();

const closeinfoEl = document.getElementById("closeinfo");
if (closeinfoEl) closeinfoEl.style.display='block';

const allTablesEl = document.getElementById('allTheTables');
if (allTablesEl) allTablesEl.style.display='none';

const kupaInfoEl = document.getElementById('kupaInfo');
if (kupaInfoEl) kupaInfoEl.style.display='block';

if(typeof hidkot === 'function') hidkot();

    const table = x.closest("table"); // מקבל את אלמנט הטבלה
    const mhkupaf = x.parentNode.firstElementChild.textContent.trim(); ;// מקבל את הערך מהתא הראשון בשורה
    
    const rows = table.getElementsByTagName('tr'); // כל השורות בטבלה
    for (let i = 0; i < rows.length; i++) {
        const secondCell = rows[i].children[1];
        if (secondCell && secondCell.textContent.trim() === mhkupaf) {
            var mikom=i;break;
        }
    }
    var data;
  
  // Try to find in all data sources, just like bringinfo does
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
  

function sortTablez(x) {
    var data = [];
    const table = x.closest('table');
    
    if (!table) {
        console.error('לא נמצאה טבלה.');
        return;
    }

    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const tds = rows[i].getElementsByTagName('td');

        if (tds.length >= 7) {
            data.push({
                mh: tds[0].textContent.trim(),
                shemkupa: tds[1]?.children[0]?.textContent.trim() || '',
                hodshi: tds[2].textContent.trim().replace('%', ''),
                tesuam: tds[3].textContent.trim().replace('%', ''),
                tesuam36: tds[4].textContent.trim().replace('%', ''),
                tesuam60: tds[5].textContent.trim().replace('%', ''),
                aktoari: tds[6].textContent.trim().replace('%', '')
            });
        } else {
            console.warn(`שורה ${i} אינה מכילה מספיק עמודות.`);
        }
    }

    // מיון לפי הכותרת שנלחצה
    const options = ['חודשי', 'שנה', '3 שנים', '5 שנים','אקטוארי'];
const selectedKey = options.find(opt => x.innerHTML.includes(opt));

const sortKey = selectedKey ? {
    'חודשי': 'hodshi',
    'שנה': 'tesuam',
    '3 שנים': 'tesuam36',
    '5 שנים': 'tesuam60',
    'אקטוארי': 'aktoari'
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
            tds[2].textContent = data[i - 1].hodshi ? data[i - 1].hodshi + '%' : '';
            tds[3].textContent = data[i - 1].tesuam ? data[i - 1].tesuam + '%' : '';
            tds[4].textContent = data[i - 1].tesuam36 ? data[i - 1].tesuam36 + '%' : '';
            tds[5].textContent = data[i - 1].tesuam60 ? data[i - 1].tesuam60 + '%' : '';
            tds[6].textContent = data[i - 1].aktoari ? data[i - 1].aktoari + '%' : '';
            
        }
    }
}


