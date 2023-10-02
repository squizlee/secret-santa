<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Name {
		name: string;
		email: string;
	}

	let name_input: string;
	let names: Name[];
	let send_emails: boolean = true;
	let create_visual: boolean = true;
	let display_second_form: boolean = false;

	const send = (send_emails: boolean, create_visual: boolean) => {
		console.log('sending request to backend');
	};

	const name_parser = (names_input: string) => {
		const names_array: Name[] = [];
		names_input.split(/,|\n/).forEach((data_point: string) => {
			const re = /^(?<name>.+?)\s+(?<email>\S+?@\S+)$/;
			const search_result = re.exec(data_point);
			if (!search_result) {
				console.error('error: failed to retrieve details from data point', data_point);
				return;
			}
			console.log(search_result);
			names_array.push({ name: search_result?.groups!.name, email: search_result?.groups!.email });
		});
		names = names_array;
		display_second_form = true; // display second form
	};
</script>

<svelte:head>
	<title>Secret Santa Creator</title>
	<meta name="secret santa" content="Secret Santa Creator" />
</svelte:head>

<header>
	<h1>Secret <br /> Santa 🤫🎅</h1>
</header>

<section class="container">
	<section id="form">
		<form action="#" on:submit|preventDefault={() => name_parser(name_input)}>
			<label for="names">Names</label>
			<textarea bind:value={name_input} id="names" name="names" rows="6" cols="80" />
			<input type="submit" value="package" />
		</form>
	</section>
</section>

{#if display_second_form}
	<section in:fade class="finalise">
		<form on:submit|preventDefault={() => send(send_emails, create_visual)}>
			<p>Found {names.length} names</p>
			<div>
				<label for="email">Send emails</label>
				<input bind:value={send_emails} type="checkbox" name="email" id="email" checked />
			</div>
			<div>
				<label for="image">Create Gift Chain Image</label>
				<input bind:value={create_visual} type="checkbox" name="image" id="image" checked />
			</div>
			<input type="submit" value="send!" />
		</form>
	</section>
{/if}

<p>
	John Smith john.smith@example.com, Mary Johnson mary.johnson@example.com, James Brown
	james.brown@example.com, Emily Davis emily.davis@example.com, Michael Wilson
	michael.wilson@example.com
</p>

<!-- TODO ADD GitHub Repo link in footer tag-->
<!-- <footer>
	<a href="#">TODO: GH LINK</a>
</footer> -->

<style>
	h1 {
		margin: 0;
		font-size: 6rem;
	}

	header {
		background-image: var(--background-image-url);
		background-repeat: no-repeat;
		color: red;
	}

	.finalise {
		background-color: var(--kelly-green);
		margin: 0;
	}

	form {
		min-width: 60vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		gap: 10px;
		margin: 10px;
	}

	textarea {
		border: 2px solid black;
	}

	form > label[for='names'] {
		font-size: 2.5rem;
		align-self: flex-start;
	}

	form > *,
	.finalise > * {
		font-family: 'Vollkorn', 'Times New Roman', Times, serif;
	}

	.container {
		display: flex;
		background-color: rgb(255, 62, 62);
		border: 2px solid black;
	}
</style>
