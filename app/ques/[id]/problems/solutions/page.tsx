'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'

// Мапа для перевода технических кодов классов в понятные названия
export const SOLUTION_CLASS_MAP: Record<string, string> = {
  SCLS_POLYMER_FLOODING: 'Полимерное заводнение / контроль подвижности воды',
  SCLS_SURFACTANT_WETTABILITY: 'Поверхностно-активные вещества / капиллярное вытеснение / изменение смачиваемости',
  SCLS_CHEMICAL_FLOODING_COMBO: 'Комбинированное химическое заводнение: ПАВ + полимер; щелочь + ПАВ + полимер; щелочь + полимер',
  SCLS_ION_TUNED_LOW_SALINITY_WATER: 'Вода с подобранным ионным составом / низкоминерализованное заводнение',
  SCLS_CONFORMANCE_WATER_SHUTOFF: 'Потокоотклонение / водоизоляция / выравнивание профиля вытеснения',
  SCLS_FOAM_GAS_CONFORMANCE: 'Пена / газожидкостное потокоотклонение',
  SCLS_NANOFLUIDS_NANOREAGENTS: 'Наножидкости / нанореагенты для увеличения нефтеотдачи',
  SCLS_THERMAL_THERMOCHEMICAL: 'Тепловые и термохимические физико-химические решения',
  SCLS_GAS_SOLVENT_CHEMICAL: 'Газо-химическое и растворительное воздействие',
  SCLS_NEAR_WELLBORE_TREATMENT: 'Призабойная зона пласта / устранение физико-химической кольматации',
  SCLS_BIO_PHYS_CHEM_MEOR: 'Биофизико-химические решения / биологические ПАВ / микробиологическое увеличение нефтеотдачи',
  SCLS_INTEGRATED_PACKAGE: 'Комплексный пакет для совокупности проблем',
}

// Функция-хелпер для получения читаемого названия класса
export const getSolutionClassName = (classCode: string): string => {
  return SOLUTION_CLASS_MAP[classCode] || classCode
}

interface SolutionDetails {
  id: string
  createdAt: string
  updatedAt: string
  solution_code: string
  class: string
  name: string
  country: string
  description: string
  phisics_and_chemistry: string
  target_problem: string | null
  quantitative_effect_min: string | null
  quantitative_effect_max: string | null

  kin_increase_min: number | null
  kin_increase_max: number | null
  oil_production_growth_min: number | null
  oil_production_growth_max: number | null
  watercut_reduction_min: number | null
  watercut_reduction_max: number | null
  cost_reduction_min: number | null
  cost_reduction_max: number | null
  env_impact_reduction_min: number | null
  env_impact_reduction_max: number | null

  implementation_cost: string | null
  validation_metrics: string | null

  impact_kin: number | null
  impact_oil: number | null
  impact_watercut: number | null
  impact_cost: number | null
  impact_env: number | null

  integrated_score: number | null
  applicability_conditions: string | null
  risks_limitations: string | null
  readiness: string | null
}

interface SolutionItem {
  id: number | string
  problemId: string
  problemName: string
  solutions: SolutionDetails[]
}

