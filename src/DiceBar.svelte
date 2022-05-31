<script>
    let possibleDiceArray = [];
    possibleDiceArray.push({
        value: [1, 4],
        display: "1d4",
    });
    possibleDiceArray.push({
        value: [1, 6],
        display: "1d6",
    });
    possibleDiceArray.push({
        value: [1, 8],
        display: "1d8",
    });
    possibleDiceArray.push({
        value: [1, 10],
        display: "1d10",
    });
    possibleDiceArray.push({
        value: [1, 12],
        display: "1d12",
    });
    possibleDiceArray.push({
        value: [1, 20],
        display: "1d20",
    });

let handleDiceClick = (value)=>{
    let customHandler = (e) => {

    }
    return customHandler
}

</script>

<div class="bar">
    <div class="wrp">
        {#each possibleDiceArray as possibleDice}
            <div class="possibleDice" on:click={handleDiceClick(possibleDice.value)}>
                {possibleDice.display}
            </div>
        {/each}
    </div>
</div>

<style>
    .bar {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: aquamarine;
    }
    .wrp {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        background-color: beige;
        column-gap: 5px;
    }
    .possibleDice {
        font-family: "Lucida Sans";
        font-weight: bold;
        flex-grow: 0;
        border: 1px solid black;
        width: 40px;
        height: 40px;
    }
</style>
