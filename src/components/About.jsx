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
                        <p className="feature-text">給料をもらって支払いをする「ラットレース」。そこから抜け出して「ファーストトラック」に乗る方法を学びます。</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="/assets/financial-statement.png" alt="財務諸表" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </div>
                        <h3 className="feature-title">財務諸表の書き方</h3>
                        <p className="feature-text">ゲームを通じて、自分自身の「損益計算書」と「貸借対照表」のつけ方を実践的に身につけます。</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="/assets/investment.png" alt="投資" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                        </div>
                        <h3 className="feature-title">投資のチャンスとリスク</h3>
                        <p className="feature-text">不動産、株、ビジネスなど、様々な投資機会に直面し、安全な環境でリスクとリターンを体験できます。</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
