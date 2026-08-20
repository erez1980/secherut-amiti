"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_VALUES,
  EXPENSE_FIELDS,
  calculateRent,
  formatCurrency,
  hasValidationErrors,
  validateExpenses,
} from "../lib/rent-calculator";

const HERO_IMAGE =
  'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85")';

export default function Home() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const data = useMemo(() => calculateRent(values), [values]);

  const updateValue = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (submitted) {
      setErrors(validateExpenses({ ...values, [key]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateExpenses(values);
    setErrors(nextErrors);
    setSubmitted(true);

    if (!hasValidationErrors(nextErrors)) {
      document.getElementById("result")?.focus();
    }
  };

  const resetCalculator = () => {
    setValues(DEFAULT_VALUES);
    setErrors({});
    setSubmitted(false);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <main className="shell rent" id="main-content">
      <a className="skipLink" href="#calculator">
        דילוג למחשבון
      </a>

      <nav className="nav" aria-label="ניווט ראשי">
        <div className="brand" aria-label="שכירות אמיתית">
          שכירות אמיתית<span className="dot">.</span>
        </div>
        <a href="#calculator">למחשבון <span aria-hidden="true">↓</span></a>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">RENT SMARTER · ישראל</p>
          <h1 id="hero-title">הבית הבא שלך.{"\n"}בלי הפתעות.</h1>
          <p className="lead">
            מחשבון מגורים שעושה סדר בשכר הדירה, ארנונה, ועד בית והחשבונות — לפני שחותמים.
          </p>
        </div>
        <div className="heroArt" style={{ "--hero": HERO_IMAGE }} role="img" aria-label="חלל מגורים מודרני ומואר">
          <div className="floatTag">
            <span>תכנון חכם</span>
            <b>מספרים שאפשר לסמוך עליהם</b>
          </div>
        </div>
      </section>

      <section id="calculator" className="calculator" aria-labelledby="calculator-title">
        <form className="panel" noValidate onSubmit={handleSubmit}>
          <h2 id="calculator-title">בואו נחשב</h2>
          <p>הזינו את העלויות החודשיות. התוצאה מתעדכנת מיד.</p>
          <div className="fields">
            {EXPENSE_FIELDS.map(({ key, label }) => {
              const inputId = `expense-${key}`;
              const errorId = `${inputId}-error`;
              const error = errors[key];
              return (
                <div className="field" key={key}>
                  <label htmlFor={inputId}>{label}</label>
                  <div className="inputWrap">
                    <input
                      id={inputId}
                      aria-describedby={error ? errorId : undefined}
                      aria-invalid={Boolean(error)}
                      inputMode="decimal"
                      min="0"
                      name={key}
                      onChange={(event) => updateValue(key, event.target.value)}
                      step="any"
                      type="number"
                      value={values[key]}
                    />
                    <span aria-hidden="true">₪</span>
                  </div>
                  <p className="fieldError" id={errorId} role={error ? "alert" : undefined}>
                    {error}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="formActions">
            <button type="submit">בדיקת הנתונים</button>
            <button className="resetButton" type="button" onClick={resetCalculator}>
              איפוס
            </button>
          </div>
          <p className="formStatus" aria-live="polite" role="status">
            {submitted && !errorCount ? "הנתונים תקינים. העלות האמיתית מוצגת לצד הטופס." : ""}
            {submitted && errorCount ? `יש לתקן ${errorCount} שדות לפני שממשיכים.` : ""}
          </p>
        </form>

        <aside
          aria-labelledby="result-title"
          className="result"
          id="result"
          tabIndex="-1"
        >
          <div aria-atomic="true" aria-live="polite">
            <p className="resultLabel" id="result-title">עלות חודשית אמיתית</p>
            <p className="total">{formatCurrency(data.monthly)}</p>
            <p className="secondary">{formatCurrency(data.yearly)} בשנה</p>
          </div>
          <div className="rows" aria-label="פירוט העלויות">
            {data.rows.map(([label, value]) => (
              <div className="row" key={label}>
                <span>{label}</span>
                <b>{formatCurrency(value)}</b>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="benefits" aria-label="יתרונות המחשבון">
        <div className="benefit"><i aria-hidden="true" />משווים דירות לפי עלות אמיתית</div>
        <div className="benefit"><i aria-hidden="true" />מבינים את ההוצאה השנתית</div>
        <div className="benefit"><i aria-hidden="true" />חוסכים ויכוחים עם שותפים</div>
      </section>
      <footer className="footer">שכירות אמיתית · תכנון פשוט. החלטות טובות יותר.</footer>
    </main>
  );
}
