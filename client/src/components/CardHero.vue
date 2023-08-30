<script>
export default {
    props: ['hero']
}

</script>

<template>
    <article class="rounded-xl bg-gray-900 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a>
            <img :src="hero.key" alt="..." />
            <h2 class="text-slate-500">{{ hero.name }}</h2>
        </a>
    </article>
</template>