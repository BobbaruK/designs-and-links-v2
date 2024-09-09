"use server";

import {
  adminAddFlag,
  adminDeleteFlag,
  adminEditFlag,
} from "@/actions/dl/admin-flag";
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
  adminAddUserAvatar,
  adminDeleteUserAvatar,
  adminEditUserAvatar,
} from "./admin-user-avatar";

export {
  addFormValidation,
  addLandingPageType,
  addTopic,
  adminAddUserAvatar,
  adminAddFlag,
  adminAddUser,
  adminDeleteFlag,
  adminDeleteUser,
  adminDeleteUserAvatar,
  adminEditFlag,
  adminEditUser,
  adminEditUserAvatar,
  deleteFormValidation,
  deleteLandingPageType,
  deleteTopic,
  editFormValidation,
  editLandingPageType,
  editTopic,
};
