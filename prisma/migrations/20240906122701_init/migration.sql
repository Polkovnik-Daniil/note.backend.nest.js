/*
  Warnings:

  - You are about to drop the column `label_id` on the `Editor` table. All the data in the column will be lost.
  - You are about to drop the column `label_notes_id` on the `Editor` table. All the data in the column will be lost.
  - You are about to drop the column `note_id` on the `Editor` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Editor` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `label_id` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `label_notes_id` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `note_id` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hash_passsword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surname_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LabelNotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `labelId` to the `Editor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelNotesId` to the `Editor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `Editor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Editor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelId` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelNotesId` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashPasssword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surnameName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_label_id_fkey";

-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_label_notes_id_fkey";

-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_note_id_fkey";

-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_id_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_id_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reader" DROP CONSTRAINT "Reader_label_id_fkey";

-- DropForeignKey
ALTER TABLE "Reader" DROP CONSTRAINT "Reader_label_notes_id_fkey";

-- DropForeignKey
ALTER TABLE "Reader" DROP CONSTRAINT "Reader_note_id_fkey";

-- DropForeignKey
ALTER TABLE "Reader" DROP CONSTRAINT "Reader_user_id_fkey";

-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "label_id",
DROP COLUMN "label_notes_id",
DROP COLUMN "note_id",
DROP COLUMN "user_id",
ADD COLUMN     "labelId" TEXT NOT NULL,
ADD COLUMN     "labelNotesId" TEXT NOT NULL,
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reader" DROP COLUMN "label_id",
DROP COLUMN "label_notes_id",
DROP COLUMN "note_id",
DROP COLUMN "user_id",
ADD COLUMN     "labelId" TEXT NOT NULL,
ADD COLUMN     "labelNotesId" TEXT NOT NULL,
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "hash_passsword",
DROP COLUMN "role",
DROP COLUMN "surname_name",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "hashPasssword" TEXT NOT NULL,
ADD COLUMN     "surnameName" TEXT NOT NULL;

-- DropTable
DROP TABLE "LabelNotes";

-- CreateTable
CREATE TABLE "LabelNote" (
    "id" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabelNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabelNote_id_key" ON "LabelNote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LabelNote_noteId_key" ON "LabelNote"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "LabelNote_labelId_key" ON "LabelNote"("labelId");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_id_fkey" FOREIGN KEY ("id") REFERENCES "LabelNote"("labelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_fkey" FOREIGN KEY ("id") REFERENCES "LabelNote"("noteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_labelNotesId_fkey" FOREIGN KEY ("labelNotesId") REFERENCES "LabelNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reader" ADD CONSTRAINT "Reader_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reader" ADD CONSTRAINT "Reader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reader" ADD CONSTRAINT "Reader_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reader" ADD CONSTRAINT "Reader_labelNotesId_fkey" FOREIGN KEY ("labelNotesId") REFERENCES "LabelNote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
