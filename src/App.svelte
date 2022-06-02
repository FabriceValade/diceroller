<script>
	import Octa from "./Octa.svelte";
	import Isoca from "./Isoca.svelte";
	import Dice from "./Dice.svelte";
	import DiceBar from "./DiceBar.svelte";
	import { writable } from "svelte/store";
	import produce from "immer";

	import { setContext } from "svelte";
	let w = 1;
	let h = 1;
	let diceArray = [];

	$: total = diceArray.reduce(
		(previous, current) => previous + current.currentValue,
		0
	);
	const maxSize = 100;
	let size = "100px";
	$: {
		if (diceArray.length) {
			size = calcSize(w, h, diceArray.length) - 8 + "px";
		} else {
			size = maxSize + "px";
		}
	}

	let rollTrigger = writable(0);
	setContext("rollTrigger", rollTrigger);

	function handleRerollClick(e) {
		rollTrigger.update((n) => !n);
	}
	function handleReset(e) {
		diceArray=[];
	}
	function addDice(e) {
		diceArray = diceArray.concat([
			{ value: e.detail.value, currentValue: 1 },
		]);
	}

	function calcSize(x, y, n) {
		// Compute number of rows and columns, and cell size
		var ratio = x / y;
		var ncols_float = Math.sqrt(n * ratio);
		var nrows_float = n / ncols_float;

		// Find best option filling the whole height
		var nrows1 = Math.ceil(nrows_float);
		var ncols1 = Math.ceil(n / nrows1);
		while (nrows1 * ratio < ncols1) {
			nrows1++;
			ncols1 = Math.ceil(n / nrows1);
		}
		var cell_size1 = y / nrows1;

		// Find best option filling the whole width
		var ncols2 = Math.ceil(ncols_float);
		var nrows2 = Math.ceil(n / ncols2);
		while (ncols2 < nrows2 * ratio) {
			ncols2++;
			nrows2 = Math.ceil(n / ncols2);
		}
		var cell_size2 = x / ncols2;

		// Find the best values
		var nrows, ncols, cell_size;
		if (cell_size1 < cell_size2) {
			nrows = nrows2;
			ncols = ncols2;
			cell_size = cell_size2;
		} else {
			nrows = nrows1;
			ncols = ncols1;
			cell_size = cell_size1;
		}
		return cell_size;
	}
</script>

<div class="dicetray">
	<div class="titlebar">Roll some dices</div>
	<div class="dicebar">
		<div class="dicebox" bind:clientWidth={w} bind:clientHeight={h}>
			{#each diceArray as dice, index}
				<Dice
					value={dice.value}
					{size}
					bind:rollValue={dice.currentValue}
				/>
			{/each}
		</div>
		<div class="totalDisplay">
			Total: {total}
		</div>
	</div>
	<div class="lowerbar">
		<div class="barwrapper">
			<DiceBar on:diceClick={addDice} />
		</div>
		<button on:click={handleRerollClick}> reroll </button>
		<button on:click={handleReset}> reset </button>
	</div>
</div>
{size}

<style>
	.dicebar,
	.lowerbar,
	.titlebar {
		box-sizing: border-box;
		border: solid 1px black;
		border-radius: 5px;
		width: 100%;
	}
	.titlebar {
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		border-bottom: transparent;
		font-size: large;
		padding: 5px;
	}
	.lowerbar {
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 5px;
	}
	.dicebar {
		border-radius: 0px;
		border-bottom: transparent;
		background-color: rgb(182, 216, 245);
		height: 300px;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
	.dicebox {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		width: 90%;
		height: 95%;
		vertical-align: middle;
	}
	.totalDisplay {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.452);
		padding:10px;
		margin:5px
	}
	.dicetray {
		display: inline-block;
		flex-direction: column;
		width: 100%;
		height: auto;
	}

	.barwrapper {
		height: 75px;
	}
</style>
