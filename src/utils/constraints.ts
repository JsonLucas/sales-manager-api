export const EmployeeNotFound = { code: 404, error: 'employee not found' };
export const TokenError = (error: any, code: number) => { return { code, error } };