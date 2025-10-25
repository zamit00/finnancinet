

async function filterMenahelet(mas, moza,mena){
    var data;
    
         if (mas==='כללי'){
             
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes(mas)
                 &&  mena.some(b => item.menahelet.includes(b))  
             );
             
         data.sort((a, b) => b.tesuam - a.tesuam); 
         return data;
         }
         
         else if(mas==='עוקב מדד s&p 500'){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('amp') &&
                 item.shemkupa.includes('500')
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="מניות"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('מניות') &&
                 !item.shemkupa.includes('עוקב') &&
                 !item.shemkupa.includes('סחיר') &&
                 !item.shemkupa.includes('משולב') &&
                 !item.shemkupa.includes('25') &&
                 !item.shemkupa.includes('"אג\"ח"') && 
                 !item.shemkupa.includes('פאסיבי')
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="אשראי ואג\"ח"){
                 data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('אשראי') &&
                 !item.shemkupa.includes('מניות') &&
                 !item.shemkupa.includes('עוקב') &&
                 !item.shemkupa.includes('סחיר') 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="אשראי ואג\"ח עם מניות"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('אשראי') &&
                 item.shemkupa.includes('25')  
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="כספי (שקלי)"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('כספי (שקלי)') 
                 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="עוקב מדדים - גמיש"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('עוקב') &&
                 item.shemkupa.includes('גמיש')
                 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="אג\"ח ממשלות"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('ממשלות') 
                 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="הלכה יהודית"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes('הלכה') 
                 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="משולב סחיר"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("משולב סחיר")   
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="עוקב מדדי אג\"ח"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("עוקב") &&
                 item.shemkupa.includes("אג\"ח") &&
                 !item.shemkupa.includes("מניות")  
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="עוקב מדדי מניות"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("מניות") &&
                 item.shemkupa.includes("עוקב")  
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="מניות סחיר"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("מניות") &&
                 item.shemkupa.includes("סחיר")  
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
 
         }
         else if(mas==="אג\"ח סחיר"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("סחיר") &&
                 item.shemkupa.includes("אג\"ח")  
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="50-60"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("50") &&
                 item.shemkupa.includes("60") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
 
         }
         else if(mas==="עד 50"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("50") &&
                  !item.shemkupa.includes('עוקב') &&
                 !item.shemkupa.includes("60") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
 
         }
         else if(mas==="60 ומעלה"){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 !item.shemkupa.includes("50") &&
                 item.shemkupa.includes("60") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
 
         }
         else if(mas==='סיכון מוגבר'){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("מוגבר") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
          else if(mas==='סיכון מועט'){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("מועט") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
          else if(mas==='סיכון בינוני'){
             data = datanetunimKlaliX.filter(item => 
                 item.mozar === moza && 
                 item.tesuam !== undefined &&
                 item.shemkupa.includes("בינוני") 
             &&  mena.some(b => item.menahelet.includes(b)) ); 
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
 
 }


