import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/2025-p2a-web-volny-projekt-jan-wiener/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects.html'),
                contact: resolve(__dirname, 'contact.html'),
            }
        }
    }
})