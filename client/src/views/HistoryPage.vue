<script>
import { mapActions, mapState } from 'pinia'
import { useDiamondStore } from "../stores/diamondStore";

export default {
    computed: {
        ...mapState(useDiamondStore, ['histories'])
    },
    methods: {
        ...mapActions(useDiamondStore, ['fetchHistories'])
    },
    created() {
        this.fetchHistories();
    }

}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Account ID</th>
                    <th>Diamond</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Transaction</th>
                    <th>createdAt</th>
                </tr>
            </thead>
            <tbody>
                <!-- row -->
                <tr class="hover" v-for="history in histories" :key="history.id" :history="history">
                    <td>{{ history.AccountId }}</td>
                    <td>{{ history.Diamond.amount }}</td>
                    <td>{{ history.Diamond.description }}</td>
                    <td>Rp. {{ history.Diamond.price.toLocaleString("id-ID") }},00</td>
                    <td>Payment Success</td>
                    <td>{{ history.createdAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>