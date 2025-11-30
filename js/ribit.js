function onch(){
    const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML=""; 
       document.getElementById("alltoz").style.display="none";
       document.getElementById('dropdown-sug').style.display='flex' ;
       document.getElementById('dropdown-tkofa').style.display='flex' ;
       document.getElementById('dropdown-schom').style.display='flex' ;
}

function opn(x){
    var element=document.getElementById(x)
    if(element.style.display==='none' || element.style.display==='' ){
        element.style.display='flex'
        if(x==='dropdown-schom'){rdchange()}
        if(x==='dropdown-tkofa'){addelement()}
    
    }
    else{element.style.display='none'}

}
function rdchange(){
   const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML=""; 
   var alltoz=document.getElementById('alltoz');
        var rd1=document.getElementById('rdbutton1');
        var rd2=document.getElementById('rdbutton2');
        var rd3=document.getElementById('rdbutton3');
        var schomdiv1=document.getElementById('schomdiv1');
        var schomdiv2=document.getElementById('schomdiv2');
        var schom2=document.getElementById('hodshi');
        var schom1=document.getElementById('hadpeami');
        alltoz.style.display='none';
        if(rd1.checked){
            schomdiv1.style.display='flex';
            schomdiv2.style.display='none';
             schom2.value='0';
            
        }
        else if(rd2.checked){
            schomdiv1.style.display='none';
            schomdiv2.style.display='flex';
            schom1.value='0';
        }
        else if (rd3.checked){
            schomdiv1.style.display='flex';
            schomdiv2.style.display='flex';
            schom1.value=0;
            schom2.value=0;
        }
    
}

    const select=document.getElementById('txttkofa1');
    const dmn=document.getElementById('txttkofa2');
    const otherribit=document.getElementById('selecttoz');
    for (let i = 1; i <= 30; i++) {
        let option = document.createElement('option');
        option.value = i;  
        option.textContent = i;  
        if(i===10){option.selected = true;}
        select.appendChild(option);  
    }   
   
      
    for (let i = 0; i <= 1.1; i += 0.05) {
        let option = document.createElement('option');
        
        // Check if i is approximately 1, with a tolerance
        if (Math.abs(i - 1) < 0.0001) {
            option.selected = true;
        }
        
        let value = Math.round(i * 100) / 100;  
        option.value = value;  
        option.textContent = value+"%"; 
        dmn.appendChild(option);  
    }
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
    function othribit(){
        var rb=document.getElementById('selecttoz').value;

// עדכון הטקסט בתוך האלמנט עם ID kottoz
document.getElementById("kottoz").textContent = `לפי ריבית ${Math.round(rb*100)}% שנתי:`;       
      if(schomdiv1.style.display==='flex' && schomdiv2.style.display==='none' && schom1.value>0){ hashev(rb)}
      else if(schomdiv1.style.display==='none' && schomdiv2.style.display==='flex' && schom2.value>0){ hashev(rb)}
      else if(schomdiv1.style.display==='flex' && schomdiv2.style.display==='flex' && schom1.value>0 && schom2.value>0){ hashev(rb)}
      
      document.getElementById("tozaot").innerHTML=""; 
    }

