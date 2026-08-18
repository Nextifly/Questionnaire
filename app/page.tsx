'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

// Реестр анкет
interface QuestionnaireRaw {
	id: string
	createdAt: string
	updatedAt: string
	c001_nazvanie_mestorozhdeniya: string | null
	c002_operator_nedropolzovatel: string | null
}

// Расширенный интерфейс проблемы (как на второй странице)
interface ProblemRaw {
	id: string | number
	problem_name: string
	problem_code?: string
	summary?: string // Используем summary для описания проблемы
	negative_results?: string // Негативные результаты
	conditions_raw?: string // Исходные условия
	questionnaireId?: string
	createdAt?: string

	// Метрики
	impact_kin?: number | string
	impact_oil?: number | string
	impact_watercut?: number | string
	impact_cost?: number | string
	impact_env?: number | string
	impact_total?: number | string
}

type ActiveTab = 'problems' | 'questionnaires'

export default function ProblemsPage() {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState<ActiveTab>('questionnaires')

	// Состояния для проблем (первичные)
	const [problems, setProblems] = useState<ProblemRaw[]>([])
	const [problemsLoading, setProblemsLoading] = useState<boolean>(true)

	// Состояние для поиска по названию проблемы
	const [searchQuery, setSearchQuery] = useState<string>('')

	// Состояния для анкет
	const [data, setData] = useState<QuestionnaireRaw[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	// Храним ID раскрытых проблем и состояния чекбоксов
	const [expandedIds, setExpandedIds] = useState<
		Record<string | number, boolean>
	>({})
	const [checkedIds, setCheckedIds] = useState<
		Record<string | number, boolean>
	>({})

	// Получаем массив только выбранных ID проблем
	const selectedIds = Object.keys(checkedIds).filter(key => checkedIds[key])

	// 1. Загрузка всех проблем при монтировании
	useEffect(() => {
		async function loadAllProblems() {
			try {
				setProblemsLoading(true)
				const response = await fetch(
					'http://85.193.88.37:4200/ques/get_problems',
				)
				if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`)
				const result = await response.json()
				setProblems(Array.isArray(result) ? result : [result])
			} catch (err) {
				console.error('Ошибка загрузки проблем:', err)
				setProblems([])
			} finally {
				setProblemsLoading(false)
			}
		}
		loadAllProblems()
	}, [])

	// 2. Загрузка всех анкет при монтировании (вместо ленивой подгрузки)
	useEffect(() => {
		async function loadQuestionnaires() {
			try {
				setLoading(true)
				const response = await fetch('http://85.193.88.37:4200/ques')
				if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`)
				const result = await response.json()
				setData(Array.isArray(result) ? result : [result])
			} catch (err) {
				console.error('Ошибка загрузки анкет:', err)
				setData([])
			} finally {
				setLoading(false)
			}
		}
		loadQuestionnaires()
	}, [])

	const handleTabChange = (tab: ActiveTab) => {
		setActiveTab(tab)
	}

	// Фильтрация проблем на основе поискового запроса
	const filteredProblems = useMemo(() => {
		if (!searchQuery.trim()) return problems
		return problems.filter(problem =>
			problem.problem_name.toLowerCase().includes(searchQuery.toLowerCase()),
		)
	}, [problems, searchQuery])

	// Переключение аккордеона
	const toggleExpand = (id: string | number) => {
		setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))
	}

	// Переключение чекера
	const toggleCheck = (id: string | number) => {
		setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }))
	}

	// Обработка кнопки "Показать решения" для глобального списка
	const handleShowSolutions = () => {
		if (selectedIds.length === 0) return

		// Ищем первую выбранную проблему, чтобы узнать к какой анкете (`questionnaireId`) она привязана
		const firstSelectedProblem = problems.find(
			p => String(p.id) === selectedIds[0],
		)
		const targetQuesId = firstSelectedProblem?.questionnaireId || 'global'

		const queryParams = selectedIds.join(',')
		router.push(
			`/ques/${targetQuesId}/problems/solutions?solutions=${queryParams}`,
		)
	}

	const formatDate = (dateStr?: string) => {
		if (!dateStr) return '—'
		return new Date(dateStr).toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	if (
		(problemsLoading || loading) &&
		problems.length === 0 &&
		data.length === 0
	) {
		return (
			<div className='p-8 text-slate-600 text-sm min-h-screen bg-slate-50 flex items-center justify-center'>
				Синхронизация с базой данных...
			</div>
		)
	}

	return (
		<div className='min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden'>
			{/* Фон */}
			<div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />
			<div className='absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />

			<div className='max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden'>
				{/* Верхняя панель */}
				<div className='p-6 sm:p-8 bg-slate-50/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100'>
					<div className='min-w-0 flex-1'>
						<h1 className='text-3xl font-extrabold text-slate-900 tracking-tight truncate'>
							{activeTab === 'problems'
								? 'Глобальный аудит проблем'
								: 'Реестр анкет'}
						</h1>
						<p className='mt-1 text-sm text-slate-500'>
							{activeTab === 'problems'
								? `Общее количество найденных проблем: ${problems.length}`
								: 'Список всех созданных цифровых паспортов месторождений'}
						</p>
					</div>

					<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto justify-end flex-shrink-0'>
						{/* Поисковый инпут, отображается только во вкладке проблем */}
						{activeTab === 'problems' && (
							<div className='relative w-full sm:w-64 lg:w-80'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={2}
										stroke='currentColor'
										className='w-4 h-4'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
										/>
									</svg>
								</div>
								<input
									type='text'
									placeholder='Поиск проблемы по названию...'
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className='w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150'
								/>
								{searchQuery && (
									<button
										type='button'
										onClick={() => setSearchQuery('')}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={2}
											stroke='currentColor'
											className='w-4 h-4'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</button>
								)}
							</div>
						)}

						{/* Динамическая кнопка "Показать решения" */}
						{activeTab === 'problems' && (
							<button
								type='button'
								onClick={handleShowSolutions}
								disabled={selectedIds.length === 0}
								className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm whitespace-nowrap ${
									selectedIds.length > 0
										? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] cursor-pointer'
										: 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
								}`}
							>
								<span>Показать решения</span>
								{selectedIds.length > 0 && (
									<span className='flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-black bg-white text-slate-900 rounded-full shadow-inner precision-scaleIn'>
										{selectedIds.length}
									</span>
								)}
							</button>
						)}

						{activeTab === 'questionnaires' && (
							<Link
								href='/ques/create'
								className='inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 transform active:scale-[0.98] whitespace-nowrap'
							>
								+ Создать анкету
							</Link>
						)}
					</div>
				</div>

				{/* Табы */}
				<div className='px-6 sm:px-8 pt-4 bg-slate-50/40 border-b border-slate-100 flex gap-6 text-sm font-semibold text-slate-500 select-none'>
					<button
						type='button'
						onClick={() => handleTabChange('problems')}
						className={`pb-3 relative transition-colors duration-150 outline-none ${
							activeTab === 'problems'
								? 'text-blue-600'
								: 'hover:text-slate-800'
						}`}
					>
						Список всех проблем
						{activeTab === 'problems' && (
							<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full' />
						)}
					</button>

					<button
						type='button'
						onClick={() => handleTabChange('questionnaires')}
						className={`pb-3 relative transition-colors duration-150 outline-none ${
							activeTab === 'questionnaires'
								? 'text-blue-600'
								: 'hover:text-slate-800'
						}`}
					>
						Список всех анкет
						{activeTab === 'questionnaires' && (
							<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full' />
						)}
					</button>
				</div>

				{/* Контент */}
				<div className='p-6 sm:p-8 space-y-4'>
					{/* ВКЛАДКА 1: ВСЕ ПРОБЛЕМЫ */}
					{activeTab === 'problems' && (
						<div className='space-y-4'>
							{filteredProblems.length === 0 ? (
								<div className='text-center py-12 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200'>
									{searchQuery
										? 'Нет проблем, соответствующих условиям поиска.'
										: 'В базе данных нет зарегистрированных проблем.'}
								</div>
							) : (
								<div className='border border-slate-200/60 rounded-xl overflow-hidden bg-white shadow-sm divide-y divide-slate-100 animate-fadeIn'>
									{filteredProblems.map(problem => {
										const isExpanded = !!expandedIds[problem.id]
										const isChecked = !!checkedIds[problem.id]

										return (
											<div
												key={problem.id}
												className={`transition-colors duration-150 ${
													isChecked
														? 'bg-slate-900/[0.02]'
														: isExpanded
															? 'bg-slate-50/50'
															: 'hover:bg-slate-50/30'
												}`}
											>
												{/* Главная видимая строка */}
												<div className='flex items-center justify-between p-4 sm:p-5 gap-4 select-none'>
													<div className='flex items-center gap-4 flex-1 min-w-0'>
														<button
															type='button'
															onClick={() => toggleCheck(problem.id)}
															className={`w-5 h-5 flex items-center justify-center rounded border transition-all duration-200 outline-none ${
																isChecked
																	? 'bg-slate-900 border-slate-900 text-white shadow-sm'
																	: 'bg-white border-slate-300 hover:border-slate-500'
															}`}
														>
															{isChecked && (
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	viewBox='0 0 24 24'
																	fill='currentColor'
																	className='w-3.5 h-3.5 stroke-[1.5]'
																>
																	<path
																		fillRule='evenodd'
																		d='M20.25 7.5l-11.25 11.25-5.25-5.25 1.5-1.5 3.75 3.75 9.75-9.75 1.5 1.5z'
																		clipRule='evenodd'
																	/>
																</svg>
															)}
														</button>

														<span
															onClick={() => toggleExpand(problem.id)}
															className={`text-sm text-slate-800 cursor-pointer truncate flex-1 transition-all ${
																isChecked
																	? 'font-bold text-slate-950'
																	: 'font-semibold'
															}`}
														>
															<span className='text-slate-400 mr-2 text-xs font-mono font-normal'>
																#{problem.id.toString().slice(0,4)}
															</span>
															<span className='mr-3'>
																{problem.problem_name}
															</span>

															{problem.questionnaireId && (
																<span
																	className='inline-block text-xs font-mono text-blue-600 font-semibold bg-blue-50/50 px-2 py-0.5 rounded hover:underline'
																	onClick={e => e.stopPropagation()}
																>
																	<Link
																		href={`/ques/${problem.questionnaireId}`}
																	>
																		Анкета: #
																		{problem.questionnaireId.substring(0, 8)}...
																	</Link>
																</span>
															)}
														</span>
													</div>

													<button
														type='button'
														onClick={() => toggleExpand(problem.id)}
														className={`flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 transition-all duration-200 ${isExpanded ? 'rotate-180 bg-slate-100 text-slate-900' : ''}`}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth={2.5}
															stroke='currentColor'
															className='w-4 h-4'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M19.5 8.25l-7.5 7.5-7.5-7.5'
															/>
														</svg>
													</button>
												</div>

												{/* Раскрывающийся блок описания и метрик */}
												{isExpanded && (
													<div className='px-4 pb-6 sm:px-12 sm:pb-6 border-t border-slate-100 bg-white/60 backdrop-blur-sm space-y-5 animate-fadeIn text-sm text-slate-700 pt-4'>
														<div className='space-y-1'>
															<h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
																Описание проблемы
															</h4>
															<p className='leading-relaxed text-slate-600 bg-slate-50/80 p-3 rounded-lg border border-slate-100'>
																{problem.summary || 'Нет описания'}
															</p>
														</div>

														<div className='space-y-1'>
															<h4 className='text-xs font-bold uppercase tracking-wider text-red-400'>
																Негативный результат
															</h4>
															<p className='leading-relaxed text-slate-600 bg-red-50/30 p-3 rounded-lg border border-red-100/50'>
																{problem.negative_results || 'Не указано'}
															</p>
														</div>

														<div className='space-y-1'>
															<h4 className='text-xs font-bold uppercase tracking-wider text-slate-500'>
																Исходные условия
															</h4>
															<p className='leading-relaxed text-slate-600 bg-slate-100/60 p-3 rounded-lg border border-slate-200/60 font-mono text-xs'>
																{problem.conditions_raw || 'Не указано'}
															</p>
														</div>

														<div className='space-y-2 pt-2'>
															<h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
																Статистика атомов (Метрики)
															</h4>
															<div className='overflow-x-auto rounded-lg border border-slate-200/60 max-w-md shadow-sm bg-white'>
																<table className='w-full text-left border-collapse'>
																	<thead>
																		<tr className='bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200/60'>
																			<th className='py-2 px-4'>Метрика</th>
																			<th className='py-2 px-4 text-right'>
																				Значение
																			</th>
																		</tr>
																	</thead>
																	<tbody className='divide-y divide-slate-100 font-medium text-slate-700 text-xs'>
																		<tr>
																			<td className='py-2 px-4 text-slate-500'>
																				Влияние на КИН
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900'>
																				{problem.impact_kin ?? 0}
																			</td>
																		</tr>
																		<tr>
																			<td className='py-2 px-4 text-slate-500'>
																				Влияние на добычу нефти
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900'>
																				{problem.impact_oil ?? 0}
																			</td>
																		</tr>
																		<tr>
																			<td className='py-2 px-4 text-slate-500'>
																				Влияние на обводненность
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900'>
																				{problem.impact_watercut ?? 0}
																			</td>
																		</tr>
																		<tr>
																			<td className='py-2 px-4 text-slate-500'>
																				Влияние на себестоимость
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900'>
																				{problem.impact_cost ?? 0}
																			</td>
																		</tr>
																		<tr>
																			<td className='py-2 px-4 text-slate-500'>
																				Влияние на экологическое воздействие
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900'>
																				{problem.impact_env ?? 0}
																			</td>
																		</tr>
																		<tr>
																			<td className='py-2 px-4 text-slate-500 font-bold'>
																				Интегральный балл влияния
																			</td>
																			<td className='py-2 px-4 text-right font-mono text-slate-900 font-bold'>
																				{problem.impact_total ?? 0}
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												)}
											</div>
										)
									})}
								</div>
							)}
						</div>
					)}

					{/* ВКЛАДКА 2: АНКЕТЫ */}
					{activeTab === 'questionnaires' && (
						<div className='overflow-hidden rounded-xl border border-slate-200/60 shadow-sm animate-fadeIn'>
							{loading ? (
								<div className='p-12 text-center text-slate-500 text-sm bg-white'>
									Загрузка данных реестра...
								</div>
							) : (
								<table className='w-full text-left border-collapse bg-white text-sm'>
									<thead>
										<tr className='bg-slate-50 border-b border-slate-200/60 text-slate-700 font-semibold'>
											<th className='p-4'>ID</th>
											<th className='p-4'>Месторождение</th>
											<th className='p-4'>Оператор</th>
											<th className='p-4'>Дата создания</th>
											<th className='p-4'>Дата обновления</th>
										</tr>
									</thead>

									<tbody className='divide-y divide-slate-100 text-slate-600'>
										{data.map(item => (
											<tr
												key={item.id}
												className='hover:bg-blue-50/30 transition-colors group cursor-pointer'
											>
												<td className='p-4 font-mono text-xs text-slate-400'>
													<Link
														href={`/ques/${item.id}`}
														className='block w-full h-full'
													>
														{item.id.toString().slice(0,4)}
													</Link>
												</td>

												<td className='p-4 font-semibold text-slate-800'>
													<Link
														href={`/ques/${item.id}`}
														className='block w-full h-full'
													>
														{item.c001_nazvanie_mestorozhdeniya || '—'}
													</Link>
												</td>

												<td className='p-4'>
													<Link
														href={`/ques/${item.id}`}
														className='block w-full h-full'
													>
														{item.c002_operator_nedropolzovatel || '—'}
													</Link>
												</td>

												<td className='p-4 whitespace-nowrap text-xs text-slate-500'>
													<Link
														href={`/ques/${item.id}`}
														className='block w-full h-full'
													>
														{formatDate(item.createdAt)}
													</Link>
												</td>

												<td className='p-4 whitespace-nowrap text-xs text-slate-500'>
													<Link
														href={`/ques/${item.id}`}
														className='block w-full h-full'
													>
														{formatDate(item.updatedAt)}
													</Link>
												</td>
											</tr>
										))}

										{data.length === 0 && (
											<tr>
												<td
													colSpan={5}
													className='p-8 text-center text-slate-400 italic'
												>
													Список анкет пуст.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
