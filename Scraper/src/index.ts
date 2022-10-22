import puppeteer from "puppeteer";
import { PrismaClient } from "@prisma/client";

// NEW DB INSTANCE WITH PRISMA
const prisma = new PrismaClient();

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // FOR LOOP FOR PAGE ITTERATION
  for (let i = 1; i <= 25; i++) {
    console.log("Page:", i);

    let url = `https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`;

    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
    });

    // GET ALL PROPERTY DIVS ON A PAGE
    const aptElementList = await page.$$(
      "#page-layout > div.content-cover > div.content-inner > div.transcluded-content.ng-scope > div > div > div > div > div:nth-child(4) > div > div.property.ng-scope"
    );

    // LOOPING THROUGH ALL ELEMENTS FROM "aptElementList" QUERY
    for (let j = 0; j < aptElementList.length; j++) {
      console.log("Page item:", j);

      const apartment = aptElementList[j];

      // EXTRACTING IMAGE URL

      const adImageElement = await apartment.$("preact > div > div > a");
      const adImageUrl = await adImageElement?.$eval(
        "img",
        (el: { src: string }) =>
          el.src.replace("400", "749").replace("300", "562")
        //the website has 2 standard resolutions, so instead of going into the ad then getting the url, its simpler to just change the resolution in the URL itself
      );

      // EXTRACTING TITLE

      const adTitleElement = await apartment.$(
        "div > div > div > div > span > h2 > a"
      );
      const adTitleText = await adTitleElement?.$eval(
        "span",
        (el) => el.textContent
      );

      // INSERT INTO DB

      await prisma.apartment_ads.create({
        data: { ad_title: `${adTitleText}`, ad_image_url: `${adImageUrl}` },
      });
    }
  }

  await browser.close();
}

// EXPORTING SCRAPER AND CLOSING DB CONNECTION

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    console.log("Done!");
    await prisma.$disconnect();
  });
