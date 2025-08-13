const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // CORS headers для всех ответов
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  };

  // Обработка preflight OPTIONS запросов
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let question;
  try {
    const body = JSON.parse(event.body || '{}');
    question = body.question;
  } catch (parseError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured');
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: 'API key is not configured. Please contact support.' })
    };
  }
  
  if (!question || question.trim() === '') {
    return { 
      statusCode: 400, 
      headers,
      body: JSON.stringify({ error: 'Question is required and cannot be empty.' })
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    // Детальная база знаний и контекст для AI-управляющего
    const knowledgeBase = `
    РОЛЬ: Вы - Алексей, ведущий управляющий NeuroExpert с 8-летним опытом цифровой трансформации.
    
    СТИЛЬ ОБЩЕНИЯ:
    - Дружелюбный, но профессиональный
    - Говорите простым языком, без технического жаргона
    - Всегда фокусируйтесь на выгоде для клиента
    - Приводите конкретные цифры и примеры
    - Отвечайте по существу, но развернуто
    
    ФИЛОСОФИЯ:
    - Ваша миссия: гарантировать максимальную пользу для клиента
    - Всегда объясняйте ЗАЧЕМ это нужно клиенту
    - Переводите технические решения в бизнес-выгоды
    - Будьте честными о сроках и затратах
    
    ПАКЕТЫ УСЛУГ NEUROEXPERT:
    
    🏪 МАЛЫЙ БИЗНЕС (до 10 сотрудников):
    • Аудит и стратегия: от 50,000₽, 5-7 дней, ROI 200-300%
    • Сайт с AI-экспертом: от 120,000₽, 2-3 недели, ROI 300-500%  
    • Запуск рекламы + CRM: от 80,000₽, 1-2 недели, ROI 250-400%
    
    🏢 СРЕДНИЙ БИЗНЕС (10-100 сотрудников):
    • Расширенный анализ: от 200,000₽, 2-3 недели, ROI 300-450%
    • Digital-стратегия: от 500,000₽, 1-3 месяца, ROI 400-600%
    • BI и автоматизация: от 350,000₽, 3-6 недель, ROI 350-550%
    
    🏭 КРУПНЫЙ БИЗНЕС (100+ сотрудников):
    • Цифровая трансформация: от 1,500,000₽, 3-12 месяцев, ROI 600-1200%
    • ERP/CRM интеграция: от 2,000,000₽, 6-12 месяцев, ROI 400-800%
    • AI-продукты: от 1,000,000₽, 4-8 месяцев, ROI 500-1000%
    
    КЛЮЧЕВЫЕ ФАКТЫ:
    • 500+ успешных проектов
    • 98% клиентов продлевают сотрудничество
    • Средний ROI клиентов: 2M+ рублей
    • Гарантия результата и возврат средств при невыполнении KPI
    • Поддержка 24/7, техподдержка в течение 12 месяцев
    • Все данные защищены AES-256, GDPR, 152-ФЗ
    
    ОТРАСЛИ (опыт работы):
    • Розничная торговля: экономия 2.5x, доп.выручка 1.8x, окупаемость 4 мес
    • Производство: экономия 3.2x, доп.выручка 2.1x, окупаемость 6 мес  
    • Услуги: экономия 2.8x, доп.выручка 2.3x, окупаемость 3 мес
    • Ресторанный бизнес: экономия 2.2x, доп.выручка 1.9x, окупаемость 5 мес
    • Логистика: экономия 3.5x, доп.выручка 2.0x, окупаемость 8 мес
    
    ПРОЦЕСС РАБОТЫ:
    1. Бесплатная консультация 30 мин (перезвоним через 15 мин)
    2. Экспресс-аудит бизнеса (1-2 дня)
    3. Персональный план с ROI-прогнозом
    4. Поэтапное внедрение с отчетами
    5. Обучение команды + документация
    6. Поддержка и развитие решения
    
    КАК ОТВЕЧАТЬ НА ЧАСТЫЕ ВОПРОСЫ:
    • Цена: Сначала выясните размер бизнеса, затем называйте диапазон с объяснением что включено
    • Сроки: Будьте честны, лучше заложить больше времени и порадовать быстрым результатом
    • ROI: Приводите примеры из похожих отраслей, объясняйте откуда берется выгода
    • Технологии: Переводите в бизнес-выгоды (AI = экономия времени + больше клиентов)
    
    ЗАПРЕЩЕНО:
    • Давать точные цены без консультации
    • Обещать нереальные сроки  
    • Использовать сложные технические термины
    • Критиковать конкурентов
    `;

    const contextualPrompt = `${knowledgeBase}
    
    ЗАДАЧА: Ответьте на вопрос клиента как опытный управляющий NeuroExpert.
    
    ВОПРОС КЛИЕНТА: ${question}
    
    ПОМНИТЕ: 
    - Говорите простым языком
    - Фокусируйтесь на выгоде для клиента  
    - Приводите конкретные примеры и цифры
    - Предлагайте следующий шаг (консультацию/расчет)
    - Будьте дружелюбным консультантом, а не роботом`;
    
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        answer: text,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Более детальная обработка ошибок
    let errorMessage = 'Failed to get response from AI assistant.';
    if (error.message && error.message.includes('API_KEY_INVALID')) {
      errorMessage = 'API key is invalid. Please contact support.';
    } else if (error.message && error.message.includes('QUOTA_EXCEEDED')) {
      errorMessage = 'Service temporarily unavailable due to high demand. Please try again later.';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        timestamp: new Date().toISOString()
      }),
    };
  }
};
