INSERT INTO test (name, number_of_attempts) VALUES ('Тест по электробезопасности', 1);

/*TO-DO: 3 билета из 30*/
INSERT INTO ticket (id_test, number_of_question) VALUES (1,11),(1,11),(1,11);

/*Сбилась нумерация: причина неизвестна*/
INSERT INTO question (id_ticket, name) VALUES
(2, 'На какие электроустановки распространяются правила технической эксплуатации электроустановок потребителей?'),
(2, 'В каком случае электротехнический персонал обязан пройти производственное обучение на рабочем месте?'),
(2, 'При каком повышении давления в баке трансформатора с устройствами газовой защиты нагрузка должна быть снижена?'),
(2, 'При какой глубине раскопки грунта зимой должны производиться с отогревом грунта?'),
(2, 'Как часто необходимо проверять исправность заземления арматуры ВЛ напряжением до 1000 В?'),
(2, 'Какова периодичность осмотра аккумуляторных батарей дежурным персоналом?'),
(2, 'Какую группу по электробезопасности должны иметь работники из числа оперативного персонала, единолично обслуживающие электроустановки напряжением выше 1000 В?'),
(2, 'Можно ли работать в спецодежде с короткими или засученными рукавами в электроустановках напряжением до 1000 В при работе под напряжением?'),
(2, 'Какую группу по электробезопасности должен иметь допускающий к производству работ в электроустановках напряжением до 1 КВ?'),
(2, 'Обязан ли производитель работ (наблюдающий) удалить бригаду с места работы при необходимости временного ухода с рабочего места?'),
(2, 'Что делать, если у пострадавшего нет сознания и нет пульса на сонной артерии?'),

(3, 'На какие электроустановки не распространяются правила технической эксплуатации электроустановок потребителей?'),
(3, 'В каком случае электротехнический персонал обязан пройти производственное обучение на рабочем месте?'),
(3, 'В каком режиме должны работать нейтрали обмоток 110 кв трансформаторов и реакторов?'),
(3, 'Каково должно быть расстояние от поверхности отогреваемого слоя грунта до кабелей при раскопках зимой?'),
(3, 'Какие помещения относятся к особо опасным (в отношении опасности поражения людей электрическим током)?'),
(3, 'Должны ли быть доступны для осмотра соединения проводов?'),
(3, 'Какую группу по электробезопасности должны иметь работники из числа оперативного персонала в электроустановках напряжением до 1000 В?'),
(3, 'Какие меры предосторожности необходимы при работе под напряжением в электроустановках напряжением до 1000 В?'),
(3, 'Должен ли назначаться ответственный руководитель работ в электроустановках напряжением выше 1000 В?'),
(3, 'В каком случае допускается временный уход с рабочего места одного или нескольких членов бригады в электроустановках напряжением выше 1000 В?'),
(3, 'Что необходимо сделать в первую очередь перед проведением реанимационных мероприятий?'),

(4, 'На какие электроустановки не распространяются правила технической эксплуатации электроустановок потребителей?'),
(4, 'Какова продолжительность стажировки электротехнического персонала до назначения на самостоятельную работу?'),
(4, 'Какое условие не допускает параллельной работы трансформаторов (автотрансформаторов)?'),
(4, 'На каком расстоянии от кабеля применение при раскопках землеройных машины не допускается?'),
(4, 'На кого возлагается ответственность за организацию и состояние охраны труда в службе ЭСТОП?'),
(4, 'Можно ли устанавливать предохранители в нулевом рабочем проводе в сетях с заземленной нейтралью?'),
(4, 'Какую группу по электробезопасности должны иметь старшие по смене или работники из числа персонала, единолично обслуживающие электроустановки напряжением выше 1000 В?'),
(4, 'Какие организационные мероприятия обеспечивают безопасность работ в электроустановках?'),
(4, 'На какой срок выдается наряд-допуск?'),
(4, 'Какие действия обязан выполнить производитель работ при необходимости временного ухода с места работы в электроустановке?'),
(4, 'Куда наносится удар, чтобы сердце заработало?');

INSERT INTO answer (id_question, name, is_valid) VALUES
(1, 'Напряжением до 500 кВ включительно.', false),
(1, 'Напряжением до 350 кВ включительно.', false),
(1, 'Напряжением до 220 кВ включительно.', true),
(1, 'Напряжением до 110 кВ включительно.', false),

