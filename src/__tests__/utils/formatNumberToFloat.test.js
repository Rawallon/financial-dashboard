import formatNumberToFloat from "../../utils/formatNumberToFloat";

describe("formatNumberToFloat", () => {
  it("should convert a single-digit number to USD format", () => {
    const result = formatNumberToFloat(5);
    expect(result).toBe("$0.05");
  });

  it("should convert a double-digit number to USD format", () => {
    const result = formatNumberToFloat(15);
    expect(result).toBe("$0.15");
  });

  it("should convert a multi-digit number to USD format", () => {
    const result = formatNumberToFloat(12345);
    expect(result).toBe("$123.45");
  });

  it("should handle zero input", () => {
    const result = formatNumberToFloat(0);
    expect(result).toBe("$0.00");
  });

  it("should handle negative input", () => {
    const result = formatNumberToFloat(-42);
    expect(result).toBe("-$0.42");
  });
});
