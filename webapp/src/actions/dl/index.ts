"use server";

import {
  adminAddUser,
  adminDeleteUser,
  adminEditUser,
} from "@/actions/dl/admin-user";
import {
  addFormValidation,
  deleteFormValidation,
  editFormValidation,
} from "@/actions/dl/form-validation";
import { addTopic, deleteTopic, editTopic } from "@/actions/dl/topic";
import {
  addUserAvatar,
  adminDeleteUserAvatar,
  adminEditUserAvatar,
} from "./admin-user-avatar";

export {
  addFormValidation,
  addTopic,
  addUserAvatar,
  adminAddUser,
  adminDeleteUser,
  adminDeleteUserAvatar,
  adminEditUser,
  adminEditUserAvatar,
  deleteFormValidation,
  deleteTopic,
  editFormValidation,
  editTopic,
};
