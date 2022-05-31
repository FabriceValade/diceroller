<script>

function roll(min,max) {
    const range= max-min
    let rvalue = Math.floor(Math.random()*range)
    return min+rvalue
}
let rollValue=roll(1,8)
function handleLeftClick(e){
    rollValue=roll(1,8)
    console.log(rollValue)
}
</script>

<div class="rollingbox" on:click={handleLeftClick}>
    <div class="header">
        d8
    </div>
    <div class="display">
        {rollValue}
    </div>

</div>

<style>
    .rollingbox{
        border:2px dashed black;
        height: 75px;
        width: 75px;
    }
    .display, .header{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>