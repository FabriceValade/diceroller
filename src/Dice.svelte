<script>
    import { getContext } from "svelte";
    import { onMount } from "svelte";
    import { setupScene, clearScene, rollDice} from "./scene";

    export let size = "100px";
    export let value;
    export let rollValue = 1;

    let el;
    let displayName = "n/a";
    let diceName = "d6"
    if (value[0] === 1) {
        displayName = "d" + value[1];
        diceName=displayName
    } else {
        displayName = value[0] + "-" + value[1];
    }
    onMount(() => {
        setupScene(el,diceName);
        return () => {
            clearScene(el);
            console.log("dismount called");
        };
    });
    

    let roller = () => roll(value[0], value[1]);

    let rollTrigger = getContext("rollTrigger");
    rollTrigger.subscribe((value) => {
        rollDice(el,diceName);
        rollValue = roller();
    });
    rollValue = roller();

    function roll(min, max) {
        const range = max - min + 1;
        let rvalue = Math.floor(Math.random() * range);
        return min + rvalue;
    }
    function handleLeftClick(e) {
        rollValue = roller();
    }
</script>

<div
    class="rollingbox"
    on:click={handleLeftClick}
    style="--size:{size}"
    bind:this={el}
>
    <div class="header">{displayName}</div>
    <div class="display">
        {rollValue}
    </div>
</div>

<style>
    .rollingbox {
        border: 2px dashed black;
        height: var(--size);
        width: var(--size);
        margin: 0px;
    }
    .display,
    .header {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        user-select: none;
    }
</style>
