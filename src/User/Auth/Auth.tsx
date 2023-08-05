import { toast } from 'react-toastify'
import React, { Dispatch, SetStateAction } from 'react'
import CarreerInnAxios from '../../AppMain/AppConfig/AxiosConfig'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { validation } from '../Splits/Profile/UserProfile/Includes/Projects/Helper'




async function successLogin( userdata: { username: string, user_id: number, profile: string | null, email: string, password: string }) {

    await CarreerInnAxios.post('user/token/', {
        username: userdata.username,
        password: userdata.password
    })
        .then(res => {
            localStorage.setItem('access-token', res.data.access)
            localStorage.setItem('refresh-token', res.data.refresh)
            CarreerInnAxios.defaults.headers['Authorization'] = 'Bearer ' + res.data.access
        })
        .catch(() => {
            AuthToastFailure('Internal Error')
        })

}



export const HandleLogin = async (formEvent: React.SyntheticEvent, SetLoading: Dispatch<SetStateAction<boolean>>,adminLog?:boolean ) => {

    formEvent.preventDefault();
    SetLoading(true);

    const formElement = formEvent.currentTarget as HTMLFormElement;
    const usernameInput = formElement.elements.namedItem('username') as HTMLInputElement;
    const passwordInput = formElement.elements.namedItem('password') as HTMLInputElement;

    const passwordValue = passwordInput.value;
    const usernameValue = usernameInput.value;
    localStorage.setItem('username', usernameValue);

    if (validateLogin(usernameValue, passwordValue)) {
        try {
            const response = await CarreerInnAxios.post(adminLog ? 'admin/login/' : 'user/login/', { "username": usernameValue, "password": passwordValue });
            SetLoading(false);
 
            if(adminLog) localStorage.setItem('admin','true')
           

            successLogin({ ...response.data.user, password: passwordValue });

            return response.data.user;

        } catch (err) {
            if (axios.isAxiosError(err)) {
                LoginFailure(err.response?.data?.message || 'An error occurred');
                SetLoading(false);
                return Promise.reject();
            }
        }



    } else {
        SetLoading(false)
        return Promise.reject()
    }

}





export const ValidateUserInfo = (formEvent: React.SyntheticEvent, SetActiveLayout: Dispatch<SetStateAction<string>>, SetLoading: Dispatch<SetStateAction<boolean>>) => {
    formEvent.preventDefault();
    SetLoading(true)

    const formElement = formEvent.currentTarget as HTMLFormElement;
    const emailInput = formElement.elements.namedItem('email') as HTMLInputElement;
    const usernameInput = formElement.elements.namedItem('username') as HTMLInputElement;

    const emailValue = emailInput.value;
    const usernameValue = usernameInput.value;

    ValidateUsernameAndEmail(usernameValue, emailValue).then(() => {
        SetActiveLayout('else')
        localStorage.setItem('username', usernameValue)
        localStorage.setItem('email', emailValue)
    })
        .catch(() => {
            SetLoading(false)
        })

}

const ValidateUsernameAndEmail = async (query: string, query2: string) => {

    if (query == '' || query2 == '') {
        AuthToastFailure('Please Enter credentials !')
        return Promise.reject()
    }


    if (query.length <= 5) {
        AuthToastFailure('Username should have atleast 6 characters!')
        return Promise.reject()
    }
    if (query.includes('@')) {
        AuthToastFailure('Username should not contain @')
        return Promise.reject()
    }



    try {
        await CarreerInnAxios.post('user/verify-username-email/', { "username": query, "email": query2 });
    } catch (err) {

        if (axios.isAxiosError(err)) {
            console.log(err);

            AuthToastFailure(err.response?.data?.message || 'An error occurred');
            return Promise.reject()
        }
    }
}

