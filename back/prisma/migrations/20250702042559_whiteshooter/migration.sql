-- CreateTable
CREATE TABLE "admins" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "nivel" SMALLINT NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtefatoToDungeonMaster" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(36) NOT NULL,

    CONSTRAINT "_ArtefatoToDungeonMaster_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DungeonMasterToProposta" (
    "A" VARCHAR(36) NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DungeonMasterToProposta_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtefatoToDungeonMaster_B_index" ON "_ArtefatoToDungeonMaster"("B");

-- CreateIndex
CREATE INDEX "_DungeonMasterToProposta_B_index" ON "_DungeonMasterToProposta"("B");

-- AddForeignKey
ALTER TABLE "_ArtefatoToDungeonMaster" ADD CONSTRAINT "_ArtefatoToDungeonMaster_A_fkey" FOREIGN KEY ("A") REFERENCES "artefatos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtefatoToDungeonMaster" ADD CONSTRAINT "_ArtefatoToDungeonMaster_B_fkey" FOREIGN KEY ("B") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DungeonMasterToProposta" ADD CONSTRAINT "_DungeonMasterToProposta_A_fkey" FOREIGN KEY ("A") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DungeonMasterToProposta" ADD CONSTRAINT "_DungeonMasterToProposta_B_fkey" FOREIGN KEY ("B") REFERENCES "propostas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
