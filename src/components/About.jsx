import React from 'react';

const About = () => {
    return (
        <section id="about" className="section-about">
            <div className="container">
                <div className="about-header text-center">
                    <h2 className="section-title">キャッシュフローゲームとは？</h2>
                    <p className="section-subtitle">お金持ちになるための考え方を、安全なボード上で疑似体験できるゲームです。</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="/assets/rat-race.png" alt="ラットレース" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </div>
                        <h3 className="feature-title">ラットレースからの脱出</h3>
                        <p className="feature-text">
                            <span className="keep-word">給料をもらって支払いをする</span>
                            <span className="keep-word">「ラットレース」。</span>
                            <span className="keep-word">そこから抜け出して</span>
                            <span className="keep-word">「ファーストトラック」に</span>
                            <span className="keep-word">乗る方法を学びます。</span>
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="/assets/financial-statement.png" alt="財務諸表" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </div>
                        <h3 className="feature-title">財務諸表の書き方</h3>
                        <p className="feature-text">
                            <span className="keep-word">ゲームを通じて、</span>
                            <span className="keep-word">自分自身の</span>
                            <span className="keep-word">「損益計算書」と</span>
                            <span className="keep-word">「貸借対照表」のつけ方を</span>
                            <span className="keep-word">実践的に身につけます。</span>
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="/assets/investment.png" alt="投資" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </div>
                        <h3 className="feature-title">投資のチャンスとリスク</h3>
                        <p className="feature-text">
                            <span className="keep-word">不動産、株、ビジネスなど、</span>
                            <span className="keep-word">様々な投資機会に直面し、</span>
                            <span className="keep-word">安全な環境で</span>
                            <span className="keep-word">リスクとリターンを</span>
                            <span className="keep-word">体験できます。</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
