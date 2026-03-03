import React, { useState, useEffect } from 'react';
import { getEventSchedule } from '../data/events';

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventId: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const [formEvents, setFormEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);

    // イベント一覧を非同期で取得
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEventSchedule();
                setFormEvents(data);

                // URLハッシュからの初期選択ロジック（データ取得後に実行）
                const hash = window.location.hash;
                if (hash && hash.includes('date=')) {
                    const dateId = hash.split('date=')[1];
                    if (data.find(e => e.id === dateId && e.status === 'open')) {
                        setFormData(prev => ({ ...prev, eventId: dateId }));
                    }
                }
            } catch (error) {
                console.error("Error fetching form events:", error);
            } finally {
                setIsLoadingEvents(false);
            }
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

        if (formspreeEndpoint) {
            try {
                // 送信内容に日程の詳細テキストを追加して見やすくする
                const selectedEvent = formEvents.find(ev => ev.id === formData.eventId);
                const submissionData = {
                    ...formData,
                    eventDetails: selectedEvent ? `${selectedEvent.date} ${selectedEvent.location}` : '不明'
                };

                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(submissionData)
                });

                if (response.ok) {
                    setSubmitStatus('success');
                    setFormData({ name: '', email: '', phone: '', eventId: '', message: '' });
                } else {
                    console.error("Formspree submission error:", response);
                    setSubmitStatus('error');
                }
            } catch (error) {
                console.error("Network error:", error);
                setSubmitStatus('error');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // 環境変数が未設定の場合はデモ用のモック動作を行う
            setTimeout(() => {
                console.log("Form submitted (Mock):", formData);
                setSubmitStatus('success');
                setIsSubmitting(false);
                setFormData({ name: '', email: '', phone: '', eventId: '', message: '' });
            }, 1500);
        }
    };

    return (
        <section id="apply" className="section-form">
            <div className="container" style={{ maxWidth: '700px' }}>
                <div className="form-wrapper">
                    <div className="text-center" style={{ marginBottom: '32px' }}>
                        <h2 className="section-title">参加申し込みフォーム</h2>
                        <p className="section-subtitle" style={{ fontSize: '0.95rem' }}>以下のフォームに必要事項をご入力の上、「送信する」ボタンを押してください。</p>
                    </div>

                    {submitStatus === 'success' ? (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h3>お申し込みが完了しました</h3>
                            <p>ご入力いただいたメールアドレスに詳細なご案内をお送りいたします。<br />当日お会いできるのを楽しみにしています！</p>
                            <button className="btn" onClick={() => setSubmitStatus(null)} style={{ marginTop: '24px', backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151' }}>
                                再度申し込む
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="custom-form">
                            {submitStatus === 'error' && (
                                <div style={{ padding: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #f87171', fontSize: '0.95rem' }}>
                                    通信エラーが発生しました。しばらく時間をおいてから再度お試しください。
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">お名前 <span className="required">必須</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="例: 山田 太郎"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">メールアドレス <span className="required">必須</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="例: yamada@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">電話番号 <span className="required">必須</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="例: 090-1234-5678"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="eventId" className="form-label">参加希望日程 <span className="required">必須</span></label>
                                <select
                                    id="eventId"
                                    name="eventId"
                                    value={formData.eventId}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                >
                                    <option value="" disabled>{isLoadingEvents ? '日程を読み込み中...' : '選択してください'}</option>
                                    {formEvents.map((event) => (
                                        <option
                                            key={event.id}
                                            value={event.id}
                                            disabled={event.status !== 'open'}
                                        >
                                            {event.date} {event.location} {event.status === 'open' ? '' : '（受付終了）'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">ご質問・備考 <span className="optional">任意</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="ご不明な点や、ボードゲームの経験（初心者など）があればご記入ください。"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-submit" style={{ marginTop: '40px', textAlign: 'center' }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-large"
                                    disabled={isSubmitting}
                                    style={{ width: '100%', maxWidth: '300px' }}
                                >
                                    {isSubmitting ? '送信中...' : '送信する'}
                                </button>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                                    送信することで、<a href="#" style={{ textDecoration: 'underline' }}>プライバシーポリシー</a>に同意したものとみなされます。
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ApplicationForm;
