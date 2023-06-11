export interface ProfileForm {
  email: string;
  firstName: string;
  lastName: string;
  profileImageURL: string;
}

export interface ProfileImage {
  profileImageURL: string;
}

export interface UPDATE_PROFILE_IMAGE {
  type: "UPDATE_PROFILE_IMAGE";
  payload: ProfileImage;
}

export interface UPDATE_PROFILE {
  type: "UPDATE_PROFILE";
  payload: ProfileForm;
}
