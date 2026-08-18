export interface Option {
  value_code: string;
  label: string;
}

export interface Criteria {
  id: number;
  name: string;
  source: string;
  priority: 'P1' | 'P2' | 'P3';
  field_name: string;
  placeholder?: string;
  options?: Option[];
}

export interface Section {
  id: string;
  name: string;
  range: string;
  description: string;
  criteria: Criteria[];
}

export const CRITERIA_SECTIONS: Section[] = [
  {
    id: 'C1',
    name: 'Паспорт объекта + геология / коллектор',
    range: '1-45',
    description: 'Паспорт, лицензия, геология, ГИС, петрофизика, коллектор',
    criteria: [
      {
        id: 1,
        name: 'Название месторождения',
        source: 'Паспорт актива, лицензия',
        priority: 'P1',
        field_name: 'c001_nazvanie_mestorozhdeniya',
        placeholder: 'Введите каноническое имя...',
      },
      {
        id: 2,
        name: 'Оператор / недропользователь',
        source: 'Лицензия, оргструктура',
        priority: 'P1',
        field_name: 'c002_operator_nedropolzovatel',
      },
      {
        id: 3,
        name: 'Регион / бассейн / кластер',
        source: 'Паспорт актива, карты',
        priority: 'P1',
        field_name: 'c003_region_basseyn_klaster',
        options: [
          { value_code: 'v_basseyn', label: 'бассейн' },
          { value_code: 'v_proizvodstvennyy_klaster', label: 'производственный кластер' },
          { value_code: 'v_region', label: 'Регион' }
        ]
      },
      {
        id: 4,
        name: 'Статус лицензии / контракта',
        source: 'Лицензия, контракт',
        priority: 'P1',
        field_name: 'c004_status_licenzii_kontrakta',
        options: [
          { value_code: 'v_konservaciya', label: 'консервация' },
          { value_code: 'v_probnaya_ekspluataciya', label: 'пробная эксплуатация' },
          { value_code: 'v_prodlenie', label: 'продление' },
          { value_code: 'v_razrabotka', label: 'разработка' },
          { value_code: 'v_razvedka', label: 'Разведка' }
        ]
      },
      {
        id: 5,
        name: 'Стадия разработки',
        source: 'Проект разработки, добычная история',
        priority: 'P1',
        field_name: 'c005_stadiya_razrabotki',
        options: [
          { value_code: 'v_konservaciya', label: 'консервация' },
          { value_code: 'v_pozdnyaya', label: 'поздняя' },
          { value_code: 'v_probnaya', label: 'Пробная' },
          { value_code: 'v_rannyaya', label: 'ранняя' },
          { value_code: 'v_redevelopment', label: 'редевелопмент' },
          { value_code: 'v_rost', label: 'рост' },
          { value_code: 'v_zrelaya', label: 'зрелая' }
        ]
      },
      {
        id: 6,
        name: 'Продуктивный горизонт / объект разработки',
        source: 'Проект разработки, геомодель, ГИС',
        priority: 'P1',
        field_name: 'c006_produktivnyy_gorizont_obekt_razrabotki',
        options: [
          { value_code: 'v_blok', label: 'блок' },
          { value_code: 'v_pachka', label: 'пачка' },
          { value_code: 'v_plast', label: 'Пласт' },
          { value_code: 'v_uchastok_pilota', label: 'участок пилота' },
          { value_code: 'v_zalezh', label: 'залежь' }
        ]
      },
      {
        id: 7,
        name: 'Блок / сектор / куст',
        source: 'Геомодель, карты, разработка',
        priority: 'P2',
        field_name: 'c007_blok_sektor_kust',
        options: [
          { value_code: 'v_kust', label: 'куст' },
          { value_code: 'v_sektor_ppd', label: 'сектор ППД' },
          { value_code: 'v_strukturnyy_blok', label: 'Структурный блок' },
          { value_code: 'v_uchastok_opi', label: 'участок ОПИ' }
        ]
      },
      {
        id: 8,
        name: 'Доступность площадки и сезонность',
        source: 'Логистика, производственный план',
        priority: 'P2',
        field_name: 'c008_dostupnost_ploschadki_i_sezonnost',
        options: [
          { value_code: 'v_kruglogodichno', label: 'Круглогодично' },
          { value_code: 'v_sezonno', label: 'сезонно' },
          { value_code: 'v_trebuetsya_speclogistika', label: 'требуется спецлогистика' },
          { value_code: 'v_trudnodostupno', label: 'труднодоступно' }
        ]
      },
      {
        id: 9,
        name: 'Экологические и санитарные ограничения',
        source: 'HSE, экологические разрешения',
        priority: 'P1',
        field_name: 'c009_ekologicheskie_i_sanitarnye_ogranicheniya',
        options: [
          { value_code: 'v_net_kritichnyh', label: 'Нет критичных' },
          { value_code: 'v_trebuetsya_razreshenie', label: 'требуется разрешение' },
          { value_code: 'v_umerennye', label: 'умеренные' },
          { value_code: 'v_zhestkie', label: 'жесткие' }
        ]
      },
      {
        id: 10,
        name: 'Дата и версия исходных данных (yyyy-mm-dd)',
        source: 'Data-room, отчеты, модель',
        priority: 'P1',
        field_name: 'c010_data_i_versiya_ishodnyh_dannyh',
        options: [
          { value_code: 'v_6_18_mes', label: '6–18 мес.' },
          { value_code: 'v_aktualno_lt_6_mes', label: 'Актуально <6 мес.' },
          { value_code: 'v_gt_18_mes', label: '>18 мес.' },
          { value_code: 'v_neyasno', label: 'неясно' }
        ]
      },
      {
        id: 11,
        name: 'Тип коллектора',
        source: 'Геология, керн, ГИС',
        priority: 'P1',
        field_name: 'c011_tip_kollektora',
        options: [
          { value_code: 'v_karbonatnyy', label: 'карбонатный' },
          { value_code: 'v_smeshannyy', label: 'смешанный' },
          { value_code: 'v_terrigennyy', label: 'Терригенный' },
          { value_code: 'v_tight', label: 'tight' },
          { value_code: 'v_treschinovatyy', label: 'трещиноватый' },
          { value_code: 'v_unconsolidated', label: 'unconsolidated' }
        ]
      },
      {
        id: 12,
        name: 'Доминирующая литология',
        source: 'Керн, шлам, ГИС',
        priority: 'P1',
        field_name: 'c012_dominiruyuschaya_litologiya',
        options: [
          { value_code: 'v_alevrolit', label: 'алевролит' },
          { value_code: 'v_dolomit', label: 'доломит' },
          { value_code: 'v_glinistyy', label: 'глинистый' },
          { value_code: 'v_izvestnyak', label: 'известняк' },
          { value_code: 'v_pereslaivanie', label: 'переслаивание' },
          { value_code: 'v_peschanik', label: 'Песчаник' }
        ]
      },
      {
        id: 13,
        name: 'Тип ловушки',
        source: 'Геология, сейсмика',
        priority: 'P2',
        field_name: 'c013_tip_lovushki',
        options: [
          { value_code: 'v_kombinirovannaya', label: 'комбинированная' },
          { value_code: 'v_litologicheskaya', label: 'литологическая' },
          { value_code: 'v_stratigraficheskaya', label: 'стратиграфическая' },
          { value_code: 'v_strukturnaya', label: 'Структурная' }
        ]
      },
      {
        id: 14,
        name: 'Структурная сложность',
        source: 'Сейсмика, структурные карты',
        priority: 'P1',
        field_name: 'c014_strukturnaya_slozhnost',
        options: [
          { value_code: 'v_kritichnaya_neopredelennost', label: 'критичная неопределенность' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 15,
        name: 'Разломность и блоковость',
        source: 'Сейсмика, давления, трассеры, ГДИС',
        priority: 'P1',
        field_name: 'c015_razlomnost_i_blokovost',
        options: [
          { value_code: 'v_dokazannaya_gidroblokovost', label: 'доказанная гидроблоковость' },
          { value_code: 'v_net_slabaya', label: 'Нет/слабая' },
          { value_code: 'v_umerennaya', label: 'умеренная' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 16,
        name: 'Наличие естественной трещиноватости',
        source: 'Керн, FMI/имиджер, ГДИС, PLT',
        priority: 'P1',
        field_name: 'c016_nalichie_estestvennoy_treschinovatosti',
        options: [
          { value_code: 'v_dominiruyuschaya', label: 'доминирующая' },
          { value_code: 'v_lokalnaya', label: 'локальная' },
          { value_code: 'v_ne_vyyavlena', label: 'Не выявлена' },
          { value_code: 'v_razvitaya', label: 'развитая' }
        ]
      },
      {
        id: 17,
        name: 'Проводимость и ориентация трещин',
        source: 'FMI, микросейсмика, ГДИС, трассеры',
        priority: 'P2',
        field_name: 'c017_provodimost_i_orientaciya_treschin',
        options: [
          { value_code: 'v_napravlennaya_svyaz_s_ppd', label: 'направленная связь с ППД' },
          { value_code: 'v_neizvestna', label: 'Неизвестна' },
          { value_code: 'v_slabaya', label: 'слабая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 18,
        name: 'Фациальная изменчивость',
        source: 'Геомодель, керн, ГИС, сейсмика',
        priority: 'P2',
        field_name: 'c018_facialnaya_izmenchivost',
        options: [
          { value_code: 'v_linzovidnoe_stroenie', label: 'линзовидное строение' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 19,
        name: 'Количество продуктивных пластов / пропластков (шт.)',
        source: 'ГИС, проект разработки, PLT',
        priority: 'P1',
        field_name: 'c019_kolichestvo_produktivnyh_plastov_proplastkov',
        options: [
          { value_code: 'v_2_3', label: '2–3' },
          { value_code: 'v_4_7', label: '4–7' },
          { value_code: 'v_gt_7', label: '>7' },
          { value_code: 'v_odin', label: 'Один' },
          { value_code: 'v_silno_raschlenennyy_obekt', label: 'сильно расчлененный объект' }
        ]
      },
      {
        id: 20,
        name: 'Гидродинамическая связность пластов',
        source: 'Давления, ГДИС, трассеры, PLT',
        priority: 'P1',
        field_name: 'c020_gidrodinamicheskaya_svyaznost_plastov',
        options: [
          { value_code: 'v_chastichno_svyazany', label: 'частично связаны' },
          { value_code: 'v_izolirovany', label: 'изолированы' },
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_svyazany', label: 'Связаны' }
        ]
      },
      {
        id: 21,
        name: 'Глубина залегания (м)',
        source: 'ГИС, инклинометрия, геомодель',
        priority: 'P1',
        field_name: 'c021_glubina_zaleganiya',
        options: [
          { value_code: 'v_1500_3000', label: '1500–3000' },
          { value_code: 'v_700_1500', label: '700–1500' },
          { value_code: 'v_gt_3000', label: '>3000' },
          { value_code: 'v_hthp', label: 'HTHP' },
          { value_code: 'v_lt_700', label: '<700' }
        ]
      },
      {
        id: 22,
        name: 'Общая толщина пласта (м)',
        source: 'ГИС, геомодель',
        priority: 'P1',
        field_name: 'c022_obschaya_tolschina_plasta',
        options: [
          { value_code: 'v_silno_izmenchivyy', label: 'сильно изменчивый' },
          { value_code: 'v_sredniy_5_20', label: 'средний 5–20' },
          { value_code: 'v_tolstyy_gt_20', label: 'толстый >20' },
          { value_code: 'v_tonkiy_lt_5', label: 'Тонкий <5' }
        ]
      },
      {
        id: 23,
        name: 'Эффективная нефтенасыщенная толщина (м)',
        source: 'ГИС, керн, насыщенность',
        priority: 'P1',
        field_name: 'c023_effektivnaya_neftenasyschennaya_tolschina',
        options: [
          { value_code: 'v_2_5', label: '2–5' },
          { value_code: 'v_5_15', label: '5–15' },
          { value_code: 'v_gt_15', label: '>15' },
          { value_code: 'v_lt_2', label: '<2' },
          { value_code: 'v_silno_neodnorodna', label: 'сильно неоднородна' }
        ]
      },
      {
        id: 24,
        name: 'Площадь продуктивности (км²)',
        source: 'Карты, геомодель, запасы',
        priority: 'P2',
        field_name: 'c024_ploschad_produktivnosti',
        options: [
          { value_code: 'v_fragmentirovannaya_po_blokam', label: 'фрагментированная по блокам' },
          { value_code: 'v_krupnaya', label: 'крупная' },
          { value_code: 'v_lokalnaya', label: 'Локальная' },
          { value_code: 'v_srednyaya', label: 'средняя' }
        ]
      },
      {
        id: 25,
        name: 'Положение ВНК / ГНК (м)',
        source: 'ГИС, давление, C/O, геомодель',
        priority: 'P1',
        field_name: 'c025_polozhenie_vnk_gnk',
        options: [
          { value_code: 'v_dinamicheski_smeschaetsya', label: 'динамически смещается' },
          { value_code: 'v_spornyy', label: 'спорный' },
          { value_code: 'v_utochnen', label: 'Уточнен' },
          { value_code: 'v_veroyatnyy', label: 'вероятный' }
        ]
      },
      {
        id: 26,
        name: 'Тип и активность водоносной системы',
        source: 'Геология, давления, водный баланс',
        priority: 'P1',
        field_name: 'c026_tip_i_aktivnost_vodonosnoy_sistemy',
        options: [
          { value_code: 'v_aktivnyy', label: 'активный' },
          { value_code: 'v_dominiruyuschiy', label: 'доминирующий' },
          { value_code: 'v_neizvestnyy', label: 'неизвестный' },
          { value_code: 'v_slabyy', label: 'Слабый' },
          { value_code: 'v_umerennyy', label: 'умеренный' }
        ]
      },
      {
        id: 27,
        name: 'Наличие и активность газовой шапки',
        source: 'PVT, давления, ГИС, добыча газа',
        priority: 'P2',
        field_name: 'c027_nalichie_i_aktivnost_gazovoy_shapki',
        options: [
          { value_code: 'v_aktivnaya', label: 'активная' },
          { value_code: 'v_istoschennaya', label: 'истощенная' },
          { value_code: 'v_malaya', label: 'малая' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_neyasnaya', label: 'неясная' }
        ]
      },
      {
        id: 28,
        name: 'Риск неучтенных линз и тупиковых зон',
        source: 'Геомодель, ГИС, история добычи',
        priority: 'P2',
        field_name: 'c028_risk_neuchtennyh_linz_i_tupikovyh_zon',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_trebuetsya_dorazvedka', label: 'требуется доразведка' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 29,
        name: 'Пористость (%)',
        source: 'Керн, ГИС',
        priority: 'P1',
        field_name: 'c029_poristost',
        options: [
          { value_code: 'v_15_25_horoshaya', label: '15–25 хорошая' },
          { value_code: 'v_8_15_srednyaya', label: '8–15 средняя' },
          { value_code: 'v_gt_25_vysokaya', label: '>25 высокая' },
          { value_code: 'v_lt_8_nizkaya', label: '<8 низкая' }
        ]
      },
      {
        id: 30,
        name: 'Проницаемость (мД)',
        source: 'Керн, ГДИС, well test',
        priority: 'P1',
        field_name: 'c030_pronicaemost',
        options: [
          { value_code: 'v_100_500_vysokaya', label: '100–500 высокая' },
          { value_code: 'v_10_100_srednyaya', label: '10–100 средняя' },
          { value_code: 'v_gt_500_sverhprovodyaschaya', label: '>500 сверхпроводящая' },
          { value_code: 'v_lt_10_nizkaya', label: '<10 низкая' }
        ]
      },
      {
        id: 31,
        name: 'Вертикальная/горизонтальная проницаемость kv/kh (доля)',
        source: 'Керн, ГДИС, модель',
        priority: 'P2',
        field_name: 'c031_vertikalnaya_gorizontalnaya_pronicaemost_kv_kh',
        options: [
          { value_code: 'v_0_01_0_1', label: '0,01–0,1' },
          { value_code: 'v_0_1_0_5', label: '0,1–0,5' },
          { value_code: 'v_gt_0_5', label: '>0,5' },
          { value_code: 'v_lt_0_01', label: '<0,01' }
        ]
      },
      {
        id: 32,
        name: 'Net-to-gross (доля/%)',
        source: 'ГИС, геомодель',
        priority: 'P1',
        field_name: 'c032_net_to_gross',
        options: [
          { value_code: 'v_0_3_0_6', label: '0,3–0,6' },
          { value_code: 'v_gt_0_6', label: '>0,6' },
          { value_code: 'v_lt_0_3', label: '<0,3' },
          { value_code: 'v_silno_izmenchivo', label: 'сильно изменчиво' }
        ]
      },
      {
        id: 33,
        name: 'Начальная нефтенасыщенность (% PV)',
        source: 'ГИС, керн, капилляриметрия',
        priority: 'P1',
        field_name: 'c033_nachalnaya_neftenasyschennost',
        options: [
          { value_code: 'v_40_60', label: '40–60' },
          { value_code: 'v_60_75', label: '60–75' },
          { value_code: 'v_gt_75', label: '>75' },
          { value_code: 'v_lt_40', label: '<40' },
          { value_code: 'v_neopredeleno', label: 'неопределено' }
        ]
      },
      {
        id: 34,
        name: 'Текущая нефтенасыщенность (% PV)',
        source: 'C/O, РИГИС, модель, PLT',
        priority: 'P1',
        field_name: 'c034_tekuschaya_neftenasyschennost',
        options: [
          { value_code: 'v_ne_podtverzhdena', label: 'не подтверждена' },
          { value_code: 'v_nizkaya', label: 'низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_trebuetsya_c_o', label: 'требуется C/O' },
          { value_code: 'v_vysokaya', label: 'Высокая' }
        ]
      },
      {
        id: 35,
        name: 'Связанная водонасыщенность Swi (% PV)',
        source: 'Керн, ГИС, капилляриметрия',
        priority: 'P2',
        field_name: 'c035_svyazannaya_vodonasyschennost_swi',
        options: [
          { value_code: 'v_neopredelena', label: 'неопределена' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 36,
        name: 'Остаточная нефтенасыщенность Sor (% PV)',
        source: 'Керн, SCAL, модель',
        priority: 'P2',
        field_name: 'c036_ostatochnaya_neftenasyschennost_sor',
        options: [
          { value_code: 'v_15_25', label: '15–25' },
          { value_code: 'v_gt_25', label: '>25' },
          { value_code: 'v_lt_15', label: '<15' },
          { value_code: 'v_neizvestna', label: 'неизвестна' }
        ]
      },
      {
        id: 37,
        name: 'Относительные фазовые проницаемости',
        source: 'SCAL, лаборатория, ГДМ',
        priority: 'P2',
        field_name: 'c037_otnositelnye_fazovye_pronicaemosti',
        options: [
          { value_code: 'v_analogovye', label: 'аналоговые' },
          { value_code: 'v_est_scal', label: 'Есть SCAL' },
          { value_code: 'v_otsutstvuyut', label: 'отсутствуют' },
          { value_code: 'v_raschetnye', label: 'расчетные' }
        ]
      },
      {
        id: 38,
        name: 'Капиллярное давление',
        source: 'SCAL, ГИС, керн',
        priority: 'P2',
        field_name: 'c038_kapillyarnoe_davlenie',
        options: [
          { value_code: 'v_est_izmereniya', label: 'Есть измерения' },
          { value_code: 'v_ocenka', label: 'оценка' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_spornaya_perehodnaya_zona', label: 'спорная переходная зона' }
        ]
      },
      {
        id: 39,
        name: 'Смачиваемость породы',
        source: 'Лаборатория, керн',
        priority: 'P2',
        field_name: 'c039_smachivaemost_porody',
        options: [
          { value_code: 'v_neftesmach', label: 'нефтесмач.' },
          { value_code: 'v_neizvestna', label: 'неизвестна' },
          { value_code: 'v_smeshannaya', label: 'смешанная' },
          { value_code: 'v_vodosmach', label: 'Водосмач.' }
        ]
      },
      {
        id: 40,
        name: 'Сжимаемость породы (1/МПа)',
        source: 'Керн, геомеханика, ГДИС',
        priority: 'P3',
        field_name: 'c040_szhimaemost_porody',
        options: [
          { value_code: 'v_neizvestna', label: 'неизвестна' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 41,
        name: 'Глинистость и набухание (%)',
        source: 'ГИС, XRD, керн, лаборатория',
        priority: 'P1',
        field_name: 'c041_glinistost_i_nabuhanie',
        options: [
          { value_code: 'v_nabuhayuschie_gliny', label: 'набухающие глины' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 42,
        name: 'Карбонатность / кислоторастворимость (%)',
        source: 'Керн, минералогия, ГИС',
        priority: 'P2',
        field_name: 'c042_karbonatnost_kislotorastvorimost',
        options: [
          { value_code: 'v_dolomit_izvestnyak', label: 'доломит/известняк' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 43,
        name: 'Размер поровых каналов / чувствительность к полимеру',
        source: 'MICP, керн, лаборатория',
        priority: 'P2',
        field_name: 'c043_razmer_porovyh_kanalov_chuvstvitelnost_k_polimeru',
        options: [
          { value_code: 'v_krupnye', label: 'Крупные' },
          { value_code: 'v_melkie', label: 'мелкие' },
          { value_code: 'v_srednie', label: 'средние' },
          { value_code: 'v_tight', label: 'tight' },
          { value_code: 'v_trebuetsya_filtracionnyy_test', label: 'требуется фильтрационный тест' }
        ]
      },
      {
        id: 44,
        name: 'Индекс неоднородности по проницаемости',
        source: 'Керн, ГДИС, PLT, модель',
        priority: 'P1',
        field_name: 'c044_indeks_neodnorodnosti_po_pronicaemosti',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_sverhkontrastnyy', label: 'сверхконтрастный' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 45,
        name: 'Риск пескопроявления',
        source: 'Керн, добыча, мехпримеси, геомеханика',
        priority: 'P2',
        field_name: 'c045_risk_peskoproyavleniya',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_uzhe_proyavlen', label: 'уже проявлен' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      }
    ]
  },
  {
    id: 'C2',
    name: 'Флюиды + запасы + пластовое состояние',
    range: '46-87',
    description: 'Нефть/газ/вода, PVT, запасы, КИН, давление, режим залежи',
    criteria: [
      {
        id: 46,
        name: 'Плотность нефти / API (кг/м³ или °API)',
        source: 'PVT, анализ нефти',
        priority: 'P1',
        field_name: 'c046_plotnost_nefti_api',
        options: [
          { value_code: 'v_legkaya', label: 'Легкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_sverhtyazhelaya', label: 'сверхтяжелая' },
          { value_code: 'v_tyazhelaya', label: 'тяжелая' }
        ]
      },
      {
        id: 47,
        name: 'Вязкость нефти в пластовых условиях (мПа·с)',
        source: 'PVT, лаборатория',
        priority: 'P1',
        field_name: 'c047_vyazkost_nefti_v_plastovyh_usloviyah',
        options: [
          { value_code: 'v_100_500', label: '100–500' },
          { value_code: 'v_30_100', label: '30–100' },
          { value_code: 'v_5_30', label: '5–30' },
          { value_code: 'v_gt_500', label: '>500' },
          { value_code: 'v_lt_5', label: '<5' }
        ]
      },
      {
        id: 48,
        name: 'Вязкость нефти на поверхности (мПа·с)',
        source: 'Лаборатория, подготовка',
        priority: 'P2',
        field_name: 'c048_vyazkost_nefti_na_poverhnosti',
        options: [
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_trebuet_podogreva_razbavitelya', label: 'требуется подогрева/разбавителя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 49,
        name: 'Температура застывания / текучести (°C)',
        source: 'Лаборатория, промысловые данные',
        priority: 'P2',
        field_name: 'c049_temperatura_zastyvaniya_tekuchesti',
        options: [
          { value_code: 'v_blizko', label: 'близко' },
          { value_code: 'v_nizhe_usloviy_ekspluatacii', label: 'Ниже условий эксплуатации' },
          { value_code: 'v_vyshe_vysokiy_risk', label: 'выше — высокий риск' }
        ]
      },
      {
        id: 50,
        name: 'Содержание парафинов (% масс.)',
        source: 'Анализ нефти, отложения',
        priority: 'P1',
        field_name: 'c050_soderzhanie_parafinov',
        options: [
          { value_code: 'v_kritichnoe', label: 'критичное' },
          { value_code: 'v_nizkoe', label: 'Низкое' },
          { value_code: 'v_srednee', label: 'среднее' },
          { value_code: 'v_vysokoe', label: 'высокое' }
        ]
      },
      {
        id: 51,
        name: 'Содержание асфальтенов и смол (% масс.)',
        source: 'SARA-анализ, лаборатория',
        priority: 'P1',
        field_name: 'c051_soderzhanie_asfaltenov_i_smol',
        options: [
          { value_code: 'v_nestabilnaya_neft', label: 'нестабильная нефть' },
          { value_code: 'v_nizkoe', label: 'Низкое' },
          { value_code: 'v_srednee', label: 'среднее' },
          { value_code: 'v_vysokoe', label: 'высокое' }
        ]
      },
      {
        id: 52,
        name: 'Давление насыщения (МПа)',
        source: 'PVT, ГДИС, замеры давления',
        priority: 'P1',
        field_name: 'c052_davlenie_nasyscheniya',
        options: [
          { value_code: 'v_blizko_k_pb', label: 'близко к Pb' },
          { value_code: 'v_ppl_gt_pb', label: 'Pпл > Pb' },
          { value_code: 'v_ppl_lt_pb', label: 'Pпл < Pb' }
        ]
      },
      {
        id: 53,
        name: 'Газовый фактор (м³/т или м³/м³)',
        source: 'Добычная история, PVT',
        priority: 'P2',
        field_name: 'c053_gazovyy_faktor',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_rastet_anomalno', label: 'растет аномально' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 54,
        name: 'Объемный коэффициент нефти (м³/м³)',
        source: 'PVT-отчет',
        priority: 'P2',
        field_name: 'c054_obemnyy_koefficient_nefti',
        options: [
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_po_pvt', label: 'По PVT' },
          { value_code: 'v_raschetnyy', label: 'расчетный' }
        ]
      },
      {
        id: 55,
        name: 'Состав газа (% мол.)',
        source: 'Анализ газа, PVT',
        priority: 'P1',
        field_name: 'c055_sostav_gaza',
        options: [
          { value_code: 'v_co2', label: 'CO2' },
          { value_code: 'v_h2s', label: 'H2S' },
          { value_code: 'v_inertnyy', label: 'инертный' },
          { value_code: 'v_sladkiy', label: 'Сладкий' },
          { value_code: 'v_zhirnyy_gaz', label: 'жирный газ' }
        ]
      },
      {
        id: 56,
        name: 'Содержание серы и кислотное число (% масс.; мг KOH/г)',
        source: 'Анализ нефти',
        priority: 'P2',
        field_name: 'c056_soderzhanie_sery_i_kislotnoe_chislo',
        options: [
          { value_code: 'v_nizkoe', label: 'Низкое' },
          { value_code: 'v_srednee', label: 'среднее' },
          { value_code: 'v_trebuetsya_specpodgotovka', label: 'требуется спецподготовка' },
          { value_code: 'v_vysokoe', label: 'высокое' }
        ]
      },
      {
        id: 57,
        name: 'Склонность к образованию стойких эмульсий',
        source: 'Bottle test, подготовка',
        priority: 'P1',
        field_name: 'c057_sklonnost_k_obrazovaniyu_stoykih_emulsiy',
        options: [
          { value_code: 'v_kritichnaya_dlya_podgotovki', label: 'критичная для подготовки' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 58,
        name: 'Минерализация пластовой воды (г/л)',
        source: 'Анализ воды',
        priority: 'P1',
        field_name: 'c058_mineralizaciya_plastovoy_vody',
        options: [
          { value_code: 'v_100_200', label: '100–200' },
          { value_code: 'v_30_100', label: '30–100' },
          { value_code: 'v_gt_200', label: '>200' },
          { value_code: 'v_lt_30', label: '<30' },
          { value_code: 'v_vysokaya_neopredelennost', label: 'высокая неопределенность' }
        ]
      },
      {
        id: 59,
        name: 'Жесткость воды Ca/Mg/Ba/Sr (мг/л)',
        source: 'Анализ воды, scale model',
        priority: 'P1',
        field_name: 'c059_zhestkost_vody_ca_mg_ba_sr',
        options: [
          { value_code: 'v_kritichnaya_po_ba_sr_ca', label: 'критичная по Ba/Sr/Ca' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 60,
        name: 'Склонность к солеотложениям (SI)',
        source: 'Scale prediction, лаборатория',
        priority: 'P1',
        field_name: 'c060_sklonnost_k_soleotlozheniyam',
        options: [
          { value_code: 'v_okolo_0', label: 'около 0' },
          { value_code: 'v_si_gt_0', label: 'SI>0' },
          { value_code: 'v_si_lt_0', label: 'SI<0' },
          { value_code: 'v_silnyy_risk', label: 'сильный риск' }
        ]
      },
      {
        id: 61,
        name: 'Совместимость пластовой и закачиваемой воды',
        source: 'Лаборатория, water mix test',
        priority: 'P1',
        field_name: 'c061_sovmestimost_plastovoy_i_zakachivaemoy_vody',
        options: [
          { value_code: 'v_nesovmestima', label: 'несовместима' },
          { value_code: 'v_sovmestima', label: 'Совместима' },
          { value_code: 'v_test_ne_proveden', label: 'тест не проведен' },
          { value_code: 'v_uslovno', label: 'условно' }
        ]
      },
      {
        id: 62,
        name: 'SRB/бактериальная активность (КОЕ/мл)',
        source: 'Анализ воды, микробиология',
        priority: 'P2',
        field_name: 'c062_srb_bakterialnaya_aktivnost',
        options: [
          { value_code: 'v_aktivnyy_souring', label: 'активный souring' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_umerenno', label: 'умеренно' },
          { value_code: 'v_vysoko', label: 'высоко' }
        ]
      },
      {
        id: 63,
        name: 'Стабильность нефти к CO2/газу/кислотам',
        source: 'Лаборатория, PVT, SARA',
        priority: 'P2',
        field_name: 'c063_stabilnost_nefti_k_co2_gazu_kislotam',
        options: [
          { value_code: 'v_nestabilna', label: 'нестабильна' },
          { value_code: 'v_stabilna', label: 'Стабильна' },
          { value_code: 'v_test_ne_vypolnen', label: 'тест не выполнен' },
          { value_code: 'v_uslovno', label: 'условно' }
        ]
      },
      {
        id: 64,
        name: 'Пластовая температура (°C)',
        source: 'ГИС, замеры, PVT',
        priority: 'P1',
        field_name: 'c064_plastovaya_temperatura',
        options: [
          { value_code: 'v_40_70', label: '40–70' },
          { value_code: 'v_70_100', label: '70–100' },
          { value_code: 'v_gt_100', label: '>100' },
          { value_code: 'v_hthp', label: 'HTHP' },
          { value_code: 'v_lt_40', label: '<40' }
        ]
      },
      {
        id: 65,
        name: 'Начальные геологические запасы (тыс. т или млн т)',
        source: 'Подсчет запасов, геомодель',
        priority: 'P1',
        field_name: 'c065_nachalnye_geologicheskie_zapasy',
        options: [
          { value_code: 'v_krupnye', label: 'крупные' },
          { value_code: 'v_malye', label: 'Малые' },
          { value_code: 'v_po_kategorii_zapasov', label: 'по категории запасов' },
          { value_code: 'v_srednie', label: 'средние' }
        ]
      },
      {
        id: 66,
        name: 'Извлекаемые запасы (тыс. т или млн т)',
        source: 'Подсчет запасов, проект разработки',
        priority: 'P1',
        field_name: 'c066_izvlekaemye_zapasy',
        options: [
          { value_code: 'v_podtverzhdennye', label: 'Подтвержденные' },
          { value_code: 'v_spornye', label: 'спорные' },
          { value_code: 'v_veroyatnye', label: 'вероятные' }
        ]
      },
      {
        id: 67,
        name: 'Остаточные извлекаемые запасы (тыс. т или млн т)',
        source: 'Баланс запасов, добыча',
        priority: 'P1',
        field_name: 'c067_ostatochnye_izvlekaemye_zapasy',
        options: [
          { value_code: 'v_lokalizovannyy', label: 'локализованный' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 68,
        name: 'Фактический КИН (доля/%)',
        source: 'Добыча, запасы',
        priority: 'P1',
        field_name: 'c068_fakticheskiy_kinc',
        options: [
          { value_code: 'v_nizhe_analoga_proekta', label: 'ниже аналога/проекта' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 69,
        name: 'Проектный / целевой КИН (доля/%)',
        source: 'Проект разработки, модель',
        priority: 'P1',
        field_name: 'c069_proektnyy_celevoy_kin',
        options: [
          { value_code: 'v_ne_podtverzhden', label: 'не подтвержден' },
          { value_code: 'v_peresmotren', label: 'пересмотрен' },
          { value_code: 'v_po_proektu', label: 'По проекту' }
        ]
      },
      {
        id: 70,
        name: 'Разрыв фактического и проектного КИН (п.п.)',
        source: 'Добыча, проект, модель',
        priority: 'P1',
        field_name: 'c070_razryv_fakticheskogo_i_proektnogo_kin',
        options: [
          { value_code: 'v_5_10', label: '5–10' },
          { value_code: 'v_gt_10', label: '>10' },
          { value_code: 'v_kritichnyy_razryv', label: 'критичный разрыв' },
          { value_code: 'v_lt_5', label: '<5' }
        ]
      },
      {
        id: 71,
        name: 'Степень выработанности запасов (%)',
        source: 'Добыча, запасы',
        priority: 'P1',
        field_name: 'c071_stepen_vyrabotannosti_zapasov',
        options: [
          { value_code: 'v_30_60', label: '30–60' },
          { value_code: 'v_60_80', label: '60–80' },
          { value_code: 'v_gt_80', label: '>80' },
          { value_code: 'v_lt_30', label: '<30' }
        ]
      },
      {
        id: 72,
        name: 'Распределение остаточной нефти',
        source: 'ГДМ, C/O, добыча, сейсмика',
        priority: 'P1',
        field_name: 'c072_raspredelenie_ostatochnoy_nefti',
        options: [
          { value_code: 'v_krovle', label: 'в кровле' },
          { value_code: 'v_linzah', label: 'в линзах' },
          { value_code: 'v_mezhdu_skvazhinami', label: 'между скважинами' },
          { value_code: 'v_nizkoperm', label: 'в низкоперм.' },
          { value_code: 'v_ravnomerno', label: 'Равномерно' }
        ]
      },
      {
        id: 73,
        name: 'Потенциал bypassed oil (тыс. т)',
        source: 'Модель, карты ННЗ, C/O',
        priority: 'P2',
        field_name: 'c073_potencial_bypassed_oil',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_trebuet_podtverzhdeniya', label: 'требуется подтверждения' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 74,
        name: 'Достоверность категории запасов',
        source: 'Отчет запасов, аудит',
        priority: 'P1',
        field_name: 'c074_dostovernost_kategorii_zapasov',
        options: [
          { value_code: 'v_nizkaya', label: 'низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_trebuetsya_pereocenka', label: 'требуется переоценка' },
          { value_code: 'v_vysokaya', label: 'Высокая' }
        ]
      },
      {
        id: 75,
        name: 'Объемный охват вытеснением (% PV)',
        source: 'ГДМ, трассеры, PLT, модель',
        priority: 'P1',
        field_name: 'c075_obemnyy_ohvat_vytesneniem',
        options: [
          { value_code: 'v_neizvesten', label: 'неизвестен' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 76,
        name: 'Коэффициент вытеснения (доля/%)',
        source: 'SCAL, керн, модель',
        priority: 'P2',
        field_name: 'c076_koefficient_vytesneniya',
        options: [
          { value_code: 'v_laboratorno_ne_podtverzhden', label: 'лабораторно не подтвержден' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 77,
        name: 'Зрелость заводнения',
        source: 'История закачки/добычи',
        priority: 'P1',
        field_name: 'c077_zrelost_zavodneniya',
        options: [
          { value_code: 'v_formirovanie', label: 'формирование' },
          { value_code: 'v_net_ppd', label: 'Нет ППД' },
          { value_code: 'v_pozdnee', label: 'позднее' },
          { value_code: 'v_vodooborot', label: 'водооборот' },
          { value_code: 'v_zreloe', label: 'зрелое' }
        ]
      },
      {
        id: 78,
        name: 'Доля трудноизвлекаемых запасов (%)',
        source: 'Запасы, PVT, геомодель',
        priority: 'P2',
        field_name: 'c078_dolya_trudnoizvlekaemyh_zapasov',
        options: [
          { value_code: 'v_dominiruyuschaya', label: 'доминирующая' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 79,
        name: 'Начальное пластовое давление (МПа)',
        source: 'ГДИС, Рпл, проект',
        priority: 'P1',
        field_name: 'c079_nachalnoe_plastovoe_davlenie',
        options: [
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_po_blokam', label: 'по блокам' },
          { value_code: 'v_po_obektu', label: 'По объекту' }
        ]
      },
      {
        id: 80,
        name: 'Текущее пластовое давление (МПа)',
        source: 'ГДИС, замеры, модель',
        priority: 'P1',
        field_name: 'c080_tekuschee_plastovoe_davlenie',
        options: [
          { value_code: 'v_net_dannyh', label: 'нет данных' },
          { value_code: 'v_nizhe_pb', label: 'ниже Pb' },
          { value_code: 'v_vyshe_okolo_nizhe_celevogo', label: 'Выше/около/ниже целевого' }
        ]
      },
      {
        id: 81,
        name: 'Темп падения давления (МПа/год)',
        source: 'История давлений, ГДМ',
        priority: 'P1',
        field_name: 'c081_temp_padeniya_davleniya',
        options: [
          { value_code: 'v_bystroe_padenie', label: 'быстрое падение' },
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_stabilno', label: 'Стабильно' },
          { value_code: 'v_umerennoe_padenie', label: 'умеренное падение' }
        ]
      },
      {
        id: 82,
        name: 'Давление относительно давления насыщения (МПа; %)',
        source: 'PVT, текущие давления',
        priority: 'P1',
        field_name: 'c082_davlenie_otnositelno_davleniya_nasyscheniya',
        options: [
          { value_code: 'v_bezopasno', label: 'Безопасно' },
          { value_code: 'v_blizko', label: 'близко' },
          { value_code: 'v_kritichno', label: 'критично' },
          { value_code: 'v_nizhe_pb', label: 'ниже Pb' }
        ]
      },
      {
        id: 83,
        name: 'Режим залежи',
        source: 'Матбаланс, давления, добыча',
        priority: 'P1',
        field_name: 'c083_rezhim_zalezhi',
        options: [
          { value_code: 'v_gazovyy', label: 'газовый' },
          { value_code: 'v_rastvorennogo_gaza', label: 'растворенного газа' },
          { value_code: 'v_smeshannyy', label: 'смешанный' },
          { value_code: 'v_uprugiy', label: 'упругий' },
          { value_code: 'v_vodonapornyy', label: 'Водонапорный' }
        ]
      },
      {
        id: 84,
        name: 'Средняя депрессия на пласт (МПа)',
        source: 'Забойные давления, режимы',
        priority: 'P1',
        field_name: 'c084_srednyaya_depressiya_na_plast',
        options: [
          { value_code: 'v_kritichnaya_dlya_vody_peska_gaza', label: 'критичная для воды/песка/газа' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_optimalnaya', label: 'оптимальная' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 85,
        name: 'Давление разрыва / градиент трещинообразования (МПа или МПа/м)',
        source: 'ГРП, mini-frac, ГДИС',
        priority: 'P1',
        field_name: 'c085_davlenie_razryva_gradient_treschinoobrazovaniya',
        options: [
          { value_code: 'v_blizko_k_rabochemu', label: 'близко к рабочему' },
          { value_code: 'v_izvestno', label: 'Известно' },
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_ocenka', label: 'оценка' }
        ]
      },
      {
        id: 86,
        name: 'Давленческая сообщаемость скважин',
        source: 'Интерференция, falloff, трассеры',
        priority: 'P2',
        field_name: 'c086_davlencheskaya_soobschaemost_skvazhin',
        options: [
          { value_code: 'v_ne_proverena', label: 'не проверена' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_silnaya', label: 'Сильная' },
          { value_code: 'v_slabaya', label: 'слабая' },
          { value_code: 'v_umerennaya', label: 'умеренная' }
        ]
      },
      {
        id: 87,
        name: 'HTHP / sour условия',
        source: 'PVT, геология, HSE',
        priority: 'P2',
        field_name: 'c087_hthp_sour_usloviya',
        options: [
          { value_code: 'v_hp', label: 'HP' },
          { value_code: 'v_ht', label: 'HT' },
          { value_code: 'v_hthp', label: 'HTHP' },
          { value_code: 'v_hthp_plus_sour', label: 'HTHP+sour' },
          { value_code: 'v_obychnye', label: 'Обычные' },
          { value_code: 'v_sour', label: 'sour' }
        ]
      }
    ]
  },
  {
    id: 'C3',
    name: 'Разработка + фонд + добыча + ППД / вода',
    range: '88-143',
    description: 'Система разработки, фонд, добыча, ППД, обводненность, водные проблемы',
    criteria: [
      {
        id: 88,
        name: 'Тип системы разработки',
        source: 'Проект разработки, карты скважин',
        priority: 'P1',
        field_name: 'c088_tip_sistemy_razrabotki',
        options: [
          { value_code: 'v_istoricheskaya', label: 'историческая' },
          { value_code: 'v_neregulyarnaya', label: 'нерегулярная' },
          { value_code: 'v_pyatitochechnaya', label: 'пятиточечная' },
          { value_code: 'v_razrezhennaya', label: 'разреженная' },
          { value_code: 'v_regulyarnaya', label: 'Регулярная' },
          { value_code: 'v_ryadnaya', label: 'рядная' }
        ]
      },
      {
        id: 89,
        name: 'Плотность сетки скважин (га/скв.; м)',
        source: 'Карты, фонд, запасы',
        priority: 'P1',
        field_name: 'c089_plotnost_setki_skvazhin',
        options: [
          { value_code: 'v_chrezmernaya_dlya_zapasov', label: 'чрезмерная для запасов' },
          { value_code: 'v_optimalnaya', label: 'оптимальная' },
          { value_code: 'v_plotnaya', label: 'Плотная' },
          { value_code: 'v_redkaya', label: 'редкая' }
        ]
      },
      {
        id: 90,
        name: 'Расстояние добывающая–нагнетательная (м)',
        source: 'Карты скважин, ППД',
        priority: 'P2',
        field_name: 'c090_rasstoyanie_dobyvayuschaya_nagnetatelnaya',
        options: [
          { value_code: 'v_dlinnoe', label: 'длинное' },
          { value_code: 'v_korotkoe', label: 'Короткое' },
          { value_code: 'v_nesimmetrichnoe', label: 'несимметричное' },
          { value_code: 'v_optimalnoe', label: 'оптимальное' }
        ]
      },
      {
        id: 91,
        name: 'Количество действующих добывающих скважин (скв.)',
        source: 'Фонд, добыча',
        priority: 'P1',
        field_name: 'c091_kolichestvo_deystvuyuschih_dobyvayuschih_skvazhin',
        options: [
          { value_code: 'v_dolya_aktivnogo_fonda', label: 'доля активного фонда' },
          { value_code: 'v_po_obektu_bloku', label: 'По объекту/блоку' }
        ]
      },
      {
        id: 92,
        name: 'Количество действующих нагнетательных скважин (скв.)',
        source: 'ППД, фонд',
        priority: 'P1',
        field_name: 'c092_kolichestvo_deystvuyuschih_nagnetatelnyh_skvazhin',
        options: [
          { value_code: 'v_deficit', label: 'дефицит' },
          { value_code: 'v_dostatochno', label: 'Достаточно' },
          { value_code: 'v_izbytok', label: 'избыток' },
          { value_code: 'v_neravnomerno', label: 'неравномерно' }
        ]
      },
      {
        id: 93,
        name: 'Доля бездействующего и законсервированного фонда (% фонда)',
        source: 'Фонд, ремонты',
        priority: 'P1',
        field_name: 'c093_dolya_bezdeystvuyuschego_i_zakonservirovannogo_fonda',
        options: [
          { value_code: 'v_10_25', label: '10–25' },
          { value_code: 'v_25_50', label: '25–50' },
          { value_code: 'v_gt_50', label: '>50' },
          { value_code: 'v_lt_10', label: '<10' }
        ]
      },
      {
        id: 94,
        name: 'Возраст фонда (лет)',
        source: 'Фонд, паспорта скважин',
        priority: 'P2',
        field_name: 'c094_vozrast_fonda',
        options: [
          { value_code: 'v_15_30', label: '15–30' },
          { value_code: 'v_5_15', label: '5–15' },
          { value_code: 'v_gt_30', label: '>30' },
          { value_code: 'v_lt_5', label: '<5' }
        ]
      },
      {
        id: 95,
        name: 'Тип заканчивания',
        source: 'Паспорта скважин, КРС',
        priority: 'P1',
        field_name: 'c095_tip_zakanchivaniya',
        options: [
          { value_code: 'v_gorizontalnoe', label: 'горизонтальное' },
          { value_code: 'v_mnogozonnoe', label: 'многозонное' },
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_prostoe', label: 'Простое' },
          { value_code: 'v_selektivnoe', label: 'селективное' }
        ]
      },
      {
        id: 96,
        name: 'Интервалы перфорации относительно ННТ/ВНК',
        source: 'ГИС, C/O, PLT, перфорационный журнал',
        priority: 'P1',
        field_name: 'c096_intervaly_perforacii_otnositelno_nnt_vnk',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_korrektno', label: 'Корректно' },
          { value_code: 'v_trebuetsya_reviziya', label: 'требуется ревизия' },
          { value_code: 'v_zahvat_vody_gaza', label: 'захват воды/газа' }
        ]
      },
      {
        id: 97,
        name: 'Качество цементирования',
        source: 'АКЦ/CBL/VDL, КРС',
        priority: 'P1',
        field_name: 'c097_kachestvo_cementirovaniya',
        options: [
          { value_code: 'v_horoshee', label: 'Хорошее' },
          { value_code: 'v_net_akc_cbl', label: 'нет АКЦ/CBL' },
          { value_code: 'v_plohoe', label: 'плохое' },
          { value_code: 'v_somnitelnoe', label: 'сомнительное' }
        ]
      },
      {
        id: 98,
        name: 'Состояние эксплуатационной колонны',
        source: 'Опрессовка, дефектоскопия, КРС',
        priority: 'P1',
        field_name: 'c098_sostoyanie_ekspluatacionnoy_kolonny',
        options: [
          { value_code: 'v_germetichna', label: 'Герметична' },
          { value_code: 'v_negermetichna', label: 'негерметична' },
          { value_code: 'v_ogranichena', label: 'ограничена' },
          { value_code: 'v_trebuetsya_obsledovanie', label: 'требуется обследование' }
        ]
      },
      {
        id: 99,
        name: 'Наличие и качество ГС/ЗБС (м)',
        source: 'Инклинометрия, геонавигация, добыча',
        priority: 'P2',
        field_name: 'c099_nalichie_i_kachestvo_gs_zbs',
        options: [
          { value_code: 'v_est_neeffektivnye', label: 'есть неэффективные' },
          { value_code: 'v_est_uspeshnye', label: 'есть успешные' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_potencial_novyh_zbs', label: 'потенциал новых ЗБС' }
        ]
      },
      {
        id: 100,
        name: 'Возможность раздельной эксплуатации/закачки',
        source: 'Паспорта, КРС, фонд',
        priority: 'P2',
        field_name: 'c100_vozmozhnost_razdelnoy_ekspluatacii_zakachki',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_est', label: 'Есть' },
          { value_code: 'v_net', label: 'нет' },
          { value_code: 'v_trebuetsya_rekonstrukciya', label: 'требуется реконструкция' }
        ]
      },
      {
        id: 101,
        name: 'Тип механизированной добычи',
        source: 'Фонд, режимы работы',
        priority: 'P1',
        field_name: 'c101_tip_mehanizirovannoy_dobychi',
        options: [
          { value_code: 'v_ecn', label: 'ЭЦН' },
          { value_code: 'v_fontan', label: 'фонтан' },
          { value_code: 'v_gazlift', label: 'газлифт' },
          { value_code: 'v_pcp', label: 'PCP' },
          { value_code: 'v_shgn', label: 'ШГН' },
          { value_code: 'v_smeshannyy_fond', label: 'смешанный фонд' }
        ]
      },
      {
        id: 102,
        name: 'Ограничения по компоновке ГНО',
        source: 'ГНО, ремонты, режимы',
        priority: 'P2',
        field_name: 'c102_ogranicheniya_po_komponovke_gno',
        options: [
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_silnye', label: 'сильные' },
          { value_code: 'v_trebuetsya_zamena_tipa_gno', label: 'требуется замена типа ГНО' },
          { value_code: 'v_umerennye', label: 'умеренные' }
        ]
      },
      {
        id: 103,
        name: 'Доступность КРС/ПРС/коилтюбинга',
        source: 'Сервис, производственный план',
        priority: 'P2',
        field_name: 'c103_dostupnost_krs_prs_koiltyubingaa',
        options: [
          { value_code: 'v_dostupno', label: 'Доступно' },
          { value_code: 'v_ogranicheno', label: 'ограничено' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_sezonno', label: 'сезонно' }
        ]
      },
      {
        id: 104,
        name: 'Текущий дебит нефти (т/сут)',
        source: 'Добычная история',
        priority: 'P1',
        field_name: 'c104_tekuschiy_debit_nefti',
        options: [
          { value_code: 'v_nizhe_ekonomicheskogo_minimuma', label: 'ниже экономического минимума' },
          { value_code: 'v_nizkiy', label: 'низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'Высокий' }
        ]
      },
      {
        id: 105,
        name: 'Текущий дебит жидкости (м³/сут)',
        source: 'Добычная история, замеры',
        priority: 'P1',
        field_name: 'c105_tekuschiy_debit_zhidkosti',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' },
          { value_code: 'v_zhidkost_bez_nefti', label: 'жидкость без нефти' }
        ]
      },
      {
        id: 106,
        name: 'Обводненность продукции (%)',
        source: 'Добыча, подготовка',
        priority: 'P1',
        field_name: 'c106_obvodnennost_produkcii',
        options: [
          { value_code: 'v_30_70', label: '30–70' },
          { value_code: 'v_70_90', label: '70–90' },
          { value_code: 'v_gt_90', label: '>90' },
          { value_code: 'v_gt_95_kritichno', label: '>95 критично' },
          { value_code: 'v_lt_30', label: '<30' }
        ]
      },
      {
        id: 107,
        name: 'Тренд обводненности (п.п./год)',
        source: 'История добычи, события ГТМ',
        priority: 'P1',
        field_name: 'c107_trend_obvodnennosti',
        options: [
          { value_code: 'v_plavnyy_rost', label: 'плавный рост' },
          { value_code: 'v_rezkiy_rost', label: 'резкий рост' },
          { value_code: 'v_skachok_posle_gtm_ppd', label: 'скачок после ГТМ/ППД' },
          { value_code: 'v_stabilna', label: 'Стабильна' }
        ]
      },
      {
        id: 108,
        name: 'Темп падения добычи нефти (%/год)',
        source: 'Добычная история, DCA',
        priority: 'P1',
        field_name: 'c108_temp_padeniya_dobychi_nefti',
        options: [
          { value_code: 'v_10_25', label: '10–25' },
          { value_code: 'v_gt_25', label: '>25' },
          { value_code: 'v_lt_10', label: '<10' },
          { value_code: 'v_rezkiy_perelom_trenda', label: 'резкий перелом тренда' }
        ]
      },
      {
        id: 109,
        name: 'Накопленная добыча нефти и жидкости (тыс. т; тыс. м³)',
        source: 'Добычная история',
        priority: 'P1',
        field_name: 'c109_nakoplennaya_dobycha_nefti_i_zhidkosti',
        options: [
          { value_code: 'v_po_blokam', label: 'по блокам' },
          { value_code: 'v_po_obektu', label: 'По объекту' },
          { value_code: 'v_po_skvazhinam', label: 'по скважинам' }
        ]
      },
      {
        id: 110,
        name: 'Индекс продуктивности PI (м³/сут/МПа)',
        source: 'ГДИС, режимы',
        priority: 'P2',
        field_name: 'c110_indeks_produktivnosti_pi',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_rezko_snizilsya', label: 'резко снизился' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 111,
        name: 'Skin-фактор / загрязнение ПЗП',
        source: 'ГДИС, история работ',
        priority: 'P2',
        field_name: 'c111_skin_faktor_zagryaznenie_pzp',
        options: [
          { value_code: 'v_0_5', label: '0–5' },
          { value_code: 'v_gt_5', label: '>5' },
          { value_code: 'v_ne_opredelen', label: 'не определен' },
          { value_code: 'v_skin_le_0', label: 'Skin≤0' }
        ]
      },
      {
        id: 112,
        name: 'Коэффициент эксплуатации / простой фонда (%)',
        source: 'Диспетчеризация, фонд',
        priority: 'P1',
        field_name: 'c112_koefficient_ekspluatacii_prostoy_fonda',
        options: [
          { value_code: 'v_70_85', label: '70–85' },
          { value_code: 'v_85_95', label: '85–95' },
          { value_code: 'v_gt_95', label: '>95' },
          { value_code: 'v_lt_70', label: '<70' }
        ]
      },
      {
        id: 113,
        name: 'Частота ремонтов и отказов (1/год)',
        source: 'Ремонты, ГНО, аварии',
        priority: 'P1',
        field_name: 'c113_chastota_remontov_i_otkazov',
        options: [
          { value_code: 'v_avariynaya', label: 'аварийная' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 114,
        name: 'Энергоэффективность подъема жидкости (кВт·ч/т)',
        source: 'Энергия, ГНО, добыча',
        priority: 'P2',
        field_name: 'c114_energoeffektivnost_podema_zhidkosti',
        options: [
          { value_code: 'v_kritichnaya', label: 'критичная' },
          { value_code: 'v_ne_izmeryaetsya', label: 'не измеряется' },
          { value_code: 'v_norma', label: 'Норма' },
          { value_code: 'v_povyshennaya', label: 'повышенная' }
        ]
      },
      {
        id: 115,
        name: 'Газовое влияние на насосы',
        source: 'ГНО, динамограммы, газовый фактор',
        priority: 'P2',
        field_name: 'c115_gazovoe_vliyanie_na_nasosy',
        options: [
          { value_code: 'v_avariynoe', label: 'аварийное' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_silnoe', label: 'сильное' },
          { value_code: 'v_umerennoe', label: 'умеренное' }
        ]
      },
      {
        id: 116,
        name: 'Механические примеси в добыче (мг/л или г/м³)',
        source: 'Анализ жидкости, ремонты',
        priority: 'P2',
        field_name: 'c116_mehanicheskie_primesi_v_dobyche',
        options: [
          { value_code: 'v_iznos_oborudovaniya', label: 'износ оборудования' },
          { value_code: 'v_nizko', label: 'Низко' },
          { value_code: 'v_sredne', label: 'средне' },
          { value_code: 'v_vysoko', label: 'высоко' }
        ]
      },
      {
        id: 117,
        name: 'Категория скважин по потенциалу',
        source: 'Добыча, фонд, экономика',
        priority: 'P2',
        field_name: 'c117_kategoriya_skvazhin_po_potencialu',
        options: [
          { value_code: 'v_a_bystryy_effekt', label: 'A быстрый эффект' },
          { value_code: 'v_b_diagnostika', label: 'B диагностика' },
          { value_code: 'v_c_nizkiy_prioritet', label: 'C низкий приоритет' },
          { value_code: 'v_d_stop_loss', label: 'D stop-loss' }
        ]
      },
      {
        id: 118,
        name: 'Наличие системы ППД',
        source: 'ППД, проект разработки',
        priority: 'P1',
        field_name: 'c118_nalichie_sistemy_ppd',
        options: [
          { value_code: 'v_degradirovannaya', label: 'деградированная' },
          { value_code: 'v_formiruetsya', label: 'формируется' },
          { value_code: 'v_lokalnaya', label: 'локальная' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_zrelaya', label: 'зрелая' }
        ]
      },
      {
        id: 119,
        name: 'Источник закачиваемой воды',
        source: 'ППД, водоподготовка',
        priority: 'P1',
        field_name: 'c119_istochnik_zakachivaemoy_vody',
        options: [
          { value_code: 'v_morskaya', label: 'морская' },
          { value_code: 'v_neyasnaya', label: 'неясная' },
          { value_code: 'v_plastovaya', label: 'Пластовая' },
          { value_code: 'v_presnaya', label: 'пресная' },
          { value_code: 'v_smeshannaya', label: 'смешанная' },
          { value_code: 'v_stochnaya', label: 'сточная' }
        ]
      },
      {
        id: 120,
        name: 'Объем закачки воды (м³/сут; тыс. м³/год)',
        source: 'ППД, добычная история',
        priority: 'P1',
        field_name: 'c120_obem_zakachki_vody',
        options: [
          { value_code: 'v_dostatochnaya', label: 'достаточная' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_rastet_bez_nefti', label: 'растет без нефти' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 121,
        name: 'Коэффициент компенсации отборов (%)',
        source: 'ППД, PVT, добыча',
        priority: 'P1',
        field_name: 'c121_koefficient_kompensacii_otborov',
        options: [
          { value_code: 'v_80_110_balans', label: '80–110 баланс' },
          { value_code: 'v_gt_110_perezakachka', label: '>110 перезакачка' },
          { value_code: 'v_lokalno_asimmetrichen', label: 'локально асимметричен' },
          { value_code: 'v_lt_80_deficit', label: '<80 дефицит' }
        ]
      },
      {
        id: 122,
        name: 'Приемистость нагнетательных скважин (м³/сут/МПа)',
        source: 'ППД, falloff, профиль',
        priority: 'P1',
        field_name: 'c122_priemistost_nagnetatelnyh_skvazhin',
        options: [
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_normalnaya', label: 'нормальная' },
          { value_code: 'v_sverhvysokaya_kanal', label: 'сверхвысокая/канал' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 123,
        name: 'Давление закачки (МПа)',
        source: 'ППД, замеры, falloff',
        priority: 'P1',
        field_name: 'c123_davlenie_zakachki',
        options: [
          { value_code: 'v_blizko_k_razryvu', label: 'близко к разрыву' },
          { value_code: 'v_celevoe', label: 'целевое' },
          { value_code: 'v_nizkoe', label: 'Низкое' },
          { value_code: 'v_vysokoe', label: 'высокое' }
        ]
      },
      {
        id: 124,
        name: 'Профиль приемистости по интервалам',
        source: 'Профиль приемистости, PLT',
        priority: 'P1',
        field_name: 'c124_profil_priemistosti_po_intervalam',
        options: [
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_odin_kanal', label: 'один канал' },
          { value_code: 'v_ravnomernyy', label: 'Равномерный' },
          { value_code: 'v_verhniy_nizhniy_interval', label: 'верхний/нижний интервал' }
        ]
      },
      {
        id: 125,
        name: 'Качество закачиваемой воды (мг/л; NTU)',
        source: 'Водоподготовка, лаборатория',
        priority: 'P1',
        field_name: 'c125_kachestvo_zakachivaemoy_vody',
        options: [
          { value_code: 'v_ne_izmeryaetsya', label: 'не измеряется' },
          { value_code: 'v_plohoe', label: 'плохое' },
          { value_code: 'v_sootvetstvuet', label: 'Соответствует' },
          { value_code: 'v_uslovno', label: 'условно' }
        ]
      },
      {
        id: 126,
        name: 'Баланс закачки по блокам / pattern (%)',
        source: 'Карты компенсации, ППД',
        priority: 'P1',
        field_name: 'c126_balans_zakachki_po_blokam_pattern',
        options: [
          { value_code: 'v_balans', label: 'баланс' },
          { value_code: 'v_deficit', label: 'Дефицит' },
          { value_code: 'v_perezakachka', label: 'перезакачка' },
          { value_code: 'v_silnaya_asimmetriya', label: 'сильная асимметрия' }
        ]
      },
      {
        id: 127,
        name: 'Трассерная связь нагнетатель–добывающая (%; сут.)',
        source: 'Трассерные исследования',
        priority: 'P2',
        field_name: 'c127_trassernaya_svyaz_nagnetatel_dobyvayuschaya',
        options: [
          { value_code: 'v_bystraya', label: 'быстрая' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_normalnaya', label: 'нормальная' },
          { value_code: 'v_slabaya', label: 'слабая' },
          { value_code: 'v_sverhbystraya', label: 'сверхбыстрая' }
        ]
      },
      {
        id: 128,
        name: 'Площадной охват заводнением',
        source: 'ГДМ, карты, трассеры',
        priority: 'P1',
        field_name: 'c128_ploschadnoy_ohvat_zavodneniem',
        options: [
          { value_code: 'v_horoshiy', label: 'Хороший' },
          { value_code: 'v_lokalnyy', label: 'локальный' },
          { value_code: 'v_neravnomernyy', label: 'неравномерный' },
          { value_code: 'v_nizkiy', label: 'низкий' }
        ]
      },
      {
        id: 129,
        name: 'Вертикальный охват заводнением',
        source: 'PLT, профили, модель',
        priority: 'P1',
        field_name: 'c129_vertikalnyy_ohvat_zavodneniem',
        options: [
          { value_code: 'v_horoshiy', label: 'Хороший' },
          { value_code: 'v_neizvesten', label: 'неизвестен' },
          { value_code: 'v_odin_proplastok', label: 'один пропласток' },
          { value_code: 'v_verh_niz', label: 'верх/низ' }
        ]
      },
      {
        id: 130,
        name: 'Возможность циклической/нестационарной закачки',
        source: 'ППД, автоматика, фонд',
        priority: 'P2',
        field_name: 'c130_vozmozhnost_ciklicheskoy_nestacionarnoy_zakachki',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_gotovo', label: 'Готово' },
          { value_code: 'v_nevozmozhno', label: 'невозможно' },
          { value_code: 'v_ogranicheno', label: 'ограничено' }
        ]
      },
      {
        id: 131,
        name: 'Совместимость с полимером/ПАВ/гелями',
        source: 'Лабораторный скрининг, вода, керн',
        priority: 'P2',
        field_name: 'c131_sovmestimost_s_polimerom_pav_gelyami',
        options: [
          { value_code: 'v_ne_podhodit', label: 'не подходит' },
          { value_code: 'v_podhodit', label: 'Подходит' },
          { value_code: 'v_trebuetsya_laboratoriya', label: 'требуется лаборатория' },
          { value_code: 'v_uslovno', label: 'условно' }
        ]
      },
      {
        id: 132,
        name: 'Основной источник воды',
        source: 'Геохимия воды, PLT, C/O, АКЦ',
        priority: 'P1',
        field_name: 'c132_osnovnoy_istochnik_vody',
        options: [
          { value_code: 'v_kontur', label: 'контур' },
          { value_code: 'v_neizvestno', label: 'неизвестно' },
          { value_code: 'v_podoshva', label: 'подошва' },
          { value_code: 'v_smeshannaya', label: 'смешанная' },
          { value_code: 'v_zakachka', label: 'Закачка' },
          { value_code: 'v_zakolonka', label: 'заколонка' }
        ]
      },
      {
        id: 133,
        name: 'Доля закачиваемой воды в добыче (%)',
        source: 'Геохимия, трассеры, баланс',
        priority: 'P2',
        field_name: 'c133_dolya_zakachivaemoy_vody_v_dobyche',
        options: [
          { value_code: 'v_bystryy_vozvrat_zakachki', label: 'быстрый возврат закачки' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 134,
        name: 'Риск водяного конуса',
        source: 'C/O, PLT, депрессия, модель',
        priority: 'P1',
        field_name: 'c134_risk_vodyanogo_konusa',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_podtverzhden', label: 'подтвержден' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 135,
        name: 'Риск прорыва краевой/контурной воды',
        source: 'Карты обводнения, геохимия',
        priority: 'P2',
        field_name: 'c135_risk_proryva_kraevoy_konturnoy_vody',
        options: [
          { value_code: 'v_front_u_skvazhin', label: 'фронт у скважин' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_umerennyy', label: 'умеренный' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 136,
        name: 'Риск заколонного перетока воды/газа',
        source: 'АКЦ/CBL/VDL, термо/шум, PLT',
        priority: 'P1',
        field_name: 'c136_risk_zakolonnogo_peretoka_vody_gaza',
        options: [
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_podozrenie', label: 'подозрение' },
          { value_code: 'v_podtverzhden', label: 'подтвержден' },
          { value_code: 'v_trebuetsya_akc_shum_termo', label: 'требуется АКЦ/шум/термо' }
        ]
      },
      {
        id: 137,
        name: 'Риск канализации закачки',
        source: 'Трассеры, PLT, профиль приемистости',
        priority: 'P1',
        field_name: 'c137_risk_kanalizacii_zakachki',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_podtverzhden_trasserom', label: 'подтвержден трассером' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 138,
        name: 'Water cut vs drawdown',
        source: 'Режимы, замеры, добыча',
        priority: 'P2',
        field_name: 'c138_water_cut_vs_drawdown',
        options: [
          { value_code: 'v_dannyh_net', label: 'данных нет' },
          { value_code: 'v_nezavisima', label: 'Независима' },
          { value_code: 'v_rastet_s_depressiey', label: 'растет с депрессией' },
          { value_code: 'v_skachki', label: 'скачки' }
        ]
      },
      {
        id: 139,
        name: 'Риск газового конуса / газового прорыва',
        source: 'PVT, GOR, PLT, модель',
        priority: 'P2',
        field_name: 'c139_risk_gazovogo_konusa_gazovogo_proryva',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_podtverzhden', label: 'подтвержден' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 140,
        name: 'Мощность подготовки по воде (м³/сут)',
        source: 'Подготовка, водоподготовка',
        priority: 'P1',
        field_name: 'c140_moschnost_podgotovki_po_vode',
        options: [
          { value_code: 'v_blizko_k_limitu', label: 'близко к лимиту' },
          { value_code: 'v_net_ucheta', label: 'нет учета' },
          { value_code: 'v_peregruz', label: 'перегруз' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 141,
        name: 'Стоимость обращения с водой ($/м³ или тг/м³)',
        source: 'Экономика, подготовка, энергия',
        priority: 'P1',
        field_name: 'c141_stoimost_obrascheniya_s_vodoy',
        options: [
          { value_code: 'v_ne_schitaetsya_otdelno', label: 'не считается отдельно' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 142,
        name: 'Наличие source-of-water диагностики',
        source: 'Геохимия, PLT, C/O, АКЦ',
        priority: 'P1',
        field_name: 'c142_nalichie_source_of_water_diagnostiki',
        options: [
          { value_code: 'v_chastichnaya', label: 'частичная' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_polnaya', label: 'Полная' },
          { value_code: 'v_protivorechivaya', label: 'противоречивая' }
        ]
      },
      {
        id: 143,
        name: 'Техническая возможность отсечения воды',
        source: 'КРС, компоновка, диагностика',
        priority: 'P2',
        field_name: 'c143_tehnicheskaya_vozmozhnost_otsecheniya_vody',
        options: [
          { value_code: 'v_nevozmozhno_bez_rekonstrukcii', label: 'невозможно без реконструкции' },
          { value_code: 'v_nizkaya', label: 'низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'Высокая' }
        ]
      }
    ]
  },
  {
    id: 'C4',
    name: 'Осложнения + инфраструктура + данные + экономика + готовность',
    range: '144-207',
    description: 'АСПО, соли, коррозия, инфраструктура, данные, экономика, пилот',
    criteria: [
      {
        id: 144,
        name: 'Риск АСПО в стволе/ПЗП/линии',
        source: 'Анализ отложений, нефть, ремонты',
        priority: 'P1',
        field_name: 'c144_risk_aspo_v_stvole_pzp_linii',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_podtverzhden_otlozheniyami', label: 'подтвержден отложениями' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 145,
        name: 'Риск солеотложений в скважинах и ПЗП',
        source: 'Анализ воды, отложения',
        priority: 'P1',
        field_name: 'c145_risk_soleotlozheniy_v_skvazhinah_i_pzp',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_podtverzhden', label: 'подтвержден' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 146,
        name: 'Коррозионная активность среды (мм/год)',
        source: 'Купоны, анализ воды/газа, аварии',
        priority: 'P1',
        field_name: 'c146_korrozionnaya_aktivnost_sredy',
        options: [
          { value_code: 'v_avariynaya', label: 'аварийная' },
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 147,
        name: 'Риск биокоррозии и souring',
        source: 'Микробиология, H2S, ППД',
        priority: 'P2',
        field_name: 'c147_risk_biokorrozii_i_souring',
        options: [
          { value_code: 'v_aktivnyy_h2s', label: 'активный H2S' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_umerennyy', label: 'умеренный' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 148,
        name: 'Проблемы деэмульсации (г/т; %)',
        source: 'Подготовка, bottle test',
        priority: 'P1',
        field_name: 'c148_problemy_deemulsacii',
        options: [
          { value_code: 'v_neustoychivaya_podgotovka', label: 'неустойчивая подготовка' },
          { value_code: 'v_norma', label: 'Норма' },
          { value_code: 'v_povyshennyy_rashod', label: 'повышенный расход' },
          { value_code: 'v_srykachestva', label: 'срыв качества' }
        ]
      },
      {
        id: 149,
        name: 'Факт выноса песка (г/м³)',
        source: 'Анализ мехпримесей, ремонты',
        priority: 'P2',
        field_name: 'c149_fakt_vynosa_peska',
        options: [
          { value_code: 'v_avariynyy_vynos', label: 'аварийный вынос' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_umerenno', label: 'умеренно' },
          { value_code: 'v_vysoko', label: 'высоко' }
        ]
      },
      {
        id: 150,
        name: 'Твердые частицы в воде ППД (мг/л)',
        source: 'Водоподготовка, лаборатория',
        priority: 'P1',
        field_name: 'c150_tverdye_chasticy_v_vode_ppd',
        options: [
          { value_code: 'v_kritichno', label: 'критично' },
          { value_code: 'v_ne_izmeryaetsya', label: 'не измеряется' },
          { value_code: 'v_norma', label: 'Норма' },
          { value_code: 'v_povysheno', label: 'повышено' }
        ]
      },
      {
        id: 151,
        name: 'Риск гидратообразования',
        source: 'PVT, режимы, промысловые данные',
        priority: 'P3',
        field_name: 'c151_risk_gidratoobrazovaniyana',
        options: [
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_sezonnyy', label: 'сезонный' },
          { value_code: 'v_trebuetsya_ingibirovanie', label: 'требуется ингибирование' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 152,
        name: 'Теплопотери и риск охлаждения продукции (°C)',
        source: 'Термограммы, климат, подготовка',
        priority: 'P2',
        field_name: 'c152_teplopoteri_i_risk_ohlazhdeniya_produkcii',
        options: [
          { value_code: 'v_bezopasno', label: 'Безопасно' },
          { value_code: 'v_kritichno_zimoy', label: 'критично зимой' },
          { value_code: 'v_pogranichno', label: 'погранично' },
          { value_code: 'v_trebuet_podogreva', label: 'требуется подогрев' }
        ]
      },
      {
        id: 153,
        name: 'Шламы и смешанные отложения',
        source: 'Анализ отложений, ремонты',
        priority: 'P2',
        field_name: 'c153_shlamy_i_smeshannye_otlozheniya',
        options: [
          { value_code: 'v_lokalno', label: 'локально' },
          { value_code: 'v_net', label: 'Нет' },
          { value_code: 'v_sistemno', label: 'системно' },
          { value_code: 'v_sostane_opredelen', label: 'состав не определен' }
        ]
      },
      {
        id: 154,
        name: 'Пропускная способность системы сбора (м³/сут; т/сут)',
        source: 'Инфраструктура, SCADA, замеры',
        priority: 'P1',
        field_name: 'c154_propusknaya_sposobnost_sistemy_sbora',
        options: [
          { value_code: 'v_blizko_k_limitu', label: 'близко к лимиту' },
          { value_code: 'v_peregruz', label: 'перегруз' },
          { value_code: 'v_uzkoe_mesto', label: 'узкое место' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 155,
        name: 'Мощность подготовки нефти (м³/сут; т/сут)',
        source: 'ЦППН/УПН, лаборатория',
        priority: 'P1',
        field_name: 'c155_moschnost_podgotovki_nefti',
        options: [
          { value_code: 'v_kachestvo_sryvaetsya', label: 'качество срывается' },
          { value_code: 'v_ogranichenie', label: 'ограничение' },
          { value_code: 'v_peregruz', label: 'перегруз' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 156,
        name: 'Мощность водоподготовки и закачки (м³/сут)',
        source: 'Водоподготовка, ППД',
        priority: 'P1',
        field_name: 'c156_moschnost_vodopodgotovki_i_zakachki',
        options: [
          { value_code: 'v_blizko', label: 'близко' },
          { value_code: 'v_deficit', label: 'дефицит' },
          { value_code: 'v_peregruz', label: 'перегруз' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 157,
        name: 'Электроэнергетические ограничения (кВт; $/кВт·ч)',
        source: 'Энергобаланс, счета, SCADA',
        priority: 'P1',
        field_name: 'c157_elektroenergeticheskie_ogranicheniya',
        options: [
          { value_code: 'v_avariynost', label: 'аварийность' },
          { value_code: 'v_dorogaya_energiya', label: 'дорогая энергия' },
          { value_code: 'v_ogranichenie', label: 'ограничение' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 158,
        name: 'Состояние трубопроводов',
        source: 'Ремонты, дефектоскопия',
        priority: 'P1',
        field_name: 'c158_sostoyanie_truboprovodov',
        options: [
          { value_code: 'v_avariynoe', label: 'аварийное' },
          { value_code: 'v_horoshee', label: 'Хорошее' },
          { value_code: 'v_ogranichennoe', label: 'ограниченное' },
          { value_code: 'v_trebuetsya_zamena_futerovka', label: 'требуется замена/футеровка' }
        ]
      },
      {
        id: 159,
        name: 'Доступность дорог и транспорта реагентов',
        source: 'Логистика, закупки, сервис',
        priority: 'P2',
        field_name: 'c159_dostupnost_dorog_i_transporta_reagentov',
        options: [
          { value_code: 'v_horoshaya', label: 'Хорошая' },
          { value_code: 'v_kritichnaya', label: 'критичная' },
          { value_code: 'v_sezonnaya', label: 'сезонная' },
          { value_code: 'v_slozhnaya', label: 'сложная' }
        ]
      },
      {
        id: 160,
        name: 'Утилизация и использование попутного газа (м³/сут)',
        source: 'Газовый баланс, HSE',
        priority: 'P2',
        field_name: 'c160_utilizaciya_i_ispolzovanie_poputnogo_gaza',
        options: [
          { value_code: 'v_deficit_kompressii', label: 'дефицит компрессии' },
          { value_code: 'v_fakel', label: 'факел' },
          { value_code: 'v_ispolzuetsya', label: 'используется' },
          { value_code: 'v_net_gaza', label: 'Нет газа' }
        ]
      },
      {
        id: 161,
        name: 'Доступность тепла/пара/топлива',
        source: 'Энергия, котельные, газ',
        priority: 'P3',
        field_name: 'c161_dostupnost_tepla_para_topliva',
        options: [
          { value_code: 'v_dorogo', label: 'дорого' },
          { value_code: 'v_est', label: 'Есть' },
          { value_code: 'v_ogranicheno', label: 'ограничено' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' }
        ]
      },
      {
        id: 162,
        name: 'Доступность лабораторной базы',
        source: 'Лаборатория, сервис',
        priority: 'P2',
        field_name: 'c162_dostupnost_laboratornoy_bazy',
        options: [
          { value_code: 'v_ogranichennaya', label: 'ограниченная' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_vneshnyaya', label: 'внешняя' },
          { value_code: 'v_vnutrennyaya', label: 'Внутренняя' }
        ]
      },
      {
        id: 163,
        name: 'Учет и телеметрия на промысле',
        source: 'SCADA, замеры, метрология',
        priority: 'P1',
        field_name: 'c163_uchet_i_telemetriya_na_promysle',
        options: [
          { value_code: 'v_chastichnyy', label: 'частичный' },
          { value_code: 'v_nizkaya_nadezhnost', label: 'низкая надежность' },
          { value_code: 'v_polnyy', label: 'Полный' },
          { value_code: 'v_ruchnoy', label: 'ручной' }
        ]
      },
      {
        id: 164,
        name: 'Хранение и дозирование химии',
        source: 'Инфраструктура, HSE',
        priority: 'P2',
        field_name: 'c164_hranenie_i_dozirovanie_himii',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_gotovo', label: 'Готово' },
          { value_code: 'v_nevozmozhno', label: 'невозможно' },
          { value_code: 'v_trebuetsya_capex', label: 'требуется CAPEX' }
        ]
      },
      {
        id: 165,
        name: 'Лимиты сброса/утилизации воды и эмиссий',
        source: 'HSE, экология, лицензии',
        priority: 'P1',
        field_name: 'c165_limity_sbrosa_utilizacii_vody_i_emissiy',
        options: [
          { value_code: 'v_blizko', label: 'близко' },
          { value_code: 'v_prevyshenie', label: 'превышение' },
          { value_code: 'v_trebuetsya_razreshenie', label: 'требуется разрешение' },
          { value_code: 'v_zapas', label: 'Запас' }
        ]
      },
      {
        id: 166,
        name: 'Полнота истории добычи и закачки',
        source: 'Добычная база, ППД',
        priority: 'P1',
        field_name: 'c166_polnota_istorii_dobychi_i_zakachki',
        options: [
          { value_code: 'v_chastichnaya', label: 'частичная' },
          { value_code: 'v_nizkaya_nadezhnost', label: 'низкая надежность' },
          { value_code: 'v_polnaya', label: 'Полная' },
          { value_code: 'v_s_razryvami', label: 'с разрывами' }
        ]
      },
      {
        id: 167,
        name: 'Наличие и качество ГИС',
        source: 'ГИС, архив скважин',
        priority: 'P1',
        field_name: 'c167_nalichie_i_kachestvo_gis',
        options: [
          { value_code: 'v_chastichnyy', label: 'частичный' },
          { value_code: 'v_nizkoe_kachestvo', label: 'низкое качество' },
          { value_code: 'v_polnyy', label: 'Полный' },
          { value_code: 'v_staryy', label: 'старый' }
        ]
      },
      {
        id: 168,
        name: 'Наличие керна и SCAL',
        source: 'Керн, лаборатория',
        priority: 'P2',
        field_name: 'c168_nalichie_kerna_i_scal',
        options: [
          { value_code: 'v_analogovyy', label: 'аналоговый' },
          { value_code: 'v_ogranichennyy', label: 'ограниченный' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_polnyy', label: 'Полный' }
        ]
      },
      {
        id: 169,
        name: 'Наличие актуального PVT',
        source: 'PVT-отчеты',
        priority: 'P1',
        field_name: 'c169_nalichie_aktualnogo_pvt',
        options: [
          { value_code: 'v_aktualnyy', label: 'Актуальный' },
          { value_code: 'v_analogovyy', label: 'аналоговый' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_staryy', label: 'старый' }
        ]
      },
      {
        id: 170,
        name: 'Наличие ГДИС / well tests',
        source: 'ГДИС, well test',
        priority: 'P2',
        field_name: 'c170_nalichie_gdis_well_tests',
        options: [
          { value_code: 'v_otsutstvuyut', label: 'отсутствуют' },
          { value_code: 'v_regulyarno', label: 'Регулярно' },
          { value_code: 'v_starye', label: 'старые' },
          { value_code: 'v_tochechno', label: 'точечно' }
        ]
      },
      {
        id: 171,
        name: 'Наличие PLT / профиля притока и приемистости',
        source: 'PLT, профиль приемистости',
        priority: 'P2',
        field_name: 'c171_nalichie_plt_profilya_pritoka_i_priemistosti',
        options: [
          { value_code: 'v_chastichnye', label: 'частичные' },
          { value_code: 'v_est_svezhie', label: 'Есть свежие' },
          { value_code: 'v_otsutstvuyut', label: 'отсутствуют' },
          { value_code: 'v_starye', label: 'старые' }
        ]
      },
      {
        id: 172,
        name: 'Наличие C/O или РИГИС через колонну',
        source: 'C/O, РИГИС',
        priority: 'P2',
        field_name: 'c172_nalichie_c_o_ili_rigis_cherez_kolonnu',
        options: [
          { value_code: 'v_est_svezhie', label: 'Есть свежие' },
          { value_code: 'v_net', label: 'нет' },
          { value_code: 'v_starye', label: 'старые' },
          { value_code: 'v_trebuetsya_pered_gtm', label: 'требуется перед ГТМ' }
        ]
      },
      {
        id: 173,
        name: 'Наличие АКЦ/CBL/VDL/термо/шум',
        source: 'АКЦ/CBL/VDL, шумометрия',
        priority: 'P2',
        field_name: 'c173_nalichie_akc_cbl_vdl_termo_shum',
        options: [
          { value_code: 'v_est_starye', label: 'есть старые' },
          { value_code: 'v_est_svezhie', label: 'Есть свежие' },
          { value_code: 'v_net', label: 'нет' },
          { value_code: 'v_trebuetsya_po_vodnym_skvazhinam', label: 'требуется по водным скважинам' }
        ]
      },
      {
        id: 174,
        name: 'Наличие трассерных исследований',
        source: 'Трассеры, геохимия',
        priority: 'P2',
        field_name: 'c174_nalichie_trassernyh_issledovaniy',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_est', label: 'Есть' },
          { value_code: 'v_net', label: 'нет' },
          { value_code: 'v_trebuetsya_na_zrelom_ppd', label: 'требуется на зрелом ППД' }
        ]
      },
      {
        id: 175,
        name: 'Наличие и качество сейсмики',
        source: 'Сейсмика, интерпретация',
        priority: 'P2',
        field_name: 'c175_nalichie_i_kachestvo_seysmiki',
        options: [
          { value_code: 'v_2d', label: '2D' },
          { value_code: 'v_3d_aktualnaya', label: '3D актуальная' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_staraya', label: 'старая' }
        ]
      },
      {
        id: 176,
        name: 'Актуальность геологической модели',
        source: 'Геомодель, дата версии',
        priority: 'P1',
        field_name: 'c176_aktualnost_geologicheskoy_modeli',
        options: [
          { value_code: 'v_aktualna', label: 'Актуальна' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_trebuet_obnovleniya', label: 'требует обновления' },
          { value_code: 'v_ustarela', label: 'устарела' }
        ]
      },
      {
        id: 177,
        name: 'Качество гидродинамической модели',
        source: 'ГДМ, history match',
        priority: 'P2',
        field_name: 'c177_kachestvo_gidrodinamicheskoy_modeli',
        options: [
          { value_code: 'v_horoshiy', label: 'Хороший' },
          { value_code: 'v_net_modeli', label: 'нет модели' },
          { value_code: 'v_priemlemyy', label: 'приемлемый' },
          { value_code: 'v_slabyy', label: 'слабый' }
        ]
      },
      {
        id: 178,
        name: 'Сеть регулярного замера давлений',
        source: 'Промысловые замеры',
        priority: 'P1',
        field_name: 'c178_set_regulyarnogo_zamera_davleniy',
        options: [
          { value_code: 'v_neregulyarnaya', label: 'нерегулярная' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_regulyarnaya', label: 'Регулярная' },
          { value_code: 'v_vyborochnaya', label: 'выборочная' }
        ]
      },
      {
        id: 179,
        name: 'Рейтинг надежности данных',
        source: 'Data QA/QC',
        priority: 'P1',
        field_name: 'c179_reyting_nadezhnosti_dannyh',
        options: [
          { value_code: 'v_a_gotovo', label: 'A готово' },
          { value_code: 'v_b_proverit', label: 'B проверить' },
          { value_code: 'v_c_doizuchit', label: 'C доизучить' },
          { value_code: 'v_d_nedostoverno', label: 'D недостоверно' }
        ]
      },
      {
        id: 180,
        name: 'Наличие data-room и версионности',
        source: 'Data-room, DMS',
        priority: 'P2',
        field_name: 'c180_nalichie_data_room_i_versionnosti',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_est', label: 'Есть' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_razroznenno', label: 'разрозненно' }
        ]
      },
      {
        id: 181,
        name: 'Наличие архива ГТМ и post-audit',
        source: 'ГТМ, ремонты, экономика',
        priority: 'P1',
        field_name: 'c181_nalichie_arhiva_gtm_i_post_audit',
        options: [
          { value_code: 'v_chastichnyy', label: 'частичный' },
          { value_code: 'v_otsutstvuet', label: 'отсутствует' },
          { value_code: 'v_polnyy', label: 'Полный' },
          { value_code: 'v_tolko_fakty_rabot', label: 'только факты работ' }
        ]
      },
      {
        id: 182,
        name: 'Netback / цена реализации ($/bbl или $/т)',
        source: 'Экономика, коммерция',
        priority: 'P1',
        field_name: 'c182_netback_cena_realizacii',
        options: [
          { value_code: 'v_bazovyy', label: 'базовый' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_scenarii', label: 'сценарии' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 183,
        name: 'OPEX добычи нефти ($/bbl; $/т)',
        source: 'Финансы, промысловый учет',
        priority: 'P1',
        field_name: 'c183_opex_dobychi_nefti',
        options: [
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vyshe_netback', label: 'выше netback' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 184,
        name: 'OPEX воды ($/м³)',
        source: 'Финансы, подготовка, энергия',
        priority: 'P1',
        field_name: 'c184_opex_vody',
        options: [
          { value_code: 'v_kritichnyy', label: 'критичный' },
          { value_code: 'v_ne_schitaetsya', label: 'Не считается' },
          { value_code: 'v_nizkiy', label: 'низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 185,
        name: 'Стоимость электроэнергии и топлива ($/ГДж; $/кВт·ч)',
        source: 'Финансы, энергетика',
        priority: 'P2',
        field_name: 'c185_stoimost_elektroenergii_i_topliva',
        options: [
          { value_code: 'v_nizkaya', label: 'Низкая' },
          { value_code: 'v_ogranichenie_moschnosti', label: 'ограничение мощности' },
          { value_code: 'v_srednyaya', label: 'средняя' },
          { value_code: 'v_vysokaya', label: 'высокая' }
        ]
      },
      {
        id: 186,
        name: 'CAPEX-лимит на решение / пилот ($ или тг)',
        source: 'Бюджет, инвестиционный комитет',
        priority: 'P1',
        field_name: 'c186_capex_limit_na_reshenie_pilot',
        options: [
          { value_code: 'v_net_limita_net_byudzheta', label: 'нет лимита/нет бюджета' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 187,
        name: 'Требуемый срок окупаемости (мес./лет)',
        source: 'Финансовые требования',
        priority: 'P1',
        field_name: 'c187_trebuemyy_srok_okupaemosti',
        options: [
          { value_code: 'v_18_36', label: '18–36' },
          { value_code: 'v_6_18', label: '6–18' },
          { value_code: 'v_gt_36', label: '>36' },
          { value_code: 'v_lt_6_mes', label: '<6 мес.' }
        ]
      },
      {
        id: 188,
        name: 'Минимальный экономический дебит нефти (т/сут)',
        source: 'Экономика, OPEX, добыча',
        priority: 'P1',
        field_name: 'c188_minimalnyy_ekonomicheskiy_debit_nefti',
        options: [
          { value_code: 'v_po_skvazhine_obektu', label: 'По скважине/объекту' },
          { value_code: 'v_zavisit_ot_vody_i_opex', label: 'зависит от воды и OPEX' }
        ]
      },
      {
        id: 189,
        name: 'Экономический предел обводненности (%)',
        source: 'Экономика, подготовка, добыча',
        priority: 'P1',
        field_name: 'c189_ekonomicheskiy_predel_obvodnennosti',
        options: [
          { value_code: 'v_chasto_kritichno_gt_90_95_pct', label: 'часто критично >90–95%' },
          { value_code: 'v_po_netback_opex', label: 'По netback/OPEX' }
        ]
      },
      {
        id: 190,
        name: 'Готовность к пилоту',
        source: 'Паспорт пилота, техзадание',
        priority: 'P1',
        field_name: 'c190_gotovnost_k_pilotu',
        options: [
          { value_code: 'v_diagnostika', label: 'диагностика' },
          { value_code: 'v_ne_gotov', label: 'не готов' },
          { value_code: 'v_pochti_gotov', label: 'почти готов' },
          { value_code: 'v_ready', label: 'Ready' }
        ]
      },
      {
        id: 191,
        name: 'Доступность сервиса и материалов',
        source: 'Закупки, сервисные компании',
        priority: 'P2',
        field_name: 'c191_dostupnost_servisa_i_materialov',
        options: [
          { value_code: 'v_dostupno', label: 'Доступно' },
          { value_code: 'v_import_dolgiy_lead_time', label: 'импорт/долгий lead time' },
          { value_code: 'v_nedostupno', label: 'недоступно' },
          { value_code: 'v_ogranicheno', label: 'ограничено' }
        ]
      },
      {
        id: 192,
        name: 'HSE-риск решения',
        source: 'HSE-оценка, паспорта безопасности',
        priority: 'P1',
        field_name: 'c192_hse_risk_resheniy',
        options: [
          { value_code: 'v_nepriemlemyy_bez_mer', label: 'неприемлемый без мер' },
          { value_code: 'v_nizkiy', label: 'Низкий' },
          { value_code: 'v_sredniy', label: 'средний' },
          { value_code: 'v_vysokiy', label: 'высокий' }
        ]
      },
      {
        id: 193,
        name: 'Регуляторная готовность',
        source: 'Регуляторные документы',
        priority: 'P2',
        field_name: 'c193_regulyatornaya_gotovnost',
        options: [
          { value_code: 'v_dolgoe_soglasovanie', label: 'долгое согласование' },
          { value_code: 'v_ne_trebuetsya', label: 'Не требуется' },
          { value_code: 'v_risk_otkaza', label: 'риск отказа' },
          { value_code: 'v_trebuetsya_standartno', label: 'требуется стандартно' }
        ]
      },
      {
        id: 194,
        name: 'KPI пилота',
        source: 'Паспорт пилота, экономика',
        priority: 'P1',
        field_name: 'c194_kpi_pilota',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_opredeleny', label: 'Определены' },
          { value_code: 'v_otsutstvuyut', label: 'отсутствуют' }
        ]
      },
      {
        id: 195,
        name: 'Stop-loss критерии',
        source: 'ТЭО, паспорт пилота',
        priority: 'P1',
        field_name: 'c195_stop_loss_kriterii',
        options: [
          { value_code: 'v_chastichno', label: 'частично' },
          { value_code: 'v_opredeleny', label: 'Определены' },
          { value_code: 'v_otsutstvuyut', label: 'отсутствуют' }
        ]
      },
      {
        id: 196,
        name: 'Потенциал тиражирования (скв.)',
        source: 'Фонд, карты проблем',
        priority: 'P2',
        field_name: 'c196_potencial_tirazhirovaniya',
        options: [
          { value_code: 'v_10_50', label: '10–50' },
          { value_code: 'v_5_10', label: '5–10' },
          { value_code: 'v_edinichno', label: 'Единично' },
          { value_code: 'v_gt_50', label: '>50' },
          { value_code: 'v_promyslovyy_masshtab', label: 'промысловый масштаб' },
          { value_code: 'v_uchastki', label: 'участки' }
        ]
      },
      {
        id: 197,
        name: 'Ответственный владелец решения',
        source: 'Оргструктура, дорожная карта',
        priority: 'P2',
        field_name: 'c197_otvetstvennyy_vladelec_resheniya',
        options: [
          { value_code: 'v_naznachen', label: 'Назначен' },
          { value_code: 'v_neyasno', label: 'неясно' },
          { value_code: 'v_trebuetsya_naznachit', label: 'требуется назначить' }
        ]
      },
      {
        id: 198,
        name: 'Категория месторождения / объекта',
        source: 'Сводная оценка критериев',
        priority: 'P1',
        field_name: 'c198_kategoriya_mestorozhdeniya_obekta',
        options: [
          { value_code: 'v_a_bystryy_effekt', label: 'A быстрый эффект' },
          { value_code: 'v_a_e', label: 'A–E' },
          { value_code: 'v_b_ppd_ohvat', label: 'B ППД/охват' },
          { value_code: 'v_c_redevelopment_niz', label: 'C редевелопмент/НИЗ' },
          { value_code: 'v_d_slozhnye_flyuidy_tiz', label: 'D сложные флюиды/ТИЗ' },
          { value_code: 'v_e_slabaya_gotovnost', label: 'E слабая готовность' }
        ]
      },
      {
        id: 199,
        name: 'Главный проблемный механизм',
        source: 'Диагностика, модель, фонд',
        priority: 'P1',
        field_name: 'c199_glavnyy_problemnyy_mehanizm',
        options: [
          { value_code: 'v_2_3_svyazannyh', label: '2–3 связанных' },
          { value_code: 'v_mehanizm_ne_podtverzhden', label: 'механизм не подтвержден' },
          { value_code: 'v_odin_dominiruyuschiy', label: 'Один доминирующий' }
        ]
      },
      {
        id: 200,
        name: 'Приоритет объекта в портфеле',
        source: 'Сводная оценка',
        priority: 'P1',
        field_name: 'c200_prioritet_obekta_v_portfele',
        options: [
          { value_code: 'v_1_5', label: '1–5' },
          { value_code: 'v_1_vysokiy', label: '1 высокий' },
          { value_code: 'v_2', label: '2' },
          { value_code: 'v_3', label: '3' },
          { value_code: 'v_4', label: '4' },
          { value_code: 'v_5_nizkiy_stop_loss', label: '5 низкий/stop-loss' }
        ]
      },
      {
        id: 201,
        name: 'Data readiness',
        source: 'QA/QC данных',
        priority: 'P1',
        field_name: 'c201_data_readiness',
        options: [
          { value_code: 'v_a_b_c_d', label: 'A/B/C/D' },
          { value_code: 'v_a_pilot', label: 'A пилот' },
          { value_code: 'v_b_proverit', label: 'B проверить' },
          { value_code: 'v_c_doizuchit', label: 'C доизучить' },
          { value_code: 'v_d_net_resheniya', label: 'D нет решения' }
        ]
      },
      {
        id: 202,
        name: 'Technology fit / TRL fit',
        source: 'Скрининг технологии, лаборатория',
        priority: 'P1',
        field_name: 'c202_technology_fit_trl_fit',
        options: [
          { value_code: 'v_nizkoe', label: 'низкое' },
          { value_code: 'v_srednee', label: 'среднее' },
          { value_code: 'v_trebuetsya_laboratoriya_opi', label: 'требуется лаборатория/ОПИ' },
          { value_code: 'v_vysokoe', label: 'Высокое' }
        ]
      },
      {
        id: 203,
        name: 'Первый горизонт работ',
        source: 'Сводная оценка, экономика',
        priority: 'P1',
        field_name: 'c203_pervyy_gorizont_rabot',
        options: [
          { value_code: 'v_0_6_mes', label: '0–6 мес.' },
          { value_code: 'v_18_36_mes', label: '18–36 мес.' },
          { value_code: 'v_6_18_mes', label: '6–18 мес.' },
          { value_code: 'v_stop_loss', label: 'stop-loss' }
        ]
      },
      {
        id: 204,
        name: 'Красные флаги для решений',
        source: 'Сводная оценка, HSE, диагностика',
        priority: 'P1',
        field_name: 'c204_krasnye_flagi_dlya_resheniy',
        options: [
          { value_code: 'v_hse_risk', label: 'HSE риск' },
          { value_code: 'v_net_ekonomiki', label: 'нет экономики' },
          { value_code: 'v_net_nasyschennosti', label: 'нет насыщенности' },
          { value_code: 'v_net_source_of_water', label: 'Нет source-of-water' },
          { value_code: 'v_slabaya_kolonna', label: 'слабая колонна' }
        ]
      },
      {
        id: 205,
        name: 'Предпочтительный класс решений',
        source: 'Сводная оценка проблем',
        priority: 'P1',
        field_name: 'c205_predpochtitelnyy_klass_resheniy',
        options: [
          { value_code: 'v_burenie_zbs', label: 'бурение/ЗБС' },
          { value_code: 'v_diagnostika', label: 'Диагностика' },
          { value_code: 'v_infrastruktura', label: 'инфраструктура' },
          { value_code: 'v_mun', label: 'МУН' },
          { value_code: 'v_ppd', label: 'ППД' },
          { value_code: 'v_pzp', label: 'ПЗП' },
          { value_code: 'v_stop_loss', label: 'stop-loss' },
          { value_code: 'v_vodokontrol', label: 'водоконтроль' }
        ]
      },
      {
        id: 206,
        name: 'Инвестиционная корзина',
        source: 'Экономика, CAPEX, риски',
        priority: 'P2',
        field_name: 'c206_investicionnaya_korzina',
        options: [
          { value_code: 'v_high', label: 'high' },
          { value_code: 'v_hold', label: 'hold' },
          { value_code: 'v_low', label: 'Low' },
          { value_code: 'v_medium', label: 'medium' },
          { value_code: 'v_niokr', label: 'НИОКР' }
        ]
      },
      {
        id: 207,
        name: 'Частота пересмотра критериев',
        source: 'Регламент управления активом',
        priority: 'P2',
        field_name: 'c207_chastota_peresmotra_kriteriev',
        options: [
          { value_code: 'v_ezhemesyachno', label: 'ежемесячно' },
          { value_code: 'v_god', label: 'год' },
          { value_code: 'v_kvartal', label: 'квартал' },
          { value_code: 'v_polugodie', label: 'полугодие' },
          { value_code: 'v_posle_gtm', label: 'После ГТМ' }
        ]
      }
    ]
  },
  {
    id: 'ADDED',
    name: 'Дополнительные поля пилота',
    range: '208-215',
    description: 'Поля для строгого мэппинга проблем',
    criteria: [
      {
        id: 208,
        name: 'История ГТМ / операций по скважине',
        source: 'Архив ГТМ, post-audit, технологические отчеты',
        priority: 'P1',
        field_name: 'c208_istoriya_gtm_operaciy',
        options: [
          { value_code: 'v_gelevaya_rir', label: 'гелевая РИР' },
          { value_code: 'v_glushenie', label: 'глушение' },
          { value_code: 'v_grp', label: 'ГРП' },
          { value_code: 'v_kislotnaya_opz', label: 'кислотная ОПЗ' },
          { value_code: 'v_krs', label: 'КРС' },
          { value_code: 'v_osvoenie', label: 'освоение' },
          { value_code: 'v_perforaciya', label: 'перфорация' },
          { value_code: 'v_posle_prostoya', label: 'после простоя' },
          { value_code: 'v_prs', label: 'ПРС' },
          { value_code: 'v_rastvornaya_obrabotka', label: 'растворная обработка' },
          { value_code: 'v_rir', label: 'РИР' },
          { value_code: 'v_rir_cementom', label: 'РИР цементом' },
          { value_code: 'v_stimulyaciya', label: 'стимуляция' },
          { value_code: 'v_vodnoe_glushenie', label: 'водное глушение' },
          { value_code: 'v_vodoizolyaciya', label: 'водоизоляция' }
        ]
      },
      {
        id: 209,
        name: 'Примененная / планируемая технология воздействия',
        source: 'Программа ГТМ, проект разработки, план ОПИ',
        priority: 'P1',
        field_name: 'c209_primenennaya_planiruemaya_tehnologiya',
        options: [
          { value_code: 'v_asp_ap', label: 'ASP/AP' },
          { value_code: 'v_co2', label: 'CO₂' },
          { value_code: 'v_gazovaya_zakachka', label: 'газовая закачка' },
          { value_code: 'v_gel', label: 'гель' },
          { value_code: 'v_himicheskoe_mun', label: 'химическое МУН' },
          { value_code: 'v_holodnaya_dobycha', label: 'холодная добыча' },
          { value_code: 'v_meor', label: 'MEOR' },
          { value_code: 'v_mikrogel', label: 'микрогель' },
          { value_code: 'v_n2', label: 'N₂' },
          { value_code: 'v_nanochasticy', label: 'наночастицы' },
          { value_code: 'v_nanoflyuid', label: 'нанофлюид' },
          { value_code: 'v_ognevoe_vozdeystvie', label: 'огневое воздействие' },
          { value_code: 'v_par', label: 'пар' },
          { value_code: 'v_parovaya_zakachka', label: 'паровая закачка' },
          { value_code: 'v_pav', label: 'ПАВ' },
          { value_code: 'v_pena', label: 'пена' },
          { value_code: 'v_polimer', label: 'полимер' },
          { value_code: 'v_ppd', label: 'ППД' },
          { value_code: 'v_ppg', label: 'PPG' },
          { value_code: 'v_rastvoritel', label: 'растворитель' },
          { value_code: 'v_sagd', label: 'SAGD' },
          { value_code: 'v_scheloch', label: 'щелочь' },
          { value_code: 'v_solvent', label: 'solvent' },
          { value_code: 'v_termika', label: 'термика' },
          { value_code: 'v_vozdushnoe_vozdeystvie', label: 'воздушное воздействие' },
          { value_code: 'v_wag', label: 'WAG' }
        ]
      },
      {
        id: 210,
        name: 'Расширенная химия воды / газа',
        source: 'Лаборатория воды/газа, промысловые анализы',
        priority: 'P1',
        field_name: 'c210_rasshirennaya_himiya_vody_gaza',
        options: [
          { value_code: 'v_ba', label: 'Ba' },
          { value_code: 'v_bakterii_srb', label: 'бактерии/SRB' },
          { value_code: 'v_biocid', label: 'биоцид' },
          { value_code: 'v_ca', label: 'Ca' },
          { value_code: 'v_co2', label: 'CO₂' },
          { value_code: 'v_fe', label: 'Fe' },
          { value_code: 'v_fe2plus', label: 'Fe²⁺' },
          { value_code: 'v_h2s', label: 'H₂S' },
          { value_code: 'v_hco3', label: 'HCO₃' },
          { value_code: 'v_hloridy', label: 'хлориды' },
          { value_code: 'v_hloridy_sulfaty_metally', label: 'хлориды/сульфаты/металлы' },
          { value_code: 'v_mg', label: 'Mg' },
          { value_code: 'v_norm', label: 'NORM' },
          { value_code: 'v_o2', label: 'O₂' },
          { value_code: 'v_okisliteli', label: 'окислители' },
          { value_code: 'v_ph_nizkiy', label: 'pH низкий' },
          { value_code: 'v_ph_vne_diapazona', label: 'pH вне диапазона' },
          { value_code: 'v_ph_vysokiy', label: 'pH высокий' },
          { value_code: 'v_radiy', label: 'радий' },
          { value_code: 'v_sio2', label: 'SiO₂' },
          { value_code: 'v_so4', label: 'SO₄' },
          { value_code: 'v_sr', label: 'Sr' },
          { value_code: 'v_sulfaty', label: 'сульфаты' }
        ]
      },
      {
        id: 211,
        name: 'Фазовое поведение / параметры МУН',
        source: 'PVT, slim-tube, лабораторные тесты МУН',
        priority: 'P1',
        field_name: 'c211_fazovoe_povedenie_mun',
        options: [
          { value_code: 'v_davlenie_sostanestabilny', label: 'давление/состав нестабильны' },
          { value_code: 'v_dew_point_vyshe_ppl', label: 'dew point выше Pпл' },
          { value_code: 'v_ift_nizkiy', label: 'IFT низкий' },
          { value_code: 'v_ift_vysokiy', label: 'IFT высокий' },
          { value_code: 'v_mmp_neizvestno', label: 'MMP неизвестно' },
          { value_code: 'v_mobility_ratio_plohoe', label: 'mobility ratio плохое' },
          { value_code: 'v_ppl_ge_mmp', label: 'Pпл ≥ MMP' },
          { value_code: 'v_ppl_lt_mmp', label: 'Pпл < MMP' },
          { value_code: 'v_pzab_lt_dew_point', label: 'Pзаб < dew point' },
          { value_code: 'v_tan_nizkiy', label: 'TAN низкий' },
          { value_code: 'v_tan_vysokiy', label: 'TAN высокий' },
          { value_code: 'v_tpl_lt_eq_wat', label: 'Tпл <= WAT' },
          { value_code: 'v_wat_vyshe_tpl', label: 'WAT выше Tпл' }
        ]
      },
      {
        id: 212,
        name: 'Детали заканчивания / оборудования',
        source: 'Паспорт скважины, компоновка, ремонты',
        priority: 'P1',
        field_name: 'c212_detali_zakanchivaniya_oborudovaniya',
        options: [
          { value_code: 'v_filtr', label: 'фильтр' },
          { value_code: 'v_gorizontalnyy_stvol', label: 'горизонтальный ствол' },
          { value_code: 'v_graviynyy_filtr', label: 'гравийный фильтр' },
          { value_code: 'v_hvostovik', label: 'хвостовик' },
          { value_code: 'v_icd_aicd', label: 'ICD/AICD' },
          { value_code: 'v_klapany_shtucery', label: 'клапаны/штуцеры' },
          { value_code: 'v_malye_otverstiya', label: 'малые отверстия' },
          { value_code: 'v_mnogozonnaya_komponovka', label: 'многозонная компоновка' },
          { value_code: 'v_naklonnyy_stvol', label: 'наклонный ствол' },
          { value_code: 'v_nizkaya_plotnost_perforacii', label: 'низкая плотность перфорации' },
          { value_code: 'v_otkrytyy_stvol', label: 'открытый ствол' },
          { value_code: 'v_paker', label: 'пакер' },
          { value_code: 'v_peskofiltr', label: 'пескофильтр' }
        ]
      },
      {
        id: 213,
        name: 'Геомеханика / прочность породы',
        source: 'Геомеханическая модель, керн, ГРП, история песка',
        priority: 'P1',
        field_name: 'c213_geomehanika_prochnost_porody',
        options: [
          { value_code: 'v_hrupkiy_plast', label: 'хрупкий пласт' },
          { value_code: 'v_kompakciya', label: 'компакция' },
          { value_code: 'v_myagkaya_poroda', label: 'мягкая порода' },
          { value_code: 'v_nizkoe_minimalnoe_napryazhenie', label: 'низкое минимальное напряжение' },
          { value_code: 'v_silnaya_kompakciya', label: 'сильная компакция' },
          { value_code: 'v_slabaya_cementaciya', label: 'слабая цементация' },
          { value_code: 'v_slabaya_poroda', label: 'слабая порода' },
          { value_code: 'v_slaboscementirovannyy_plast', label: 'слабосцементированный пласт' },
          { value_code: 'v_slabyy_barer', label: 'слабый барьер' },
          { value_code: 'v_stress_sensitive_plast', label: 'stress-sensitive пласт' },
          { value_code: 'v_tonkiy_barer', label: 'тонкий барьер' },
          { value_code: 'v_vysokaya_szhimaemost', label: 'высокая сжимаемость' }
        ]
      },
      {
        id: 214,
        name: 'Тип порового пространства / специальные признаки коллектора',
        source: 'Керн, ГИС, FMI/имиджер, геомодель',
        priority: 'P1',
        field_name: 'c214_tip_porovogo_prostranstva',
        options: [
          { value_code: 'v_aktivnye_mineraly', label: 'активные минералы' },
          { value_code: 'v_chuvstvitelnye_gliny', label: 'чувствительные глины' },
          { value_code: 'v_glinistyy_cement', label: 'глинистый цемент' },
          { value_code: 'v_kanalnaya_peschanistost', label: 'канальная песчанистость' },
          { value_code: 'v_karbonatnyy_cement', label: 'карбонатный цемент' },
          { value_code: 'v_kavernoznyy', label: 'кавернозный' },
          { value_code: 'v_makroporistost', label: 'макропористость' },
          { value_code: 'v_melkoporovaya_struktura', label: 'мелкопоровая структура' },
          { value_code: 'v_melkoporovyy', label: 'мелкопоровый' },
          { value_code: 'v_plotnyy_kollektor', label: 'плотный коллектор' },
          { value_code: 'v_treschinovato_porovyy', label: 'трещиновато-поровый' },
          { value_code: 'v_vodochuvstvitelnaya_poroda', label: 'водочувствительная порода' }
        ]
      },
      {
        id: 215,
        name: 'Реагенты / материалы / совместимость',
        source: 'Лаборатория, рецептуры, паспорта реагентов, история обработок',
        priority: 'P1',
        field_name: 'c215_reagenty_materialy_sovmestimost',
        options: [
          { value_code: 'v_biopolimer', label: 'биополимер' },
          { value_code: 'v_deemulgator', label: 'деэмульгатор' },
          { value_code: 'v_gel_cement', label: 'гель/цемент' },
          { value_code: 'v_gelevyy_grp', label: 'гелевый ГРП' },
          { value_code: 'v_hcl', label: 'HCl' },
          { value_code: 'v_hcl_hf', label: 'HCl/HF' },
          { value_code: 'v_ingibitor', label: 'ингибитор' },
          { value_code: 'v_kislota', label: 'кислота' },
          { value_code: 'v_okisliteli_biocidy', label: 'окислители/биоциды' },
          { value_code: 'v_pav', label: 'ПАВ' },
          { value_code: 'v_polimernaya_zhidkost', label: 'полимерная жидкость' },
          { value_code: 'v_polimernye_zhidkosti', label: 'полимерные жидкости' },
          { value_code: 'v_rastvoritel', label: 'растворитель' },
          { value_code: 'v_scavenge_otsutstvuet', label: 'scavenge отсутствует' },
          { value_code: 'v_scheloch', label: 'щелочь' },
          { value_code: 'v_termonestabilnyy_reagent', label: 'термонестабильный реагент' },
          { value_code: 'v_vysokaya_dozirovka', label: 'высокая дозировка' }
        ]
      }
    ]
  }
];