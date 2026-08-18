'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CRITERIA_SECTIONS } from '../../constants'

export default function ForecastPage() {
	const params = useParams()
	const router = useRouter()
	const id = params?.id as string | undefined

	const [formData, setFormData] = useState<Record<string, string>>({})
	const [originalQuestionnaire, setOriginalQuestionnaire] = useState<
		Record<string, any>
	>({})

	const [activeTab, setActiveTab] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [selectedPriority, setSelectedPriority] = useState<string>('all')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

	useEffect(() => {
		if (CRITERIA_SECTIONS.length > 0) {
			setActiveTab(CRITERIA_SECTIONS[0].id)
		}
	}, [])

	const criteriaIdToFieldNameMap = useMemo(() => {
		const map: Record<string, string> = {}
		CRITERIA_SECTIONS.forEach(section => {
			section.criteria.forEach(criterion => {
				map[String(criterion.id)] = criterion.field_name
			})
		})
		return map
	}, [])

	const fieldNameToIdMap = useMemo(() => {
		const map: Record<string, string> = {}
		CRITERIA_SECTIONS.forEach(section => {
			section.criteria.forEach(criterion => {
				map[criterion.field_name] = String(criterion.id)
			})
		})
		return map
	}, [])

	useEffect(() => {
		if (!id) return

		async function fetchQuestionnaireData() {
			try {
				setIsLoadingData(true)
				const response = await fetch(`http://85.193.88.37:4200/ques/${id}`)
				if (!response.ok) {
					throw new Error(`Ошибка загрузки анкеты: ${response.status}`)
				}
				const data = await response.json()
				setOriginalQuestionnaire(data)

				const loadedForm: Record<string, string> = {}
				Object.entries(data).forEach(([fieldName, value]) => {
					const criterionId = fieldNameToIdMap[fieldName]
					if (criterionId && value !== null && value !== undefined) {
						loadedForm[criterionId] = String(value)
					}
				})

				setFormData(loadedForm)
			} catch (error) {
				console.error('Ошибка при получении данных анкеты:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchQuestionnaireData()
	}, [id, fieldNameToIdMap])

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

	const handleSave = async (e: React.MouseEvent) => {
		e.preventDefault()

		// Валидация обязательных полей P1
		const requiredP1Fields = CRITERIA_SECTIONS.flatMap(section =>
			section.criteria.filter(c => c.priority === 'P1'),
		)

		const hasEmptyRequiredField = requiredP1Fields.some(
			criterion => !formData[String(criterion.id)]?.trim(),
		)

		// if (hasEmptyRequiredField) {
		// 	toast.error('Не все обязательные поля заполнены')
		// 	return
		// }

		if (!id) {
			toast.info('Анкета ещё не создана. Используйте "Прогноз проблем".')
			return
		}

		setIsSubmitting(true)

		const payload = { ...originalQuestionnaire }

		Object.entries(formData).forEach(([id, value]) => {
			const fieldName = criteriaIdToFieldNameMap[id]
			if (fieldName) {
				payload[fieldName] = value.trim() === '' ? null : value
			}
		})

		try {
			const response = await fetch(`http://85.193.88.37:4200/ques/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error(
					`Ошибка обновления: ${response.status} ${response.statusText}`,
				)
			}

			toast.success('Анкета успешно обновлена!')
		} catch (error) {
			console.error('Ошибка выполнения PUT-запроса:', error)
			toast.error('Не удалось сохранить изменения на сервере.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleSubmitForecast = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		const payload: Record<string, string> = {}
		Object.entries(formData).forEach(([id, value]) => {
			if (value.trim() !== '') {
				const fieldName = criteriaIdToFieldNameMap[id]
				if (fieldName) {
					payload[fieldName] = value
				}
			}
		})

		try {
			const response = await fetch('http://85.193.88.37:4200/ques/' + id, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`)

			toast.success('Прогноз успешно сгенерирован!')
			router.push('/ques/' + id + '/problems')
		} catch (error) {
			console.error('Submission error:', error)
			toast.error('Ошибка при генерации прогноза')
		} finally {
			setIsSubmitting(false)
		}
	}

	const getPriorityText = (priority: 'P1' | 'P2' | 'P3') => {
		if (priority === 'P1') return 'P1 — Обязательное'
		if (priority === 'P2') return 'P2 — Рекомендуемое'
		return 'P3 — Уточняющее'
	}

	if (isLoadingData) {
		return (
			<div className='p-8 text-slate-600 text-sm min-h-screen bg-slate-50'>
				Загрузка данных анкеты...
			</div>
		)
	}

	const handleDelete = async () => {
		if (!id) return

		if (!confirm('Вы уверены, что хотите удалить анкету?')) return

		try {
			setIsSubmitting(true)

			const response = await fetch(`http://85.193.88.37:4200/ques/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error(`Ошибка удаления: ${response.status}`)
			}

			toast.success('Анкета удалена')
			router.push('/')
		} catch (error) {
			console.error('Ошибка удаления:', error)
			toast.error('Не удалось удалить анкету')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-slate-100 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden'>
			<ToastContainer position='top-right' autoClose={3000} />
			<div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />
			<div className='absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 pointer-events-none' />

			<div className='max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden'>
				{/* Шапка и Фильтрация */}
				<div className='border-b border-slate-100 p-6 sm:p-8 bg-slate-50/80 backdrop-blur-md'>
					<div className='flex items-center gap-4'>
						{/* Кнопка "Назад" в белом кружке */}
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
								{id ? `Редактирование анкеты` : 'Прогноз проблем'}
							</h1>
							{id && (
								<p className='text-xs font-mono text-slate-400 mt-1'>
									ID: {id}
								</p>
							)}
						</div>
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

				{/* Форма */}
				<form onSubmit={handleSubmitForecast} className='p-6 sm:p-8 space-y-6'>
					<div className='grid grid-cols-1 gap-y-5'>
						{filteredCriteria.map(c => {
							const stringId = String(c.id)
							const hasOptions = !!c.options

							return (
								<div
									key={c.field_name + c.id}
									className='group relative bg-slate-50/80 hover:bg-slate-100/60 p-5 rounded-xl border border-slate-200/60 transition-all duration-150 grid grid-cols-1 md:grid-cols-12 gap-4 items-center'
								>
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
									</div>

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
					</div>

					{/* Панель кнопок */}
					<div className='pt-6 border-t border-slate-100 flex justify-end items-center gap-4'>
						<button
							type='button'
							onClick={handleSave}
							disabled={isSubmitting}
							className='px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 disabled:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl shadow-sm transition-all duration-150 transform active:scale-[0.98] disabled:transform-none'
						>
							{isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
						</button>

						<button
							type='submit'
							disabled={isSubmitting}
							className='px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-[0.98] disabled:transform-none'
						>
							Прогноз проблем
						</button>

						<button
							type='button'
							onClick={handleDelete}
							disabled={isSubmitting}
							className='px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-[0.98]'
						>
							Удалить анкету
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
