<script>
import { mapActions, mapState } from 'pinia'
import { useDiamondStore } from "../stores/diamondStore";
export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(useDiamondStore, ['handleLogout']),

        onhandleLogout() {
            this.handleLogout();
        }
    }
}
</script>

<template>
    <div class="navbar bg-gray-900 text-primary-content">
        <div class="flex-1">
            <div class="w-10 rounded">
                <img src="../images/totoro.png" />
            </div>
            <a class="btn btn-ghost normal-case text-xl">Totoro Diamond</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a @click.prevent="this.$router.push('/diamonds')">Diamonds</a></li>
                <li><a @click.prevent="this.$router.push('/heroes')">Hero</a></li>
                <li>
                    <details>
                        <summary>
                            User
                        </summary>
                        <ul class="p-2 bg-base-100">
                            <li><a>Profile</a></li>
                            <li><a @click.prevent="onhandleLogout">Logout</a></li>
                            <li><a @click.prevent="this.$router.push('/histories')">Histories</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    </div>
</template>