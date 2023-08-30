<script>
import CardHero from '../components/CardHero.vue';
import { mapActions, mapState } from 'pinia'
import { useDiamondStore } from "../stores/diamondStore";
export default {
    computed: {
        ...mapState(useDiamondStore, ['heroes', 'maxPage', 'currentPage'])
    },
    methods: {
        ...mapActions(useDiamondStore, ['fetchHeroes', 'nextPage', 'previousPage']),
    },
    created() {
        this.fetchHeroes();
    },
    components: { CardHero }
}

</script>

<template>
    <section>
        <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-800 flex">
            <main class="flex-1 pb-8 bg-gray-800">
                <div class="flex items-center justify-between py-2 px-10 bg-gray-800">
                    <div>
                        <h1 class="text-2xl font-semibold leading-relaxed text-gray-300">Heroes</h1>
                        <p class="text-sm font-medium text-gray-500">
                            Let's check your hero here!
                        </p>
                    </div>
                </div>
                <section class="py-5 bg-gray-700">
                    <!-- form search -->
                    <!-- <form class="form" @submit.prevent="searchProduct">

                        <div class="relative z-0 flex -space-x-px">
                            <div class="relative"><svg
                                    class="pointer-events-none absolute inset-y-0 left-0 h-full w-8 stroke-gray-400 pl-2.5"
                                    viewBox="0 0 256 256" aria-hidden="true">
                                    <circle cx="116" cy="116" r="84" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="16"></circle>
                                    <line x1="175.4" y1="175.4" x2="224" y2="224" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="16"></line>
                                </svg><label for="search-button" class="sr-only">Search Tasks</label>
                                <input v-model="searchKeyword" id="search-button" type="search"
                                    placeholder="Search category..."
                                    class="block w-full rounded-l-md border-gray-200 pl-10 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                            </div>
                            <button type="submit"
                                class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded-r border border-gray-200 bg-gray-500 px-3 py-1 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-100 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                                Search</button>
                        </div>
                    </form> -->
                    <!-- end of form search -->

                    <div class="mx-auto grid max-w-3xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <CardHero v-for="hero in heroes" :hero="hero"
                            style="cursor: pointer width: min-content; height: min-content;" />
                    </div>
                    <div class="container">
                        <button class="btn btn-outline btn-warning" @click.prevent="previousPage">Previous</button>
                        <input type="submit" :value="currentPage" class="btn btn-outline btn-info" />
                        <button class="btn btn-outline btn-success" @click.prevent="nextPage(maxPage)">Next</button>
                    </div>
                </section>
            </main>
        </div>
    </section>
</template>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* Set the height of the container to fill the entire viewport */
}
</style>