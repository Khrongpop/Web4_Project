<template>
    <div class="container">
        <div class="pt-5 col-6 offset-3">
            <div class="iphone-8 mt-5">
                <div class="bazzel">
                    <div class="screen" style="background: #fff">

                    </div>
                </div>
                <div class="line"></div>
                <div class="header">
                    <div class="sensors"></div>
                </div>
                <div class="volume"></div>
                <div class="power"></div>
                <div class="home"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "screen"
    }
</script>

<style scoped>
    @keyframes charging {
        from {
            width: 0px;
        }
        to {
            width: 98px;
        }
    }
    /*------------------------------------------------*/
    body {
        display: flex;
        justify-content: center;
        background: #333740;
        overflow-x: hidden;
        padding-top: 1%;
    }

    .charger {
        display: flex;
        justify-content: center;
        width: 600px;
        height: 600px;
        background: #e6e7e9;
        border-radius: 50%;
        margin-top: 100px;
        position: absolute;
        border: 8px solid #bfc0c4;
    }
    .charger::before {
        content: "";
        position: absolute;
        height: 400px;
        width: 400px;
        border-radius: 50%;
        border: 1px solid #cccacd;
        margin-top: 100px;
    }
    .charger::after {
        content: "";
        position: absolute;
        height: 590px;
        width: 590px;
        border-radius: 50%;
        border: 1px solid #a9aaae;
        margin-top: 1px;
    }
    .charger .wire {
        width: 15px;
        height: 45px;
        background: #e6e7e9;
        margin: 280px 0 0 6px;
        box-shadow: inset 0px 5px 5px #a7a6ab, inset 0px -5px 5px #a7a6ab;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        border-top: 0.5px solid #000;
        border-bottom: 0.5px solid #000;
        position: absolute;
        left: 600px;
    }
    .charger .wire::after {
        content: "";
        position: absolute;
        width: 750px;
        height: 22.5px;
        background: #e6e7e9;
        margin: 12px 0 0 15px;
        box-shadow: inset 0px 5px 5px #a7a6ab, inset 0px -5px 5px #a7a6ab;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        border-top: 0.5px solid #000;
        border-bottom: 0.5px solid #000;
    }

    .iphone-8 {
        z-index: 1;
        position: relative;
        height: 698px;
        width: 336px;
        margin-top: -50px;
    }
    .iphone-8 *, .iphone-8 *::before, .iphone-8 *::after {
        box-sizing: border-box;
        display: block;
    }
    .iphone-8 .bazzel {
        height: 698px;
        width: 336px;
        background: #fff;
        border-radius: 54px;
        box-shadow: inset 0 0 0 2px #c8cacb, inset 0 0 0 6px #e2e3e4;
        padding: 82px 18px;
    }
    .iphone-8 .screen {
        display: flex;
        justify-content: center;
        height: 534px;
        width: 300px;
        background-color: #333230;
        background-position: center center;
        background-size: cover;
        border: 2px solid #222;
        border-radius: 4px;
        position: relative;
    }
    .iphone-8 .screen .battery {
        width: 100px;
        height: 50px;
        margin-top: 80%;
        border: 1px solid white;
    }
    .iphone-8 .screen .battery::before {
        height: 48px;
        width: 70px;
        content: "";
        position: absolute;
        background: #4cda64;
        animation-duration: 9.2s;
        animation-name: charging;
        animation-iteration-count: infinite;
    }
    .iphone-8 .screen .battery::after {
        content: "";
        position: absolute;
        height: 15px;
        width: 5px;
        background: white;
        margin-left: 100px;
        margin-top: 15px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .iphone-8 .line::after, .iphone-8 .line::before {
        content: "";
        position: absolute;
        border: solid rgba(51, 51, 51, 0.15);
        border-width: 0 6px;
        height: 5px;
        left: 0;
        width: 100%;
        z-index: 9;
    }
    .iphone-8 .line::after {
        top: 55px;
    }
    .iphone-8 .line::before {
        bottom: 55px;
    }
    .iphone-8 .header {
        height: 36px;
        width: 128px;
        left: 50%;
        margin-left: -64px;
        position: absolute;
        top: 26px;
        z-index: 199;
    }
    .iphone-8 .header::after {
        content: "";
        position: absolute;
        height: 5px;
        width: 60px;
        background: #666;
        border-radius: 2.5px;
        left: 50%;
        margin-left: -30px;
        margin-top: -2.5px;
        top: 50%;
    }
    .iphone-8 .sensors::after, .iphone-8 .sensors::before {
        content: "";
        position: absolute;
        background: #666;
        border-radius: 50%;
    }
    .iphone-8 .sensors::after {
        height: 8px;
        width: 8px;
        left: 50%;
        top: 0;
        margin: -4px 0 0 -4px;
    }
    .iphone-8 .sensors::before {
        height: 10px;
        width: 10px;
        left: 0;
        top: 50%;
        margin: -5px 0 0 0;
    }
    .iphone-8 .volume {
        left: -2px;
        top: 82px;
        position: absolute;
        background: #c8cacb;
        height: 24px;
        width: 3px;
    }
    .iphone-8 .volume::after, .iphone-8 .volume::before {
        left: 0;
        content: "";
        position: absolute;
        background: #c8cacb;
        height: 45px;
        width: 3px;
    }
    .iphone-8 .volume::after {
        top: 50px;
    }
    .iphone-8 .volume::before {
        top: 106px;
    }
    .iphone-8 .power {
        right: -2px;
        top: 160px;
        position: absolute;
        background: #c8cacb;
        height: 80px;
        width: 3px;
    }
    .iphone-8 .home {
        height: 46px;
        width: 46px;
        border-radius: 50%;
        margin-left: -23px;
        left: 50%;
        bottom: 20px;
        position: absolute;
        border: 2px solid #c8cacb;
    }

</style>