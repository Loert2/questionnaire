# questionnaire

ИНСТРУКЦИЯ ПО УСТАНОВКЕ ПРИЛОЖЕНИЯ
Справедливо для сборок linux - linux mint, ubuntu. Все действия производятся в терминале.
1. Вручную
1. Копирование git-репозиторий в нужную папку командой - git clone https://github.com/Loert2/questionnaire
2. Настройка базы данных. Если у вас установлен PostgreSQL пропустите шаг 
2.1 Скачивание PostgreSQL -  sudo apt-get install postgresql postgresql-contrib
2.2 Вход в postgres - sudo su - postgres
2.3 Создание новой базы данных - CREATE DATABASE questionnaire2;
2.4 Установка dump-а базы данных из проекта - psql -U postgres questionnaire2 < ... /questionnaire/posgresqlDB/sql/questionnaire_dump.sql
3. Установка библиотек для работы системы. Пропустите определенные шаги, если эти компоненты последней версии уже установлены.
3.1 Установка yarn - sudo apt-get install yarn
3.2 Установка nodejs - sudo apt install nodejs
4. Запуск серверной части
4.1 Переход в папку с серверной частью в проекте - cd ../questionnaire/back-end
4.2 Скачивание и установка пакетов серверной части - yarn build
4.3 Запуск серверной части - yarn start
5. Запуск клиентской части
5.1 Переход в папку с клиентской частью в проекте - cd ../questionnaire/front-end
5.2 Скачивание и установка пакетов клиентской части - yarn build
5.3 Запуск клиентской части - yarn start
5.4 Фотографируем QR-код в консоли предварительно включив анализ QR-кода в телефоне. Сервер и телефон должны быть подключены к одной интернет сети
2. С помощью Docker
1. Копирование git-репозиторий в нужную папку командой - git clone https://github.com/Loert2/questionnaire
2. Установка docker и yarn - sudo apt-get install yarn, sudo apt install -y docker-engine docker-compose
3. Переход в папку с проектом cd ../questionnaire
4. Собрать и запустить контейнеры docker-compose build, docker-compose up
5. Переход в папку с клиентской частью, установка пакетов, запуск - cd ../questionnaire/front-end, yarn build, yarn start
