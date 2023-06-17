import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const DOMAIN = "https://deeecode.com"
const DEFAULT_IMAGE = "/banner.png"

type Props = {
  title: string
  description?: string
  children?: React.ReactNode
  imageCard?: string
}

const Seo = ({
  description,
  title,
  children,
  imageCard: _imageCard,
}: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  const titleToShow = `${title} | ${defaultTitle}`

  const imageCard = _imageCard
    ? _imageCard.startsWith("http")
      ? _imageCard
      : `${DOMAIN}${_imageCard}`
    : `${DOMAIN}${DEFAULT_IMAGE}`

  return (
    <>
      <title>{titleToShow}</title>
      <meta name="description" content={metaDescription} />

      <link rel="icon" type="image/png" href="/logo.png" />

      <meta property="og:title" content={titleToShow} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageCard} />

      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={titleToShow} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@iamdillion" />
      <meta name="twitter:image" content={imageCard} />
      <meta name="twitter:creator" content="iamdillion" />
      <meta name="referrer" content="origin-when-crossorigin" />
    </>
  )
}

export default Seo
