import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import EventSchedule from './components/EventSchedule'
import ApplicationForm from './components/ApplicationForm'
import './index.css'

function App() {
    return (
        <>
            <header className="header">
                <div className="container header-container">
                    <div className="logo">Cashflow Game 会</div>
                    <nav className="nav">
                        <a href="#about" className="nav-link">ゲームの特徴</a>
                        <a href="#schedule" className="nav-link">開催日程</a>
                        <a href="#apply" className="btn btn-primary nav-btn">参加を申し込む</a>
                    </nav>
                </div>
            </header>

            <main style={{ paddingTop: '72px' }}>
                <Hero />
                <About />
                <EventSchedule />
                <ApplicationForm />
            </main>

            <footer className="footer">
                <div className="container">
                    <p className="copyright">&copy; {new Date().getFullYear()} キャッシュフローゲーム会 All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default App
