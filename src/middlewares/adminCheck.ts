import { Request, Response, NextFunction } from "express";

export default function adminCheck() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") !== "admin") {
      return res.status(401).json({
        error: "Unauthorized",
        statusCode: 401,
        description: `You do not have access to ${req.method} ${req.path}`,
      });
    }
    next();
  };
}
