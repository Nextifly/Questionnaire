import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProblemDto, CreateQuesDto, CreateSolutionDto } from './ques.dto';

@Injectable()
export class QuesService {
  constructor(private readonly prisma: PrismaService) {}

  async createQues(createQuesDto: CreateQuesDto) {
    return this.prisma.questionnaire.create({
      data: createQuesDto,
    });
  }

  async createQuesMany(createQuesDtos: CreateQuesDto[]) {
    return this.prisma.$transaction(
      createQuesDtos.map(dto =>
        this.prisma.questionnaire.create({
          data: dto,
        }),
      ),
    );
  }

  async createProblem(createProblemDto: CreateProblemDto) {
    return this.prisma.problems.create({
      data: createProblemDto,
    });
  }

  async createProblemsMany(createProblemDtos: CreateProblemDto[]) {
    return this.prisma.problems.createMany({
      data: createProblemDtos,
      skipDuplicates: true,
    });
  }

  getProblems() {
    return this.prisma.problems.findMany();
  }

  async createOneSolution(dto: CreateSolutionDto) {
    return this.prisma.solutions.create({
      data: dto,
    });
  }

  async createManySolutions(dto: CreateSolutionDto[]) {
    return this.prisma.solutions.createMany({
      data: dto,
      skipDuplicates: true,
    });
  }

  async getAllSolution() {
    return this.prisma.solutions.findMany();
  }

  async getByIdSolution(id: string) {
    return this.prisma.solutions.findUnique({
      where: { id },
    });
  }

  async getSolutionsByProblems(dto: { problemIds: string[] }) {
  const { problemIds } = dto

  if (!problemIds?.length) return []

  // 1. получаем проблемы с кодами решений + названием
  const problems = await this.prisma.problems.findMany({
    where: {
      id: { in: problemIds },
    },
    select: {
      id: true,
      problem_name: true, // ✅ ДОБАВИЛИ
      solutions: true,
    },
  })

  if (!problems.length) {
    throw new NotFoundException('Problems not found')
  }

  // 2. уникальные коды решений
  const solutionCodes = [
    ...new Set(problems.flatMap(p => p.solutions ?? [])),
  ]

  if (!solutionCodes.length) {
    return problems.map(p => ({
      problemId: p.id,
      problemName: p.problem_name, // ✅ ДОБАВИЛИ
      solutions: [],
    }))
  }

  // 3. один запрос в БД
  const solutions = await this.prisma.solutions.findMany({
    where: {
      solution_code: { in: solutionCodes },
    },
  })

  // 4. map для быстрого доступа
  const solutionMap = Object.fromEntries(
    solutions.map(s => [s.solution_code, s])
  )

  // 5. финальный ответ
  return problems.map(problem => ({
    problemId: problem.id,
    problemName: problem.problem_name, // ✅ ВОТ ЭТО НУЖНО
    solutions: (problem.solutions ?? [])
      .map(code => solutionMap[code])
      .filter(Boolean),
  }))
}

  async check(questionnaireId: string) {
    const questionnaire = await this.prisma.questionnaire.findUnique({
      where: { id: questionnaireId },
    });

    if (!questionnaire) {
      throw new NotFoundException('Questionnaire not found');
    }

    const problems = await this.prisma.problems.findMany();

    return problems.filter(problem =>
      this.isMatch(problem, questionnaire),
    );
  }

  // =========================
  // MATCHING LOGIC (FIXED)
  // =========================

  private isMatch(problem: any, questionnaire: any): boolean {
    for (const [key, value] of Object.entries(problem)) {
      // служебные поля
      if (
        key === 'id' ||
        key === 'createdAt' ||
        key === 'updatedAt' ||
        key === 'problem_name' ||
        key === 'summary' ||
        key === 'negative_results' ||
        key === 'solutions'
      ) {
        continue;
      }

      // если у проблемы нет условий — пропускаем
      if (!Array.isArray(value) || value.length === 0) {
        continue;
      }

      const qValue = questionnaire[key];

      const qArray = Array.isArray(qValue)
        ? qValue
        : qValue != null
          ? [qValue]
          : [];

      // если в анкете нет данных → нет матча
      if (qArray.length === 0) {
        return false;
      }

      const hasMatch = value.some(v => qArray.includes(v));

      if (!hasMatch) {
        return false;
      }
    }

    return true;
  }

  get() {
    return this.prisma.questionnaire.findMany();
  }

  getId(id: string) {
    return this.prisma.questionnaire.findUnique({
      where: { id },
    });
  }

  updateQues(id: string, updateQuesDto: CreateQuesDto) {
    return this.prisma.questionnaire.update({
      where: { id },
      data: updateQuesDto,
    });
  }

  delId(id: string) {
    return this.prisma.questionnaire.delete({
      where: { id },
    });
  }
}