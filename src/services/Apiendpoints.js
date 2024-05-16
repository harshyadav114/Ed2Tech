const BASE_URL = "https://edulity9.onrender.com/api/v1"

// AUTH ENDPOINTS /*done*/
export const authendpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/resetpasswordtoken",
  RESETPASSWORD_API: BASE_URL + "/auth/resetpassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructordashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturepay",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifypay",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendpaymail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getcoursedetail",
  COURSE_UNAUTHENTICATED_COURSE: BASE_URL +"/course/getUnauthorisedCourseDetail",
  EDIT_COURSE_API: BASE_URL + "/course/courseupdate", /*done*/
  COURSE_CATEGORIES_API: BASE_URL + "/course/showallcategory", /*done*/
  CREATE_COURSE_API: BASE_URL + "/course/createcourse", /*done*/
  CREATE_SECTION_API: BASE_URL + "/course/createsection",/*done*/
  CREATE_SUBSECTION_API: BASE_URL + "/course/createsubsection",
  UPDATE_SECTION_API: BASE_URL + "/course/updatesection",/*done*/
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updatesubsection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getinstructorcourse",
  DELETE_SECTION_API: BASE_URL + "/course/deletesection",/*done*/
  DELETE_SUBSECTION_API: BASE_URL + "/course/deletesubsection",
  DELETE_COURSE_API: BASE_URL + "/course/deletecourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updatecourseprogress",
  CREATE_RATING_API: BASE_URL + "/course/createrating",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/course/getenrolledcourses",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getallrating",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showallcategory",
}

// CATALOG PAGE DATA /*done*/
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/showallcategory",
  CATALOGPAGEDATA_API_PUBLISHED: BASE_URL + "/course/showallcategorywithpublishedcourse",
  CATALOGPAGEDATA_COURSE_API: BASE_URL + "/course/categorydetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/emailres",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedProfileImage",
  UPDATE_PROFILE_API: BASE_URL + "/profile/profileUpdate",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}