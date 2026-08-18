-- CreateTable
CREATE TABLE "solutions" (
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
    "problemId" TEXT,

    CONSTRAINT "solutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "solutions_solution_code_key" ON "solutions"("solution_code");

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
