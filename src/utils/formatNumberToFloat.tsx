export default function formatNumberToFloat(value: number): string {
  const stringValue = value.toString();
  const length = stringValue.length;

  if (length === 1) {
    // Se o número tem apenas um dígito, adicionamos um zero à esquerda
    return parseFloat(
      `0.${stringValue.length == 1 ? "0" + stringValue : stringValue}`
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });
  } else {
    // Caso contrário, dividimos a string em parte inteira e parte decimal
    const integerPart = stringValue.slice(0, length - 2);
    const decimalPart = stringValue.slice(length - 2);

    return parseFloat(`${integerPart}.${decimalPart}`).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}
