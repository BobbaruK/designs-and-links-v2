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
  adminAddUserAvatar,
  adminDeleteUserAvatar,
  adminEditUserAvatar,
} from "@/actions/dl/admin-user-avatar";
import {
  addFormValidation,
  deleteFormValidation,
  editFormValidation,
} from "@/actions/dl/form-validation";
import {
  addLanguage,
  deleteLanguage,
  editLanguage,
} from "@/actions/dl/language";
import {
  addLandingPageType,
  deleteLandingPageType,
  editLandingPageType,
} from "@/actions/dl/lp-type";
import { addTopic, deleteTopic, editTopic } from "@/actions/dl/topic";

export {
  addFormValidation,
  addLandingPageType,
  addLanguage,
  addTopic,
  adminAddFlag,
  adminAddUser,
  adminAddUserAvatar,
  adminDeleteFlag,
  adminDeleteUser,
  adminDeleteUserAvatar,
  adminEditFlag,
  adminEditUser,
  adminEditUserAvatar,
  deleteFormValidation,
  deleteLandingPageType,
  deleteLanguage,
  deleteTopic,
  editFormValidation,
  editLandingPageType,
  editLanguage,
  editTopic,
};
