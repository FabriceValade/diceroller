<script>
</script>

<div class="flexContainer container">
    <div class="camera">
        <div class="space">
            <div class="box1">
                <div class="face1" />
                <div class="face2" />
                <div class="face3" />
                <div class="face4" />
            </div>
        </div>
    </div>
</div>

<style>
    .camera {
        width: 200px;
        height: 200px;
        -webkit-perspective-origin: 50% 50%;
        perspective-origin: 50% 50%;
        -webkit-perspective: 500px;
        perspective: 500px;
    }
    .space {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px dashed #000;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        animation: s 4s linear infinite;
    }
    .space div {
        position: absolute;
    }
    .box1 {
        transform-style: preserve-3d;
    }
    .box1 div {
        width: 0px;
        height: 0px;
        border-width: 0px 50px 87px;
        border-style: solid;
        opacity: 0.4;
    }
    .face1 {
        border-color: transparent transparent #f00;
        transform-origin: center bottom;
        transform: translateX(50px) translateY(50px) rotateX(35.36deg)
            translateZ(25px);
    }
    .face2 {
        border-color: transparent transparent #00f;
        transform-origin: right bottom;
        transform: translateX(50px) translateY(50px) rotateY(-90deg)
            rotateX(-35.36deg);
    }
    .face3 {
        border-color: transparent transparent #0f0;
        transform-origin: left bottom;
        transform: translateX(50px) translateY(50px) translateZ(-100px)
            rotateX(-35.36deg);
    }
    .face4 {
        border-color: transparent transparent #f90;
        transform-origin: left bottom;
        transform: translateX(50px) translateY(50px) rotateY(90deg)
            rotateX(-35.36deg);
    }

    @keyframes s {
        0% {
            -webkit-transform: rotateY(0);
        }
        100% {
            -webkit-transform: rotateY(-359.9deg);
        }
    }
</style>
