-- CreateTable
CREATE TABLE "Complaint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "date_resolved" INTEGER,
    "last_message" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "datetime" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "complaintId" INTEGER NOT NULL,
    CONSTRAINT "Message_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
