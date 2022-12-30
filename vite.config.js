import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';



/** @type {import('vite').UserConfig} */
const config = {
	server: {
		https: {
			key: fs.readFileSync("../cert/asriel.coyote-little.ts.net.key"),
			cert: fs.readFileSync("../cert/asriel.coyote-little.ts.net.crt")
		}
	},
	plugins: [sveltekit()]
};

export default config;
