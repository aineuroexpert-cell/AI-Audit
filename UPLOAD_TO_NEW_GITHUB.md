# Загрузка проекта в новый GitHub репозиторий

## Если у вас установлен Git:

1. Скачайте проект:
```bash
git clone https://github.com/aineuroexpert-cell/AI-Audit.git neuroexpert-new
cd neuroexpert-new
```

2. Удалите связь со старым репозиторием:
```bash
git remote remove origin
```

3. Создайте новый репозиторий на GitHub (через веб-интерфейс)

4. Подключите новый репозиторий:
```bash
git remote add origin https://github.com/ВАШ_НОВЫЙ_USERNAME/neuroexpert.git
```

5. Отправьте код:
```bash
git branch -M main
git push -u origin main
```

## Если Git не установлен - используйте GitHub Import!

Это самый простой способ - смотрите инструкцию выше.