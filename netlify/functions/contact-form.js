// Обработчик формы обратной связи NeuroExpert
exports.handler = async function(event, context) {
  // CORS headers
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

  let formData;
  try {
    const body = JSON.parse(event.body || '{}');
    formData = {
      name: body.name,
      phone: body.phone,
      company: body.company || '',
      message: body.message || '',
      source: body.source || 'contact_form',
      timestamp: new Date().toISOString()
    };
  } catch (parseError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  // Валидация обязательных полей
  if (!formData.name || !formData.phone) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: 'Имя и телефон обязательны для заполнения',
        missingFields: {
          name: !formData.name,
          phone: !formData.phone
        }
      })
    };
  }

  // Валидация телефона (базовая)
  const phoneRegex = /^[\+]?[1-9][\d]{6,14}$/;
  if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: 'Неверный формат номера телефона' 
      })
    };
  }

  try {
    // Определение приоритета лида
    const priority = calculateLeadPriority(formData);
    
    // Создание лида для CRM
    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: formData.timestamp,
      source: formData.source,
      priority: priority,
      status: 'new',
      contact: {
        name: formData.name,
        phone: formData.phone,
        company: formData.company
      },
      message: formData.message,
      metadata: {
        userAgent: event.headers['user-agent'] || '',
        ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || '',
        referrer: event.headers.referer || ''
      }
    };

    // В production здесь будет интеграция с реальной CRM
    // Пример: await sendToCRM(lead);
    console.log('📝 New lead created:', JSON.stringify(lead, null, 2));

    // Отправка уведомления (имитация)
    await sendNotification(lead);

    // Автоответ клиенту
    const autoResponse = generateAutoResponse(formData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: autoResponse.message,
        leadId: lead.id,
        expectedCallTime: autoResponse.expectedCallTime,
        timestamp: formData.timestamp
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Произошла ошибка при обработке заявки. Попробуйте позже или позвоните нам напрямую.',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Функция расчета приоритета лида
function calculateLeadPriority(formData) {
  let priority = 'medium';
  
  // Высокий приоритет если:
  if (formData.company && formData.company.length > 3) {
    priority = 'high'; // Указана компания
  }
  
  if (formData.message && (
    formData.message.includes('срочно') || 
    formData.message.includes('быстро') ||
    formData.message.includes('сегодня') ||
    formData.message.includes('завтра')
  )) {
    priority = 'high'; // Срочная заявка
  }
  
  if (formData.message && (
    formData.message.includes('бюджет') ||
    formData.message.includes('млн') ||
    formData.message.includes('миллион') ||
    formData.message.includes('готовы')
  )) {
    priority = 'high'; // Готовность к покупке
  }
  
  return priority;
}

// Функция отправки уведомлений команде
async function sendNotification(lead) {
  console.log(`🔔 Notification: New ${lead.priority} priority lead from ${lead.contact.name}`);
  
  // Отправка в Telegram если настроен
  try {
    await sendTelegramNotification(lead);
  } catch (error) {
    console.error('Telegram notification failed:', error);
  }
  
  // В production здесь также будет:
  // - Email уведомление менеджеру
  // - Slack уведомление
  // - Push уведомление в CRM
}

// Функция генерации автоответа
function generateAutoResponse(formData) {
  const hour = new Date().getHours();
  const isWorkingHours = hour >= 9 && hour <= 18;
  
  let expectedCallTime;
  let message;
  
  if (isWorkingHours) {
    expectedCallTime = '15 минут';
    message = `Спасибо, ${formData.name}! Ваша заявка принята. Наш специалист перезвонит вам по номеру ${formData.phone} в течение 15 минут для бесплатной консультации.`;
  } else {
    expectedCallTime = 'завтра с 9:00';
    message = `Спасибо, ${formData.name}! Ваша заявка принята. Наш специалист перезвонит вам по номеру ${formData.phone} завтра с 9:00 для бесплатной консультации.`;
  }
  
  if (formData.company) {
    message += ` Мы подготовим персональные рекомендации для ${formData.company}.`;
  }
  
  return { message, expectedCallTime };
}

// Функция отправки уведомления в Telegram
async function sendTelegramNotification(lead) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.log('Telegram not configured - skipping notification');
    return;
  }
  
  // Форматирование приоритета
  const priorityEmoji = {
    'high': '🔴 ВЫСОКИЙ',
    'medium': '🟡 СРЕДНИЙ', 
    'low': '🟢 НИЗКИЙ'
  };
  
  // Создание сообщения
  const message = `🆕 НОВАЯ ЗАЯВКА - ${priorityEmoji[lead.priority]} ПРИОРИТЕТ

👤 Клиент: ${lead.contact.name}
📞 Телефон: ${lead.contact.phone}${lead.contact.company ? `\n🏢 Компания: ${lead.contact.company}` : ''}
📝 Сообщение: ${lead.message || 'Не указано'}

🎯 Приоритет: ${lead.priority.toUpperCase()}
⏰ Перезвонить: ${generateAutoResponse({name: lead.contact.name, phone: lead.contact.phone, company: lead.contact.company}).expectedCallTime}
🔗 ID заявки: ${lead.id}

📊 Источник: ${lead.source}
🌐 IP: ${lead.metadata.ip || 'Unknown'}
🕐 Время: ${new Date(lead.timestamp).toLocaleString('ru-RU')}`;

  // Отправка в Telegram
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API error: ${error}`);
  }
  
  console.log('✅ Telegram notification sent successfully');
}