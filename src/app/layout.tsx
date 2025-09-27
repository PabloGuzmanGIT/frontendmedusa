import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <meta name="google-site-verification" content="DB4MooPkld5oDkph2xiD__rj3qIjYZAG0tQjB_Jymbk" />
      <head>
        
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MSGFX8V5');`
        }} />
        
      </head>
      <body>
        
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MSGFX8V5"
          height="0" width="0" className="display:none;visibility:hidden"></iframe></noscript>
        

        <main className="relative">{props.children}</main>
      </body>        

    </html>
  )
}
