const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3001";
const OUT = path.join(__dirname, "..", "screenshots");
fs.mkdirSync(OUT, { recursive: true });

const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2 };
const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2 };

const pages = [
  { file: "01-landing.png", url: "/", viewport: DESKTOP, fullPage: true },
  {
    file: "02-manager-dashboard.png",
    url: "/manager/dashboard",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "03-manager-job-new.png",
    url: "/manager/jobs/new",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "04-manager-job-detail.png",
    url: "/manager/jobs/job-001",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "05-manager-job-detail-completed.png",
    url: "/manager/jobs/job-003",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "06-manager-chat.png",
    url: "/manager/jobs/job-001/chat",
    viewport: MOBILE,
    fullPage: false,
  },
  {
    file: "07-manager-report.png",
    url: "/manager/report/rep-001",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "08-contractor-dashboard.png",
    url: "/contractor/dashboard",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "09-contractor-available.png",
    url: "/contractor/jobs/available",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "10-contractor-job-detail.png",
    url: "/contractor/jobs/cj-001",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "11-contractor-job-accepted.png",
    url: "/contractor/jobs/cj-005",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "12-contractor-complete.png",
    url: "/contractor/jobs/cj-005/complete",
    viewport: MOBILE,
    fullPage: true,
  },
  {
    file: "13-admin-stats.png",
    url: "/admin/stats",
    viewport: DESKTOP,
    fullPage: true,
  },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none",
    ],
  });

  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport(p.viewport);
    await page.goto(`${BASE}${p.url}`, { waitUntil: "networkidle0", timeout: 30000 });
    // Give web fonts/charts time to settle
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(OUT, p.file),
      fullPage: p.fullPage,
    });
    console.log("✓", p.file, p.url);
    await page.close();
  }

  await browser.close();
})();
