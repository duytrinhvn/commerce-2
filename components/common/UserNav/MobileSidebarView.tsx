import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'

const MobileSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()

  const handleClose = () => closeSidebar()

  return (
    <SidebarLayout handleClose={handleClose}>
      <ul style={{width: "400px"}}>
        <li>
          <Button Component="a" variant="ghost" style={{ width: '100%' }} href="/">
            Home
          </Button>
        </li>
        <li>
          <Button Component="a" variant="ghost" style={{ width: '100%' }} href="/search/deskmats">
            Deskmats
          </Button>
        </li>
        <li>
          <Button Component="a" variant="ghost" style={{ width: '100%' }} href="/search/wrist-rest">
            Wrist Rests
          </Button>
        </li>
      </ul>
    </SidebarLayout>
  )
}

export default MobileSidebarView
