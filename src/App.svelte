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
	let diceArray = [{ value: [1, 6], currentValue: 1 }];
	const maxSize = 100;
	let size = "100px";
	$: {
		if (diceArray.length) {
			size = calcSize(w,h,diceArray.length)-8+ "px";
		} else {
			size = maxSize + "px";
		}
	}

	let rollTrigger = writable(0);
	setContext("rollTrigger", rollTrigger);

	function handleRerollClick(e) {
		rollTrigger.update((n) => !n);
	}
	function addDice(e) {
		console.log(e.detail.value);
		diceArray = produce(diceArray, (draft) => {
			draft.push({ value: e.detail.value });
		});
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
		return cell_size
	}
</script>

<div class="dicetray">
	<div class="dicebox" bind:clientWidth={w} bind:clientHeight={h}>
		{#each diceArray as dice}
			<Dice value={dice.value} {size} />
		{/each}
	</div>
	<div class="lowerbar">
		<div class="barwrapper">
			<DiceBar on:diceClick={addDice} />
		</div>
		<button on:click={handleRerollClick}> reroll </button>
	</div>
</div>
{size}

<style>
	.dicetray,
	.lowerbar {
		border: solid 2px black;
		border-radius: 5px;
		
	}
	.dicebox {
		width: 100%;
		height: 300px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-content: center;
		border: solid 2px black;
		border-radius: 5px;
	}
	.dicetray {
		display: inline-block;
		flex-direction: column;
		width: auto;
		height: auto;
	}

	.barwrapper {
		height: 75px;
	}
	.lowerbar {
		display: flex;
		margin:5px;
		width: 100%
	}
</style>
