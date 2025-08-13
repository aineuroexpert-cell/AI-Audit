# 🚀 КОМАНДЫ ДЛЯ РАЗВЕРТЫВАНИЯ NEUROEXPERT

## 📝 ПОШАГОВЫЕ КОМАНДЫ

### 1. **Финальная проверка проекта**
```bash
# Проверить что все зависимости установлены
npm ci

# Проверить что проект собирается без ошибок
npm run build

# Проверить статус git
git status
```

### 2. **Подготовка к отправке в репозиторий**
```bash
# Добавить все файлы
git add .

# Проверить что будет закоммичено
git status

# Сделать коммит с описанием
git commit -m "🚀 NeuroExpert Production Ready: Neural Design + Full Deployment Setup

✅ Исправлена конфигурация Next.js
✅ Обновлены анимации и нейросетевой дизайн  
✅ Настроены Netlify Functions
✅ Подготовлены переменные окружения
✅ Создана полная документация по развертыванию
✅ Интегрированы Telegram уведомления
✅ Настроена аналитика (GA4 + Yandex.Metrica)
✅ Оптимизирована производительность"
```

### 3. **Отправка в репозиторий**
```bash
# Отправить в основную ветку
git push origin main

# Или если у вас другая основная ветка:
# git push origin master
```

### 4. **После отправки в Git**
```
📝 ДАЛЕЕ ВЫПОЛНИТЕ В БРАУЗЕРЕ:

1. Откройте https://app.netlify.com/
2. Нажмите "New site from Git"
3. Выберите GitHub/GitLab/Bitbucket
4. Найдите репозиторий neuroexpert
5. Нажмите "Deploy site"
6. Дождитесь ПЕРВОЙ сборки (она будет НЕУСПЕШНОЙ - это нормально!)
```

---

## ⚙️ НАСТРОЙКА ПЕРЕМЕННЫХ В NETLIFY

### **Обязательные переменные (добавить В ЭТОМ ПОРЯДКЕ):**

#### 1. GEMINI_API_KEY (🔴 КРИТИЧНО!)
```
Site Dashboard → Site Settings → Environment Variables → Add variable

Name: GEMINI_API_KEY
Value: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

После добавления → нажать "Redeploy site"
```

#### 2. NODE_ENV
```
Name: NODE_ENV
Value: production

После добавления → нажать "Redeploy site"
```

#### 3. TELEGRAM_BOT_TOKEN (📱 для уведомлений)
```
Name: TELEGRAM_BOT_TOKEN
Value: 8293000531:AAFJzDeo7xAtVNytHKDBbHZTuQyR2EW9qcI

После добавления → нажать "Redeploy site"
```

#### 4. TELEGRAM_CHAT_ID (📱 для уведомлений)
```
Name: TELEGRAM_CHAT_ID
Value: ВАШ_CHAT_ID

После добавления → нажать "Redeploy site"
```

#### 5. ADMIN_PASSWORD (🔒 для дашборда)
```
Name: ADMIN_PASSWORD
Value: your_strong_password_123

После добавления → нажать "Redeploy site"
```

### **Опциональные переменные (для аналитики):**

#### 6. Google Analytics
```
Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
```

#### 7. Яндекс.Метрика
```
Name: NEXT_PUBLIC_YANDEX_METRICA_ID
Value: 12345678
```

---

## 🧪 ПРОВЕРКА РАБОТЫ

### **После каждого Redeploy:**
```bash
# 1. Откройте ваш сайт в браузере
# 2. Проверьте консоль браузера (F12 → Console)
# 3. Протестируйте функциональность:

✅ Анимация заголовка работает
✅ Нейронные частицы реагируют на мышь  
✅ ИИ Управляющий отвечает на вопросы
✅ Форма обратной связи отправляется
✅ Telegram уведомления приходят
✅ ROI калькулятор работает
```

---

## 🛠️ КОМАНДЫ ДЛЯ ОТЛАДКИ

### **Если что-то не работает:**

#### Проверить локальную сборку:
```bash
npm ci
npm run build
npm start
```

#### Проверить Netlify Functions локально:
```bash
# Установить Netlify CLI (если не установлен)
npm install -g netlify-cli

# Локальный запуск с Functions
netlify dev
```

#### Очистить кэш и пересобрать:
```bash
rm -rf .next
rm -rf node_modules
npm ci
npm run build
```

#### Проверить синтаксис JSON:
```bash
# Проверить package.json
cat package.json | jq .

# Проверить netlify.toml
cat netlify.toml
```

---

## 📊 МОНИТОРИНГ ПОСЛЕ РАЗВЕРТЫВАНИЯ

### **Netlify Dashboard:**
```
1. Site Overview → посмотреть статус деплоя
2. Functions → проверить логи функций  
3. Analytics → базовая статистика
4. Deploys → история деплоев
```

### **Проверка ошибок:**
```
F12 → Console → искать красные ошибки
F12 → Network → проверить failed запросы
```

### **Telegram тест:**
```
1. Отправить тестовую заявку через форму
2. Проверить что уведомление пришло в Telegram
3. Проверить аналитический дашборд: ваш-сайт.netlify.app/api/analytics-dashboard
```

---

## 🔄 АВТОМАТИЧЕСКОЕ РАЗВЕРТЫВАНИЕ

### **После первоначальной настройки:**
```bash
# Любые изменения в коде:
git add .
git commit -m "Описание изменений"
git push origin main

# Netlify автоматически пересоберет сайт!
```

### **Обновление переменных:**
```
Netlify Dashboard → Environment Variables → Edit → Save → Redeploy
```

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

```
□ Проект собирается локально без ошибок
□ Git репозиторий обновлен  
□ Netlify подключен к репозиторию
□ GEMINI_API_KEY добавлен в Netlify
□ TELEGRAM токены добавлены в Netlify
□ Сайт открывается без ошибок
□ ИИ Управляющий отвечает на вопросы
□ Форма обратной связи работает
□ Telegram уведомления приходят
□ Аналитика настроена и работает
□ Все анимации загружаются
□ Мобильная версия работает корректно
```

---

# 🎉 ГОТОВО!

**После выполнения всех команд ваш сайт будет полностью развернут и готов к работе!**

**Время выполнения:** 15-20 минут  
**Следующий шаг:** Выполните команды из раздела 1-3, затем настройте переменные в Netlify! 🚀