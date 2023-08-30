import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useDiamondStore = defineStore('app', {
    state: () => ({
        baseUrl: "https://iproject-totoro.marthaanggriani.site",
        isLogin: false,
        diamonds: [],
        username: {},
        heroes: [],
        histories: [],
        currentPage: 1,
        maxPage: 0,
    }),
    actions: {
        sweetAlert(value, data) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            switch (value) {
                case 'LoginSuccess':
                case 'RegisterSuccess':
                case 'LogoutSuccess':
                    Toast.fire({
                        icon: 'success',
                        title: data
                    })
                    break
                case 'SuccessAddedFavorite':
                    Toast.fire({
                        icon: 'success',
                        title: data
                    })
                    break
                case 'LoginError':
                case 'RegisterError':
                case 'ErrorGetHeroes':
                case 'ErrorGetDiamonds':
                case 'ErrorPyament':
                case 'ErrorGetHistories':
                    Swal.fire({
                        icon: 'error',
                        iconColor: 'red',
                        confirmButtonColor: 'red',
                        background: '#191919',
                        color: 'white',
                        template: '#my-template',
                        title: data
                    })
                    break
            }
        },
        async handleRegister(newUser) {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${this.baseUrl}/register`,
                    data: newUser
                })
                // alert
                this.sweetAlert("RegisterSuccess", 'Register success')
                // ganti page
                this.newUser = ''
                this.router.push('/login')
            } catch (error) {
                let message = error.response.data.message
                this.sweetAlert('RegisterError', message);
            }
        },

        async handleLogout() {
            // console.log("ini store logout");
            Swal.fire({
                title: 'Are you sure to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then(() => {
                localStorage.clear()
                this.router.push('/login')
                this.sweetAlert('LogoutSuccess', 'logout success')
            })
        },

        async handleLogin(user) {
            try {
                const { data } = await axios({
                    method: "post",
                    url: `${this.baseUrl}/login`,
                    data: user
                })
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("email", user.email)
                this.email = user.email
                this.isLogin = true
                this.router.push("/")
                // alert
                this.sweetAlert("LoginSuccess", "Login success")
                this.page = "ProductsPage"
            } catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('LoginError', message);
            }
        },

        async googleLogin(googleCredential) {
            try {

                const { data } = await axios({
                    method: 'POST',
                    url: `${this.baseUrl}/google-login`,
                    headers: {
                        google_token: googleCredential
                    }
                })
                console.log(data);
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.user.email)

                this.router.push('/')
                this.isLogin = true
                this.sweetAlert('LoginSuccess', 'login success')
            } catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('LoginError', message);
            }
        },

        async fetchDiamonds(payload) {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${this.baseUrl}/diamonds`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    params: payload
                })
                this.diamonds = data;
            }
            catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('ErrorGetDiamonds', message);
            }
        },

        fetchUsername(value) {
            return axios({
                method: "post",
                url: `${this.baseUrl}/account`,
                data: { accountId: value.accountId, serverId: value.serverId }
            })
        },

        async fetchHeroes() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${this.baseUrl}/heroes`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    params: { page: this.currentPage }
                })
                this.heroes = data.heroes;
                this.maxPage = data.totalPages;
            }
            catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('ErrorGetHeroes', message);
            }
        },

        async nextPage(max) {
            if (this.currentPage < max) {
                this.currentPage += 1;
                this.fetchHeroes();
            }
        },
        async previousPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
                this.fetchHeroes();
            }
        },

        updateStatusPaid(value) {
            return axios({
                method: "patch",
                url: `${this.baseUrl}/carts/${value}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
        },

        async paymentGateway(value) {
            try {

                const { data } = await axios({
                    method: "post",
                    url: `${this.baseUrl}/generate-midtrans-token`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                    data: value
                })
                console.log(data);
                const { token } = data.midtransToken
                const { id } = data.Cart

                const cb = this.updateStatusPaid;

                window.snap.pay(token, {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        cb(id)
                    },
                })
            }
            catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('ErrorPyament', message);
            }
        },

        async fetchHistories() {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `${this.baseUrl}/histories`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                console.log(data);
                this.histories = data;
            }
            catch (error) {
                console.log(error);
                let message = error.response.data.message
                this.sweetAlert('ErrorGetHistories', message);
            }
        },
    }
})

