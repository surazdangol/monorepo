import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};