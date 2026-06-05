(function(){

  // ===== GUARD =====
  if (window.OMSW_TOOL_RUNNING) {
    console.log("Already running");
    return;
  }
  window.OMSW_TOOL_RUNNING = true;

  console.log("START 🚀");


function getToken() {
  for (let key in localStorage) {
    const val = localStorage.getItem(key);
    if (!val) continue;

    try {
      const data = JSON.parse(val);

      if (data.authnResult && data.authnResult.access_token) {
        return data.authnResult.access_token;
      }

    } catch (e) {
    }
  }
}

function currDay(day, month, year) {
  const d = new Date(year, month - 1, day); // month-1 bo JS liczy od 0
  d.setDate(d.getDate());

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  
  return `${yyyy}-${mm}-${dd}`;
}

function currDay2(day, month, year) {
  const d = new Date(year, month - 1, day); // month-1 bo JS liczy od 0
  d.setDate(d.getDate());

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}


function wz(day, month, year) {

const { dateFrom, dateTo } = getDailyDays(day, month, year);
  
const d = String(day).padStart(2, "0");
const m = String(month).padStart(2, "0");
const y = String(year);

const pdfdate = String(currDay(day, month, year));

const our_body = "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":\"SWITCHED_OFF_OR_ON\",\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":true},{\"id\":\"ZW\",\"value\":true},{\"id\":\"PC\",\"value\":true}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":null,\"showAx\":true,\"showOx\":null,\"separationCC\":null,\"cartesianPositiveResultCodes\":true,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"extractAllSubelements\":null,\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":\"_area_voltage_vl\",\"fields\":[]}}"
  
return fetch("https://omsw.spsm.pse.pl/api/schedules/1/cards/list/export/pdf", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "Authorization": "Bearer " + getToken(),
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
  },
  "referrer": "https://omsw.spsm.pse.pl/schedules/1",
  "body":  our_body,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Wyłączane_załączane_${pdfdate}_OMSW.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}


function lz(day, month, year) {

const { dateFrom, dateTo } = getDailyDays(day, month, year);
  
const d = String(day).padStart(2, "0");
const m = String(month).padStart(2, "0");
const y = String(year);

const pdfdate = String(currDay(day, month, year));
  
const our_body = "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":true},{\"id\":\"ZW\",\"value\":true},{\"id\":\"PC\",\"value\":true}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":\"\",\"showAx\":true,\"showOx\":null,\"separationCC\":null,\"cartesianPositiveResultCodes\":true,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"extractAllSubelements\":null,\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":null,\"fields\":[{\"field\":\"outageVoltageLevel\",\"order\":\"asc\"}]}}"  

return fetch("https://omsw.spsm.pse.pl/api/schedules/1/cards/list/export/pdf", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "Authorization": "Bearer " + getToken(),
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
  },
  "referrer": "https://omsw.spsm.pse.pl/schedules/1",
  "body":  our_body,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Lista_zgłoszeń_${pdfdate}_OMSW.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}


function lzwpt(day, month, year) {
const { dateFrom, dateTo } = getDailyDays(day, month, year);
  
const d = String(day).padStart(2, "0");
const m = String(month).padStart(2, "0");
const y = String(year);

const pdfdate = String(currDay(day, month, year));
  
const our_body = "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":true},{\"id\":\"ZW\",\"value\":true},{\"id\":\"PC\",\"value\":true}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":null,\"showAx\":true,\"showOx\":null,\"separationCC\":null,\"cartesianPositiveResultCodes\":true,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"extractAllSubelements\":null,\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":\"_area_voltage_vl\",\"fields\":[{\"field\":\"status\",\"order\":\"desc\"}]}}"

return fetch("https://omsw.spsm.pse.pl/api/schedules/1/cards/list/export/pdf", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "Authorization": "Bearer " + getToken(),
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
  },
  "referrer": "https://omsw.spsm.pse.pl/schedules/1",
  "body":  our_body,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Lista_zgłoszeń_${pdfdate}_WPT_OMSW.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}

function wyl_ele(day, month, year) {

const { dateFrom, dateTo } = getDailyDays(day, month, year);
  
const d = String(day).padStart(2, "0");
const m = String(month).padStart(2, "0");
const y = String(year);

const pdfdate = String(currDay(day, month, year));
  
const our_body = "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":true},{\"id\":\"ZW\",\"value\":true},{\"id\":\"PC\",\"value\":true}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":\"\",\"showAx\":true,\"showOx\":null,\"separationCC\":null,\"cartesianPositiveResultCodes\":true,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"extractAllSubelements\":null,\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":null,\"fields\":[{\"field\":\"outageVoltageLevel\",\"order\":\"asc\"}]}}"

return fetch("https://omsw.spsm.pse.pl/api/schedules/1/cards/elements/export/pdf", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "Authorization": "Bearer " + getToken(),
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"

  },
  "referrer": "https://omsw.spsm.pse.pl/schedules/1",
  "body":  our_body,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Lista_wyłączonych_elementów_${pdfdate}_OMSW.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}

function mapa_d(day, month, year) {

const { dateFrom, dateTo } = getDailyDays(day, month, year);
  
const d = String(day).padStart(2, "0");
const m = String(month).padStart(2, "0");
const y = String(year);

const pdfdate = String(currDay(day, month, year));

const our_body = "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"ONE_DAY\",\"scheduleTabDay\":[" + year + "," + month + "," + day + ",0,0],\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":null,\"dateTo\":null,\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":false},{\"id\":\"ZW\",\"value\":false},{\"id\":\"PC\",\"value\":false}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":null,\"showAx\":null,\"showOx\":null,\"separationCC\":null,\"extractAllSubelements\":null,\"cartesianPositiveResultCodes\":null,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false,\"label\":\"\"},{\"id\":\"OD\",\"value\":false,\"label\":\"\"},{\"id\":\"WYC\",\"value\":false,\"label\":\"\"}],\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":null,\"fields\":[]}}"

return fetch("https://omsw.spsm.pse.pl/api/schedules/1/cards/elements/export/visioHourlyKdm", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "authorization": "Bearer " + getToken(),
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://omsw.spsm.pse.pl/schedules/1",
  "body": our_body,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${currDay2(day,month,year)}.wyl`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}


function shiftDateFromToday(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return { day, month, year };
}

// function sleep(ms) {
//   return new Promise(r => setTimeout(r, ms));
// }

async function narada(n1) {
  for (let i = 0; i <= n1; i++) {

    const { day, month, year } = shiftDateFromToday(i + 1);

    await wz(day, month, year);

    await lz(day, month, year);

    await wyl_ele(day, month, year);

    await mapa_d(day, month, year);
  }

  pokazKomunikat("Zakończono pobieranie dokumentów do narady", 5);
}

async function rano(n1) {
  const { day, month, year } = shiftDateFromToday(1);

  await wz(day, month, year);
  
  for (let i = 0; i <= n1; i++) {

    const { day, month, year } = shiftDateFromToday(i + 2);

    console.log(`DATA: ${day}.${month}.${year}`);

    await wz(day, month, year);
  }

  pokazKomunikat("Zakończono pobieranie wstępnych", 5);
}


async function koniec(n1) {
  for (let i = 0; i <= n1; i++) {

    // 👉 dzień od pojutrza
    const { day, month, year } = shiftDateFromToday(i + 2);

    console.log(`DATA: ${day}.${month}.${year}`);

    await wz(day, month, year);

    await lz(day, month, year);

    await lzwpt(day, month, year);

    await mapa_d(day, month, year);
  }

  pokazKomunikat("Zakończono pobieranie dokumentów na koniec dnia", 5);
}


function pokazKomunikat(msg, time) {
    const div = document.createElement("div");

    div.textContent = msg;

    Object.assign(div.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#333",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontSize: "14px",
        opacity: 0,
        transition: "opacity 0.3s ease"
    });

    document.body.appendChild(div);

    // fade-in
    setTimeout(() => {
        div.style.opacity = 1;
    }, 10);

    // po 5 sekundach fade-out i usunięcie
    setTimeout(() => {
        div.style.opacity = 0;
        setTimeout(() => div.remove(), 300);
    }, time*1000);
}
  
  
function getScheduleIdSafe() {
  const match = window.location.pathname.match(/\/schedules\/(\d+)/);

  if (match && parseInt(match[1], 10) > 1) {
    const scheduleId = parseInt(match[1], 10);
    return match[1];
  }
  else {
    pokazKomunikat("Nie rozpoczęto pobierania plików — jesteś w złym oknie", 5);
    return null;
  }
}



function tyg(){

const { dateFrom, dateTo } = getWeeklyDays();
const pdfdateto = shortDate(String(dateFrom));
const pdfdatefrom = shortDate(String(dateTo));

const scheduleId = getScheduleIdSafe();

if (!scheduleId) return;
  
return fetch(`https://omsw.spsm.pse.pl/api/schedules/${scheduleId}/cards/list/export/compliance/pdf/PWM`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "authorization": "Bearer " + getToken(),
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": `https://omsw.spsm.pse.pl/schedules/${scheduleId}`,
  "body": "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":\"\",\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":true},{\"id\":\"ZW\",\"value\":true},{\"id\":\"PC\",\"value\":true}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":\"\",\"showAx\":true,\"showOx\":null,\"separationCC\":null,\"extractAllSubelements\":null,\"cartesianPositiveResultCodes\":null,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false,\"label\":\"\"},{\"id\":\"OD\",\"value\":false,\"label\":\"\"},{\"id\":\"WYC\",\"value\":false,\"label\":\"\"}],\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":\"_area_voltage_vl\",\"fields\":[]}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `tyg_${pdfdatefrom}_${pdfdateto}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}


function getDailyDays(day, month, year) {
    const date = new Date(year, month - 1, day);

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
  
    const stop = new Date(date);
    stop.setHours(23, 59, 59, 999);
  
    return {
        dateFrom: start.toISOString(),
        dateTo: stop.toISOString()
    };
}
  
function getWeeklyDays() {
  const now = new Date();

  const day = now.getDay(); // 0-6
  const daysToSaturday = (6 - day + 7) % 7;

  const saturday = new Date(now);
  saturday.setHours(0, 0, 0, 0);
  saturday.setDate(now.getDate() + daysToSaturday);

  const friday = new Date(saturday);
  friday.setDate(saturday.getDate() + 6);
  friday.setHours(23, 59, 59, 999);

  return {
    dateFrom: saturday.toISOString(),
    dateTo: friday.toISOString()
  };
}


function shortDate(isoString) {
  return isoString.slice(0, 10);
}

function mapaTyg(){

const { dateFrom, dateTo } = getWeeklyDays();
const pdfdateto = shortDate(String(dateFrom));
const pdfdatefrom = shortDate(String(dateTo));

const scheduleId = getScheduleIdSafe();

if (!scheduleId) return;


fetch(`https://omsw.spsm.pse.pl/api/schedules/${scheduleId}/cards/elements/export/visioForDaysKdm`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "pl",
    "authorization": "Bearer " + getToken(),
    "cache-control": "no-cache",
    "content-type": "application/json",
    "decision": "accept",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"148\", \"Microsoft Edge\";v=\"148\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": `https://omsw.spsm.pse.pl/schedules/${scheduleId}`,
  "body": "{\"filter\":{\"scheduleTabDateFrom\":\"" + dateFrom + "\",\"scheduleTabDateTo\":\"" + dateTo + "\",\"scheduleTabMode\":\"BETWEEN\",\"scheduleTabDay\":null,\"cardNumber\":null,\"cardStatus\":[],\"dateFilterMode\":null,\"dateFrom\":\"" + dateFrom + "\",\"dateTo\":\"" + dateTo + "\",\"odmList\":[{\"id\":\"WA\",\"value\":false},{\"id\":\"RA\",\"value\":false},{\"id\":\"KA\",\"value\":false},{\"id\":\"PO\",\"value\":false},{\"id\":\"BY\",\"value\":false},{\"id\":\"ZAG\",\"value\":false}],\"opcMarker\":[],\"influenceOnExchange\":[],\"operativeManagements\":[],\"inPwk\":[],\"inPwt\":[],\"outageTypes\":[],\"outageKinds\":[],\"voltageProbeRequired\":null,\"scheduleRequired\":null,\"voltageLevels\":[],\"voltageList\":[],\"positiveResultCodes\":[{\"id\":\"PLA\",\"value\":false},{\"id\":\"ZW\",\"value\":false},{\"id\":\"PC\",\"value\":false}],\"otherResultCodes\":[{\"id\":\"NP\",\"value\":false},{\"id\":\"OD\",\"value\":false},{\"id\":\"WYC\",\"value\":false}],\"businessPartner\":[],\"businessPartnerRole\":[],\"planDeCjiOsd\":null,\"showAx\":null,\"showOx\":null,\"separationCC\":null,\"extractAllSubelements\":null,\"cartesianPositiveResultCodes\":null,\"cartesianOtherResultCodes\":[{\"id\":\"NP\",\"value\":false,\"label\":\"\"},{\"id\":\"OD\",\"value\":false,\"label\":\"\"},{\"id\":\"WYC\",\"value\":false,\"label\":\"\"}],\"cardVisibility\":\"NOT_HIDDEN\"},\"sort\":{\"preset\":null,\"fields\":[]},\"exportMode\":\"SINGLE_FILE\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => {
  console.log("STATUS:", res.status);
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.blob();
})
.then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `tyg_${pdfdatefrom}_${pdfdateto}.wyl`;
  document.body.appendChild(a);
  a.click();
  a.remove();
});
}


async function tygodniowka() {

  pokazKomunikat("Rozpoczęto pobieranie tygodniówki - może chwilę potrwać", 5);

  await mapaTyg();

  await tyg();

  pokazKomunikat("Zakończono pobieranie tygodniówki", 5);
}
  

function help() {
'======================================='
'Po pomoc wpisz razem z nawiasami help()'

'Pomoc wydrukuje się w podzakładce info na console'
'======================================='
                                                                                                                                                                                                         
  
  console.log("%cWitaj w pisanym na kolanie programie wspomagającym pracę w OMSW", "color: green;");
  console.log("Kod został zaprojektowany tak, aby przyspieszać eksporty plików i zapisywać je pod odpowiednimi nazwami.");
  console.log("%cFunkcje główne:\nrano(%cliczba_dni_wolnych%c): %cEksportuje pliki PDF na D+1 i D+2 biorąc pod uwagę liczbę dni wolnych, którą należy w nawiasach wpisać przy wywołaniu funkcji. Wpisanie %crano(0) %cwyeksportuje pliki na jutro i pojutrze", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nnarada(%cliczba_dni_wolnych%c): %cEksportuje pliki PDF na D+1 oraz mapę/mapy biorąc pod uwagę liczbę dni wolnych, którą należy w nawiasach wpisać przy wywołaniu funkcji. Wpisanie %cnarada(0) %cwyeksportuje tylko pliki na jutro", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nkoniec(%cliczba_dni_wolnych%c): %cEksportuje pliki PDF na D+2 oraz mapę/mapy biorąc pod uwagę liczbę dni wolnych, którą należy w nawiasach wpisać przy wywołaniu funkcji. Wpisanie %ckoniec(0) %cwyeksportuje tylko pliki na pojutrze", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%cFunkcje pomocnicze:\nwyl_ele(%cdzień, miesiąc, rok%c): %cEksportuje pojedyńczy plik PDF o nazwie Lista_wyłączonych_elementów_data_OMSW na zadany dzień. Przykładowo wpisanie %cwe(24,5,2026) %cwyeksportuje plik Lista_wyłączonych_elementów_2026-05-24_OMSW", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nwz(%cdzień, miesiąc, rok%c): %cEksportuje pojedyńczy plik PDF o nazwie Wyłączane_załączane_data_OMSW na zadany dzień. Przykładowo wpisanie %cwz(24,5,2026) %cwyeksportuje plik Wyłączane_załączane_2026-05-24_OMSW", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nlz(%cdzień, miesiąc, rok%c): %cEksportuje pojedyńczy plik PDF o nazwie Lista_zgłoszeń_data_OMSW na zadany dzień. Przykładowo wpisanie %clz(24,5,2026) %cwyeksportuje plik Lista_zgłoszeń_2026-05-24_OMSW", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nlzwpt(%cdzień, miesiąc, rok%c): %cEksportuje pojedyńczy plik PDF o nazwie Lista_zgłoszeń_data_WPT_OMSW na zadany dzień. Od funkcji wyżej różni się wyłącznie sortowaniem. Przykładowo wpisanie %clzwpt(24,5,2026) %cwyeksportuje plik Lista_zgłoszeń_2026-05-24_WPT_OMSW", "color: green;", "color: red;", "color: green;", "", "color: green;", "");
  console.log("%c\nmapa_d(%cdzień, miesiąc, rok%c): %cEksportuje pojedyńczy plik wyłączeń o nazwie dzień-miesiąc-rok na zadany dzień. Plik ten później może zostać wykorzystany do wygenerowania mapy za pomocą makry %cMakro_Mapa_KSE_OMSW%c. Przykładowo wpisanie %cmapa_d(24,5,2026) %cwyeksportuje plik 24-05-2026", "color: green;", "color: red;", "color: green;", "", "color: green;", "", "color: green;", "");
  console.log("%cMiłej pracy i powodzenia!\n%cCo złego to nie ja\nAutor - Arpad Micor, DO-WPT", "color: green;", "");
  
}


  // ===== UI =====
  function init() {
  console.log("INIT START ✅");

  const panel = document.createElement("div");
  panel.id = "omsw-panel";

  panel.style.position = "fixed";
  panel.style.bottom = "20px";
  panel.style.left = "20px";
  panel.style.background = "#111";
  panel.style.color = "white";
  panel.style.padding = "12px";
  panel.style.zIndex = "999999";
  panel.style.borderRadius = "10px";
  panel.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  panel.style.fontFamily = "Arial";

  panel.innerHTML = `

    <div id="drag-header" style="cursor:grab; margin-bottom:8px; font-weight:bold;">
      OMSW EXPORT TOOL
    </div>
    <div style="margin-bottom:8px;">
      Funkcje główne:
    </div>
    <div style="margin-bottom:8px;">
      Liczba dni wolnych:
      <input id="days" type="number" value="0" style="width:40px;">
    </div>

    <div style="display:flex; flex-direction:column; gap:5px;">
      <button id="rano">Wstępne</button>
      <button id="narada">Do narady</button>
      <button id="koniec">Na koniec dnia</button>
      <button id="tygodniowka">Tygodniówka</button>
    </div>

    <div id="status" style="margin-top:8px; font-size:12px;"></div>

    <div style="margin-bottom:8px;">
      Funkcje pomocnicze:
    </div>

    
  <div style="display:flex; flex-direction:column; gap:4px;">
  
    <div style="display:flex; gap:6px;">

    Data:
   
    <input id="day" type="number" placeholder="DD" min="1" max="31"
      style="width:40px;">
  
  
    <input id="month" type="number" placeholder="MM" min="1" max="12"
      style="width:40px;">
  
  
    <input id="year" type="number" placeholder="YYYY"
      style="width:55px;">

    </div>
  
  </div>

    
    <div style="display:flex; flex-direction:column; gap:5px;">
      <button id="wz">Wyłączane załączane</button>
      <button id="lz">Lista zgłoszeń</button>
      <button id="lzwpt">Lista zgłoszeń WPT</button>
      <button id="wyl_ele">Lista wyłączanych elementów</button>
      <button id="mapa_d">Mapa</button>
    </div>
  

  `;

    let isDragging = false;
    let offsetX, offsetY;
    
    panel.addEventListener("mousedown", (e) => {
      isDragging = true;
    
      // zapamiętaj offset kliknięcia
      offsetX = e.clientX - panel.getBoundingClientRect().left;
      offsetY = e.clientY - panel.getBoundingClientRect().top;
    
      panel.style.cursor = "grabbing";
    });
    
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
    
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
    
      // blokada żeby nie wyjechał poza ekran
      x = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, y));
    
      panel.style.left = x + "px";
      panel.style.top = y + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
    });
    
    document.addEventListener("mouseup", () => {
      isDragging = false;
      panel.style.cursor = "grab";
    });
    
    const header = panel.querySelector("#drag-header");
    
    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - panel.getBoundingClientRect().left;
      offsetY = e.clientY - panel.getBoundingClientRect().top;
    });


    document.body.appendChild(panel);

    
    const now = new Date();
    
    document.getElementById("day").value = now.getDate() + 1;
    document.getElementById("month").value = now.getMonth() + 1;
    document.getElementById("year").value = now.getFullYear();
    


    document.getElementById("rano").onclick = () => {
      rano(Number(document.getElementById("days").value));
    };
    document.getElementById("narada").onclick = () => {
      narada(Number(document.getElementById("days").value));
    };
    document.getElementById("koniec").onclick = () => {
      koniec(Number(document.getElementById("days").value));
    };
    document.getElementById("tygodniowka").onclick = () => {
      tygodniowka();
    };
    document.getElementById("wz").onclick = () => {
      wz(Number(document.getElementById("day").value),Number(document.getElementById("month").value),Number(document.getElementById("year").value));
    };
    document.getElementById("lz").onclick = () => {
      lz(Number(document.getElementById("day").value),Number(document.getElementById("month").value),Number(document.getElementById("year").value));
    };
    document.getElementById("lzwpt").onclick = () => {
      lzwpt(Number(document.getElementById("day").value),Number(document.getElementById("month").value),Number(document.getElementById("year").value));
    };
    document.getElementById("wyl_ele").onclick = () => {
      wyl_ele(Number(document.getElementById("day").value),Number(document.getElementById("month").value),Number(document.getElementById("year").value));
    };
    document.getElementById("mapa_d").onclick = () => {
      mapa_d(Number(document.getElementById("day").value),Number(document.getElementById("month").value),Number(document.getElementById("year").value));
    };
    
  }

  // ===== START =====
  setTimeout(init, 2000);

})();
