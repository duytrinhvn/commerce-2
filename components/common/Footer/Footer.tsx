import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Send, Vercel } from '@components/icons'
import { Logo, Container, Button } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/'
  }
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span>BUMPAX</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-6">
            <div className="grid md:grid-rows-4 md:grid-cols-2 md:grid-flow-col">
              {/* {[...links, ...sitePages].map(page => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))} */}
              <span key="asdsa" className="py-3 md:py-0 md:pb-4">
                <Link href="#">
                  <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                    Home
                  </a>
                </Link>
              </span>
              <span key="asdsa" className="py-3 md:py-0 md:pb-4">
                <Link href="#">
                  <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                    About
                  </a>
                </Link>
              </span>
              <span key="asdsa" className="py-3 md:py-0 md:pb-4">
                <Link href="#">
                  <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                    Return
                  </a>
                </Link>
              </span>
              <span key="asdsa" className="py-3 md:py-0 md:pb-4">
                <Link href="#">
                  <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                    Blog
                  </a>
                </Link>
              </span>
              <span key="asdsa" className="py-3 md:py-0 md:pb-4">
                <Link href="#">
                  <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                    News
                  </a>
                </Link>
              </span>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 flex items-start lg:justify-end text-primary">
            <div
              className="flex space-y-4 flex-col h-10"
              style={{ width: '100%', height: '100%' }}
            >
              <h3 className="font-bold">GET INVOLVED</h3>
              <p>
                Stay connected with us for product updates, sales, and
                announcements.
              </p>
              <div className="flex flex-row">
                <input
                  type="text"
                  className={s.input}
                  placeholder="Enter your email"
                />
                <button onClick={() => alert("Email subscribed!")} className={s.sendButton} style={{flex: 1}}><Send className={s.sendIcon} /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2021 BUMPAX, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary font-bold ml-1"
            >
              Jeffrey Trinh
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach(page => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder)
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer