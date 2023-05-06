-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "date_resolved" INTEGER,
    "last_message" TEXT NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "datetime" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "complaintId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
