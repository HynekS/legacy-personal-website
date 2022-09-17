import Link from "next/link"
import Logo from "@/components/Logo"

import { ThemeToggle } from "@/components/Theme"

const Header = (): JSX.Element => {
  return (
    <header
      tw="top-0 flex justify-between pr-6 pl-4 lg:(pl-[2.25rem] sticky) pt-6 pb-4 w-full h-[4.5rem]" /* added explicit height and width to fight the layout shift*/
    >
      <div tw="flex items-center gap-4">
        <Link href="/" passHref>
          <a aria-label="Link to homepage">
            <Logo />
          </a>
        </Link>
        <Link href="/">blog</Link>
        <Link href="/projects">projects</Link>
        <Link href="/about">about</Link>
      </div>

      <div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
