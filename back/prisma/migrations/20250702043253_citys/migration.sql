/*
  Warnings:

  - Added the required column `cidade` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cidade" VARCHAR(60) NOT NULL;
