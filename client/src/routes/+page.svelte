<script lang="ts">
	import PreviewEmail from '$lib/PreviewEmail.svelte';

	interface Name {
		name: string;
		email: string;
	}

	let name_input: string;
	let names: Name[];
	let when: any;
	let where: string;

	let names_announcement = '';

	const send = async () => {
		console.log('sending request to backend');
		console.log(names, when, where);
		const url = 'https://yamhzv7zunrrsx37thxgh6uzoq0ejntt.lambda-url.ap-southeast-2.on.aws/';
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ names, when, where })
		});
		console.log(await response.json());
	};

	// TODO: fix this parsing to be better, better to avoid regex and go simpler
	// loop through until comma, split by spaces
	const parse_names = (names_input: string) => {
		const names_array: Name[] = [];
		names_input.split(/,|\n/).forEach((data_point: string) => {
			const re = /^(?<name>.+?)\s+(?<email>\S+?@\S+)$/;
			const search_result = re.exec(data_point);
			if (!search_result) {
				console.error('error: failed to retrieve details from data point', data_point);
				console.error(Array.from(data_point));
				return;
			}
			console.log(search_result);
			names_array.push({ name: search_result?.groups!.name, email: search_result?.groups!.email });
		});
		names = names_array;
		if (names.length < 3) {
			names_announcement = `❗you need at least 3 friends to have a secret santa`;
		} else {
			names_announcement = `Found ${names.length} names!`;
		}
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
	<section class="interactive-section">
		<h2>ez secret santa</h2>
		<h3>automatically send out emails for your secret santa!</h3>
		<form on:submit|preventDefault={() => send()}>
			<h3>1. <span class="underline">Provide Names</span></h3>
			<textarea
				bind:value={name_input}
				on:change={() => parse_names(name_input)}
				name="names"
				id="names"
				cols="15"
				rows="3"
				placeholder="John Smith j.s@gmail.com, Mary Williams Mary4Rocks@gmail.com, Sebastian Deez sbd@hotmail.com"
			/>
			<p style:color={names?.length > 3 ? 'green' : 'red'} class="names-announcement">
				{names_announcement}
			</p>
			<h3>2. <span class="">Add Optional Details</span></h3>
			<label for="when">When</label>
			<input bind:value={when} type="date" name="when" id="when" />
			<label for="where">Where</label>
			<input
				bind:value={where}
				type="text"
				name="where"
				id="where"
				placeholder="location location location"
			/>

			<h3>3. Preview & Dispatch</h3>
			{#if names}
				<PreviewEmail name={names[0].name} target={names[2].name} {when} {where} />
			{/if}
			<label for="create-image">Create Image of gift chain?</label>
			<input type="checkbox" name="create-image" id="create-image" />
			<input type="submit" value="send!" />
		</form>
	</section>
</div>

<p>
	John Smith john.smith@example.com, Mary Johnson mary.johnson@example.com, James Brown
	james.brown@example.com, Emily Davis emily.davis@example.com, Michael Wilson
	michael.wilson@example.com
</p>

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
		aspect-ratio: 1 / 1;
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
	}

	.interactive-section {
		grid-column-start: 2;
	}

	.underline {
		text-decoration: underline;
	}

	form > * {
		font-family: 'Vollkorn', 'Times New Roman', serif;
		font-size: 40px;
	}

	textarea {
		font-size: 20px;
		width: 80%;
	}

	p,
	input {
		font-size: 20px;
	}
</style>
