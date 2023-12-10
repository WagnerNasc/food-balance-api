-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "height" DECIMAL(65,30),
    "weight" DECIMAL(65,30),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
