import { describe, expect, it } from "vitest";
import {
  DEFAULT_VALUES,
  calculateRent,
  hasValidationErrors,
  validateExpense,
  validateExpenses,
} from "../lib/rent-calculator";

describe("rent calculator", () => {
  it("calculates monthly and annual totals from all expense categories", () => {
    const result = calculateRent({
      rent: 6500,
      tax: 550,
      hoa: 250,
      utilities: 450,
      internet: 180,
      parking: 0,
    });

    expect(result).toMatchObject({
      rent: 6500,
      extras: 1430,
      monthly: 7930,
      yearly: 95160,
    });
  });

  it("coerces empty optional entries to zero without corrupting the result", () => {
    const result = calculateRent({ ...DEFAULT_VALUES, parking: "", tax: "1,250" });
    expect(result.values).toMatchObject({ parking: 0, tax: 1250 });
    expect(result.monthly).toBe(8630);
  });

  it("rejects negative, non-numeric, and implausibly high values", () => {
    expect(validateExpense("tax", "-1")).toContain("שלילי");
    expect(validateExpense("tax", "abc")).toContain("מספר");
    expect(validateExpense("tax", 1_000_001)).toContain("1,000,000");
  });

  it("requires a non-zero monthly rent and flags invalid form data", () => {
    const errors = validateExpenses({ ...DEFAULT_VALUES, rent: 0, tax: "wat" });
    expect(errors.rent).toContain("שכר הדירה");
    expect(errors.tax).toContain("מספר");
    expect(hasValidationErrors(errors)).toBe(true);
  });
});
