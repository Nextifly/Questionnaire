'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { CRITERIA_SECTIONS } from '../../constants'

export default function ForecastPage() {
	const router = useRouter()

	const [formData, setFormData] = useState<Record<string, string>>({})
	const [activeTab, setActiveTab] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [selectedPriority, setSelectedPriority] = useState<string>('all')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	useEffect(() => {
		if (CRITERIA_SECTIONS.length > 0) {
			setActiveTab(CRITERIA_SECTIONS[0].id)
		}
	}, [])

	// Создаем карту соответствия id -> field_name для быстрой трансформации данных перед отправкой
	const criteriaIdToFieldNameMap = useMemo(() => {
		const map: Record<string, string> = {}
		CRITERIA_SECTIONS.forEach(section => {
			section.criteria.forEach(criterion => {
				map[String(criterion.id)] = criterion.field_name
			})
		})
		return map
	}, [])

	const handleInputChange = (id: string, value: string) => {
		setFormData(prev => ({ ...prev, [id]: value }))
	}

	const filteredCriteria = useMemo(() => {
		const currentSection = CRITERIA_SECTIONS.find(sec => sec.id === activeTab)
		const activeCriteria = currentSection ? currentSection.criteria : []

		return activeCriteria.filter(c => {
			const matchesSearch =
				c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(c.placeholder &&
					c.placeholder.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(c.options &&
					c.options.some(opt =>
						opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
					))

			const matchesPriority =
				selectedPriority === 'all' || c.priority === selectedPriority

			return matchesSearch && matchesPriority
		})
	}, [activeTab, searchQuery, selectedPriority])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Трансформируем ключи из stringId в field_name и исключаем пустые значения
		const payload: Record<string, string> = {}
		Object.entries(formData).forEach(([id, value]) => {
			if (value.trim() !== '') {
				const fieldName = criteriaIdToFieldNameMap[id]
				if (fieldName) {
					payload[fieldName] = value
				}
			}
		})

		console.log('Sending Payload:', payload)

		try {
			const response = await fetch('http://85.193.88.37:4200/ques/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error(
					`Ошибка сервера: ${response.status} ${response.statusText}`,
				)
			} else {
				router.push('/') // Перенаправление на страницу со списком анкет после успешного создания
			}
		} catch (error) {
			console.error('Submission error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const getPriorityText = (priority: 'P1' | 'P2' | 'P3') => {
		if (priority === 'P1') return 'P1 — Обязательное'
		if (priority === 'P2') return 'P2 — Рекомендуемое'
		return 'P3 — Уточняющее'
	}

	return (
		<div className='min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden'>
			{/* Декоративные фоновые блюры */}
			<div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />
			<div className='absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />

			{/* Основной адаптивный контейнер */}
			<div className='max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden'>
				{/* Шапка и Фильтрация */}
				<div className='border-b border-slate-100 p-6 sm:p-8 bg-slate-50/80 backdrop-blur-md'>
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
						<h1 className='text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl'>
							Создание анкеты
						</h1>
					</div>

					<div className='mt-6 flex flex-col sm:flex-row gap-4'>
						<input
							type='text'
							value={searchQuery}
							placeholder='Поиск по названию или значениям словаря...'
							className='flex-1 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-colors'
							onChange={e => setSearchQuery(e.target.value)}
						/>
						<select
							className='px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-colors cursor-pointer'
							value={selectedPriority}
							onChange={e => setSelectedPriority(e.target.value)}
						>
							<option value='all'>Все приоритеты</option>
							<option value='P1'>P1 — Обязательные</option>
							<option value='P2'>P2 — Рекомендуемые</option>
							<option value='P3'>P3 — Уточняющие</option>
						</select>
					</div>
				</div>

				{/* Навигация по Классам */}
				<div className='bg-slate-100/60 border-b border-slate-200/60 px-6 sm:px-8 flex space-x-2 overflow-x-auto'>
					{CRITERIA_SECTIONS.map(section => (
						<button
							key={section.id}
							type='button'
							onClick={() => {
								setActiveTab(section.id)
								setSearchQuery('')
								setSelectedPriority('all')
							}}
							className={`py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-150 outline-none ${
								activeTab === section.id
									? 'border-blue-600 text-blue-600 font-semibold'
									: 'border-transparent text-slate-500 hover:text-slate-800'
							}`}
						>
							{section.name}
							<span className='ml-2 bg-slate-200/80 text-slate-700 text-xs px-2 py-0.5 rounded-full font-normal'>
								{section.criteria.length}
							</span>
						</button>
					))}
				</div>

				{/* Форма генерации */}
				<form onSubmit={handleSubmit} className='p-6 sm:p-8 space-y-6'>
					<div className='grid grid-cols-1 gap-y-5'>
						{filteredCriteria.map(c => {
							const stringId = String(c.id)
							const hasOptions = !!c.options

							return (
								<div
									key={c.field_name + c.id}
									className='group relative bg-slate-50/80 hover:bg-slate-100/60 p-5 rounded-xl border border-slate-200/60 transition-all duration-150 grid grid-cols-1 md:grid-cols-12 gap-4 items-center'
								>
									{/* Описание критерия */}
									<div className='md:col-span-5 space-y-1'>
										<label
											htmlFor={stringId}
											className='block text-sm font-semibold text-slate-800 cursor-pointer'
										>
											<span className='text-slate-400 mr-1.5 text-xs font-mono'>
												#{c.id}
											</span>
											{c.name}
										</label>
										<span className='inline-block text-[11px] font-medium text-slate-400 bg-slate-200/40 px-2 py-0.5 rounded'>
											Источник: {c.source}
										</span>
										{hasOptions && (
											<p className='text-[11px] text-blue-500/80 font-medium'>
												✦ Поле со словарем значений
											</p>
										)}
									</div>

									{/* Поле ввода */}
									<div className='md:col-span-4'>
										{hasOptions ? (
											<select
												id={stringId}
												value={formData[stringId] || ''}
												onChange={e =>
													handleInputChange(stringId, e.target.value)
												}
												className='w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 transition-all cursor-pointer'
											>
												<option value=''>Выберите значение...</option>
												{c.options?.map(opt => (
													<option key={opt.value_code} value={opt.value_code}>
														{opt.label}
													</option>
												))}
											</select>
										) : (
											<input
												type='text'
												id={stringId}
												value={formData[stringId] || ''}
												onChange={e =>
													handleInputChange(stringId, e.target.value)
												}
												placeholder={c.placeholder || 'Введите значение...'}
												className='w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 transition-all'
											/>
										)}
									</div>

									{/* Метка Приоритетности */}
									<div className='md:col-span-3 flex md:justify-end'>
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
												c.priority === 'P1'
													? 'bg-amber-50 text-amber-800 border-amber-200'
													: c.priority === 'P2'
														? 'bg-blue-50 text-blue-800 border-blue-200'
														: 'bg-slate-100 text-slate-700 border-slate-200'
											}`}
										>
											<span
												className={`w-1.5 h-1.5 mr-2 rounded-full ${
													c.priority === 'P1'
														? 'bg-amber-500'
														: c.priority === 'P2'
															? 'bg-blue-500'
															: 'bg-slate-400'
												}`}
											/>
											{getPriorityText(c.priority)}
										</span>
									</div>
								</div>
							)
						})}

						{filteredCriteria.length === 0 && (
							<div className='text-center py-12 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200'>
								Нет данных, соответствующих условиям поиска или выбранному
								приоритету.
							</div>
						)}
					</div>

					{/* Панель отправки */}
					<div className='pt-6 border-t border-slate-100 flex justify-end'>
						<button
							type='submit'
							disabled={isSubmitting}
							className='px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed'
						>
							{isSubmitting ? 'Создание...' : 'Создать анкету'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
