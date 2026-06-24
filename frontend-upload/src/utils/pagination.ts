// src/utils/pagination.ts
export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function filterByQuery<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query) return items;
  const lower = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => String(item[field]).toLowerCase().includes(lower))
  );
}