(2, 'До назначения на самостоятельную работу или при переходе на другую работу, связанную с эксплуатацией электроустановок.', true),
(2, 'При перерыве в работе в качестве электротехнического персонала свыше 6 месяцев.', false),
(2, 'При модернизации электроустановки, которую он обслуживает.', false),
(2, 'При нарушении им правил обслуживания электроустановки, вызвавших появление неисправностей или отклонений от нормы.', false),

(3, 'Выше 100 кПа(1,0 кгс/см2)', false),
(3, 'Выше 50 кПа (0,5 кгс/см2)', true),
(3, 'Выше 20 кПа (0.2 кгс/см2)', false),
(3, 'Выше 10 кПа (0,1 кгс/см2)', false),

(4, 'Более 0,5 м.', false),
(4, 'Более 0,4 м.', true),
(4, 'До 0,8 м.', false),
(4, 'До 0,4 м.', false),

(5, 'Ежегодно, перед грозовым сезоном, выборочно, но не менее 2% общего числа.', false),
(5, 'Ежегодно,   перед   грозовым   сезоном,   выборочно,   по   усмотрению ответственного за электрохозяйство.', true),
(5, 'Не реже 1 раза в 2 года выборочно, по усмотрению ответственного за электрохозяйство.', false),
(5, '1 раз в 3 года, выборочно, не менее 50% общего числа.', false),

(6, '1 раз в квартал.', false),
(6, '1 раз в месяц.', false),
(6, '2 раза в месяц.', false),
(6, '1 раз в сутки.', true),

(7, 'Не ниже II группы.', false),
(7, 'Не ниже III группы.', false),
(7, 'Не ниже IV группы.', true),
(7, 'V группу.', false),

(8, 'Да, можно.', false),
(8, 'Нет, нельзя.', true),
(8, 'Можно в жаркое время года.', false),
(8, 'Никаких специальных требований к спецодежде не существует.', false),

(9, 'Не ниже V группы.', false),
(9, 'Не ниже IV группы.', false),
(9, 'Не ниже III группы.', true),

(10, 'Да, обязан в любом случае.', false),
(10, 'Нет, не обязан в любом случае.', false),
(10, 'Нет, не обязан, если его могут заменить ответственный руководитель работ, допускающий или работник, имеющий право выдачи нарядов.', true),

(11, 'Проверить пульс на запястье.', false),
(11, 'Приступить к реанимации.', true),
(11, 'Проверить наличие дыхания.', false),
(11, 'Наложить жгут на сонную артерию.', false),


(12, 'На электроустановки электрических станций.', false),
(12, 'На электроустановки блок-станций.', false),
(12, 'На электроустановки предприятий электрических и тепловых сетей.', false),
(12, 'На все вышеперечисленные.', true),

(13, 'При нарушении им правил обслуживания электроустановок, вызвавших появление неисправностей или отклонений от нормы.', false),
(13, 'При перерыве в работе в качестве электротехнического персонала свыше 1 года.', true),
(13, 'При модернизации электроустановки, которую он обслуживает.', false),

(14, 'Как правило, в режиме изолированной нейтрали.', false),
(14, 'Как правило, в режиме глухозаземленной нейтрали.', true),
(14, 'Как правило, в режиме заземленной нейтрали.', false),

(15, 'Не менее 0,5 м', false),
(15, 'Не менее 0,4 м.', false),
(15, 'Не менее 0,3 м.', false),
(15, 'Не менее 0,15 м.', true),

(16, 'Помещения с высокой температурой.', false),
(16, 'Помещения, где возможно одновременное прикосновение к заземленным металлоконструкциям зданий с одной стороны, и к металлическим корпусам электрооборудования – с другой.', false),
(16, 'Помещения с особой сыростью.', true),
(16, 'Помещения с наличием сырости или токопроводящей пыли.', false),

(17, 'Да.', true),
(17, 'Если соединение под штукатуркой, то не обязательно.', false),
(17, 'Да, только для осветительных сетей.', false),
(17, 'Да, только для сетей в установках выше 1000 В.', false),

(18, 'Не ниже II группы.', false),
(18, 'Не ниже III группы.', true),
(18, 'Не ниже IV группы.', false),
(18, 'V группу.', false),

