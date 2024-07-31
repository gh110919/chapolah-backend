import { Router } from "express";
import { refresh } from "./refresh";
import { signin } from "./signin";
import { signout } from "./signout";
import { signup } from "./signup";
import { user } from "./user";

export const authMiddleware = ((router) => {
  return router
    .post("/signup", signup)
    .post("/signin", signin)
    .get("/user", user)
    .patch("/refresh", refresh)
    .delete("/signout", signout);
})(Router());
