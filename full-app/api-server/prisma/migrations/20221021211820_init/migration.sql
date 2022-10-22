-- CreateTable
CREATE TABLE "apartment_ads" (
    "id" SERIAL NOT NULL,
    "ad_title" TEXT NOT NULL,
    "ad_image_url" TEXT NOT NULL,

    CONSTRAINT "apartment_ads_pkey" PRIMARY KEY ("id")
);
