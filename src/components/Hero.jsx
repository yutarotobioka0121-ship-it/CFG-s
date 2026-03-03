import React from 'react';
import { siteConfig } from '../data/events';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">
                    {siteConfig.heroTitle.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {i === 1 ? <span className="text-highlight keep-word">{line}</span> : <span className="keep-word">{line}</span>}
                            {i < siteConfig.heroTitle.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h1>
                <p className="hero-subtitle">
                    {siteConfig.heroSubtitle.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < siteConfig.heroSubtitle.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
                    <a href="#schedule" className="btn btn-primary btn-large">開催日程を見る</a>
                    <a href="#about" className="btn" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151' }}>詳細を知る</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
