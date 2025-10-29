import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

// route pour tous les users
userRouter.get("/", userController.getAll);
// route pour trouver un user par son id
userRouter.get("/:id", userController.getById);
// route pour créer un user
userRouter.post("/", userController.createUser);
// route pour modifier un user (mais pas son password)
userRouter.put("/:id", userController.updateUser);
// route pour supprimer un user
userRouter.delete("/:id", userController.deleteUser);
// route pour modifier le password d'un user
userRouter.patch("/:id", userController.updatePassword);