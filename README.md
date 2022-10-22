Quickstart guide:

In order to start the project, run "npm i" while cd'd into apartments-full-app (where the readme is), then cd into /full-app/apartment-ads and /full-app/api-server and repeat the process.

You will also need to create an empty postgres database.

While cd'd into /full-app/api-server, you will also need to run create a .env file that will contain a "DATABASE_URL" variable. The variable will store the url to the database in this format: 'postgresql://USER:PASSWORD@HOST:PORT/DATABASE' (ex. DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb)

Then, while still cd'd into /full-app/api-server, run the command "npx prisma migrate dev --name init" to create the table in the postgres database as per the Prisma schema.

There are two ways to run this project:

1. With the scraper filling the DB before starting the app

This is currently the default way, as the code to run the scraper in '/full-app/api-server/index.ts' is commented out in lines 6 and 10-13.

If you want to proceed running the app this way, then also cd into /Scraper and run the command "npm i", then create the same .env file you created in /full-app/api-server with the same url to the DB, then run "npm run dev" and wait for the scraper to finish. You will get a message in the console saying "Done!" when it is complete.

You can then cd back into apartments-full-app (where this readme is) and simply run "npm start" to concurrently run the front and back-end, in which case the apartment ads should load near instantly.

2. With the scraper running when the API is called

In this case you dont need the /Scraper folder at all and can delete it.

To run the app this way, simply go into '/full-app/api-server/index.ts' and un-comment the code in line 6 and 10-13. The scraper will then run when the API is called by the front-end.

This way, you will need to wait a while for the scraper to scrape everything, and due to that, the apartment ads will load periodically on the page.
