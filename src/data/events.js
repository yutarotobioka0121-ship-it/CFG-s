import { createClient } from 'microcms-js-sdk';

// 環境変数からmicroCMSの認証情報を取得
const microcmsDomain = import.meta.env.VITE_MICROCMS_DOMAIN;
const microcmsApiKey = import.meta.env.VITE_MICROCMS_API_KEY;

// APIクライアントの作成 (環境変数が設定されている場合のみ)
export const client = (microcmsDomain && microcmsApiKey) ? createClient({
    serviceDomain: microcmsDomain,
    apiKey: microcmsApiKey,
}) : null;

// キャッシュフローゲームの日程一覧を取得する関数
export const getEventSchedule = async () => {
    // microCMSの環境変数が設定されていない場合は、ローカルのモックデータを返す
    if (!client) {
        console.log("microCMS is not configured. Using local mock data.");
        return fallbackSchedule;
    }

    try {
        const data = await client.getList({
            endpoint: 'eventschedule', // microCMS側のAPI名に合わせる
            queries: {
                orders: 'date', // 日付順にソート（必要に応じて変更）
                limit: 20
            }
        });

        // microCMSのレスポンスデータをフロントエンドの形式に合わせて変換
        return data.contents.map(item => ({
            id: item.id,
            date: item.displayDate, // 例: "2026年3月15日(日)"
            time: item.time, // 例: "13:00 - 17:00"
            location: item.location,
            capacity: item.capacity,
            fee: item.fee,
            status: item.status.length > 0 ? item.status[0] : "open" // "open", "full", "closed" (複数選択や文字列の場合の考慮)
        }));
    } catch (error) {
        console.error("Failed to fetch events from microCMS:", error);
        return fallbackSchedule; // エラー時はモックデータを表示してサイトが落ちないようにする
    }
};


// サイト基本設定の取得（必要であれば拡張）
export const siteConfig = {
    heroTitle: "お金の知識を、\n遊びながら身につける。",
    heroSubtitle: "世界中で愛される「キャッシュフローゲーム」で、\nラットレースから抜け出すための第一歩を踏み出しましょう。",
    contactEmail: "info@example.com"
};

// モックデータ (初期表示用・フォールバック用)
const fallbackSchedule = [
    {
        id: "1",
        date: "2026年3月15日(日)",
        time: "13:00 - 17:00",
        location: "東京都渋谷区",
        capacity: 10,
        fee: "2,000円",
        status: "open"
    },
    {
        id: "2",
        date: "2026年3月28日(土)",
        time: "14:00 - 18:00",
        location: "東京都新宿区",
        capacity: 10,
        fee: "2,000円",
        status: "open"
    },
    {
        id: "3",
        date: "2026年4月5日(日)",
        time: "13:00 - 17:00",
        location: "オンライン (Zoom)",
        capacity: 20,
        fee: "無料",
        status: "closed"
    }
];
