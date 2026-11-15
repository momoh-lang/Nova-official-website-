/*
  NOVA launch settings
  Keep launchDate as null until the official date is announced.
  When ready, use ISO format: "2027-06-30T18:00:00+02:00"
*/
const NOVA_CONFIG = {
  launchDate: null
};

const $ = (id) => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

const menuToggle = $("menuToggle");
const nav = $("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

function setComingSoon() {
  $("countdownStatus").textContent = "COMING SOON";
  $("countdownMessage").textContent = "نعمل على تجهيز NOVA. سيتم الإعلان عن موعد الإطلاق قريبًا.";
  $("countdown").hidden = true;
  $("launchFoot").textContent = "LAUNCH DATE: TO BE ANNOUNCED";
}
function updateCountdown() {
  if (!NOVA_CONFIG.launchDate) {
    setComingSoon();
    return;
  }
  const target = new Date(NOVA_CONFIG.launchDate).getTime();
  if (!Number.isFinite(target)) {
    setComingSoon();
    $("countdownMessage").textContent = "تاريخ الإطلاق غير صالح. راجع إعداد launchDate في script.js.";
    return;
  }
  const remaining = target - Date.now();
  $("countdown").hidden = false;
  $("launchFoot").textContent = "OFFICIAL LAUNCH COUNTDOWN";
  if (remaining <= 0) {
    $("countdownStatus").textContent = "NOVA IS HERE";
    $("countdownMessage").textContent = "وصل موعد الإطلاق! تابع القنوات الرسمية لمعرفة تفاصيل الإصدار.";
    ["days","hours","minutes","seconds"].forEach(id => $(id).textContent = "00");
    return;
  }
  $("countdownStatus").textContent = "LAUNCHING IN";
  $("countdownMessage").textContent = "الوقت المتبقي حتى موعد إطلاق NOVA:";
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  $("days").textContent = String(days).padStart(2,"0");
  $("hours").textContent = String(hours).padStart(2,"0");
  $("minutes").textContent = String(minutes).padStart(2,"0");
  $("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
