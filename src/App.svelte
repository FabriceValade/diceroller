<script>
	import Octa from "./Octa.svelte";
	import Isoca from "./Isoca.svelte";
	import Dice from  "./Dice.svelte"
	import DiceBar from "./DiceBar.svelte"
</script>

<div class="dicebox">
	<Dice/>
	<Octa />
	<Isoca />
	<div class="barwrapper">
		<DiceBar />
	</div>
</div>

<style>
	.dicebox{
		width: 300px;
		height: 300px;
	}
	.barwrapper{
		height: 75px;
	}
</style>
