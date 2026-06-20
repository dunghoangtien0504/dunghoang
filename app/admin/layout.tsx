'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import NotificationPanel from '@/components/layout/NotificationPanel'
import SearchModal, { useSearch } from '@/components/ui/SearchModal'
import { Search, PanelLeftClose, PanelLeft, Command } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const { isOpen: searchOpen, open: openSearch, close: closeSearch } = useSearch()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} />

      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
      >
        {/* ── Top Header ── */}
        <header
          className="flex-shrink-0 flex items-center gap-3 px-4 border-b border-sidebar-border bg-brand-dark"
          style={{ height: 'var(--header-height)' }}
        >
          {/* Sidebar toggle */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="text-text-on-dark-2 hover:text-text-on-dark transition-colors p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>

          {/* Search bar — opens modal */}
          <button
            onClick={openSearch}
            className="flex-1 max-w-sm flex items-center gap-2 bg-white/8 border border-white/10 rounded-lg px-3 py-1.5 text-left hover:bg-white/12 hover:border-white/20 transition-all cursor-text"
            aria-label="Mo tim kiem"
          >
            <Search size={13} className="text-text-on-dark-2/60 flex-shrink-0" />
            <span className="text-text-on-dark-2/50 text-xs flex-1">Tim kiem...</span>
            <kbd className="hidden sm:flex items-center gap-0.5 bg-white/10 rounded px-1.5 py-0.5 text-text-on-dark-2/50 text-[10px]">
              <Command size={9} />K
            </kbd>
          </button>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-1">
            {/* Notification bell */}
            <NotificationPanel />

            {/* Avatar */}
            <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors ml-1">
              <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">DH</span>
              </div>
              <span className="text-text-on-dark text-xs font-medium hidden sm:block">Dung Hoang</span>
            </button>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  )
}