(19, 'Ограждение расположенных  вблизи рабочего места других токоведущих частей, к которым возможно случайное прикосновение.', false),
(19, 'Обязательное  использование  диэлектрических  галош  или  изолирующей подставки либо диэлектрического ковра.', false),
(19, 'Применение изолированного инструмента, использование диэлектрических перчаток.', false),
(19, 'Необходимы все вышеперечисленные меры.', true),

(20, 'Да, обязательно должен.', false),
(20, 'Да, как правило, должен.', true),
(20, 'Нет, не должен.', false),

(21, 'Допускается в любом случае.', false),
(21, 'Допускается с разрешения производители работ (наблюдающего).', false),
(21, 'Допускается с разрешения производителя работ (наблюдающего), если кол-во оставшихся членов бригады будет не менее 2-х, включая производителя работ.', true),

(22, 'Очистить ротовую полость и запрокинуть голову.', false),
(22, 'Проверить наличие дыхания.', false),
(22, 'Освободить грудную клетку и расстегнуть поясной ремень.', true),
(22, 'Вызвать врача.', false),

(23, 'На пламенно-дуговые и электронно-лучевые установки.', false),
(23, 'На индукционные плавильные и нагревательные установки.', false),
(23, 'На электроустановки электрических сетей жилищно-коммунального хозяйства.', true),
(23, 'На стационарные, передвижные, переносные комплектные испытательные установки.', false),

(24, 'От 2 до 5 смен.', false),
(24, 'От 5 до 10 смен.', false),
(24, 'От 2 до 14 смен.', true),

(25, 'Каждая обмотка нагружена током, равным максимально допустимому току для данной обмотки.', false),
(25, 'Соотношение мощностей трансформаторов 1 : 3.', false),
(25, 'Коэффициенты трансформации отличаются на 1%.', true),
(25, 'Напряжения короткого замыкания отличаются на 5%.', false),

(26, 'Ближе 0,5 м.', false),
(26, 'Ближе 0,7 м.', false),
(26, 'Ближе 1,0 м.', true),
(26, 'Ближе 1,2 м.', false),

(27, 'На руководителя предприятия.', false),
(27, 'На технического директора предприятия.', false),
(27, 'На инженера по охране труда предприятия.', false),
(27, 'На начальника службы ЭСТОП.', true),
(27, 'На начальников узлов службы ЭСТОП.', false),

(28, 'Можно, если электроустановки потребителей однофазные.', false),
(28, 'Можно, если выполнена система уравнивания потенциалов.', false),
(28, 'Можно, если в качестве предохранителя служит автоматический выключатель.', false),
(28, 'Можно, если установлено УЗО.', false),
(28, 'Нельзя', true),

(29, 'Не ниже II группы.', false),
(29, 'Не ниже III группы.', false),
(29, 'Не ниже IV группы.', true),
(29, 'V группу.', false),

(30, 'Оформление  работ  нарядом,  распоряжением  или  перечнем  работ, выполняемых в порядке текущей эксплуатации.', false),
(30, 'Допуск к работе и надзор во время работы.', false),
(30, 'Оформление перерыва в работе, перевода на другое место, окончания работы.', false),
(30, 'Все перечисленные выше мероприятия.', true),

(31, 'На срок не более 10 календарных дней со дня начала работы.', false),
(31, 'На срок не более 15 календарных дней со дня начала работы.', true),
(31, 'На срок не более 20 календарных дней со дня начала работ.', false),
(31, 'На время, необходимое для выполнения работы.', false),

(32, 'Удалить бригаду с места работы, закрыв входную дверь на замок.', false),
(32, 'Вышеперечисленные действия выполняются, если его не могут заменить ответственный руководитель работ, наблюдающий или работник, имеющий право выдачи нарядов.', false),
(32, 'Проинструктировать бригаду о мерах безопасности и назначить работника из персонала бригады ответственным на время своего ухода.', true),
(32, 'Любое из вышеперечисленных действий, исходя из условий работы в целях обеспечения максимальной безопасности.', false),

(33, 'По грудине.', false),
(33, 'По мечевидному отростку.', false),
(33, 'По ребрам в области сердца.', true),
(33, 'Ниже ключицы.', false);
