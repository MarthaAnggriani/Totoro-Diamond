<script>
import { mapActions, mapState } from 'pinia'
import { useDiamondStore } from "../stores/diamondStore";
import Swal from 'sweetalert2'


export default {
    props: ['diamond'],
    methods: {
        ...mapActions(useDiamondStore, ['fetchUsername', 'paymentGateway']),
        ...mapState(useDiamondStore, ['username']),

        handleBuy() {
            Swal.fire({
                title: 'Account Mobile Legends',
                html: `<input type="text" id="accountId" class="swal2-input" placeholder="Account ID">
                    <input type="text" id="serverId" class="swal2-input" placeholder="Server ID">`,
                confirmButtonText: 'check',
                focusConfirm: false,
                preConfirm: () => {
                    const accountId = Swal.getPopup().querySelector('#accountId').value
                    const serverId = Swal.getPopup().querySelector('#serverId').value
                    if (!accountId || !serverId) {
                        Swal.showValidationMessage(`Please enter account ID and server ID`)
                    }
                    return this.fetchUsername({ accountId, serverId });
                }
            })
                .then((result) => {
                    const { accountId, username } = result.value.data.data;
                    Swal.fire({
                        title: 'Your Account',
                        html: `account ID : ${accountId}<br>username : ${username}`,
                        // icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Yes, it's my account"
                    })
                        .then(() => {

                            // buy diamonds client (cart dapat) 
                            const value = {
                                AccountId: accountId,
                                DiamondId: this.diamond.id,
                            }
                            this.paymentGateway(value);
                        })
                })
        }
    }
}

</script>

<template>
    <article class="rounded-xl bg-gray-900 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a>
            <div class=" relative flex items-end overflow-hidden rounded-xl">
                <img src="../images/mobileLegends.png" alt="..." />
                <div
                    class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <button class="text-sm">Buy</button>
                </div>
            </div>

            <div class="mt-1 p-2">
                <h2 class="text-slate-500">Amount : {{ diamond.amount }}</h2>
                <p class="mt-1 text-sm text-slate-900">{{ diamond.descriptions }}</p>

                <div class="mt-3 flex items-end justify-between">
                    <p class=" text-blue-500">Rp.{{ diamond.price.toLocaleString("id-ID") }},00</p>
                    <div
                        class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <button @click.prevent="handleBuy()" class=" text-sm">Buy</button>
                    </div>
                </div>

            </div>
        </a>
    </article>
</template>