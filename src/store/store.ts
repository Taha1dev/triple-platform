import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/openDialogSlice';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import resendOtpReducer from './slices/resendOTPSlice';
import forgetPasswordReducer from './slices/forgetPasswordSlice';
import VerifyOtpReducer from './slices/verifyOTPSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import citiesCountriesReducer from './slices/citiesCountriesSlice';
import routerReducer from './slices/routerSlice';
import emailReducer from './slices/emailSlice';
import otpContentRedcuer from './slices/otpContentSlice';
import logoutReducer from './slices/logoutSlice';
import UpdateProfileReducer from './slices/updateUserSlice';
import userReducer from './slices/userSlice';
import changePasswordReducer from './slices/changePasswordSlice';

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    register: registerReducer,
    login: loginReducer,
    resendOtp: resendOtpReducer,
    verifyOtp: VerifyOtpReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    citiesCountries: citiesCountriesReducer,
    routerInstance: routerReducer,
    email: emailReducer,
    otpContent: otpContentRedcuer,
    logout: logoutReducer,
    updateProfile: UpdateProfileReducer,
    user: userReducer,
    changePassword: changePasswordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
