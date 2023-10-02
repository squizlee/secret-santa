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

<div class="grid">
	<header>
		<h1>Secret <br /> Santa 🤫 🎅</h1>
	</header>
	<p class="secret-santa-context">
		Secret Santa is a Western Christmas or Saint Nicholas tradition in which members of a group or
		community are randomly assigned a person to whom they give a gift. The identity of the gift
		giver is to remain a <b>secret and should not be revealed </b>.
	</p>
	<h2>ez secret santa</h2>
	<form>
		<h3>1. <span class="underline">Provide Names</span></h3>
		<textarea name="names" id="names" cols="15" rows="3" />
	</form>
</div>

<!-- <p>
	John Smith john.smith@example.com, Mary Johnson mary.johnson@example.com, James Brown
	james.brown@example.com, Emily Davis emily.davis@example.com, Michael Wilson
	michael.wilson@example.com
</p> -->

<style>
	header {
		background-image: var(--bg-img);
		width: min-content;
		font-size: 4rem;
		color: red;
		box-shadow: 0px 4px 4px 0px black;
		padding: 8px;
		margin-top: 20px;
		border: 5px solid black;
	}

	.secret-santa-context {
		width: 45ch;
		grid-row-start: 2;
		margin-top: 40px;
	}

	.grid {
		grid-template-columns: 1fr 3fr;
		grid-template-rows: 1fr 1fr;
		display: grid;
	}

	h2 {
		font-style: italic;
		font-size: 130px;
		font-family: 'Vollkorn', 'Times New Roman', serif;
		color: red;
		grid-column-start: 2;
	}

	.underline {
		text-decoration: underline;
	}

	form > * {
		font-family: 'Vollkorn', 'Times New Roman', serif;
		font-size: 40px;
	}
</style>
