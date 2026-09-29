import Header from './components/layout/Header'
import TelegramButton from './components/layout/TelegramButton'
import ModalRoot from './components/modals/ModalRoot'
import Toast from './components/common/Toast'
import { LikesProvider } from './context/LikesContext'
import { useHashRoute } from './hooks/useHashRoute'
import Home from './pages/Home'
import Videos from './pages/Videos'
import VideoDetail from './pages/VideoDetail'

/** Maps the current hash path to a page. Add new pages here. */
function Page({ path }) {
  const detail = path.match(/^\/video\/(\d+)$/)
  if (detail) {
    const id = Number(detail[1])
    // key = remount on every video change, so data reloads and scroll state resets
    return <VideoDetail key={id} id={id} />
  }
  if (path === '/videos') return <Videos />
  return <Home />
}

export default function App() {
  const path = useHashRoute()

  return (
    <LikesProvider>
      <div className="min-h-screen bg-surface text-white font-sans">
        <Header />
        <Page path={path} />
        <TelegramButton />
        <ModalRoot />
        <Toast />
      </div>
    </LikesProvider>
  )
}
