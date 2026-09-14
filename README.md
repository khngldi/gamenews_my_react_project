# React + Vite

## Запуск проекта

Установите зависимости фронтенда и backend (`npm install` в корне и `npm install` в `backend`).
Затем запустите API командой `npm run backend`, а в отдельном терминале — `npm run dev`.

Перед запуском API задайте адрес доступной MongoDB:

```powershell
$env:MONGO_URL = "mongodb://127.0.0.1:27017/auth"
```

Если MongoDB находится на другом компьютере, укажите его адрес вместо `127.0.0.1`.

Сайт читает данные через `http://localhost:2000/api` из MongoDB (база `auth`).
Mokky.dev используется только как источник для ручного импорта; автоматической синхронизации нет.
Если база пустая, загрузите начальные данные (Node.js 20.19+ или 22.12+):

```powershell
npm --prefix backend run import
```

Импорт проверяет все данные перед записью и добавляет только отсутствующие `id`.
Существующие записи не удаляются и не обновляются. Для API и импорта используйте
одинаковый `MONGO_URL` в терминалах. Адрес источника можно задать через `MOKKY_URL`.

Проверка: `http://localhost:2000/api/news` должен возвращать массив новостей.
Ошибка соединения означает, что API не запущен; пустой массив — что в выбранной
базе нет новостей. Работающий Mokky.dev сам по себе не заполняет MongoDB.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
