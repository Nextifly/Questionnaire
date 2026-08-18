'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProblemItem {
	id: number | string
	problem_name: string
	summary: string
	negative_results: string
	conditions_raw: string

	impact_kin: number | string
	impact_oil: number | string
	impact_watercut: number | string
	impact_cost: number | string
	impact_env: number | string
	impact_total: number | string
}

export default function ProblemsListPage() {
	const router = useRouter()
	const params = useParams()

	// Извлекаем id из параметров пути
	const id = params?.id as string | undefined

	const [problems, setProblems] = useState<ProblemItem[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	// Храним ID раскрытых проблем
	const [expandedIds, setExpandedIds] = useState<
		Record<string | number, boolean>
	>({})
	// Храним состояния чекбоксов (выбранные проблемы)
	const [checkedIds, setCheckedIds] = useState<
		Record<string | number, boolean>
	>({})

	// Получаем массив только выбранных ID проблем
	const selectedIds = Object.keys(checkedIds).filter(key => checkedIds[key])

	// Загрузка списка проблем с сервера
	useEffect(() => {
		if (!id) return

		async function fetchProblems() {
			try {
				setIsLoading(true)
				setError(null)

				const response = await fetch(
					`http://85.193.88.37:4200/ques/check/${id}`,
				)
				if (!response.ok) {
					throw new Error(
						`Ошибка сервера: ${response.status} ${response.statusText}`,
					)
				}
				const data = await response.json()
				setProblems(Array.isArray(data) ? data : [])
			} catch (err: any) {
				console.error('Ошибка загрузки проблем:', err)
				setError(err.message || 'Не удалось загрузить данные с сервера')
			} finally {
				setIsLoading(false)
			}
		}

		fetchProblems()
	}, [id])

	// Переключение раскрытия/свертывания строки
	const toggleExpand = (id: string | number) => {
		setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))
	}

	// Переключение состояния чекера (выбор проблемы)
	const toggleCheck = (id: string | number) => {
		setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }))
	}

	// Обработчик клика по кнопке "Показать решения"
	const handleShowSolutions = () => {
		if (selectedIds.length === 0) return

		// Передаем выбранные ID в query параметры или формируем путь
		// Пример перенаправления: /ques/solutions/[id]?problems=1,2,5
		const queryParams = selectedIds.join(',')
		// Перенаправляем на новый формат ссылки: /ques/[id]/problems?solutions=1,2,3
		router.push(`/ques/${id}/problems/solutions?solutions=${queryParams}`)
	}

	if (!id) {
		return (
			<div className='p-8 text-slate-600 text-sm min-h-screen bg-slate-50'>
				Идентификатор анкеты не найден в URL.
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className='p-8 text-slate-600 text-sm min-h-screen bg-slate-50'>
				Загрузка списка проблем...
			</div>
		)
	}

	if (error) {
		return (
			<div className='p-8 text-red-600 text-sm min-h-screen bg-slate-50 flex flex-col gap-4 items-center justify-center'>
				<p>Произошла ошибка: {error}</p>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium'
				>
					Повторить попытку
				</button>
			</div>
		)
	}

	return (
		<div className='min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden'>
			{/* Декоративные фоновые блюры */}
			<div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />
			<div className='absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />

			<div className='max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden'>
				{/* Шапка страницы */}
				<div className='border-b border-slate-100 p-6 sm:p-8 bg-slate-50/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
					<div className='flex items-center gap-4'>
						<button
							type='button'
							onClick={() => router.back()}
							className='flex items-center justify-center w-10 h-10 bg-white hover:bg-slate-50 text-slate-700 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all duration-150 transform active:scale-95 outline-none'
							title='Назад'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2.5}
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
								/>
							</svg>
						</button>

						<div>
							<h1 className='text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl'>
								Выявленные проблемы
							</h1>
							<div className='flex items-center gap-3 mt-1'>
								<p className='text-sm text-slate-500'>
									Общее количество найденных проблем: {problems.length}
								</p>
								<span className='text-xs font-mono bg-slate-200/60 px-2 py-0.5 rounded text-slate-600'>
									ID анкеты: {id}
								</span>
							</div>
						</div>
					</div>

					{/* Кнопка "Показать решения" */}
					<div className='flex items-center justify-end'>
						<button
							type='button'
							onClick={handleShowSolutions}
							disabled={selectedIds.length === 0}
							className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${
								selectedIds.length > 0
									? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] cursor-pointer'
									: 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
							}`}
						>
							<span>Показать решения</span>
							{selectedIds.length > 0 && (
								<span className='flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-black bg-white text-slate-900 rounded-full shadow-inner animate-scaleIn'>
									{selectedIds.length}
								</span>
							)}
						</button>
					</div>
				</div>

				{/* Контент / Таблица-аккордеон */}
				<div className='p-6 sm:p-8 space-y-4'>
					{problems.length === 0 ? (
						<div className='text-center py-12 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200'>
							Проблемы не обнаружены.
						</div>
					) : (
						<div className='border border-slate-200/60 rounded-xl overflow-hidden bg-white shadow-sm divide-y divide-slate-100'>
							{problems.map(problem => {
								const isExpanded = !!expandedIds[problem.id]
								const isChecked = !!checkedIds[problem.id]

								return (
									<div
										key={problem.id}
										className={`transition-colors duration-150 ${
											isChecked
												? 'bg-slate-900/2'
												: isExpanded
													? 'bg-slate-50/50'
													: 'hover:bg-slate-50/30'
										}`}
									>
										{/* Главная видимая строка */}
										<div className='flex items-center justify-between p-4 sm:p-5 gap-4 select-none'>
											<div className='flex items-center gap-4 flex-1 min-w-0'>
												{/* Кастомный чёрно-белый чекер */}
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

												{/* Название проблемы (выделяется жирным при выборе) */}
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
													{problem.problem_name}
												</span>
											</div>

											{/* Стрелка триггера */}
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
												{/* Описание проблемы */}
												<div className='space-y-1'>
													<h4 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
														Описание проблемы
													</h4>
													<p className='leading-relaxed text-slate-600 bg-slate-50/80 p-3 rounded-lg border border-slate-100'>
														{problem.summary || 'Нет описания'}
													</p>
												</div>

												{/* Негативный результат */}
												<div className='space-y-1'>
													<h4 className='text-xs font-bold uppercase tracking-wider text-red-400'>
														Негативный результат
													</h4>
													<p className='leading-relaxed text-slate-600 bg-red-50/30 p-3 rounded-lg border border-red-100/50'>
														{problem.negative_results || 'Не указано'}
													</p>
												</div>

												{/* Исходные условия */}
												<div className='space-y-1'>
													<h4 className='text-xs font-bold uppercase tracking-wider text-slate-500'>
														Исходные условия
													</h4>
													<p className='leading-relaxed text-slate-600 bg-slate-100/60 p-3 rounded-lg border border-slate-200/60 font-mono text-xs'>
														{problem.conditions_raw || 'Не указано'}
													</p>
												</div>

												{/* Таблица числовых значений атомов */}
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
																	<td className='py-2 px-4 text-slate-500'>
																		Интегральный балл влияния
																	</td>
																	<td className='py-2 px-4 text-right font-mono text-slate-900'>
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
			</div>
		</div>
	)
}
