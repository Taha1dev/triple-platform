import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/openDialogSlice';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import resendOtpReducer from './slices/resendOTPSlice';
import forgetPasswordReducer from './slices/forgetPasswordSlice';
import VerifyOtpReducer from './slices/verifyOTPSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    register: registerReducer,
    login: loginReducer,
    resendOtp: resendOtpReducer,
    verifyOtp: VerifyOtpReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