async function handleResendOTP(count: number, loginf: boolean = false) {

    let expired = false
    let localcount = count
    if (localStorage.getItem('refresh-counts')) {
        localcount = 0;
        localStorage.removeItem('refresh-counts');
    }

    Swal.update({ footer: '' });
    if (localcount > 3) {
        Swal.close();
        AuthToastFailure('Otp limit exceeded, please try agian later');
        return
    }


    await CarreerInnAxios.post('user/get-new-otp/', { "username": localStorage.getItem('username') })
        .then(() => {
            SuccessMessage('Otp Sent!')
            Swal.hideLoading();
            Swal.update({ showConfirmButton: true })
        })
        .catch((err) => {
            AuthToastFailure(err.response?.data?.message || 'An error occurred')
            if (err.response?.data?.message == 'Otp Limit Ended ,please try with another mail!') {
                expired = true

            }
            if (localcount < 3) {
                Swal.update({
                    footer: `
                  <button id="resend-otp-btn" class="btn-2 m-0">Resend OTP</button>
                `,
                    confirmButtonText: 'Verify Otp'
                });
            }
        })

    if (loginf && !expired) {
        Swal.fire({
            title: 'Enter otp Send to your mail',
            // didOpen:()=>{
            //     Swal.showLoading();
            // },
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: false,
            customClass: {
                confirmButton: 'btn-swal',
                cancelButton: 'btn-2'
            },
            confirmButtonText: 'Verify',
            showLoaderOnConfirm: true,
            preConfirm: (otp) => {
                if (otp == '' || otp.length < 4) {
                    Swal.showValidationMessage('Enter a valid Otp')
                    return
                }

                return CarreerInnAxios.post(`user/verify-otp/`, { "username": localStorage.getItem('username'), "otp": otp })
                    .then(() => {
                        Swal.fire({
                            title: 'Account verified,Please Login',
                            showConfirmButton: true,
                            customClass: {
                                confirmButton: 'btn-swal'
                            },
                            confirmButtonText: 'Login',
                            preConfirm: () => { window.location.href = '/Auth/login' }
                        })
                    })
                    .catch(error => {

                        Swal.update({
                            footer: `
                        <button id="resend-otp-btn" class="btn-2 mt-0">Resend OTP</button>
                      `,
                            confirmButtonText: 'Try Again'
                        });
                        !Swal.isLoading();
                        Swal.showValidationMessage(
                            `Verification failed:${error.response.data.message}`
                        );

                        const resendButton = document.getElementById('resend-otp-btn');
                        if (resendButton) {
                            resendButton.addEventListener('click', () => { handleResendOTP(count).then((() => count++)); if (count > 3) return; Swal.update({ showConfirmButton: false }); Swal.showLoading(); });
                        }

                    })
            },
        })

    }


}


export const handleAccountCreation = (FormEvent: React.SyntheticEvent, SetLoading: Dispatch<SetStateAction<boolean>>) => {
    FormEvent.preventDefault();
    SetLoading(true)

    const formElement = FormEvent.currentTarget as HTMLFormElement;
    const password1 = formElement.elements.namedItem('password1') as HTMLInputElement;
    const password2 = formElement.elements.namedItem('password2') as HTMLInputElement;

    const password1_val = password1.value;
    const password2_val = password2.value;
    let valid = PasswordValid(password1_val, password2_val)
    let count = 0



    if (valid == 0) {
        let usr_name = localStorage.getItem('username')
        let email_val = localStorage.getItem('email')
        CarreerInnAxios.post('user/create-user/', { "username": usr_name, "email": email_val, "password": password1_val })
            .then(() => {
                Swal.fire({
                    title: 'Enter otp Send to your mail',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'btn-swal',
                        cancelButton: 'btn-2'
                    },
                    confirmButtonText: 'Verify',
                    showLoaderOnConfirm: true,
                    preConfirm: (otp) => {
                        if (otp == '' || otp.length < 4) {
                            Swal.showValidationMessage('Enter a valid Otp')
                            return
                        }

                        return CarreerInnAxios.post(`user/verify-otp/`, { "username": localStorage.getItem('username'), "otp": otp })
                            .then(() => {
                                Swal.fire({
                                    title: 'Account verified,Please Login',
                                    showConfirmButton: true,
                                    customClass: {
                                        confirmButton: 'btn-swal'
                                    },
                                    confirmButtonText: 'Login',
                                    preConfirm: () => { window.location.href = '/Auth/login' }
                                })
                            })
                            .catch(error => {
                                Swal.update({
                                    footer: `
                            <button id="resend-otp-btn" class="btn-2 mt-0">Resend OTP</button>
                          `,
                                    confirmButtonText: 'Try Again'
                                });
                                !Swal.isLoading();
                                Swal.showValidationMessage(
                                    `Verification failed:${error.response.data.message}`
                                );

                                const resendButton = document.getElementById('resend-otp-btn');
                                if (resendButton) {
                                    resendButton.addEventListener('click', () => { handleResendOTP(count).then((() => count++)); if (count > 3) return; Swal.update({ showConfirmButton: false }); Swal.showLoading(); });
                                }

                            })
                    },
                })

            })
            .catch(() => {
                SetLoading(false)
                window.location.href = '/'
            })
    }
    else if (valid == 3) {
        AuthToastFailure("Password Should contain atleast 8 characters")
        SetLoading(false)
    }
    else {
        AuthToastFailure("Passwords not matching!")
        SetLoading(false)
    }

}

