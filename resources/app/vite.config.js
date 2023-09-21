import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from'vite-plugin-mkcert'
import { fileURLToPath, URL } from 'node:url'
import dns from 'node:dns'

// @see: https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild }) => {
    // load .env
    const env = loadEnv(mode, process.cwd(), '')
    const domain = new URL(env.VITE_APP_URL || 'app.reactlearn.test')

    return {
        plugins: [
            mkcert({
                source: 'coding',
            }),
            react(),
        ],
        resolve: {
            alias: [
                { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            ],
        },
        server: {
            host: domain.hostname,
            https: true,
            strictPort: true
        }
    }
})
