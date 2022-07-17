import jwt from "jsonwebtoken";

export const generateToken = (Id) => {
    return jwt.sign({ id: Id}, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
};
