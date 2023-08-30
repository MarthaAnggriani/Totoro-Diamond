<script>
import { mapActions, mapState } from 'pinia'
import { useDiamondStore } from "../stores/diamondStore";

export default {
    data() {
        return {
            isLogin: false,
            newUser: {
                phoneNumber: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(useDiamondStore, ['handleRegister']),

        onhandleRegister() {
            this.handleRegister(this.newUser)
        }
    }
}
</script>

<template></template>