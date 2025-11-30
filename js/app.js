const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const mysql = require('mysql2/promise');

const folderPath = path.join(__dirname, 'xmlFiles');

// חיבור למסד הנתונים
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mislakadb'
};

// מחזיר null ברירת מחדל אם הערך אובייקט/ניל; אחרת הערך המקורי
function cleanVal(val, def = null) {
  if (val === undefined || val === null || typeof val === 'object') return def;
  return val;
}

// הופך ערך ל-array תמיד (undefined/null → [], אובייקט יחיד → [obj], מערך → 그대로)
function toArray(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

// חיתוך תאריך מהכותרת בפורמט YYYYMMDD
function sliceDate8(v) {
  const s = cleanVal(v, null);
  if (!s) return null;
  return String(s).slice(0, 8);
}

// שמירת 9 הספרות האחרונות של ת"ז/מזהה לקוח
function last9Digits(v) {
  const s = cleanVal(v, null);
  if (!s) return null;
  const onlyDigits = String(s).replace(/\D+/g, '');
  if (!onlyDigits) return null;
  return onlyDigits.slice(-9);
}

/* =========================
   SQL Statements (Prepared)
========================= */

const SQL_UPSERT_HESHBON = `
  INSERT INTO heshbonotx
  (
    misparPolisaOHeshbon,
    shemTochnit,
    kidodAchid,
    taarichNechnut,
    taarichHitztarfutMutzar,
    sugKerenPensia,
    pensiaVatikaOHadasha,
    statusPolisaOCheshbon,
    shemMaslulHabituah,
    hutalSHiabud,
    hutalIkul,
    yeshHalvaaBamutzar,
    yeshTvia,
    sheurTesuaNetoH,
    sugMezaheLakoach,
    misparZihuyLakoach,
    kodMezaheYatzran,
    sugMutzar
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  ON DUPLICATE KEY UPDATE
    shemTochnit = VALUES(shemTochnit),
    kidodAchid = VALUES(kidodAchid),
    taarichNechnut = VALUES(taarichNechnut),
    taarichHitztarfutMutzar = VALUES(taarichHitztarfutMutzar),
    sugKerenPensia = VALUES(sugKerenPensia),
    pensiaVatikaOHadasha = VALUES(pensiaVatikaOHadasha),
    statusPolisaOCheshbon = VALUES(statusPolisaOCheshbon),
    shemMaslulHabituah = VALUES(shemMaslulHabituah),
    hutalSHiabud = VALUES(hutalSHiabud),
    hutalIkul = VALUES(hutalIkul),
    yeshHalvaaBamutzar = VALUES(yeshHalvaaBamutzar),
    yeshTvia = VALUES(yeshTvia),
    sheurTesuaNetoH = VALUES(sheurTesuaNetoH),
    sugMezaheLakoach = VALUES(sugMezaheLakoach),
    misparZihuyLakoach = VALUES(misparZihuyLakoach),
    sugMutzar= VALUES(sugMutzar)
`;



const SQL_INSERT_MASLUL = `
  INSERT INTO maslulimx
  (misparPolisaOHeshbon,misparZihuyLakoach,sugMutzar,kodMaslulHafrash,
    kodSugMaslul,schumTzviraBamaslul,shemMaslulHashkaa,sheurDmeyNihulHafkadMivne,
    sheurDmeyNihulHisachonMivne,tesuaNeto,shiurAlotShnatitZpuiaLmslulHashkah)
  VALUES (?,?,?,?,?,?,?,?,?,?,?)
`;

const SQL_INSERT_MAASIKIM=`
INSERT INTO maasikimx
  (kodMezaheYatzran,mprMaasikBeYatzran,shemMaasik,misparMezaheMaasik,sugMezaheMaasik)
  VALUES (?,?,?,?,?)
  ON DUPLICATE KEY UPDATE
  mprMaasikBeYatzran=VALUES(mprMaasikBeYatzran),
  shemMaasik=VALUES(shemMaasik),
  sugMezaheMaasik=VALUES(sugMezaheMaasik),
  kodMezaheYatzran=VALUES(kodMezaheYatzran)
  `

const SQL_INSERT_YITRA = `
  INSERT INTO yitrotx
  (taarichErechTzvirot,misparPolisaOHeshbon,misparZihuyLakoach,
  sugMutzar,kodSugItra,totalChisachonMtzbr,totalErkeiPidion,
  moedNezilutTagmulim,yitratKaspeyTagmulim)
  VALUES (?,?,?,?,?,?,?,?,?)
`;

const SQL_INSERT_DMEY = `
  INSERT INTO dmeinihulx
  (misparPolisaOHeshbon,misparZihuyLakoach,sugMutzar,
  sugHotzaa,sheurDmeiNihul,dmeiNihulAchidim,kayemetHatava,
  sugHatava,achozHatava	
)
  VALUES (?,?,?,?,?,?,?,?,?)
ON DUPLICATE KEY UPDATE
  misparZihuyLakoach=VALUES(misparZihuyLakoach),
  sheurDmeiNihul=VALUES(sheurDmeiNihul),
  dmeiNihulAchidim=VALUES(dmeiNihulAchidim),
  kayemetHatava=VALUES(kayemetHatava)
`;

const sugTochnitOHeshbon = {
1: "פוליסת ביטוח חיים משולב חיסכון",
2: "קרן פנסיה",
2_1: "קרן פנסיה ותיקה", 
2_2: "קרן פנסיה חדשה",
3: "קופת גמל",
4: "קרן השתלמות",
5: "פוליסת חיסכון טהור",
6: "פוליסת סיכון טהור (ריסק מוות ו/או פוליסת אכ״ע SA)",
7: "ביטוח חיים משכנתא",
8: "פוליסת סיכון טהור קולקטיב", 
9: "קופת גמל להשקעה",
10: "חיסכון לכל ילד"
};

/* =========================
   Processor
========================= */
async function processFile(filePath, connection) {
    let heshbonotColl=[];let maasikimColl=[];let maslulimColl=[];
    let yitrotColl=[];let dmeinihulColl=[];let netuneimutzarmaasikColl=[];
    const xml = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    const result = await parser.parseStringPromise(xml);
    

    // התחלת טרנזקציה לכל קובץ
    await connection.beginTransaction();
    try {
        const mimshak = result?.Mimshak || {};
        const koteret = mimshak?.KoteretKovetz || {};
        const kodMezaheYatzran=mimshak.YeshutYatzran['KOD-MEZAHE-YATZRAN'];
        const shemYatzran=mimshak.YeshutYatzran['SHEM-YATZRAN'];
        const taarichBitzua = sliceDate8(koteret?.['TAARICH-BITZUA']);
        const mutzar = mimshak?.YeshutYatzran?.Mutzarim?.Mutzar;
        if (!mutzar) {
            console.warn('לא נמצאו נתוני מוצר בקובץ זה—דילוג.');
            await connection.commit();
            return;
        }
        let shemSugTochnit = 'לא ידוע';
        const sugMutzar = cleanVal(mutzar?.NetuneiMutzar?.['SUG-MUTZAR']);
        sugMutzar? shemSugTochnit = sugTochnitOHeshbon[sugMutzar] : 'לא ידוע';
        const sugMezaheLakoach=mutzar?.NetuneiMutzar?.YeshutLakoach?.['SUG-MEZAHE-LAKOACH'];
        const misparZihuyLakoach = last9Digits(mutzar?.NetuneiMutzar?.YeshutLakoach?.['MISPAR-ZIHUY-LAKOACH']);
        const shemPrati = cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['SHEM-PRATI']);
        const shemMishpacha = cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['SHEM-MISHPACHA']);
        const misparCellulari = cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['MISPAR-CELLULARI']) || '';
        const eMail= cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['E-MAIL']) || '';
        const taarichLeyda = cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['TAARICH-LEYDA']);
        const min=cleanVal(mutzar?.NetuneiMutzar?.YeshutLakoach?.['MIN']);

        let maasikim = mutzar?.NetuneiMutzar?.YeshutMaasik;
        maasikim = toArray(maasikim)
        for(const maasik of maasikim){
            const mprMaasikBeYatzran = cleanVal(maasik?.['MPR-MAASIK-BE-YATZRAN']);
            const shemMaasik =cleanVal(maasik?.['SHEM-MAASIK']) || 'לא ידוע';
            const misparMezaheMaasik = cleanVal(maasik?.['MISPAR-MEZAHE-MAASIK']) || '';
            const sugMezaheMaasik=cleanVal(maasik?.['SUG-MEZAHE-MAASIK']) || ''; 
            
            maasikimColl.push({
            kodMezaheYatzran:kodMezaheYatzran,misparZihuyLakoach:misparZihuyLakoach,
            mprMaasikBeYatzran:mprMaasikBeYatzran,shemMaasik:shemMaasik,
            misparMezaheMaasik:misparMezaheMaasik,sugMezaheMaasik:sugMezaheMaasik
                })
            await connection.execute(SQL_INSERT_MAASIKIM, [
                        kodMezaheYatzran,mprMaasikBeYatzran,
                        shemMaasik,misparMezaheMaasik,
                        sugMezaheMaasik
            ]);
            

            

            
        }
            

        // מבצע את הפעולה בטרנזקציה
        await connection.beginTransaction();

        // לכל חשבון יכולים להיות כמה מסלולים/יתרות/דמי ניהול
        let heshbonot = mutzar?.HeshbonotOPolisot?.HeshbonOPolisa;
        heshbonot = toArray(heshbonot);

        for (const heshbon of heshbonot) {
            // ----- שורת חשבון אחת -----
            const misparPolisaOHeshbon = cleanVal(heshbon?.['MISPAR-POLISA-O-HESHBON'], 0);
            const shemTochnit = cleanVal(heshbon?.['SHEM-TOCHNIT']);
            const kidodAchid = cleanVal(heshbon?.['KIDOD-ACHID']);
            const taarichNechnut = cleanVal(heshbon?.['TAARICH-NECHONUT']);
            const taarichHitztarfutMutzar = cleanVal(heshbon?.['TAARICH-HITZTARFUT-MUTZAR']);
            const sugKerenPensia = cleanVal(heshbon?.['SUG-KEREN-PENSIA']);
            const pensiaVatikaOHadasha = cleanVal(heshbon?.['PENSIA-VATIKA-O-HADASHA']);
            const statusPolisaOCheshbon=cleanVal(heshbon?.['STATUS-POLISA-O-CHESHBON']);
            const shemMaslulHabituah=cleanVal(heshbon?.MaslulBituach?.['SHEM-MASLUL-HABITUAH']) || '';
            const hutalSHiabud = cleanVal(heshbon?.PerutShiabudIkul?.['HUTAL-SHIABUD']);
            const hutalIkul = cleanVal(heshbon?.PerutShiabudIkul?.['HUTAL-IKUL']);
            const yeshHalvaaBamutzar = cleanVal(heshbon?.Halvaa?.['YESH-HALVAA-BAMUTZAR']);
            const yeshTvia = cleanVal(heshbon?.PirteyTvia?.['YESH-TVIA']);
            const sheurTesuaNetoH = cleanVal(heshbon?.Tsua?.['SHEUR-TSUA-NETO'], '');
            
            
            const tzviratChisachonChzuyaLeloPremiyot = cleanVal(heshbon?.YitraLefiGilPrisha?.['TZVIRAT-CHISACHON-CHAZUYA-LELO-PREMIYOT'],'') || '';
            const totalChisachonMitztaberTzafuy = cleanVal(heshbon?.YitraLefiGilPrisha?.['TOTAL-CHISACHON-MITZTABER-TZAFUY'], '') || '';
            const gilPrisha = cleanVal(heshbon?.YitraLefiGilPrisha?.['GIL-PRISHA'], '') || '';
            
              
             heshbonotColl.push({
                misparZihuyLakoach:misparZihuyLakoach,sugMezaheLakoach:sugMezaheLakoach,
                 misparPolisaOHeshbon:misparPolisaOHeshbon,shemSugTochnit:shemSugTochnit,
                shemTochnit:shemTochnit,kidodAchid:kidodAchid,taarichNechnut:taarichNechnut,
                taarichHitztarfutMutzar:taarichHitztarfutMutzar, sugKerenPensia:sugKerenPensia,
                pensiaVatikaOHadasha:pensiaVatikaOHadasha,statusPolisaOCheshbon:statusPolisaOCheshbon,
                shemMaslulHabituah:shemMaslulHabituah,hutalSHiabud:hutalSHiabud,hutalIkul:hutalIkul,
                yeshHalvaaBamutzar:yeshHalvaaBamutzar,yeshTvia:yeshTvia,sheurTesuaNetoH:sheurTesuaNetoH,
                tzviratChisachonChzuyaLeloPremiyot:tzviratChisachonChzuyaLeloPremiyot,
                totalChisachonMitztaberTzafuy:totalChisachonMitztaberTzafuy,gilPrisha:gilPrisha
          }) 
          
          
          await connection.execute(SQL_UPSERT_HESHBON, [
            misparPolisaOHeshbon,shemTochnit,kidodAchid,taarichNechnut,
            taarichHitztarfutMutzar,sugKerenPensia,pensiaVatikaOHadasha,
            statusPolisaOCheshbon,shemMaslulHabituah,hutalSHiabud,hutalIkul,
            yeshHalvaaBamutzar,yeshTvia,sheurTesuaNetoH,sugMezaheLakoach,
            misparZihuyLakoach,kodMezaheYatzran,sugMutzar
          ])
             
            // ----- מסלולים (ריבוי רשומות) -----
            let prtTakziv = heshbon?.PirteiTaktziv;
            prtTakziv=toArray(prtTakziv);

            
            for (const p of prtTakziv) {

                const sugTochnitOhHeshbon=cleanVal(p?.PirteiOved['SUG-TOCHNIT-O-CHESHBON']);
                const mprMaasikBeYatzran=cleanVal(p?.PirteiOved['MPR-MAASIK-BE-YATZRAN']);
                const statusMaasik=cleanVal(p?.PirteiOved['STATUS-MAASIK']);
                 netuneimutzarmaasikColl.push({
                    misparPolisaOHeshbon:misparPolisaOHeshbon,misparZihuyLakoach:misparZihuyLakoach,
                    sugMutzar:sugMutzar,sugTochnitOhHeshbon:sugTochnitOhHeshbon,
                    mprMaasikBeYatzran:mprMaasikBeYatzran, statusMaasik:statusMaasik 
                 }) 
                 heshbonotColl.push({netuneimutzarmaasik:netuneimutzarmaasikColl[0]});netuneimutzarmaasikColl=[];  
                 
                let maslulim = p.PerutMasluleiHashkaa;
                
                maslulim = toArray(maslulim);
                for (const maslul of maslulim) {
                    const kodMaslulHafrash=cleanVal(maslul?.['KOD-SUG-HAFRASHA']) || '';
                    const kodSugMaslul=cleanVal(maslul?.['KOD-SUG-MASLUL']) || '';
                    const schumTzviraBamaslul= cleanVal(maslul?.['SCHUM-TZVIRA-BAMASLUL']) || '';
                    const shemMaslulHashkaa=cleanVal(maslul?.['SHEM-MASLUL-HASHKAA']) || '';
                    const sheurDmeyNihulHafkadMivne= cleanVal(maslul?.['SHEUR-DMEI-NIHUL-HAFKADA-MIVNE']) || '';
                    const sheurDmeyNihulHisachonMivne=cleanVal(maslul?.['SHEUR-DMEI-NIHUL-HISACHON-MIVNE']) || '';
                    const tesuaNeto=cleanVal(maslul?.['TSUA-NETO']) || '';
                    const shiurAlotShnatitZpuiaLmslulHashkah=cleanVal(maslul?.['SHIUR-ALUT-SHNATIT-ZPUIA-LMSLUL-HASHKAH']) || '';
                   
                    

                    maslulimColl.push({
                        misparPolisaOHeshbon:misparPolisaOHeshbon,misparZihuyLakoach:misparZihuyLakoach,
                        sugMutzar:sugMutzar,kodMaslulHafrash:kodMaslulHafrash,kodSugMaslul:kodSugMaslul,
                        schumTzviraBamaslul:schumTzviraBamaslul,shemMaslulHashkaa:shemMaslulHashkaa,
                        sheurDmeyNihulHafkadMivne:sheurDmeyNihulHafkadMivne,
                        sheurDmeyNihulHisachonMivne:sheurDmeyNihulHisachonMivne,tesuaNeto:tesuaNeto,
                        shiurAlotShnatitZpuiaLmslulHashkah:shiurAlotShnatitZpuiaLmslulHashkah
                    })
                    heshbonotColl.push({maslul:maslulimColl[0]});
                    
                    
                    await connection.execute(SQL_INSERT_MASLUL, [
                    misparPolisaOHeshbon,misparZihuyLakoach,sugMutzar,kodMaslulHafrash,
                    kodSugMaslul,schumTzviraBamaslul,shemMaslulHashkaa,sheurDmeyNihulHafkadMivne,
                    sheurDmeyNihulHisachonMivne,tesuaNeto,shiurAlotShnatitZpuiaLmslulHashkah
                    ]); 
                }

                // ----- דמי ניהול (ריבוי רשומות) -----
                let dmey = p.PerutHotzaot?.MivneDmeiNihul?.PerutMivneDmeiNihul;
                dmey = toArray(dmey);
                for (const d of dmey) {
                    const sugHotzaa=cleanVal(d?.['SUG-HOTZAA']) || 0;
                    const sheurDmeiNihul=cleanVal(d?.['SHEUR-DMEI-NIHUL']) || '';
                    const dmeiNihulAchidim=cleanVal(d?.['DMEI-NIHUL-ACHIDIM']);
                    const kayemetHatava=cleanVal(d?.['KAYEMET-HATAVA']) || '';
                    const sugHatava=cleanVal(d?.['SUG-HATAVA']) || '';
                    const achozHatava=cleanVal(d?.['ACHOZ-HATAVA']) || '';
                    dmeinihulColl.push({
                         misparPolisaOHeshbon:misparPolisaOHeshbon,misparZihuyLakoach:misparZihuyLakoach,
                        sugMutzar:sugMutzar,sugHotzaa:sugHotzaa,sheurDmeiNihul:sheurDmeiNihul,
                        dmeiNihulAchidim:dmeiNihulAchidim,kayemetHatava:kayemetHatava,sugHatava:sugHatava,
                        achozHatava:achozHatava

                    })

                    heshbonotColl.push({dmeinihul:dmeinihulColl[0]});dmeinihulColl=[];
                    await connection.execute(SQL_INSERT_DMEY, [
                    misparPolisaOHeshbon,misparZihuyLakoach,sugMutzar,
                    sugHotzaa,sheurDmeiNihul,dmeiNihulAchidim,kayemetHatava,
                    sugHatava,achozHatava
                    ]);
                     
                }
                   
                //const sheurTesuaNeto=heshbon.Tesua['SHEUR-TESUA-NETO'];
                //heshbonotColl.push(sheurTesuaNeto);
                const taarichErechTzvirot = cleanVal(p.BlockItrot?.Yitrot?.['TAARICH-ERECH-TZVIROT']
                );

                // ----- יתרות (ריבוי רשומות) -----
                let yitrot = p.BlockItrot?.Yitrot?.PerutYitrot;
                yitrot = toArray(yitrot);
                for (const yitra of yitrot) {
                    const kodSugItra=cleanVal(yitra?.['KOD-SUG-ITRA']);
                    const totalChisachonMtzbr=cleanVal(yitra?.['TOTAL-CHISACHON-MTZBR']) || '';
                    const totalErkeiPidion=cleanVal(yitra?.['TOTAL-ERKEI-PIDION']);
                    const moedNezilutTagmulim=cleanVal(heshbon?.PirteiTaktziv?.BlockItrot?.Yitrot?.NesilutTag?.['MOED-NEZILUT-TAGMULIM']) || '';
                    const yitratKaspeyTagmulim=cleanVal(heshbon?.PirteiTaktziv?.BlockItrot?.Yitrot?.NesilutTag?.['YITRAT-KASPEY-TAGMULIM']) || '';
                
                    await connection.execute(SQL_INSERT_YITRA, [
                        taarichErechTzvirot,misparPolisaOHeshbon,misparZihuyLakoach,
                        sugMutzar,kodSugItra,totalChisachonMtzbr,totalErkeiPidion,
                        moedNezilutTagmulim,yitratKaspeyTagmulim
                    ]);
                    
                   yitrotColl.push({
                    taarichErechTzvirot:taarichErechTzvirot,
                    misparPolisaOHeshbon:misparPolisaOHeshbon,misparZihuyLakoach:misparZihuyLakoach,
                    sugMutzar:sugMutzar,kodSugItra:kodSugItra,totalChisachonMtzbr:totalChisachonMtzbr,
                    totalErkeiPidion:totalErkeiPidion,moedNezilutTagmulim:moedNezilutTagmulim,
                    yitratKaspeyTagmulim:yitratKaspeyTagmulim
                })
                heshbonotColl.push({yitrot:yitrotColl[0]});yitrotColl=[];
                }
            }                            
        };
                       
        await connection.commit();                
        console.log('✅ Commit:', path.basename(filePath));    
    }catch (err) {
        console.error(`❌ Error in file ${filePath}:`, err);
        await connection.rollback();
    }

}

