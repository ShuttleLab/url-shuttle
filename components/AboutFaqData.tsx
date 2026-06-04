type Bilingual = { zh: string; en: string };
type HowTo = { id: string; name: Bilingual; steps: Bilingual[] };
type FaqItem = { q: Bilingual; a: Bilingual };
type UseCase = {
  scenario: Bilingual;
  before: Bilingual;
  after: Bilingual;
};

export const WHO_FOR: { icon: string; title: Bilingual; description: Bilingual }[] = [
  {
    icon: "Code",
    title: { zh: "开发者", en: "Developers" },
    description: {
      zh: "调试 API 端点、解析 URL 参数、分析路由结构，快速定位问题",
      en: "Debug API endpoints, parse URL parameters, and analyze route structures quickly",
    },
  },
  {
    icon: "Search",
    title: { zh: "SEO 专业人员", en: "SEO Professionals" },
    description: {
      zh: "分析 URL 结构、检查规范链接、优化 slug，提升搜索引擎排名",
      en: "Analyze URL structures, check canonical links, and optimize slugs for better rankings",
    },
  },
  {
    icon: "Users",
    title: { zh: "产品经理", en: "Product Managers" },
    description: {
      zh: "对比 URL 参数、审计链接结构、验证用户流程中的 URL",
      en: "Compare URL parameters, audit link structures, and validate URLs in user flows",
    },
  },
  {
    icon: "FileText",
    title: { zh: "内容创作者", en: "Content Creators" },
    description: {
      zh: "生成 SEO 友好的 URL slug、清理杂乱链接、编码特殊字符",
      en: "Generate SEO-friendly URL slugs, clean up messy links, and encode special characters",
    },
  },
];

export const WHEN_USE: UseCase[] = [
  {
    scenario: {
      zh: "调试复杂的 API 请求",
      en: "Debugging complex API requests",
    },
    before: {
      zh: "面对一长串 URL 查询参数，手动拆解容易出错，浪费时间",
      en: "Staring at a long URL with dozens of query parameters, manually breaking it apart is error-prone",
    },
    after: {
      zh: "粘贴 URL，瞬间看到所有组件和参数，表格化展示，一目了然",
      en: "Paste the URL, instantly see all components and parameters in a structured table view",
    },
  },
  {
    scenario: {
      zh: "为博客文章生成 SEO 友好的 slug",
      en: "Generating SEO-friendly slugs for blog posts",
    },
    before: {
      zh: "手动删除停用词、替换空格、处理特殊字符，容易遗漏",
      en: "Manually removing stop words, replacing spaces, handling special chars — easy to miss something",
    },
    after: {
      zh: "输入标题，自动去停用词、转小写、用连字符连接，一键复制",
      en: "Enter the title, auto-remove stop words, lowercase, hyphenate — copy with one click",
    },
  },
  {
    scenario: {
      zh: "批量验证广告链接",
      en: "Batch validating advertising links",
    },
    before: {
      zh: "50 个广告链接逐一点击检查，耗时 30 分钟，还可能漏检",
      en: "50 ad links to click and check one by one, 30 minutes, easy to miss broken ones",
    },
    after: {
      zh: "粘贴所有链接，一次验证，快速看到格式问题和无效协议",
      en: "Paste all links, validate at once, instantly see format issues and unsupported protocols",
    },
  },
  {
    scenario: {
      zh: "编辑 URL 中的查询参数",
      en: "Editing query parameters in a URL",
    },
    before: {
      zh: "在地址栏里小心翼翼地修改 %20 和 & 符号，经常破坏 URL",
      en: "Carefully editing %20 and & symbols in the address bar, often breaking the URL",
    },
    after: {
      zh: "可视化编辑器中直接修改键值对，自动编码，实时预览结果",
      en: "Edit key-value pairs directly in a visual editor with auto-encoding and live preview",
    },
  },
  {
    scenario: {
      zh: "编码包含中文的 URL",
      en: "Encoding URLs with non-ASCII characters",
    },
    before: {
      zh: "不确定该用 encodeURIComponent 还是 encodeURI，手动编码容易出错",
      en: "Unsure whether to use encodeURIComponent or encodeURI, manual encoding is error-prone",
    },
    after: {
      zh: "选择编码模式，输入文本，即时获得正确编码结果",
      en: "Choose the encoding mode, enter text, get the correctly encoded result instantly",
    },
  },
];

