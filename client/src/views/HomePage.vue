<script>
</script>

<template>
    <div class="scroll-behavior: auto">
        <div class="carousel w-full">
            <div id=" slide1" class="carousel-item relative w-full">
                <img src="../images/layla-aspirants.jpg" class="w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" class="btn btn-circle">❮</a>
                    <a href="#slide2" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" class="carousel-item relative w-full">
                <img src="../images/mobileLegends.png" class="w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" class="btn btn-circle">❮</a>
                    <a href="#slide3" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" class="carousel-item relative w-full">
                <img src="../images/sanrio.jpg" class="w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" class="btn btn-circle">❮</a>
                    <a href="#slide4" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" class="carousel-item relative w-full">
                <img src="../images/thamuz.jpg" class="w-full" />
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" class="btn btn-circle">❮</a>
                    <a href="#slide1" class="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.carousel {
    max-width: 1800px;
    /* Sesuaikan lebar maksimum yang diinginkan */
    margin: 0 auto;
    /* Mengatur tampilan tengah */
}

.carousel-item {
    width: 100%;
    /* Mengatur lebar setiap item carousel */
}

.carousel-item img {
    width: 100%;
    /* Mengatur lebar gambar di dalam item carousel */
    height: auto;
    /* Biarkan tinggi gambar mengikuti perbandingan aspek aslinya */
}
</style>




