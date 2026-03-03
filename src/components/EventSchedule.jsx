import React, { useState, useEffect } from 'react';
import { getEventSchedule } from '../data/events';

const EventSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const data = await getEventSchedule();
                setSchedule(data);
            } catch (error) {
                console.error("Error fetching schedule:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <section id="schedule" className="section-schedule">
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="text-center" style={{ marginBottom: '48px' }}>
                    <h2 className="section-title">開催日程・場所</h2>
                    <p className="section-subtitle">ご都合の良い日程を選んでお申し込みください。<br />※各回定員に達し次第、締め切らせていただきます。</p>
                </div>

                <div className="schedule-list">
                    {isLoading ? (
                        <div className="text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
                            日程を読み込み中...
                        </div>
                    ) : schedule.map((event) => (
                        <div key={event.id} className="schedule-card">
                            <div className="schedule-card-header">
                                <div className="schedule-date">{event.date}</div>
                                {event.status === 'open' ? (
                                    <span className="badge badge-open">募集中</span>
                                ) : event.status === 'full' ? (
                                    <span className="badge badge-full">満席</span>
                                ) : (
                                    <span className="badge badge-closed">受付終了</span>
                                )}
                            </div>
                            <div className="schedule-details">
                                <div className="detail-item">
                                    <span className="detail-icon">🕒</span>
                                    <span className="detail-text">{event.time}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">📍</span>
                                    <span className="detail-text">{event.location}</span>
                                </div>

                                <div className="detail-meta">
                                    <div className="meta-item">参加費: <strong>{event.fee}</strong></div>
                                    <div className="meta-item">定員: <strong>{event.capacity}名</strong></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                                <a
                                    href={`#apply?date=${event.id}`}
                                    className={`btn ${event.status === 'open' ? 'btn-primary' : 'btn-disabled'}`}
                                    style={{ width: '100%' }}
                                    onClick={(e) => {
                                        if (event.status !== 'open') e.preventDefault();
                                        // TODO: 実際のフォームへのスクロールと選択処理を後で追加
                                    }}
                                >
                                    {event.status === 'open' ? 'この日程に申し込む' : '受付終了'}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {!isLoading && schedule.length === 0 && (
                    <div className="empty-state">
                        <p>現在、予定されている開催日程はありません。<br />次回開催のお知らせをお待ちください。</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventSchedule;