export const HOWTOS: HowTo[] = [
  {
    id: "parse-url",
    name: {
      zh: "如何解析一个 URL",
      en: "How to parse a URL",
    },
    steps: [
      {
        zh: "打开 URL Shuttle 网站（url.shuttlelab.org）",
        en: "Open the URL Shuttle website (url.shuttlelab.org)",
      },
      {
        zh: "在输入框中粘贴或输入需要解析的 URL",
        en: "Paste or type the URL you want to parse into the input field",
      },
      {
        zh: "工具自动识别并显示所有 URL 组件：协议、主机名、端口、路径、查询参数和哈希",
        en: "The tool automatically identifies and displays all URL components: protocol, hostname, port, pathname, query parameters, and hash",
      },
      {
        zh: "点击任意组件即可复制到剪贴板",
        en: "Click on any component to copy it to your clipboard",
      },
    ],
  },
  {
    id: "edit-query-params",
    name: {
      zh: "如何编辑查询参数",
      en: "How to edit query parameters",
    },
    steps: [
      {
        zh: "在首页工具中选择「查询字符串编辑器」",
        en: "Select 'Query String Editor' from the homepage tools",
      },
      {
        zh: "粘贴包含查询参数的 URL",
        en: "Paste a URL containing query parameters",
      },
      {
        zh: "在可编辑表格中直接修改键值对，或使用按钮添加、删除、排序参数",
        en: "Edit key-value pairs directly in the editable table, or use buttons to add, remove, and sort parameters",
      },
      {
        zh: "使用「编码所有值」或「解码所有值」批量处理特殊字符",
        en: "Use 'Encode All Values' or 'Decode All Values' to batch-process special characters",
      },
      {
        zh: "复制输出 URL 或在新标签页中打开",
        en: "Copy the output URL or open it in a new tab",
      },
    ],
  },
  {
    id: "generate-slug",
    name: {
      zh: "如何生成 URL slug",
      en: "How to generate a URL slug",
    },
    steps: [
      {
        zh: "在工具列表中选择「Slug 生成器」",
        en: "Select 'Slug Generator' from the tools list",
      },
      {
        zh: "输入标题或任意文本",
        en: "Enter your title or any text",
      },
      {
        zh: "选择分隔符（连字符、下划线或点）、大小写、是否移除停用词和最大长度",
        en: "Choose separator (hyphen, underscore, or dot), case, stop word removal, and max length",
      },
      {
        zh: "Slug 实时生成，点击复制即可使用",
        en: "The slug generates in real-time — click copy to use it",
      },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: {
      zh: "URL Shuttle 是免费的吗？",
      en: "Is URL Shuttle free?",
    },
    a: {
      zh: "是的，URL Shuttle 完全免费，没有隐藏费用、没有高级版、没有使用限制。所有功能都可以无限制使用，无需注册账户。",
      en: "Yes, URL Shuttle is completely free with no hidden costs, no premium tiers, and no usage limits. All features can be used without limits and without creating an account.",
    },
  },
  {
    q: {
      zh: "我的数据安全吗？",
      en: "Is my data safe?",
    },
    a: {
      zh: "绝对安全。所有 URL 处理都在您的浏览器中本地完成，使用浏览器原生的 URL API。我们不会发送、存储或分析您输入的任何 URL。",
      en: "Absolutely. All URL processing happens locally in your browser using the browser's native URL API. We never send, store, or analyze any URLs you enter.",
    },
  },
  {
    q: {
      zh: "需要注册账户吗？",
      en: "Do I need to create an account?",
    },
    a: {
      zh: "不需要。直接访问网站即可开始使用所有工具，无需注册、无需登录、无追踪。",
      en: "No. Simply visit the website and start using all tools immediately. No registration, no login, no tracking.",
    },
  },
  {
    q: {
      zh: "支持哪些 URL 协议？",
      en: "What URL protocols are supported?",
    },
    a: {
      zh: "URL Shuttle 支持所有标准 URL 协议，包括 HTTP、HTTPS、FTP、FTPS 和 file://。解析使用浏览器原生 URL API，遵循 WHATWG URL 标准。",
      en: "URL Shuttle supports all standard URL protocols including HTTP, HTTPS, FTP, FTPS, and file://. Parsing uses the browser's native URL API following the WHATWG URL Standard.",
    },
  },
  {
    q: {
      zh: "URL 解析器的准确性如何？",
      en: "How accurate is the URL parser?",
    },
    a: {
      zh: "我们使用浏览器原生的 URL API 进行解析，遵循 WHATWG URL 标准，确保对所有有效 URL 提供准确可靠的结果。",
      en: "We use the browser's native URL API for parsing, which follows the WHATWG URL Standard, ensuring accurate and reliable results for all valid URLs.",
    },
  },
  {
    q: {
      zh: "可以批量验证 URL 吗？",
      en: "Can I validate multiple URLs at once?",
    },
    a: {
      zh: "可以。在 URL 验证器中，每行输入一个 URL，点击验证即可一次性检查所有链接的格式、协议和结构问题。",
      en: "Yes. In the URL Validator, enter one URL per line and click validate to check all links for format, protocol, and structure issues at once.",
    },
  },
  {
    q: {
      zh: "encodeURIComponent 和 encodeURI 有什么区别？",
      en: "What's the difference between encodeURIComponent and encodeURI?",
    },
    a: {
      zh: "encodeURIComponent 编码除字母数字和 - _ . ! ~ * ' ( ) 以外的所有字符，适用于编码单个 URL 组件。encodeURI 保留 URL 结构字符（如 : / ? #），适用于编码完整 URL。",
      en: "encodeURIComponent encodes everything except letters, digits, and - _ . ! ~ * ' ( ). It's for encoding individual URL components. encodeURI preserves URL structure characters like : / ? #, making it for encoding complete URLs.",
    },
  },
  {
    q: {
      zh: "可以离线使用吗？",
      en: "Can I use it offline?",
    },
    a: {
      zh: "URL Shuttle 是一个 Web 应用，需要网络连接来加载页面。但加载完成后，所有处理都在浏览器本地完成。",
      en: "URL Shuttle is a web application that requires an internet connection to load. However, once loaded, all processing happens locally in your browser.",
    },
  },
  {
    q: {
      zh: "如何提交功能建议？",
      en: "How can I suggest new features?",
    },
    a: {
      zh: "欢迎反馈和建议！您可以通过 support@shuttlelab.org 联系我们，或在 GitHub 仓库中提交 issue。",
      en: "We welcome feedback and feature suggestions! Contact us at support@shuttlelab.org or open an issue on our GitHub repository.",
    },
  },
];

export const COMPARISON = {
  zh: {
    heading: "URL Shuttle 与同类工具对比（截至 2026-06）",
    columns: ["功能", "URL Shuttle", "urldecoder.org", "urlex.org"],
    rows: [
      ["URL 解析", "✓", "✗", "✓"],
      ["查询参数编辑器", "✓", "✗", "✗"],
      ["URL 构建器", "✓", "✗", "✗"],
      ["Slug 生成器", "✓", "✗", "✗"],
      ["URL 验证器", "✓", "✗", "✗"],
      ["编解码器", "✓", "✓", "✗"],
      ["隐私优先", "✓", "?", "?"],
      ["无广告", "✓", "✗", "✗"],
      ["永久免费", "✓", "✓", "✓"],
    ],
  },
  en: {
    heading: "URL Shuttle vs Similar Tools (as of 2026-06)",
    columns: ["Feature", "URL Shuttle", "urldecoder.org", "urlex.org"],
    rows: [
      ["URL Parsing", "✓", "✗", "✓"],
      ["Query Parameter Editor", "✓", "✗", "✗"],
      ["URL Builder", "✓", "✗", "✗"],
      ["Slug Generator", "✓", "✗", "✗"],
      ["URL Validator", "✓", "✗", "✗"],
      ["Encoder/Decoder", "✓", "✓", "✗"],
      ["Privacy First", "✓", "?", "?"],
      ["No Ads", "✓", "✗", "✗"],
      ["Completely Free", "✓", "✓", "✓"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "URL Shuttle 适合谁？", en: "Who is URL Shuttle for?" },
  whenUse: { zh: "何时使用 URL Shuttle？", en: "When should I use URL Shuttle?" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