export default function SolutionsPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params?.id as string | undefined
  const solutionsQuery = searchParams?.get('solutions')

  const [data, setData] = useState<SolutionItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1-й уровень: Раскрытые проблемы
  const [expandedProblems, setExpandedProblems] = useState<Record<string, boolean>>({})
  
  // 2-й уровень: Раскрытые классы (ключ в формате "problemId_className")
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!id || !solutionsQuery) {
      setIsLoading(false)
      return
    }

    async function fetchSolutions() {
      try {
        setIsLoading(true)
        setError(null)

        const problemIds = solutionsQuery!
          .split(',')
          .map(v => v.trim())
          .filter(Boolean)

        const response = await fetch(
          `http://85.193.88.37:4200/ques/by-problems`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              problemIds,
              quesId: id,
            }),
          },
        )

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`)
        }

        const result = await response.json()
        setData(Array.isArray(result) ? result : [])
      } catch (err: any) {
        console.error('Ошибка загрузки решений:', err)
        setError(err.message || 'Ошибка загрузки решений')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSolutions()
  }, [id, solutionsQuery])

  // Группировка решений по классам внутри каждой проблемы
  const groupedData = useMemo(() => {
    return data.map(group => {
      const classesMap: Record<string, SolutionDetails[]> = {}
      
      if (group.solutions) {
        group.solutions.forEach(sol => {
          const className = sol.class || 'Без класса'
          if (!classesMap[className]) {
            classesMap[className] = []
          }
          classesMap[className].push(sol)
        })
      }

      return {
        ...group,
        groupedSolutions: Object.entries(classesMap).map(([className, solutions]) => ({
          className,
          solutions,
        })),
      }
    })
  }, [data])

  const toggleProblemExpand = (problemId: string) => {
    setExpandedProblems(prev => ({ ...prev, [problemId]: !prev[problemId] }))
  }

  const toggleClassExpand = (problemId: string, className: string) => {
    const key = `${problemId}_${className}`
    setExpandedClasses(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!id || !solutionsQuery) {
    return (
      <div className='p-8 flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-600 text-sm'>
        <p>Не переданы необходимые параметры</p>
        <button
          onClick={() => router.back()}
          className='mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold shadow transition-all active:scale-95'
        >
          Назад
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='p-8 min-h-screen bg-slate-50 text-slate-600 text-sm flex items-center justify-center'>
        Загрузка рекомендуемых решений...
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-8 min-h-screen bg-slate-50 flex flex-col items-center justify-center text-red-600 text-sm gap-4'>
        <p>Ошибка: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow transition-all active:scale-95'
        >
          Повторить
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden'>
      <div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />
      <div className='absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />

      <div className='max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden'>
        {/* Шапка страницы */}
        <div className='border-b border-slate-100 p-6 sm:p-8 bg-slate-50/80 backdrop-blur-md flex items-center gap-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='flex items-center justify-center w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all duration-150 transform active:scale-95 outline-none'
            title='Назад'
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-5 h-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
            </svg>
          </button>

          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl'>
              Рекомендуемые решения
            </h1>
            <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500'>
              <p>Технологические карты для устранения выявленных несоответствий</p>
              <span className='text-xs font-mono bg-slate-200/60 px-2 py-0.5 rounded text-slate-600'>
                ID анкеты: {id}
              </span>
            </div>
          </div>
        </div>

        {/* Контент списка решений */}
        <div className='p-6 sm:p-8 space-y-4'>
          {groupedData.length === 0 ? (
            <div className='text-center py-12 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200'>
              Для выбранных проблем подходящие технологические решения не найдены.
            </div>
          ) : (
            <div className='border border-slate-200/60 rounded-xl overflow-hidden bg-white shadow-sm divide-y divide-slate-100'>
              {groupedData.map(group => {
                const isProblemExpanded = !!expandedProblems[group.problemId]
                const hasClasses = group.groupedSolutions.length > 0
                const totalSolutionsCount = group.solutions?.length ?? 0

                return (
                  <div key={group.problemId} className={`transition-colors duration-150 ${isProblemExpanded ? 'bg-slate-50/30' : 'hover:bg-slate-50/10'}`}>
                    
                    {/* УРОВЕНЬ 1: НАЗВАНИЕ ПРОБЛЕМЫ */}
                    <div
                      onClick={() => toggleProblemExpand(group.problemId)}
                      className='flex items-center justify-between p-4 sm:p-5 gap-4 select-none cursor-pointer bg-slate-100/50 hover:bg-slate-100 transition-colors'
                    >
                      {/* flex-1 min-w-0 дает текстовому блоку корректно рассчитывать ширину и не выталкивать соседа */}
                      <div className='flex items-start sm:items-center gap-3 flex-1 min-w-0'>
                        <span className={`w-2.5 h-2.5 rounded-full mt-1.5 sm:mt-0 flex-shrink-0 ${hasClasses ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                        {/* Заменили truncate на break-words для возможности нормального многострочного переноса */}
                        <h2 className='text-sm font-black text-slate-800 uppercase tracking-wide break-words leading-normal'>
                          Проблема: {group.problemName ?? group.problemId}
                        </h2>
                        {/* shrink-0 и whitespace-nowrap железобетонно держат счетчик в одну строку */}
                        <span className='text-xs font-mono px-2 py-0.5 rounded-full font-bold bg-slate-200 text-slate-700 shrink-0 whitespace-nowrap self-start sm:self-auto'>
                          Решений: {totalSolutionsCount}
                        </span>
                      </div>

                      <button
                        type='button'
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-slate-500 shrink-0 transition-all duration-200 ${isProblemExpanded ? 'rotate-180 bg-slate-200 text-slate-950' : ''}`}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-4 h-4'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                        </svg>
                      </button>
                    </div>

                    {/* УРОВЕНЬ 2: КЛАССЫ РЕШЕНИЙ ВНУТРИ ПРОБЛЕМЫ */}
                    {isProblemExpanded && (
                      <div className='p-4 bg-slate-50/50 border-t border-slate-200/60 space-y-3 animate-fadeIn'>
                        {!hasClasses ? (
                          <div className='text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-200 font-medium'>
                            Для данной проблемы технологические решения отсутствуют.
                          </div>
                        ) : (
                          group.groupedSolutions.map(classGroup => {
                            const classKey = `${group.problemId}_${classGroup.className}`
                            const isClassExpanded = !!expandedClasses[classKey]

                            return (
                              <div key={classGroup.className} className='border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm'>
                                
                                {/* Кнопка открытия класса */}
                                <div
                                  onClick={() => toggleClassExpand(group.problemId, classGroup.className)}
                                  className='flex items-center justify-between p-3 sm:p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer select-none transition-colors'
                                >
                                  <div className='flex items-start sm:items-center gap-3 min-w-0 flex-1 pr-2'>
                                    <span className='text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded break-words leading-relaxed text-left'>
                                      {getSolutionClassName(classGroup.className)}
                                    </span>
                                    <span className='text-xs text-slate-500 font-medium shrink-0 whitespace-nowrap mt-0.5 sm:mt-0'>
                                      (в этом классе: {classGroup.solutions.length})
                                    </span>
                                  </div>
                                  <button
                                    type='button'
                                    className={`flex items-center justify-center w-6 h-6 rounded-full text-slate-500 transition-all duration-200 shrink-0 ${isClassExpanded ? 'rotate-180 text-slate-900' : ''}`}
                                  >
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-3.5 h-3.5'>
                                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                                    </svg>
                                  </button>
                                </div>

                                {/* УРОВЕНЬ 3: СПИСОК САМИХ КАРТОЧЕК РЕШЕНИЙ */}
                                {isClassExpanded && (
                                  <div className='p-4 bg-white border-t border-slate-100 space-y-6 animate-fadeIn'>
                                    <div className='grid grid-cols-1 gap-6'>
                                      {classGroup.solutions.map(sol => (
                                        <div
                                          key={sol.id}
                                          className='p-6 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-slate-300/80 transition-all duration-150'
                                        >
                                          {/* HEADER КАРТОЧКИ */}
                                          <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-4'>
                                            <div>
                                              <div className='flex flex-wrap items-center gap-2 mb-1'>
                                                <span className='text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded'>
                                                  {sol.country}
                                                </span>
                                              </div>
                                              <h3 className='text-base font-extrabold text-slate-900'>
                                                {sol.name}
                                              </h3>
                                            </div>
                                            <div className='flex flex-row sm:flex-col items-end gap-1.5 shrink-0'>
                                              <span className='text-xs font-mono bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-600 font-bold'>
                                                {sol.solution_code}
                                              </span>
                                              {sol.readiness && (
                                                <span className='text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60'>
                                                  Готовность: {sol.readiness}
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* ТЕКСТОВЫЕ БЛОКИ */}
                                          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 text-sm text-slate-700'>
                                            <div className='space-y-1'>
                                              <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                                Описание решения
                                              </h4>
                                              <p className='leading-relaxed text-slate-600 bg-slate-50/60 p-3 rounded-lg border border-slate-100/60 h-[110px] overflow-y-auto text-xs'>
                                                {sol.description}
                                              </p>
                                            </div>
                                            <div className='space-y-1'>
                                              <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                                Физико-химический механизм
                                              </h4>
                                              <p className='leading-relaxed text-slate-600 bg-slate-50/60 p-3 rounded-lg border border-slate-100/60 h-[110px] overflow-y-auto text-xs'>
                                                {sol.phisics_and_chemistry}
                                              </p>
                                            </div>
                                            <div className='space-y-1'>
                                              <h4 className='text-xs font-bold uppercase tracking-wider text-amber-600'>
                                                Количественный эффект
                                              </h4>
                                              <p className='leading-relaxed text-slate-700 bg-amber-50/30 p-3 rounded-lg border border-amber-100/40 h-[110px] overflow-y-auto text-xs font-medium'>
                                                {sol.quantitative_effect_min || sol.quantitative_effect_max
                                                  ? `${sol.quantitative_effect_min ?? ''} — ${sol.quantitative_effect_max ?? ''}`.trim()
                                                  : 'Данные о результативности отсутствуют'}
                                              </p>
                                            </div>
                                          </div>

                                          {/* ЦЕЛЕВАЯ ПРОБЛЕМА И ПРОВЕРКА ЭФФЕКТА */}
                                          {(sol.target_problem || sol.validation_metrics || sol.implementation_cost) && (
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-5 bg-slate-50/40 p-3 rounded-xl border border-slate-100 text-xs'>
                                              {sol.target_problem && (
                                                <div>
                                                  <span className='block font-bold text-slate-400 uppercase tracking-wider mb-0.5'>
                                                    Target / Совокупность проблем
                                                  </span>
                                                  <span className='text-slate-600 font-medium'>
                                                    {sol.target_problem}
                                                  </span>
                                                </div>
                                              )}
                                              {sol.validation_metrics && (
                                                <div>
                                                  <span className='block font-bold text-slate-400 uppercase tracking-wider mb-0.5'>
                                                    Показатели для проверки эффекта
                                                  </span>
                                                  <span className='text-slate-600 font-medium'>
                                                    {sol.validation_metrics}
                                                  </span>
                                                </div>
                                              )}
                                              {sol.implementation_cost && (
                                                <div>
                                                  <span className='block font-bold text-slate-400 uppercase tracking-wider mb-0.5'>
                                                    Цена внедрения
                                                  </span>
                                                  <span className='text-slate-900 font-bold font-mono'>
                                                    {sol.implementation_cost}
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          )}

                                          {/* МЕТРИКИ РЕЗУЛЬТАТИВНОСТИ */}
                                          <div className='space-y-2 mb-5'>
                                            <h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                              Метрики результативности
                                            </h4>
                                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center'>
                                              <div className='bg-emerald-50/60 p-2 rounded-lg border border-emerald-100'>
                                                <p className='text-[9px] text-emerald-700 font-bold uppercase truncate'>Прирост КИН, п.п.</p>
                                                <p className='text-xs font-bold text-emerald-900 font-mono mt-0.5'>
                                                  {sol.kin_increase_min ?? '0'} ÷ {sol.kin_increase_max ?? '0'}
                                                </p>
                                              </div>
                                              <div className='bg-emerald-50/60 p-2 rounded-lg border border-emerald-100'>
                                                <p className='text-[9px] text-emerald-700 font-bold uppercase truncate'>Прирост добычи нефти, %</p>
                                                <p className='text-xs font-bold text-emerald-900 font-mono mt-0.5'>
                                                  {sol.oil_production_growth_min ?? '0'} ÷ {sol.oil_production_growth_max ?? '0'}
                                                </p>
                                              </div>
                                              <div className='bg-blue-50/60 p-2 rounded-lg border border-blue-100'>
                                                <p className='text-[9px] text-blue-700 font-bold uppercase truncate'>Сниж. обводненности, п.п.</p>
                                                <p className='text-xs font-bold text-blue-900 font-mono mt-0.5'>
                                                  {sol.watercut_reduction_min ?? '0'} ÷ {sol.watercut_reduction_max ?? '0'}
                                                </p>
                                              </div>
                                              <div className='bg-slate-50 p-2 rounded-lg border border-slate-200'>
                                                <p className='text-[9px] text-slate-500 font-bold uppercase truncate'>Сниж. себестоимости, %</p>
                                                <p className='text-xs font-bold text-slate-800 font-mono mt-0.5'>
                                                  {sol.cost_reduction_min ?? '0'} ÷ {sol.cost_reduction_max ?? '0'}
                                                </p>
                                              </div>
                                              <div className='bg-teal-50/60 p-2 rounded-lg border border-teal-100'>
                                                <p className='text-[9px] text-teal-700 font-bold uppercase truncate'>Сниж. эколог. возд., %</p>
                                                <p className='text-xs font-bold text-teal-900 font-mono mt-0.5'>
                                                  {sol.env_impact_reduction_min ?? '0'} ÷ {sol.env_impact_reduction_max ?? '0'}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {/* МЕТРИКИ ВЛИЯНИЯ */}
                                          <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50/40 p-3 rounded-xl border border-slate-100/80 mb-4'>
                                            <div className='md:col-span-9'>
                                              <span className='block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2'>
                                                Влияние на потенциал (1-5)
                                              </span>
                                              <div className='flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500'>
                                                <div>КИН: <span className='font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border ml-1'>{sol.impact_kin ?? 0}</span></div>
                                                <div>Добыча нефти: <span className='font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border ml-1'>{sol.impact_oil ?? 0}</span></div>
                                                <div>Сниж. обводненности: <span className='font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border ml-1'>{sol.impact_watercut ?? 0}</span></div>
                                                <div>Сниж. себестоимости: <span className='font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border ml-1'>{sol.impact_cost ?? 0}</span></div>
                                                <div>Сниж. эколог. возд.: <span className='font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border ml-1'>{sol.impact_env ?? 0}</span></div>
                                              </div>
                                            </div>
                                            <div className='md:col-span-3 text-left md:text-right border-t md:border-t-0 md:border-l border-slate-200/60 pt-2 md:pt-0 md:pl-4'>
                                              <span className='block text-[9px] font-bold uppercase tracking-wider text-slate-400'>Интегральный балл эффекта</span>
                                              <span className='text-xl font-black text-slate-950 font-mono'>{sol.integrated_score ?? '0.00'}</span>
                                            </div>
                                          </div>

                                          {/* АНАЛИТИКА */}
                                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1'>
                                            {sol.applicability_conditions && (
                                              <div className='bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/40'>
                                                <span className='block font-bold text-slate-500 uppercase tracking-wider mb-1'>Условия применимости</span>
                                                <p className='text-slate-600 leading-relaxed text-[11px]'>{sol.applicability_conditions}</p>
                                              </div>
                                            )}
                                            {sol.risks_limitations && (
                                              <div className='bg-red-50/10 p-2.5 rounded-lg border border-red-100/30'>
                                                <span className='block font-bold text-red-500 uppercase tracking-wider mb-1'>Ключевые риски / ограничения</span>
                                                <p className='text-slate-600 leading-relaxed text-[11px]'>{sol.risks_limitations}</p>
                                              </div>
                                            )}
                                          </div>

                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}

                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}