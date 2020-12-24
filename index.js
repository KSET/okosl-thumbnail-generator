const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

// Ignoriraj prva dva entry-ja argv
// (format je`[interpreter, path do skripte, ...argumenti]`)
// i uzmi parametre u obliku
// `$BROJ_PREDAVANJA $NASLOV_PREDAVANJA_KOJI_MOŽE_SADRŽATI_SPACE`
const [, , numRaw, ...titles] = process.argv;

// Dodaj 0 na početak dvoznamenkastog broja
const num = numRaw.padStart(2, '0');
// Spoji dijelove naslova u jedan (ako je naslov dan bez navodnika)
const title = titles.join(' ');

// Path to templejta (kinda html fajla koji će se renderat)
const templatePath = path.join(__dirname, "./page.ejs");
// Path gdje će se spremiti screenshot
const screenshotPath = path.join(__dirname, "out", `${num}.png`);

(async () => {
  // Renderaj template u html string
  const content = await ejs.renderFile(
    templatePath,
    // Varijable koje se mogu koristiti u template-u (imeUTemplate: vrijednost)
    {
      num: num,
      title: title,
    },
    // crna magija
    {
      async: true,
    }
  );

  // Pokreni novu instancu browsera (run chrome.exe)
  const browser = await puppeteer.launch({ headless: true });
  
  // Inicijaliziraj novu stranicu
  const page = await browser.newPage();
  
  // Postavi sadržaj stranice na gore renderan string
  // (basically otvori ovo što se gore renderalo)
  await page.setContent(
    content,
    {
      waitUntil: 'networkidle2',
    },
  );

  // Postavi rezoluciju browsera na 1920x1080
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  // Lupi screenshot i spremi ga na `screenshotPath`
  await page.screenshot({
    path: screenshotPath,
  });

  // Bivaj pristojna skripta i klikni iksić na virtualnom browseru
  await browser.close();
})();