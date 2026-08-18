// src/ques/ques.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { QuesService } from './ques.service'; // ИМПОРТ ЗДЕСЬ
import { CreateProblemDto, CreateQuesDto, CreateSolutionDto } from './ques.dto';

@Controller('ques')
export class QuesController {
  constructor(private readonly quesService: QuesService) {}

  @Post("/create")
  public async createQues(@Body() createQuesDto: CreateQuesDto) {
    return this.quesService.createQues(createQuesDto);
  }
  @Post("/create_many")
  public async createQuesMany(@Body() createQuesDtos: CreateQuesDto[]) {
    return this.quesService.createQuesMany(createQuesDtos);
  }
  @Post("/create_problem")
  public async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.quesService.createProblem(createProblemDto);
  }
  @Post("/create_problems_many")
  public async createProblemsMany(@Body() createProblemDto: CreateProblemDto[]) {
    return this.quesService.createProblemsMany(createProblemDto);
  }
  @Get("/get_problems")
  public async getProblems() {
    return this.quesService.getProblems();
  }
  @Post('/by-problems')
getSolutionsByProblems(@Body() dto: { problemIds: string[] }) {
  return this.quesService.getSolutionsByProblems(dto)
}
  @Get("/check/:id")
  public async check(@Param('id') id: string) {
    return this.quesService.check(id);
  }
  @Get("/")
  public get(){
    return this.quesService.get();
  }
  @Get("/:id")
  public getId(@Param('id') id: string){
    return this.quesService.getId(id);
  }
  @Put("/:id")
  public async updateQues(@Param('id') id: string, @Body() updateQuesDto: CreateQuesDto) {
    return this.quesService.updateQues(id, updateQuesDto);
  }
  @Delete("/:id")
  public async delId(@Param('id') id: string) {
    return this.quesService.delId(id);
  }

  // ➜ создать одну
  @Post('/solution')
  createOne(@Body() dto: CreateSolutionDto) {
    return this.quesService.createOneSolution(dto);
  }

  // ➜ создать много
  @Post('/solution_many')
  createMany(@Body() dto: CreateSolutionDto[]) {
    return this.quesService.createManySolutions(dto);
  }

  // ➜ список
  @Get('/solution')
  getAll() {
    return this.quesService.getAllSolution();
  }

  // ➜ по id
  @Get('/solution/:id')
  getById(@Param('id') id: string) {
    return this.quesService.getByIdSolution(id);
  }
}