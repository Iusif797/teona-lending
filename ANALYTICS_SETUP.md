# Настройка аналитики

## Google Analytics 4 (GA4)

1. Создайте аккаунт в Google Analytics 4
2. Получите Measurement ID (формат: G-XXXXXXXXXX)
3. Добавьте в `.env` файл:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Yandex.Metrika

1. Создайте счетчик в Yandex.Metrika
2. Получите ID счетчика (число)
3. Добавьте в `.env` файл:
   ```
   VITE_YANDEX_COUNTER_ID=12345678
   ```

## Отслеживание событий

Система автоматически отслеживает:
- Клики по CTA кнопкам (`cta_click`)
- Отправку форм (`form_submit`)
- Просмотры секций (`section_view`)

Все события отправляются в GA4 и Yandex.Metrika.