const PasswordValid = (password1: string, password2: string): number => {
    if (password1.length < 8) return 3
    return password1 === password2 ? 0 : 2
}

const AuthToastFailure = (message: string) => toast.error(message,
    {
        position: "top-right",
        autoClose: message == 'Otp Limit Ended ,please try with another mail!' || message == 'Otp limit exceeded, please try agian later' ? false : 2000,
        hideProgressBar: true,
        closeOnClick: true,
        progressStyle: { color: 'red' },
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

const SuccessMessage = (message: string) => toast.success(message,
    {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        progressStyle: { color: 'red' },
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

const LoginFailure = (message: string) => {

    const showLink = message == 'Account not verified' ? true : false;
    let count = 0

    const toastContent = (
        <div>
            <p className='m-0'>{message}</p>
            {showLink && (
                <p className='m-0 app-color app-link' onClick={() => { handleResendOTP(count, true); toast.dismiss() }} rel="noopener noreferrer">
                    Verify Now
                </p>
            )}
        </div>
    );

    toast.error(toastContent, {
        position: 'top-right',
        autoClose: showLink ? false : 2000,
        hideProgressBar: true,
        closeOnClick: false,
        progressStyle: { color: 'red' },
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};





function validateLogin(username: string, password: string): boolean {
    if (username.length <= 5) {
        AuthToastFailure('Username must have atleast 6 characters!')
        return false
    }
    if (password.length < 8) {
        AuthToastFailure('Password must have 8 characters')
        return false
    }
    else return true

}


export async function logout() {
    try {
        let token = localStorage.getItem('refresh-token')
        if (!token) {
            localStorage.clear()
            return Promise.resolve()
        }
        await CarreerInnAxios.post('user/logout/', { 'refresh-token': token })
        localStorage.clear()
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function reset_pass_otp(formEvent?: React.SyntheticEvent | null,username_value?:string) {
    let username = null;
    if(formEvent){
        
        formEvent.preventDefault();
        const formElement = formEvent.currentTarget as HTMLFormElement;
        username = formElement.elements.namedItem('username') as HTMLInputElement;
        username_value = username.value
        
    }
    if (username_value == '') {
        validation('Please enter username')
        return Promise.reject()
    }

    try {
        await CarreerInnAxios.post('user/get-otp-for-reset/', { 'username': username_value })
        if(username) username.value = ''
        return Promise.resolve()
    } catch (error) {
        const err = error as AxiosError
        const x = err.response as { data: string }
        validation(x.data)
        return Promise.reject(error)
    }
}

export async function verify_otp_for_pass(formEvent:React.SyntheticEvent,username : string) {
    formEvent.preventDefault();
    const formElement = formEvent.currentTarget as HTMLFormElement;
    const otp_inp = formElement.elements.namedItem('otp') as HTMLInputElement;
    const otp = otp_inp.value

    if (otp == '' || otp.length < 4 || otp.length > 4) {
        validation('Enter a valid Otp')
        return Promise.reject()
    }
    try {

        const res = await CarreerInnAxios.post(`user/verify-otp/`, { "username": username, "otp": otp })
        otp_inp.value = ''
        if (res) return Promise.resolve()
        
    } catch (error) {
        const err = error as AxiosError
        const x = err.response as { data: {message : string} }
        validation(x.data.message)
        return Promise.reject()
    }
}

export async function change_password(formEvent:React.SyntheticEvent,username:string) {


    formEvent.preventDefault();
    const formElement = formEvent.currentTarget as HTMLFormElement;
    const password_inp1 = formElement.elements.namedItem('password1') as HTMLInputElement;
    const password1 = password_inp1.value
    const password_inp2 = formElement.elements.namedItem('password2') as HTMLInputElement;
    const password2 = password_inp2.value

    if(username ==  ''){
        validation('Internal Error')
        return Promise.reject()
    }

    if (password1.length < 8) {
        validation('Password should have 8 characters')
        return Promise.reject()
    }
    if (password1 != password2) {
        validation("Passwords don't match")
        return Promise.reject()
    }
    try {

        const res = await CarreerInnAxios.post(`user/change-password/`, { "password": password1 , 'username' : username })
        password_inp1.value = ''
        password_inp2.value = ''
        if (res) return Promise.resolve()
        
    } catch (error) {
        console.log(error);
        
        return Promise.reject()
    }
}