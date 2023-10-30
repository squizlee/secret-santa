<script lang="ts">
	// your script goes here
	export let name: string;
	export let target: string;
	export let when: string = '';
	export let where: string = '';
</script>

<!-- markup (zero or more items) goes here -->

<div style="font-family: Georgia, 'Times New Roman', Times, serif; max-width: 260px;">
	<div style="border: 2px solid black; padding: 10px; background-color: white; color: black;">
		<img
			src="https://thenounproject.com/api/private/icons/139277/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
			alt=""
			style="max-width: 250px; display: block; margin: 0 auto;"
		/>
		<h2>
			Hi {name}! You will be gifting:
			<strong style="text-decoration: underline;">{target}</strong>
		</h2>
		{#if when}
			<p>When: 🕰️ {when}</p>
		{/if}
		{#if where}
			<p>Where: 🧭 {where}</p>
		{/if}
		<h3>Happy Gifting 🤫🎅</h3>
		<a href="https://ezsecretsanta.day">
			<p style="font-size: 6px; font-style: italic; color: rgba(128, 128, 128, 0.589)">
				Made with ezsecretsanta.day
			</p>
		</a>
	</div>
</div>

<style>
	/* your styles go here */
</style>
