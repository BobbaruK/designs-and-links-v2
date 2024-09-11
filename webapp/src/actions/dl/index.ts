"use server";

import {
  adminAddBrandLogo,
  adminDeleteBrandLogo,
  adminEditBrandLogo,
} from "@/actions/dl/admin-brand-logo";
import {
  adminAddDesignAvatar,
  adminDeleteDesignAvatar,
  adminEditDesignAvatar,
} from "@/actions/dl/admin-design-avatar";
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
import { addBrand, deleteBrand, editBrand } from "@/actions/dl/brand";
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
  addBrand,
  addFormValidation,
  addLandingPageType,
  addLanguage,
  addTopic,
  adminAddBrandLogo,
  adminAddDesignAvatar,
  adminAddFlag,
  adminAddUser,
  adminAddUserAvatar,
  adminDeleteBrandLogo,
  adminDeleteDesignAvatar,
  adminDeleteFlag,
  adminDeleteUser,
  adminDeleteUserAvatar,
  adminEditBrandLogo,
  adminEditDesignAvatar,
  adminEditFlag,
  adminEditUser,
  adminEditUserAvatar,
  deleteBrand,
  deleteFormValidation,
  deleteLandingPageType,
  deleteLanguage,
  deleteTopic,
  editBrand,
  editFormValidation,
  editLandingPageType,
  editLanguage,
  editTopic,
};
