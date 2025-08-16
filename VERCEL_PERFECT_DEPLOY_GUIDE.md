# 🎯 Идеальная настройка Vercel для NeuroExpert - 100% успех с первого раза

## 📋 Подготовка перед деплоем

### Убедитесь что у вас есть:
- ✅ Новый GitHub аккаунт с импортированным репозиторием
- ✅ Google аккаунт для получения Gemini API ключа
- ✅ Этот гайд открыт для копирования значений

## 🚀 Шаг 1: Регистрация в Vercel

1. Откройте [vercel.com/signup](https://vercel.com/signup)
2. Выберите **Continue with GitHub**
3. Авторизуйтесь с НОВЫМ GitHub аккаунтом
4. На странице авторизации GitHub:
   - ✅ Разрешите доступ к репозиториям
   - ✅ Нажмите зеленую кнопку **Authorize Vercel**

## 🔧 Шаг 2: Импорт проекта

1. После авторизации вы попадете в Dashboard
2. Нажмите большую кнопку **Add New Project** или **Import Project**
3. В списке репозиториев найдите ваш `neuroexpert` (или как вы его назвали)
4. Нажмите **Import**

## ⚙️ Шаг 3: Настройка конфигурации (КРИТИЧЕСКИ ВАЖНО!)

### Project Name:
```
neuroexpert-app
```
(или любое уникальное имя, будет в URL: neuroexpert-app.vercel.app)

### Framework Preset:
- **Выберите**: `Next.js` ✅
- Vercel должен автоматически определить, но проверьте!

### Root Directory:
```
./
```
Оставьте пустым или поставьте `./` (точка слэш)

### Build and Output Settings:

**Build Command:**
```
npm run build
```
или если не работает:
```
npx next build
```

**Output Directory:**
```
.next
```
(Оставьте по умолчанию)

**Install Command:**
```
npm install
```
(Оставьте по умолчанию)

### Development Command:
```
npm run dev
```
(Оставьте по умолчанию)

## 🔐 Шаг 4: Environment Variables (ОБЯЗАТЕЛЬНО!)

Нажмите на раздел **Environment Variables** и добавьте ВСЕ следующие переменные:

### 1. GOOGLE_GEMINI_API_KEY
```
Ключ: GOOGLE_GEMINI_API_KEY
Значение: (получите ниже)
```

**Как получить:**
1. Откройте [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Войдите в Google аккаунт
3. Нажмите **Create API Key**
4. Выберите **Create API key in new project**
5. Скопируйте ключ (начинается с AIzaSy...)

### 2. JWT_SECRET
```
Ключ: JWT_SECRET
Значение: my-super-secret-jwt-key-2025-neuroexpert
```

### 3. ADMIN_PASSWORD_HASH
```
Ключ: ADMIN_PASSWORD_HASH
Значение: $2b$10$X4kv7j5ZcG39WgogSl16au7eW0eL6lJnDPN6KJrp.XAiSUnSaFTXu
```
(Пароль для админ панели: `admin123`)

### 4. NODE_ENV
```
Ключ: NODE_ENV
Значение: production
```

### 5. NEXT_PUBLIC_APP_URL (опционально, но рекомендуется)
```
Ключ: NEXT_PUBLIC_APP_URL
Значение: https://ваш-проект.vercel.app
```
(Добавите после первого деплоя)

### Необязательные переменные (можно добавить позже):
```
TELEGRAM_BOT_TOKEN = ваш_токен_бота
TELEGRAM_CHAT_ID = ваш_chat_id
```

## 🎛️ Шаг 5: Дополнительные настройки

### Node.js Version:
- Оставьте **20.x** (по умолчанию)

### Redirect Configuration:
- Пропустите (не нужно)

### Git Configuration:
- Оставьте по умолчанию

## 🚀 Шаг 6: Деплой!

1. **Проверьте все настройки еще раз**
2. Убедитесь что добавили ВСЕ переменные окружения
3. Нажмите кнопку **Deploy**

## ⏱️ Что происходит дальше:

1. Vercel клонирует репозиторий
2. Устанавливает зависимости (1-2 минуты)
3. Собирает проект (2-3 минуты)
4. Разворачивает на серверах (30 секунд)
5. Выдает вам ссылку!

## ✅ Проверка после деплоя:

1. **Главная страница**: `https://ваш-проект.vercel.app`
2. **API проверка**: `https://ваш-проект.vercel.app/api/health`
3. **Админ панель**: `https://ваш-проект.vercel.app` (кнопка Admin внизу)

## 🔥 Если что-то пошло не так:

### Ошибка "Module not found":
- Проверьте Build Command: должно быть `npm run build`

### Ошибка с переменными окружения:
- Вернитесь в Settings → Environment Variables
- Проверьте что добавили ВСЕ переменные
- После добавления нажмите **Redeploy**

### Ошибка сборки:
- В логах найдите красный текст ошибки
- Чаще всего проблема в отсутствующих переменных

## 🎉 После успешного деплоя:

1. **Получите постоянную ссылку**: 
   - `https://neuroexpert-app.vercel.app` (или ваше имя)

2. **Настройте автодеплой**:
   - Каждый push в GitHub = автоматический деплой

3. **Добавьте кастомный домен** (опционально):
   - Settings → Domains → Add

## 📱 Проверочный чек-лист:

- [ ] Framework Preset = Next.js
- [ ] Build Command = npm run build
- [ ] Output Directory = .next
- [ ] GOOGLE_GEMINI_API_KEY добавлен
- [ ] JWT_SECRET добавлен
- [ ] ADMIN_PASSWORD_HASH добавлен
- [ ] NODE_ENV = production

## 🆘 Экстренная помощь:

Если ничего не работает, попробуйте эти Build Commands:
```
npx next build
```
или
```
npm ci && npm run build
```
или
```
npm install --force && npm run build
```

---

**Результат**: Ваш сайт будет работать на `https://ваш-проект.vercel.app` через 5 минут!