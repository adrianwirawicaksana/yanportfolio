// String utilities
export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Number utilities
export const formatCurrency = (
  amount: number,
  currency: string = "IDR",
): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("id-ID").format(num);
};

// Array utilities
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) return Array.from(new Set(array));
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
};

// Object utilities
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
};
