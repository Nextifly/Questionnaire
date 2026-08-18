import { IsString, IsOptional, Matches, IsNumber } from 'class-validator';

export class CreateQuesDto {
  @IsString()
  @IsOptional()
  title?: string;

  // Динамическая сигнатура: принимает любые пары "field_code": "value_code"
  // Валидатор проверяет, что ключ соответствует формату c001...c216
  [key: string]: any;
}

export class CreateSolutionDto {
  @IsString()
  solution_code!: string;

  @IsString()
  class!: string;

  @IsString()
  name!: string;

  @IsString()
  country!: string;

  @IsString()
  description!: string;

  @IsString()
  phisics_and_chemistry!: string;

  @IsOptional()
  @IsString()
  target_problem?: string;

  @IsOptional()
  @IsString()
  quantitative_effect_min?: string;

  @IsOptional()
  @IsString()
  quantitative_effect_max?: string;

  @IsOptional() @IsNumber()
  kin_increase_min?: number;

  @IsOptional() @IsNumber()
  kin_increase_max?: number;

  @IsOptional() @IsNumber()
  oil_production_growth_min?: number;

  @IsOptional() @IsNumber()
  oil_production_growth_max?: number;

  @IsOptional() @IsNumber()
  watercut_reduction_min?: number;

  @IsOptional() @IsNumber()
  watercut_reduction_max?: number;

  @IsOptional() @IsNumber()
  cost_reduction_min?: number;

  @IsOptional() @IsNumber()
  cost_reduction_max?: number;

  @IsOptional() @IsNumber()
  env_impact_reduction_min?: number;

  @IsOptional() @IsNumber()
  env_impact_reduction_max?: number;

  @IsOptional() @IsString()
  implementation_cost?: string;

  @IsOptional() @IsString()
  validation_metrics?: string;

  @IsOptional() @IsNumber()
  impact_kin?: number;

  @IsOptional() @IsNumber()
  impact_oil?: number;

  @IsOptional() @IsNumber()
  impact_watercut?: number;

  @IsOptional() @IsNumber()
  impact_cost?: number;

  @IsOptional() @IsNumber()
  impact_env?: number;

  @IsOptional() @IsNumber()
  integrated_score?: number;

  @IsOptional() @IsString()
  applicability_conditions?: string;

  @IsOptional() @IsString()
  risks_limitations?: string;

  @IsOptional() @IsString()
  readiness?: string;

  @IsOptional() @IsString()
  problemId?: string;
}

export class CreateProblemDto {
  @IsString()
  @IsOptional()
  problem_name!: string

  @IsString()
  summary!: string

  @IsString()
  negative_results!: string

  @IsString()
  conditions_raw!: string

  @IsString()
  @IsOptional()
  mapping_status?: string = 'STRICT_READY'

  @IsNumber()
  atoms_total?: number = 0

  @IsNumber()
  @IsOptional()
  atoms_strict?: number = 0

  @IsNumber()
  @IsOptional()
  atoms_review?: number = 0

  @IsNumber()
  @IsOptional()
  atoms_unmapped?: number = 0

  @IsNumber()
  @IsOptional()
  review_atoms?: number = 0

  @IsNumber()
  @IsOptional()
  unmapped_atoms?: number = 0
}