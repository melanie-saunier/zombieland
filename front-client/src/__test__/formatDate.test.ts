import { formatDate } from "@/utils/mybookingsUtils";

describe("formatDate", () => {
  it("format a date in french with day, month and year", () => {
    // on prend une date au format JS
    const dateString = "2025-11-03T12:00:00Z";
    //on appelle la fonction formatDate
    const result = formatDate(dateString);

    // on attend le format en francais 3 novembre 2025
    expect(result).toBe("3 novembre 2025");
  });
  it("fonctionne avec une date différente", () => {
    const dateStr = "2024-01-15T00:00:00Z";
    const result = formatDate(dateStr);
    expect(result).toBe("15 janvier 2024");
  });
  it("renvoie 'Invalid Date' si la chaîne est invalide", () => {
    const invalidDateStr = "chaine-invalide";
    const result = formatDate(invalidDateStr);
    expect(result).toBe("Invalid Date");
  });
});