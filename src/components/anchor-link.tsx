import React, { ReactNode } from "react"
import Link from "./Icon/Link"
import YouTube from "./Icon/YouTube"
import Twitter from "./Icon/Twitter"
import styled from "styled-components"

const LinkStyle = styled.a`
  transition: background 300ms, color 300ms;
  padding: 0 6px;
  height: max-content;
  background: var(--midMainColor1);
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  position: relative;
  top: 3px;
  text-decoration: none;
  --default-color: white;
  color: var(--default-color);

  &:hover {
    background: linear-gradient(#f0de14, #65fcb0);
    color: black;
    text-decoration: none;
  }
`

type Icon = "youtube" | "link" | "twitter"

type Props = {
  link: string
  children: React.ReactNode
  className?: string
  icon?: Icon
  iconSize?: number
  newTab?: boolean
}



export function NewTabLink({
  link,
  children,
  className,
  icon = "link",
}: Props) {
  return (
    <a
      className={className}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

// export function AnchorLink({
//   link,
//   children,
//   className,
//   icon = "link",
//   newTab = false,
// }: Props) {
//   const newTabAttr = newTab
//     ? { target: "_blank", rel: "noopener noreferrer" }
//     : {}

//   const attr = { className, href: link, ...newTabAttr }

//   return (
//     <LinkStyle {...attr}>
//       {iconMap[icon]}
//       {children}
//     </LinkStyle>
//   )
// }


export default function AnchorLink({
  link,
  children,
  className,
  newTab = false,
  iconSize = 20
}: Props) {

    const iconMap: { [x in Icon]: ReactNode } = {
        link: <Link size={iconSize} />,
        youtube: <YouTube size={iconSize} />,
        twitter: <Twitter size={iconSize} />,
      }


function getLinkIcon(link: string) {
    if (
      link.startsWith("https://youtube") ||
      link.startsWith("https://www.youtube")
    )
      return iconMap["youtube"]
  
    if (
      link.startsWith("https://twitter") ||
      link.startsWith("https://www.twitter")
    )
      return iconMap["twitter"]
  
    return null
  }

  const newTabAttr = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  const linkIcon = getLinkIcon(link)

  const attr = { className, href: link, ...newTabAttr }

  return (
    <LinkStyle {...attr}>
      {linkIcon}
      {children}
    </LinkStyle>
  )
}