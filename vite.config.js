import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"NCS-cbt app",
    short_name:"ncs-cbt-app",
    description:"NCS promotion exam prep app",
    icons:[{
      src: '/android-chrome-192x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src:'/favicon-16x16.png',
      sizes:'16x16',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/maskable_icon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'"#016f4a"',
  background_color:'#fffff',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}


// https://vitejs.dev/config/  VitePWA({ registerType: 'autoUpdate' })
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
