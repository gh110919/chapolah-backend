import { Request, Response } from "express";

export const teapot = (req: Request, res: Response) => {
  if (
    req.query === undefined ||
    req.body === undefined ||
    req.params === undefined
  ) {
    return res.status(418).json({
      success: false,
      message: {
        error: "Cервер не может приготовить кофе, потому что он чайник !!!",
      },
    });
  }
};
