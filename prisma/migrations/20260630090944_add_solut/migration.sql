/*
  Warnings:

  - You are about to drop the `solutions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "solutions" DROP CONSTRAINT "solutions_problemId_fkey";

-- DropTable
DROP TABLE "solutions";

-- CreateTable
CREATE TABLE "Solutions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "solution_code" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phisics_and_chemistry" TEXT NOT NULL,
    "target_problem" TEXT,
    "quantitative_effect_min" TEXT,
    "quantitative_effect_max" TEXT,
    "kin_increase_min" DOUBLE PRECISION,
    "kin_increase_max" DOUBLE PRECISION,
    "oil_production_growth_min" DOUBLE PRECISION,
    "oil_production_growth_max" DOUBLE PRECISION,
    "watercut_reduction_min" DOUBLE PRECISION,
    "watercut_reduction_max" DOUBLE PRECISION,
    "cost_reduction_min" DOUBLE PRECISION,
    "cost_reduction_max" DOUBLE PRECISION,
    "env_impact_reduction_min" DOUBLE PRECISION,
    "env_impact_reduction_max" DOUBLE PRECISION,
    "implementation_cost" TEXT,
    "validation_metrics" TEXT,
    "impact_kin" INTEGER,
    "impact_oil" INTEGER,
    "impact_watercut" INTEGER,
    "impact_cost" INTEGER,
    "impact_env" INTEGER,
    "integrated_score" DOUBLE PRECISION,
    "applicability_conditions" TEXT,
    "risks_limitations" TEXT,
    "readiness" TEXT,

    CONSTRAINT "Solutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemsToSolutions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemsToSolutions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solutions_solution_code_key" ON "Solutions"("solution_code");

-- CreateIndex
CREATE INDEX "_ProblemsToSolutions_B_index" ON "_ProblemsToSolutions"("B");

-- AddForeignKey
ALTER TABLE "_ProblemsToSolutions" ADD CONSTRAINT "_ProblemsToSolutions_A_fkey" FOREIGN KEY ("A") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemsToSolutions" ADD CONSTRAINT "_ProblemsToSolutions_B_fkey" FOREIGN KEY ("B") REFERENCES "Solutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
