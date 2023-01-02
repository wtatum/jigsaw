import { defineConfig, UserConfigExport } from 'vite';
import * as kit from '@sveltejs/kit';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';

export default defineConfig(({ command, mode, ssrBuild }) => {

	const config: UserConfigExport = {
		plugins: [sveltekit()]
	};
	
	// Set up local HTTPS so browser secure features are available for testing
	if (command === 'serve') {
		config.server = {
			https: {
				key: fs.readFileSync("../cert/asriel.coyote-little.ts.net.key"),
				cert: fs.readFileSync("../cert/asriel.coyote-little.ts.net.crt"),
			}
		};
	}
	
	return config;
});