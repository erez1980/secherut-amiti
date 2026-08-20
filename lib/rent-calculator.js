export const EXPENSE_FIELDS = [
  { key: "rent", label: "שכר דירה חודשי", defaultValue: 6500, required: true },
  { key: "tax", label: "ארנונה לחודש", defaultValue: 550 },
  { key: "hoa", label: "ועד בית", defaultValue: 250 },
  { key: "utilities", label: "חשמל ומים", defaultValue: 450 },
  { key: "internet", label: "אינטרנט וטלוויזיה", defaultValue: 180 },
  { key: "parking", label: "חניה / תחבורה", defaultValue: 0 },
];

export const DEFAULT_VALUES = Object.fromEntries(
  EXPENSE_FIELDS.map(({ key, defaultValue }) => [key, defaultValue]),
);

const MAX_MONTHLY_EXPENSE = 1_000_000;

export function parseExpense(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number.NaN;

  const normalized = value.trim().replace(/,/g, "");
  return normalized === "" ? 0 : Number(normalized);
}

export function validateExpense(key, value) {
  const field = EXPENSE_FIELDS.find((item) => item.key === key);
  const parsed = parseExpense(value);

  if (!Number.isFinite(parsed)) return "נא להזין מספר תקין.";
  if (parsed < 0) return "הסכום לא יכול להיות שלילי.";
  if (parsed > MAX_MONTHLY_EXPENSE) {
    return "נא להזין סכום חודשי עד ₪1,000,000.";
  }
  if (field?.required && parsed === 0) return "נא להזין את שכר הדירה החודשי.";
  return "";
}

export function validateExpenses(values) {
  return Object.fromEntries(
    EXPENSE_FIELDS.map(({ key }) => [key, validateExpense(key, values[key])]),
  );
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean);
}

export function calculateRent(values) {
  const normalized = Object.fromEntries(
    EXPENSE_FIELDS.map(({ key }) => {
      const parsed = parseExpense(values[key]);
      return [key, Number.isFinite(parsed) && parsed >= 0 ? parsed : 0];
    }),
  );

  const rent = normalized.rent;
  const extras = EXPENSE_FIELDS.filter(({ key }) => key !== "rent").reduce(
    (sum, { key }) => sum + normalized[key],
    0,
  );
  const monthly = rent + extras;
  const yearly = monthly * 12;

  return {
    rent,
    extras,
    monthly,
    yearly,
    values: normalized,
    rows: [
      ["שכר דירה", rent],
      ["חשבונות ומסים", extras],
      ["עלות שנתית", yearly],
    ],
  };
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);