/* =========================
   Main
========================= */

async function run() {
  let connection;let colldellTaz=[];


  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();
    console.log('Connected to the database.');
    

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.xml'));
   
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const xml = fs.readFileSync(filePath, 'utf-8');
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        const result = await parser.parseStringPromise(xml);
        const mimshak = result?.Mimshak || {};
        const mutzar = mimshak?.YeshutYatzran?.Mutzarim?.Mutzar;
        const misparZihuyLakoach = last9Digits(mutzar?.NetuneiMutzar?.YeshutLakoach?.['MISPAR-ZIHUY-LAKOACH']);
        const foundRecords = colldellTaz.filter(item => item.includes(misparZihuyLakoach));
       if (!foundRecords.length > 0) {
        console.log('Deleting records for TAZ:', misparZihuyLakoach);
        colldellTaz.push(misparZihuyLakoach);
        await deleteFromTable(misparZihuyLakoach);
        }
        
    }
    await connection.commit();

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      await processFile(filePath, connection);
    }

  } catch (err) {
    console.error('DB error:', err);
  } finally {
    if (connection) {
     
      console.log('Database connection closed.');
    }
  }
    await connection.end();
}
async function deleteFromTable(mispar_taz) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    try{
     await connection.execute(`DELETE FROM maslulim where misparZihuyLakoach="${mispar_taz}"`);
     await connection.execute(`DELETE FROM yitrot where misparZihuyLakoach="${mispar_taz}"`);
     await connection.execute(`DELETE FROM dmeinihul where misparZihuyLakoach="${mispar_taz}"`);
     await connection.execute(`DELETE FROM heshbonot where misparZihuyLakoach="${mispar_taz}"`);
    }catch(err){
       await connection.rollback();
    }
  } catch (err) {
    console.error('DB error:', err);
    
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

