<script>
    import { getContext } from 'svelte';


    export let size = "100px"
    export let value = [1, 6];
    export let rollValue = value[1];

    let displayName="n/a"
    $: {
        if(value[0]===1){
            displayName="d"+value[1]
        }else{
            displayName= value[0]+"-"+value[1]
        }
    }
    let rollTrigger = getContext('rollTrigger');
    let roller = () => roll(value[0], value[1]);
    rollTrigger.subscribe((value) =>{
        rollValue = roller();
    })


    function roll(min, max) {
        const range = max - min;
        let rvalue = Math.floor(Math.random() * range);
        return min + rvalue;
    }
    
    rollValue = roller();
    function handleLeftClick(e) {
        rollValue = roller();
    }
</script>

<div class="rollingbox" on:click={handleLeftClick} style="--size:{size}">
    <div class="header">{displayName}</div>
    <div class="display">
        {rollValue}
    </div>
</div>

<style>
    .rollingbox {
        border: 2px dashed black;
        height: var(--size);
        width:  var(--size);
        margin: 0px;

    }
    .display,
    .header {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
</style>
