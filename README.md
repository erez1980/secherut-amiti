# שכירות אמיתית

מחשבון סטטי בעברית שמציג את עלות המגורים האמיתית: שכר דירה, ארנונה, ועד בית, חשבונות, אינטרנט וחניה/תחבורה.

## מה כלול

- חישוב חודשי ושנתי מרכזי ומפורט.
- אימות קלטים (מספרים תקינים, סכומים לא שליליים ותקרת סכום סבירה).
- נגישות: קישור דילוג, תוויות/שגיאות מחוברות לשדות, מיקוד נראה לעין והודעות `aria-live`.
- SEO סטטי: מטא־דאטה, Open Graph, Twitter Card, JSON-LD, `robots.txt` ו־`sitemap.xml`.
- מותאם לייצוא סטטי של Next.js ול־GitHub Pages.

## פיתוח מקומי

דרישות: Node.js 20 ומעלה.

```bash
npm ci
npm run dev
```

פתחו את `http://localhost:3000`.

## בדיקות ובנייה

```bash
npm test
npm run build
```

הבנייה מייצרת אתר סטטי בתיקיית `out/`.

## פריסה

ה־workflow ב־`.github/workflows/deploy-pages.yml` מריץ בדיקות, בונה ומפרסם ל־GitHub Pages בכל דחיפה ל־`main`.

כתובת הייצור: <https://erez1980.github.io/secherut-amiti/>
