document.addEventListener("DOMContentLoaded", function () {
    const select=document.getElementById('age');
    if (!select) {
        console.error("Element #age not found!");
        return;
    }
    for (let i = 22; i <= 60; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === 30) option.selected = true;
        select.appendChild(option);
    }
    const otherribit=document.getElementById('selecttoz');
    otherribit.innerHTML='';
    for (let i = 0.01; i <= 0.21; i += 0.01) {
        let option = document.createElement('option');
        // Check if i is approximately 1, with a tolerance
        if (Math.abs(i - 0.04) < 0.0001) {
            option.selected = true;
        }
        let value = Math.round(i * 100) / 100;
        option.value = value;
        option.textContent = Math.round(value*100)+"%";
        otherribit.appendChild(option);
    }
});
document.querySelectorAll('input[name="calcType"]').forEach(radio => {
    radio.addEventListener('change', updateFields);
});
function updateFields() {
    const rd1check=document.getElementById('rd1')
    const rd2check=document.getElementById('rd2')
    const divdeposit=document.getElementById('deposit')
    const divsaving=document.getElementById('saving')
    const divdepositAmount=document.getElementById('depositAmount')
    const divsavingAmount=document.getElementById('savingAmount')
    const tozaot=document.getElementById('tbltoz')
    const divfeeDeposit1=document.getElementById('divfeeDeposit1')
    const divfeeDeposit2=document.getElementById('divfeeDeposit2')
    if(rd1check.checked){divdeposit.style.display='none';divsaving.style.display='flex';
        divdepositAmount.value=0;document.getElementById("alltoz").style.display="none";
        divfeeDeposit1.style.display='none';
        divfeeDeposit2.style.display='none';
    }
    else if(rd2check.checked){divdeposit.style.display='flex';divsaving.style.display='none';
        document.getElementById("alltoz").style.display="none";
        divsavingAmount.value=0;
        divfeeDeposit1.style.display='flex';
        divfeeDeposit2.style.display='flex';
    }
    else{divdeposit.style.display='flex';divsaving.style.display='flex';
       document.getElementById("alltoz").style.display="none";
         divfeeDeposit1.style.display='flex';
        divfeeDeposit2.style.display='flex';
    }
}
function formatNumber(input) {
    let value = input.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString();
    } else {
        input.value = '';
    }
}
function onch(){
    const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML="";
       document.getElementById("alltoz").style.display="none";
}
function othribit(){
    var rb=document.getElementById('selecttoz').value;
    document.getElementById("kottoz").textContent = `לפי ריבית ${Math.round(rb*100)}% שנתי:`;
    hashev(rb);
}
function hashev(x) {
    const rb=parseFloat(x);
    // Retrieve values from input fields
    const hp=document.getElementById("savingAmount");
    const tash= document.getElementById("depositAmount");
    const dmnz1=parseFloat(document.getElementById('feeSaving1').value);
    const dmnz2=parseFloat(document.getElementById('feeSaving2').value);
    var dmnh1;var dmnh2;
    if(document.getElementById('rd1').checked){
        dmnh1=0;
        dmnh2=0;
    }
    else{
         dmnh1=parseFloat(document.getElementById('feeDeposit1').value);
         dmnh2=parseFloat(document.getElementById('feeDeposit2').value);
    }
    if(dmnz1<0 || dmnz2<0 || dmnh1<0 || dmnh2<0 ){('דמי ניהול אינם תקינים');return;}
    let x1 = parseFloat(hp.value.replace(/,/g, ""));
    if(!x1){x1=0};
    let x2 = parseFloat(tash.value.replace(/,/g, ""));
    if(!x2){x2=0};
    if(x1===0 && x2===0){hatraaDmey('הוסף סכומי השקעה');return;}
    if(!dmnz1 && !dmnh1){hatraaDmey('דמי ניהול לא תקינים')}
    if(!dmnz2 && !dmnh2){hatraaDmey('דמי ניהול לא תקינים')}
    if(x1<0||x2<0){hatraaDmey('סכומים לא תקינים');return;}
    let selectElement = document.getElementById("age");
    let x3 = 67-selectElement.value;
   const textopen="סכום השקעה עתידי לתקופה של - ";
   const textshanim=" שנים ";
   const shach = " ש\"ח";
   var hishuv1_0;var hishuv2_0;var hishuv1_5;var hishuv2_5;var hishuv1_10;var hishuv2_10;var
    hishuv1_15;var hishuv2_15;var hishuv1_20;var hishuv2_20;var
    hishuv1_25;var hishuv2_25;var hishuv1_30;var hishuv2_30;var
    hishuv1_35;var hishuv2_35;var hishuv1_40;var hishuv2_40;
   hishuv1_0=hishuv(x1,x2,dmnz1,dmnh1,rb,x3);
   hishuv2_0=hishuv(x1,x2,dmnz2,dmnh2,rb,x3);
   if (x3>=5){
    hishuv1_5=hishuv(x1,x2,dmnz1,dmnh1,rb,5);
    hishuv2_5=hishuv(x1,x2,dmnz2,dmnh2,rb,5);
   }
   if (x3>=10){
    hishuv1_10=hishuv(x1,x2,dmnz1,dmnh1,rb,10);
    hishuv2_10=hishuv(x1,x2,dmnz2,dmnh2,rb,10);
    }
    if (x3>=15){
    hishuv1_15=hishuv(x1,x2,dmnz1,dmnh1,rb,15);
    hishuv2_15=hishuv(x1,x2,dmnz2,dmnh2,rb,15);
    }
    if (x3>=20){
    hishuv1_20=hishuv(x1,x2,dmnz1,dmnh1,rb,20);
    hishuv2_20=hishuv(x1,x2,dmnz2,dmnh2,rb,20);
    }
    if (x3>=25){
    hishuv1_25=hishuv(x1,x2,dmnz1,dmnh1,rb,25);
    hishuv2_25=hishuv(x1,x2,dmnz2,dmnh2,rb,25);
    }
    if (x3>=30){
    hishuv1_30=hishuv(x1,x2,dmnz1,dmnh1,rb,30);
    hishuv2_30=hishuv(x1,x2,dmnz2,dmnh2,rb,30);
    }
    if (x3>=35){
        hishuv1_35=hishuv(x1,x2,dmnz1,dmnh1,rb,35);
        hishuv2_35=hishuv(x1,x2,dmnz2,dmnh2,rb,35);
    }
    if (x3>=40){
        hishuv1_40=hishuv(x1,x2,dmnz1,dmnh1,rb,40);
        hishuv2_40=hishuv(x1,x2,dmnz2,dmnh2,rb,40);
    }
    // Create table
    var table; var td; var tr;var hsh1=0;var hsh2=0;
    const tablediv= document.getElementById("tozaot");
    tablediv.innerHTML="";
    document.getElementById("alltoz").style.display="flex";
if(hishuv1_0 && hishuv2_0){
    table= document.createElement("table");
    table.id="tbltoz";table.className="tbltoz";
    tablediv.appendChild(table);
    tr=document.createElement("tr");
    td=document.createElement("th");
    td.textContent="תקופה";
    td.className="tdth";
    td.style.textAlign="center";
    tr.appendChild(td);
    td=document.createElement("th");
    td.textContent="צבירה 1";
    td.className="tdth";
    td.style.textAlign="center";
    tr.appendChild(td);
    td=document.createElement("th");
    td.textContent="צבירה 2";
    td.className="tdth";
    td.style.textAlign="center";
    tr.appendChild(td);
    table.appendChild(tr);
    td=document.createElement("th");
    td.textContent="עדיפות ";
    td.className="tdth";
    td.style.textAlign="center";
    tr.appendChild(td);
    table.appendChild(tr);
}
else{return;}
if(Math.floor(x3/5)===0){return;}
for (let i = 1; i <=Math.floor(x3/5); i++) {
var hishuv1x=eval('hishuv1_'+i*5);
var hishuv2x=eval('hishuv2_'+i*5);
var x4=i*5;
if(hishuv1x && hishuv2x){
    tr=document.createElement("tr");
    td=document.createElement("td");
    td.innerText=x4+textshanim;
    td.className="numtd";
    tr.appendChild(td);
    td=document.createElement("td");
    td.innerText= hishuv1x.toLocaleString()+shach;
    td.className="numtd";
    tr.appendChild(td);
    td=document.createElement("td");
    td.innerText= hishuv2x.toLocaleString()+shach;
    td.className="numtd";
    tr.appendChild(td);
    table.appendChild(tr);
    td=document.createElement("td");
    if(hishuv1x>hishuv2x){td.innerText="1";hsh1=1;}
    else{td.innerText="2";hsh2=1;}
    td.className="numtd tdts";
    tr.appendChild(td);
    table.appendChild(tr);
    }
}
    tr=document.createElement("tr");
    td=document.createElement("td");
    td.innerText=x3+textshanim;
    td.className="numtdx";
    tr.appendChild(td);
    td=document.createElement("td");
    td.innerText= hishuv1_0.toLocaleString()+shach;
    td.className="numtdx";
    tr.appendChild(td);
    td=document.createElement("td");
    td.innerText= hishuv2_0.toLocaleString()+shach;
    td.className="numtdx";
    tr.appendChild(td);
    table.appendChild(tr);
    td=document.createElement("td");
    if(hishuv1_0>hishuv2_0){td.innerText="1";hsh1=1}
    else{td.innerText="2";hsh2=1}
    td.className="numtdx tdts";
    tr.appendChild(td);
    table.appendChild(tr);
        if(hsh1 && hsh2 && Number(rb)===0.04){
                    let hishuv1 =x1 + x2*(1-dmnh1/100);let hishuv2=x1 + x2*(1-dmnh2/100)
                    hishuv1=hishuv1 * Math.pow(1+rb,(1/12))*(1-dmnz1/1200);
                    hishuv2=hishuv2 * Math.pow(1+rb,(1/12))*(1-dmnz2/1200);
                    var i=0;
                    if (hishuv1<hishuv2){
                        do{
                                hishuv1 = (hishuv1 + x2*(1-dmnh1/100))* Math.pow(1+rb,(1/12))*(1-dmnz1/1200);
                                hishuv2 = (hishuv2 + x2*(1-dmnh2/100))* Math.pow(1+rb,(1/12))*(1-dmnz2/1200);
                                i++;
                        }while(Number(hishuv1)<Number(hishuv2) && i < x3*12);
                        if(i+1!==x3*12){
                            hatraaDmey(`תקופת השקעה ${x3} שנים. קיימת נקודת החלפת עדיפות אחרי ${Math.round(((i+1)/12))} שנים`)
                        }
                    }
                    if (hishuv1>hishuv2){
                        do{
                                hishuv1 = (hishuv1 + x2*(1-dmnh1/100))* Math.pow(1+rb,(1/12))*(1-dmnz1/1200);
                                hishuv2 = (hishuv2 + x2*(1-dmnh2/100))* Math.pow(1+rb,(1/12))*(1-dmnz2/1200);
                                i++;
                        }while(Number(hishuv2)<Number(hishuv1) && i < x3*12);
                    }
                    if(i+1!==x3*12){
                    hatraaDmey(`תקופת השקעה ${x3}  קיימת נקודת החלפת במהלך התקופה.`) }
        }
}
function hishuv(x1,x2,dmnz1,dmnh1,rb,x3){
    let hishuv1 =x1 + x2*(1-dmnh1/100);
    hishuv1=hishuv1 * Math.pow(1+rb,(1/12))*(1-dmnz1/1200);
    for (let i = 1; i < x3*12; i++) {
        hishuv1 = (hishuv1 + x2*(1-dmnh1/100))* Math.pow(1+rb,(1/12))*(1-dmnz1/1200);
    }
    hishuv1=Math.round(hishuv1);
    return hishuv1;
}
function hatraaDmey(x){
    Swal.fire({
    title: `<span style='color: green; font-size: 16px;'>${x}</span>`,
    width: "clamp(250px,90vw,600px)",
    icon: "warning",
    showCancelButton: false,
    showConfirmButton: false,
    timer: 2000,
     showConfirmButton: false,
    timerProgressBar: true,
    background: "#fff",
    customClass: {
    popup: 'swal2-center-custom'
      }
    }).then((result) => {
    });
}
