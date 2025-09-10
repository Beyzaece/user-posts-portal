export const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export const notEmpty = (v: string) => v.trim().length > 0
