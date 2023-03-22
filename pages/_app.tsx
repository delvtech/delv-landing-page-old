import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import localFont from 'next/font/local'

const f37incise = localFont({
  src: [
    {
      path: '../public/fonts/F37Incise-Bold.woff2',
      weight: "700",
      style: 'normal',
    },
    {
      path: '../public/fonts/F37Incise-Medium.woff2',
      weight: "500",
      style: 'normal',
    },
  ]
})

const f37blanka = localFont({
  src: [
    {
      path: '../public/fonts/F37Blanka-Regular.woff2',
      weight: "400",
      style: 'normal',
    },
  ]
})


export default function App({ Component, pageProps }: AppProps) {
  return <>
      <style jsx global>{`
        html, body {
          font-family: ${f37incise.style.fontFamily}, "Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-weight: 500;
        }
        .font-sec {
          font-family: ${f37blanka.style.fontFamily}, "Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}</style>
      <Component {...pageProps} />
    </>
}
