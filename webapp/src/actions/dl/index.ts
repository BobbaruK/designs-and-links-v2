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
import {
  addLandingPageType,
  deleteLandingPageType,
  editLandingPageType,
} from "@/actions/dl/lp-type";
import { addTopic, deleteTopic, editTopic } from "@/actions/dl/topic";
import {
  addUserAvatar,
  adminDeleteUserAvatar,
  adminEditUserAvatar,
} from "./admin-user-avatar";

export {
  addFormValidation,
  addLandingPageType,
  addTopic,
  addUserAvatar,
  adminAddUser,
  adminDeleteUser,
  adminDeleteUserAvatar,
  adminEditUser,
  adminEditUserAvatar,
  deleteFormValidation,
  deleteLandingPageType,
  deleteTopic,
  editFormValidation,
  editLandingPageType,
  editTopic,
};
