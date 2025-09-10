// Centralized translation utility

export const t = (key, lang = 'en') => {
  const translations = {
    // Dashboard
    "dashboard.title.agent": {
      en: "Agent Dashboard",
      es: "Panel de Agente",
      ja: "エージェントダッシュボード",
    },
    "dashboard.title.field": {
      en: "Field Rep Dashboard",
      es: "Panel de Representante de Campo",
      ja: "フィールド担当ダッシュボード",
    },
    "dashboard.title.ops": {
      en: "Operations Dashboard",
      es: "Panel de Operaciones",
      ja: "運用ダッシュボード",
    },
    "dashboard.welcome.agent": {
      en: "Manage shipments, orders, and reports.",
      es: "Gestiona envíos, órdenes e informes.",
      ja: "出荷、注文、レポートを管理します。",
    },
    "dashboard.welcome.field": {
      en: "Access your delivery routes, update package statuses, and check in with dispatch.",
      es: "Accede a tus rutas de entrega, actualiza el estado de los paquetes y reporta al despacho.",
      ja: "配達ルートにアクセスし、荷物状況を更新して配車係に報告します。",
    },
    "dashboard.welcome.ops": {
      en: "Operational insights and metrics go here.",
      es: "Aquí se muestran métricas e información operativa.",
      ja: "運用の分析と指標がここに表示されます。",
    },

    // Header / Layout
    "header.role.agent": {
      en: "Agent Portal",
      es: "Portal de Agente",
      ja: "エージェントポータル",
    },
    "header.role.field": {
      en: "Field Portal",
      es: "Portal de Campo",
      ja: "フィールドポータル",
    },
    "header.role.unknown": {
      en: "User Portal",
      es: "Portal de Usuario",
      ja: "ユーザーポータル",
    },
    "header.lang.label": {
      en: "Language",
      es: "Idioma",
      ja: "言語",
    },
    "header.logout": {
      en: "Logout",
      es: "Cerrar sesión",
      ja: "ログアウト",
    },

    // Login Page
    "login.title": {
      en: "SafeShipping Login",
      es: "Inicio de sesión en SafeShipping",
      ja: "SafeShipping ログイン",
    },
    "login.instructions": {
      en: "Please select your role to begin:",
      es: "Selecciona tu rol para comenzar:",
      ja: "開始するにはロールを選択してください：",
    },
    "login.button": {
      en: "Login as",
      es: "Iniciar sesión como",
      ja: "ログイン：",
    },

    // Intake Panel & Fields
    "intake.panel.title": {
      en: "Manual Intake",
      es: "Ingreso manual",
      ja: "手動インテーク",
    },
    "intake.field.shipmentId": {
      en: "Shipment ID",
      es: "ID del envío",
      ja: "出荷 ID",
    },
    "intake.field.destinationHub": {
      en: "Destination Hub",
      es: "Centro de destino",
      ja: "配送ハブ",
    },
    "intake.field.packageContents": {
      en: "Package Contents",
      es: "Contenido del paquete",
      ja: "荷物の内容",
    },
    "intake.field.rawManifest": {
      en: "Paste Raw Manifest",
      es: "Pegar manifiesto sin formato",
      ja: "マニフェストの貼り付け",
    },

    // Placeholders
    "intake.placeholder.rawManifest": {
      en: "Paste your JSON, CSV, or plaintext manifest here",
      es: "Pega tu manifiesto en formato JSON, CSV o texto plano aquí",
      ja: "JSON、CSV、またはプレーンテキスト形式のマニフェストをここに貼り付けてください",
    },
    "intake.placeholder.apiPayload": {
      en: "Paste JSON payload here...",
      es: "Pegue el JSON aquí...",
      ja: "JSONペイロードをここに貼り付け...",
    },

    // Actions
    "intake.actions.submitOrder": {
      en: "Submit Order",
      es: "Enviar pedido",
      ja: "注文を送信",
    },
    "intake.actions.submitViaApi": {
      en: "Submit via API",
      es: "Enviar mediante API",
      ja: "API で送信",
    },

    // API Responses
    "intake.response.carrier": {
      en: "Carrier",
      es: "Transportista",
      ja: "配送業者",
    },
    "intake.response.error": {
      en: "Error",
      es: "Error",
      ja: "エラー",
    },

    // Ops Panel
    "intake.opsPanel.title": {
      en: "Operational Metrics Input",
      es: "Ingreso de métricas operativas",
      ja: "運用メトリクス入力",
    },
    "intake.opsPanel.futureField": {
      en: "Future Ops Dashboard Deliciousness",
      es: "Delicias futuras del panel de operaciones",
      ja: "将来の運用ダッシュボードの魅力",
    },
  };

  return translations[key]?.[lang] || key;
};
