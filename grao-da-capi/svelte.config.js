import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site 100% estático: ideal para o QR code do santinho e para o Render (Static Site).
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$core: 'src/lib/core',
			$content: 'src/lib/content',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
