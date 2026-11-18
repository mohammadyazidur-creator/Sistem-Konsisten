import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { WebSidebar } from './components/web/WebSidebar';
import { WebNavbar } from './components/web/WebNavbar';
import { WebDashboardView } from './views/WebDashboardView';
import { WebJadwalView } from './views/WebJadwalView';
import { WebSesiView } from './views/WebSesiView';
import { WebNotifikasiView } from './views/WebNotifikasiView';
import { WebDetailModal } from './views/WebDetailModal';

// Mobile Screens
import { DashboardScreen } from './screens/DashboardScreen';
import { JadwalScreen } from './screens/JadwalScreen';
import { DetailJadwalScreen } from './screens/DetailJadwalScreen';
import { SesiScreen } from './screens/SesiScreen';
import { NotifikasiScreen } from './screens/NotifikasiScreen';
import { TambahJadwalModal } from './screens/TambahJadwalModal';
import { AuthModal } from './components/AuthModal';
import { KomponenScreen } from './screens/KomponenScreen';
import { PhoneFrame } from './components/PhoneFrame';

export function App() {
  const {
    currentScreen,
    setCurrentScreen,
    selectedScheduleId,
    setSelectedScheduleId,
    showAddModal,
    setShowAddModal,
    showAuthModal,
    setShowAuthModal,
    resetDemoData
  } = useApp();

  // Layout View: 'website' (Desktop Web Application) or 'mobile' (Phone Frame / Gallery)
  const [layoutMode, setLayoutMode] = useState('website');
  
  // Web active tab: 'dashboard' | 'jadwal' | 'sesi' | 'notifikasi' | 'uikit'
  const [webActiveTab, setWebActiveTab] = useState('dashboard');
  
  // Web Detail Modal state
  const [webDetailScheduleId, setWebDetailScheduleId] = useState(null);

  // Mobile Gallery View Mode
  const [mobileMode, setMobileMode] = useState('interactive'); // 'interactive' | 'gallery'
  const [showFrame, setShowFrame] = useState(true);
  const [galleryScale, setGalleryScale] = useState(0.85);

  const screensInfo = [
    {
      id: 'dashboard',
      name: '01 · Dashboard',
      nodeId: '2:2',
      component: <DashboardScreen />,
      screenshot: '/reference_screens/01_dashboard.png'
    },
    {
      id: 'jadwal',
      name: '02 · Jadwal',
      nodeId: '2:6',
      component: <JadwalScreen />,
      screenshot: '/reference_screens/02_jadwal.png'
    },
    {
      id: 'tambah',
      name: '03 · Tambah jadwal',
      nodeId: '2:10',
      component: (
        <div className="relative w-full h-full">
          <JadwalScreen />
          <TambahJadwalModal isOpen={true} onClose={() => {}} />
        </div>
      ),
      screenshot: '/reference_screens/03_tambah_jadwal.png'
    },
    {
      id: 'detail',
      name: '04 · Detail jadwal',
      nodeId: '2:14',
      component: <DetailJadwalScreen />,
      screenshot: '/reference_screens/04_detail_jadwal.png'
    },
    {
      id: 'sesi',
      name: '05 · Sesi',
      nodeId: '2:18',
      component: <SesiScreen />,
      screenshot: '/reference_screens/05_sesi.png'
    },
    {
      id: 'notifikasi',
      name: '06 · Notifikasi',
      nodeId: '2:22',
      component: <NotifikasiScreen />,
      screenshot: '/reference_screens/06_notifikasi.png'
    }
  ];

  const currentMobileScreenData = screensInfo.find(s => s.id === currentScreen) || screensInfo[0];

  const handleOpenDetailModal = (schId) => {
    setWebDetailScheduleId(schId);
  };

  const handleCloseDetailModal = () => {
    setWebDetailScheduleId(null);
  };

  const handleStartSessionFromWeb = (schId) => {
    setSelectedScheduleId(schId);
    setWebActiveTab('sesi');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172B4D] flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-700">
      {/* ============================================================== */}
      {/* 1. TAMPILAN WEBSITE (DESKTOP & RESPONSIVE WEB APPLICATION)     */}
      {/* ============================================================== */}
      {layoutMode === 'website' && (
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <WebSidebar
            activeTab={webActiveTab}
            onTabChange={setWebActiveTab}
            onOpenAddModal={() => setShowAddModal(true)}
          />

          {/* Right Main Body */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Navbar */}
            <WebNavbar
              activeTab={webActiveTab}
              onTabChange={setWebActiveTab}
              viewMode={layoutMode}
              onViewModeToggle={setLayoutMode}
            />

            {/* Dynamic Web Page View */}
            <main className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
              <div className="max-w-7xl mx-auto">
                {webActiveTab === 'dashboard' && (
                  <WebDashboardView
                    onTabChange={setWebActiveTab}
                    onOpenDetail={handleOpenDetailModal}
                  />
                )}

                {webActiveTab === 'jadwal' && (
                  <WebJadwalView
                    onOpenAddModal={() => setShowAddModal(true)}
                    onOpenDetail={handleOpenDetailModal}
                    onTabChange={setWebActiveTab}
                  />
                )}

                {webActiveTab === 'sesi' && (
                  <WebSesiView
                    onTabChange={setWebActiveTab}
                  />
                )}

                {webActiveTab === 'notifikasi' && (
                  <WebNotifikasiView
                    onTabChange={setWebActiveTab}
                  />
                )}

                {webActiveTab === 'uikit' && (
                  <div className="pb-12">
                    <KomponenScreen />
                  </div>
                )}
              </div>
            </main>

            {/* Web Detail Drawer / Modal */}
            <WebDetailModal
              scheduleId={webDetailScheduleId}
              isOpen={Boolean(webDetailScheduleId)}
              onClose={handleCloseDetailModal}
              onStartSession={handleStartSessionFromWeb}
            />

            {/* Web Add Schedule Modal */}
            <TambahJadwalModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TAMPILAN MOBILE (PHONE FRAME & FIGMA SCREENSHOT COMPARISON)  */}
      {/* ============================================================== */}
      {layoutMode === 'mobile' && (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
          {/* Mobile Shell Header Bar */}
          <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                K
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base tracking-tight">
                    Sistem Konsisten · Mode Mobile
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Figma Terhubung
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Node 0:1 (Owner: Yazid Rizky)
                </span>
              </div>
            </div>

            {/* Toggle Modes */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setMobileMode('interactive')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mobileMode === 'interactive'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📱 Phone Interaktif
              </button>
              <button
                onClick={() => setMobileMode('gallery')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mobileMode === 'gallery'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🖼️ Galeri 6 Layar Figma
              </button>
            </div>

            {/* Switch Back to Website Mode Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLayoutMode('website')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <span>💻</span>
                <span>Kembali ke Tampilan Website</span>
              </button>
              <button
                onClick={() => setShowFrame(!showFrame)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
              >
                {showFrame ? 'Sembunyikan Bingkai' : 'Tampilkan Bingkai'}
              </button>
            </div>
          </header>

          {/* Main Mobile Screen View Area */}
          <main className="flex-1 p-6 md:p-8 flex justify-center items-start overflow-auto">
            {mobileMode === 'interactive' ? (
              <div className="flex flex-col items-center gap-6">
                {/* Screen quick tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/60 text-xs">
                  <span className="text-slate-400 text-xs font-medium px-2">Layar:</span>
                  {screensInfo.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => setCurrentScreen(screen.id)}
                      className={`px-3 py-1 rounded-xl font-medium transition-all ${
                        currentScreen === screen.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {screen.name}
                    </button>
                  ))}
                </div>

                {/* Phone Frame */}
                <PhoneFrame
                  screenTitle={`${currentMobileScreenData.name} (Node ${currentMobileScreenData.nodeId})`}
                  screenshotUrl={currentMobileScreenData.screenshot}
                  showFrame={showFrame}
                  scale={1}
                >
                  <div className="relative w-full h-full">
                    {currentScreen === 'dashboard' && <DashboardScreen />}
                    {currentScreen === 'jadwal' && <JadwalScreen />}
                    {currentScreen === 'detail' && <DetailJadwalScreen />}
                    {currentScreen === 'sesi' && <SesiScreen />}
                    {currentScreen === 'notifikasi' && <NotifikasiScreen />}
                    {currentScreen === 'tambah' && (
                      <div className="relative w-full h-full">
                        <JadwalScreen />
                        <TambahJadwalModal isOpen={true} onClose={() => setCurrentScreen('jadwal')} />
                      </div>
                    )}
                    {currentScreen !== 'tambah' && (
                      <TambahJadwalModal
                        isOpen={showAddModal}
                        onClose={() => setShowAddModal(false)}
                      />
                    )}
                  </div>
                </PhoneFrame>
              </div>
            ) : (
              /* Gallery Mode */
              <div className="w-full flex flex-col items-center gap-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Galeri 6 Layar Desain Figma
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Seluruh frame Figma node 2:2 hingga 2:22 dalam resolusi 390 × 844 px.
                  </p>
                </div>
                <div className="flex flex-wrap items-start justify-center gap-8 w-full">
                  {screensInfo.map((screen) => (
                    <PhoneFrame
                      key={screen.id}
                      screenTitle={`${screen.name} · Node ${screen.nodeId}`}
                      screenshotUrl={screen.screenshot}
                      showFrame={showFrame}
                      scale={galleryScale}
                    >
                      {screen.component}
                    </PhoneFrame>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default App;
