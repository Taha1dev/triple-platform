import { configureStore } from '@reduxjs/toolkit'
import dialogReducer from './slices/openDialogSlice'
import registerReducer from './slices/registerSlice'
import loginReducer from './slices/loginSlice'
import resendOtpReducer from './slices/resendOTPSlice'
import forgetPasswordReducer from './slices/forgetPasswordSlice'
import VerifyOtpReducer from './slices/verifyOTPSlice'
import resetPasswordReducer from './slices/resetPasswordSlice'
import citiesCountriesReducer from './slices/citiesCountriesSlice'
import ForgetPasswordOtpReducer from './slices/ForgetPasswordOTPSlice'
import routerReducer from './slices/routerSlice'
import emailReducer from './slices/emailSlice'
import otpContentRedcuer from './slices/otpContentSlice'
import logoutReducer from './slices/logoutSlice'
import UpdateProfileReducer from './slices/updateUserSlice'
import userReducer from './slices/userSlice'
import changePasswordReducer from './slices/changePasswordSlice'
import allCategoriesReducer from './slices/getAllCategoriesSlice'
import onBoardingCategoriesReducer from './slices/getAllCategoriesSlice'
import userPictureReducer from './slices/updateUserPicture'
import DomReducer from './slices/DOMSlice'
import filterUserReducer from './slices/filterUserSlice'
import apperanceDetailsReducer from './slices/getApperanceDetails'
import updateApperanceReducer from './slices/updateApperanceSlice'
import uploadPortfolioReducer from './slices/updatePortfolioItemsSlice'

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    register: registerReducer,
    login: loginReducer,
    resendOtp: resendOtpReducer,
    verifyOtp: VerifyOtpReducer,
    forgetPasswordOtp: ForgetPasswordOtpReducer,
    forgetPassword: forgetPasswordReducer,
    uploadPortfolio: uploadPortfolioReducer,
    resetPassword: resetPasswordReducer,
    citiesCountries: citiesCountriesReducer,
    routerInstance: routerReducer,
    email: emailReducer,
    otpContent: otpContentRedcuer,
    logout: logoutReducer,
    updateProfile: UpdateProfileReducer,
    user: userReducer,
    userPicture: userPictureReducer,
    changePassword: changePasswordReducer,
    allCategories: allCategoriesReducer,
    onBoardingCategories: onBoardingCategoriesReducer,
    headerView: DomReducer,
    filterUser: filterUserReducer,
    apperanceDetails: apperanceDetailsReducer,
    updateApperance: updateApperanceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
