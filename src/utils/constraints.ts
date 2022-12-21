export const InvalidPosition = { code: 400, error: "invalid employee position." };
export const Unauthorized = { code: 401 };
export const IncorrectCredentials = { code: 401, error: "incorrect login or password" };
export const ExpiredRefreshToken = { code: 403, error: "expired refresh token." };
export const EmployeeNotFound = { code: 404, error: "employee not found" };
export const BoardNotFound = { code: 404, error: "board not found." };
export const PositionNotFound = { code: 404, error: "position not found." };
export const UnityNotFound = { code: 404, error: "unity not found." };
export const SaleNotFound = { code: 404, error: "sale not found." };
export const ConflictBoard = { code: 409, error: "this board already exists." };
export const ConflictEmployee = { code: 409, error: "this employee already exists." };
export const ConflictPosition = { code: 409, error: "this position already exists." };
export const ConflictUnity = { code: 409, error: "this unity already exists." };
export const InvalidKey = { code: 500, error: "missing or invalid jwt key." };
export const InvalidBodyFormat = (e: any) => {
  return { code: 422, error: e };
};
