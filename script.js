// Referințe către elementele din pagină
const form = document.getElementById("qrForm");
const tabs = document.querySelectorAll(".tab");
const textFields = document.getElementById("textFields");
const wifiFields = document.getElementById("wifiFields");
const qrText = document.getElementById("qrText");
const wifiSsid = document.getElementById("wifiSsid");
const wifiPass = document.getElementById("wifiPass");
const wifiType = document.getElementById("wifiType");
const qrSize = document.getElementById("qrSize");
const qrFg = document.getElementById("qrFg");
const qrBg = document.getElementById("qrBg");
const errorMsg = document.getElementById("errorMsg");
const canvas = document.getElementById("qrCanvas");
const previewLabel = document.getElementById("previewLabel");
const downloadBtn = document.getElementById("downloadBtn");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const themeToggle = document.getElementById("themeToggle");

let currentMode = "text";
const HISTORY_KEY = "qr_studio_history";

// Inițializare instanță QRious pe <canvas>
const qr = new QRious({
  element: canvas,
  size: 260,
  padding: 12,
  level: "H",
  value: "https://github.com",
});

// Schimbare mod: Text/Link vs. Wi-Fi
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentMode = tab.dataset.mode;
    tabs.forEach((t) => t.classList.toggle("active", t === tab));
    textFields.classList.toggle("hidden", currentMode !== "text");
    wifiFields.classList.toggle("hidden", currentMode !== "wifi");
    errorMsg.classList.add("hidden");
  });
});

// Construiește conținutul codului QR și validează datele
function getQrPayload() {
  if (currentMode === "text") {
    const val = qrText.value.trim();
    if (!val) return { error: "Introdu un text sau un link valid." };
    return { value: val, label: val };
  }

  const ssid = wifiSsid.value.trim();
  if (!ssid) return { error: "Introdu numele rețelei Wi-Fi (SSID)." };
  const pass = wifiPass.value;
  const type = wifiType.value;
  return {
    value: `WIFI:T:${type};S:${ssid};P:${pass};;`,
    label: `Wi-Fi: ${ssid}`,
  };
}

// Generează și afișează codul QR
function generateQR(saveToHistory = true) {
  const result = getQrPayload();
  if (result.error) {
    errorMsg.textContent = result.error;
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  qr.set({
    value: result.value,
    size: Number(qrSize.value),
    foreground: qrFg.value,
    background: qrBg.value,
  });

  previewLabel.textContent = result.label;
  if (saveToHistory) addHistory(result.value, result.label);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateQR(true);
});

// Descărcare cod QR în format PNG
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "cod-qr.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Gestionare istoric în localStorage (ultimele 6 coduri)
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function addHistory(value, label) {
  const items = loadHistory().filter((item) => item.value !== value);
  items.unshift({ value, label });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 6)));
  renderHistory();
}

function renderHistory() {
  const items = loadHistory();
  historyList.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "muted";
    empty.textContent = "Nu ai generat încă niciun cod QR.";
    historyList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-item";
    btn.textContent = item.label; // textContent previne injectarea HTML (XSS)
    btn.addEventListener("click", () => {
      qr.set({ value: item.value, size: Number(qrSize.value), foreground: qrFg.value, background: qrBg.value });
      previewLabel.textContent = item.label;
    });
    li.appendChild(btn);
    historyList.appendChild(li);
  });
}

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// Mod Dark / Light salvat în localStorage
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeToggle.textContent = dark ? "☀️ Mod luminos" : "🌙 Mod întunecat";
}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  localStorage.setItem("qr_theme", isDark ? "dark" : "light");
  applyTheme(isDark);
});

// Pornire inițială
applyTheme(localStorage.getItem("qr_theme") === "dark");
generateQR(false);
renderHistory();