function hashev(x) {
   var rbvalue=document.getElementById('selecttoz').value;
    if(!rbvalue){
     rb=parseFloat(x);} 
    else{
      rb=parseFloat(rbvalue)
    }
    // Retrieve values from input fields
    const hp=document.getElementById("hadpeami");
    const tash=document.getElementById("hodshi");
    let x1 = parseInt(hp.value.replace(/,/g, ""));
    if(!x1){x1=0};
    let x2 = parseInt(tash.value.replace(/,/g, ""));
    if(!x2){x2=0};
    if(x1===0 && x2===0){hatraaRibit('הוסף סכומי השקעה')
        var element=document.getElementById('dropdown-schom')
        if(element){element.style.display='flex' ;}               
        
        var rd1=document.getElementById('rdbutton1');
        var rd2=document.getElementById('rdbutton2');
        var rd3=document.getElementById('rdbutton3');
        if(rd1.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='none';
            document.getElementById('hodshi').innerText=100;
        }
        else if(rd2.checked){
            document.getElementById('schomdiv1').style.display='none';
            document.getElementById('schomdiv2').style.display='block';
            document.getElementById('hadpeami').innerText=100;
        }
        else if (rd3.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='block';
        }        
               
        return;}
    let dn =document.getElementById("txttkofa2").value;
    if(!dn || dn===0){dn=1;}
   

    if(x1<0||x2<0){hatraaRibit('סכומים לא תקינים');return;}
    let selectElement = document.getElementById("txttkofa1");
    if(!selectElement.value || selectElement.value===0){addelement(); }
    let x3 = selectElement.value; 
    
    
   const textopen="סכום השקעה עתידי לתקופה של - ";
   const textshanim=" שנים:       ";
   const shach = " ש\"ח"; 
   
   let sum;let sum10;let sum20;let sum30;let sumsimul;
   sum=hishuv(x1,x2,rb,dn,x3);
   sum10=hishuv(x1,x2,rb,dn,10);
   sum20=hishuv(x1,x2,rb,dn,20);
   sum30=hishuv(x1,x2,rb,dn,30);
 
    if (isNaN(sum) ) {hatraaRibit('סכומים לא תקינים');return;}
        
      

       var table; var td; var tr;let par;let selectsim;
       const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML=""; 
       document.getElementById("alltoz").style.display="flex";

       tablediv.innerHTML+=`
       <div id="result" class="result">
                <div class="result-title">סכום ערך עתידי :</div>
                <div id="monthlyAmount" class="result-amount">${parseInt(sum).toLocaleString()
                     } ₪</div>
                <div id="resultDetails" class="result-details">עבור סכום השקעה כולל של ${
                    Number(x1+(x2*x3*12)).toLocaleString()+shach}</div>
        </div>
       `


       
  /*     table= document.createElement("table");
       table.style.width="clamp(300px,90vw,600px)";
        table.style.fontSize="1.5rem";
        table.id="tbltoz";table.className="tbltoz";
       tablediv.appendChild(table);
       
        
        
        if(x1>0){
                tr=document.createElement("tr");
                tr.style.width="clamp(300px,90vw,600px)";
                table.appendChild(tr);
                td=document.createElement("td");
                td.style.width="70%";
                td.innerText="סכום חד פעמי";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.style.width="30%";
                td.innerText= x1.toLocaleString()+shach;
                td.className="numtd";
                tr.appendChild(td);
            }
        if(x2>0){
                tr=document.createElement("tr");
                tr.style.width="clamp(300px,90vw,600px)";
                table.appendChild(tr);
                td=document.createElement("td");
                td.style.width="70%";
                td.innerText="סך הפקדות בתשלומים";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.style.width="30%";
                td.innerText=(x2*x3*12).toLocaleString() + shach;
                td.className="numtd";
                tr.appendChild(td);
            }
            tr=document.createElement("tr");
                tr.style.width="clamp(300px,90vw,600px)";
                table.appendChild(tr);
                td=document.createElement("td");
                td.style.width="60%";
                td.style.height='30px';td.style.textSize='16px';
                td.innerText="סך השקעה";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.style.width="35%";td.style.height='30px';
                td.style.textSize='16px';
                td.innerText=Number(x1+(x2*x3*12)).toLocaleString()+shach;
                 td.className="numtd";
                tr.appendChild(td);
                
             tr=document.createElement("tr");
                tr.style.width="clamp(300px,90vw,600px)";
                table.appendChild(tr);
                td=document.createElement("td");
                td.style.width="60%";td.style.height='30px';
                td.style.textSize='16px';
                td.innerHTML="שווי השקעה עתידי ב - "+x3+textshanim;
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.style.width="35%";td.style.height='30px';
                td.style.textSize='16px';
                 td.className="numtd";
                td.innerText=parseInt(sum).toLocaleString() + shach;
                td.className="numtd";
                tr.appendChild(td);
*/
/*
            if(x3<10){
            tr=document.createElement("tr");
            tr.style.width="clamp(300px,90vw,600px)";
            table.appendChild(tr);
            td=document.createElement("td");
            td.style.width="70%";
             td.innerHTML="שווי השקעה ל - 10 שנים";
             td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.style.width="30%";
            td.innerText=parseInt(sum10).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }
   
            if(x3<20){
            tr=document.createElement("tr");
            tr.style.width="clamp(300px,90vw,600px)";
            table.appendChild(tr);
            td=document.createElement("td");
            td.style.width="70%";
            td.innerHTML="שווי השקעה ל - 20 שנים";
            td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.style.width="30%";
            td.innerText=parseInt(sum20).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }
    
            if(x3<30){
            tr=document.createElement("tr");
            tr.style.width="clamp(300px,90vw,600px)";
            table.appendChild(tr);
            td=document.createElement("td");
            td.style.width="70%";
            td.innerHTML="שווי השקעה ל - 30 שנים";
            td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.style.width="30%";
            td.innerText=parseInt(sum30).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }            
           */     
            if(window.innerWidth<600){document.getElementById("hashevdo").scrollIntoView({ behavior: "smooth" });}

        }

         function hishuv(x,y,rb,dn,t){
             let hishuv = x + y;
            hishuv=hishuv *(1+rb/12)*(1-dn/1200);
            for (let i = 1; i < t*12; i++) {
                hishuv = (hishuv+y)*(1+rb/12)*(1-dn/1200);
            }
            return hishuv;
        }

        function hatraaRibit(x){
            Swal.fire({
                title: `<span style='color: green; font-size: 16px;'>${x}</span>`,
                width: "clamp(250px,90vw,600px)", 
                icon: "warning",
                showConfirmButton: false,
          width: "clamp(300px, 90vw, 600px)",
          position: "center", 
          timer: 2000, 
          timerProgressBar: true, 
          background: "#fff",
          icon: "warning",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
        }


