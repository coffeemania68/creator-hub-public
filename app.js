// ─────────────────────────────────────────
//  개인 크리에이터 허브  ·  app.js
// ─────────────────────────────────────────
const STORAGE_KEY = 'creator-hub-public-v3';
const USER_CODEX_KEY = 'userCodexPrompts';
const TASK_STATUSES = ['아이디어', '제작중', '검수', '업로드', '완료'];

function cloneData(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

// ── 명령어 보관함 데이터 ─────────────────────
// 새 프롬프트 추가: 이 배열에 항목을 추가하면 바로 반영됩니다.
// data/codex_prompts.json 참고 (앱은 이 상수를 직접 사용)
const CODEX_PROMPTS = [
  {
    "id": "user-moxd4iga-vxt48f",
    "title": "지혜샘 니체 쇼츠 자막 디렉터",
    "project": "quote",
    "category": "에이전트",
    "tags": [
      "agent",
      "quote",
      "너는 시니어 대상 철학·명언 쇼츠 콘텐츠 디렉터다. 니체 철학을 직접 강의하지 않고, 60대 이상이 바로 이해할 수 있는 삶의 조언과 습관 문장으로 바꿔준다. 목표는 조회수, 구독, 설명란 클릭을 만드는 쇼츠 자막을 생성하는 것이다.",
      "시니어 콘텐츠, 니체 철학 해석, 노년 건강, 걷기 습관, 자기극복, 외로움, 마음 건강, 유튜브 쇼츠 자막, 후킹 문구, 설명란 CTA"
    ],
    "description": "너는 시니어 대상 철학·명언 쇼츠 콘텐츠 디렉터다. 니체 철학을 직접 강의하지 않고, 60대 이상이 바로 이해할 수 있는 삶의 조언과 습관 문장으로 바꿔준다. 목표는 조회수, 구독, 설명란 클릭을 만드는 쇼츠 자막을 생성하는 것이다. / 시니어 콘텐츠, 니체 철학 해석, 노년 건강, 걷기 습관, 자기극복, 외로움, 마음 건강, 유튜브 쇼츠 자막, 후킹 문구, 설명란 CTA",
    "prompt": "너는 지혜샘 니체 쇼츠 자막 디렉터이다.\n\n역할:\n너는 시니어 대상 철학·명언 쇼츠 콘텐츠 디렉터다. 니체 철학을 직접 강의하지 않고, 60대 이상이 바로 이해할 수 있는 삶의 조언과 습관 문장으로 바꿔준다. 목표는 조회수, 구독, 설명란 클릭을 만드는 쇼츠 자막을 생성하는 것이다.\n\n전문 분야:\n시니어 콘텐츠, 니체 철학 해석, 노년 건강, 걷기 습관, 자기극복, 외로움, 마음 건강, 유튜브 쇼츠 자막, 후킹 문구, 설명란 CTA\n\n톤:\n존댓말. 차분하지만 강하게 말한다. 철학 강의처럼 어렵게 말하지 않는다. 60대 이상 시니어가 바로 이해할 수 있게 쓴다. 따뜻하지만 느슨하지 않게, 행동하게 만드는 말투를 사용한다.\n\n피해야 할 것:\n니체 직접 인용 금지.\n“니체가 말했다” 형식 금지.\n어려운 철학 용어 남발 금지.\n의학적 단정 금지.\n완치, 치료, 기적, 무조건 같은 표현 금지.\n공포 자극만 하는 문장 금지.\n튜토리얼식 설명 금지.\n양산형 명언 금지.\n젊은 층 말투 금지.\n\n작업 규칙:\n출력은 반드시 쇼츠 자막 형식으로 작성한다.\n\n각 콘텐츠는 아래 구조를 따른다.\n\n1. 제목\n2. 후킹 자막\n3. 본문 자막 5줄\n4. 마무리 자막\n5. 설명란 CTA\n\n자막은 한 줄당 12~20자 안팎으로 짧게 쓴다.\n첫 문장은 반드시 멈춰 보게 만든다.\n니체는 직접 인용하지 말고 “해석”으로만 사용한다.\n핵심 주제는 노년 건강, 걷기, 습관, 자기극복, 외로움, 삶의 태도다.\n마지막에는 반드시 오늘 할 수 있는 행동 하나를 제시한다.\n\n최종 목표는 조회수, 구독, 설명란 클릭이다.\n단순한 좋은 글이 아니라, 쇼츠에서 끝까지 보게 만드는 자막으로 작성한다.\n\n기본 지시문:\n지혜샘과 함께 노년의 삶을 다시 세워보세요.\n더 깊은 글은 설명란에서 확인하세요.\n오늘 걷기부터 시작해 보세요.\n60대 이후의 자기극복, 지금부터입니다.\n\n최종 목표는 조회수, 구독, 설명란 클릭입니다.\n단순한 좋은 글이 아니라, 쇼츠에서 끝까지 보게 만드는 자막으로 작성하세요.\n\n콘텐츠는 니체의 직접 인용이 아니라, 니체 철학을 시니어의 삶과 습관으로 해석한 문장이어야 합니다.\n\n지혜샘 Humanizer 규칙:\n\nAI 문장처럼 쓰지 말고, 선생님이 조용히 말해주는 느낌으로 쓴다.\n\n나쁜 문장:\n노년의 삶은 새로운 가능성과 자기극복의 중요한 시기입니다.\n\n좋은 문장:\n나이가 드는 게 무서운 게 아닙니다.\n습관을 놓는 게 무서운 겁니다.\n\n나쁜 문장:\n걷기는 건강한 노후를 위한 핵심적인 생활 습관입니다.\n\n좋은 문장:\n오늘 걷지 않으면,\n내일의 자유가 줄어듭니다.\n\n나쁜 문장:\n외로움은 노년기에 중요한 정신 건강 문제입니다.\n\n좋은 문장:\n외로움은 마음만 아프게 하지 않습니다.\n몸도 천천히 무너뜨립니다.\n\n출력 전 반드시 확인한다.\n- 이 문장은 쇼츠 첫 3초에 쓸 수 있는가?\n- 60대가 바로 알아들을 수 있는가?\n- 말로 읽었을 때 어색하지 않은가?\n- 너무 교과서 같지 않은가?\n- 마지막에 오늘 할 행동이 있는가?"
  },
  {
    "id": "user-moxehcwj-l479cj",
    "title": "모든 대본 휴머나이저",
    "project": "after50lab",
    "category": "에이전트",
    "tags": [
      "agent",
      "after50lab",
      "https://github.com/blader/humanizer"
    ],
    "description": "https://github.com/blader/humanizer",
    "prompt": "너는 모든 대본 휴머나이저이다.\n\n역할:\nhttps://github.com/blader/humanizer\n\n전문 분야:\n\n\n톤:\n\n\n피해야 할 것:\n\n\n작업 규칙:\n\n\n기본 지시문:\n모든 결과물은 마지막에 Humanizer 검사를 거친다."
  }
];

const PROJECT_BADGES = {
  chic40:          'CHIC40',
  mocolumi:        'MOCO',
  wisdomsource:    'WISDOM',
  contest:         'CONTEST',
  naverclip:       'NAVER',
  remotion_master: 'VIDEO',
  after50lab:      'AFTER50',
  sticker:         'STICKER',
  affiliate:       'AFFILIATE',
  quote:           'QUOTE',
};

function projectBadge(p) {
  const text = PROJECT_BADGES[p.id] || p.nameEn.split(' ')[0].toUpperCase();
  return `<span class="project-badge" style="background:${p.color}18;color:${p.color};border:1px solid ${p.color}40">${text}</span>`;
}

// ── Remotion 용어장 ──────────────────────────
const TERM_KEY = 'remotion-terminology-v1';
const TERM_SEED = [
  { id:'t01', phrase:'영상을 화면 전체에 깔아라',      term:'background layer',   pattern:'<AbsoluteFill> + objectFit: \'cover\'' },
  { id:'t02', phrase:'효과를 반투명하게 위에 올려라',   term:'overlay layer',      pattern:'opacity, blendMode, zIndex > 0' },
  { id:'t03', phrase:'이 효과로 장면을 전환해라',       term:'transition layer',   pattern:'<Sequence from={f} durationInFrames={n}> + zIndex: 10' },
  { id:'t04', phrase:'영상이 화면을 꽉 채우게 해라',   term:'objectFit cover',    pattern:'style={{ objectFit: \'cover\' }} on <OffthreadVideo>' },
  { id:'t05', phrase:'영상 위치를 위쪽으로 조정해라',  term:'objectPosition',     pattern:'style={{ objectPosition: \'center top\' }}' },
  { id:'t06', phrase:'효과를 여러 레이어로 쌓아라',    term:'layering via zIndex', pattern:'각 레이어에 다른 zIndex 값 부여' },
  { id:'t07', phrase:'색이 섞이는 효과를 줘라',        term:'blendMode',          pattern:'mixBlendMode: \'screen\' / \'overlay\' / \'multiply\'' },
  { id:'t08', phrase:'특정 구간에만 효과를 보여라',    term:'Sequence',           pattern:'<Sequence from={start} durationInFrames={dur}>' },
  { id:'t09', phrase:'효과를 반복시켜라',              term:'Loop',               pattern:'<Loop durationInFrames={n}>' },
  { id:'t10', phrase:'효과가 서서히 나타나게 해라',    term:'fade in',            pattern:'interpolate(frame, [0, fadeFrames], [0, 1])' },
  { id:'t11', phrase:'효과가 서서히 사라지게 해라',    term:'fade out',           pattern:'interpolate(frame, [dur-fadeFrames, dur], [1, 0])' },
  { id:'t12', phrase:'현재 몇 프레임인지 알아라',      term:'useCurrentFrame',    pattern:'const frame = useCurrentFrame()' },
  { id:'t13', phrase:'전체 길이와 fps를 알아라',       term:'useVideoConfig',     pattern:'const { durationInFrames, fps } = useVideoConfig()' },
  { id:'t14', phrase:'글자가 곡선을 따라 흘러가게 해라', term:'SVG textPath',    pattern:'<text><textPath href="#path-id"> + <path d="...">' },
  { id:'t15', phrase:'곡선 경로를 정의해라',           term:'SVG path',           pattern:'<path id="p" d="M 0 960 Q 540 500 1080 960">' },
  { id:'t16', phrase:'직접 구워진 텍스트 (수정 불가)', term:'baked-in text',      pattern:'해당 영상은 dirty 또는 reference-only 분류' },
  { id:'t17', phrase:'영상에 포함된 특정 씬 잔재',     term:'scene remnants',     pattern:'hasSceneRemnants: true — 배경 사용 시 충돌 주의' },
  { id:'t18', phrase:'영상 재생 시작점을 지정해라',    term:'startFrom',          pattern:'startFrom={30} (프레임 단위) on SwishyLayer' },
  { id:'t19', phrase:'재생 속도를 조절해라',           term:'playbackRate',       pattern:'playbackRate={0.5} (느리게) / playbackRate={2} (빠르게)' },
  { id:'t20', phrase:'모든 요소를 화면 크기만큼 덮어라', term:'AbsoluteFill',    pattern:'<AbsoluteFill> — position absolute, width/height 100%' },
];

function loadTermDB() {
  try { const r = localStorage.getItem(TERM_KEY); if (r) return JSON.parse(r); } catch(e) {}
  return TERM_SEED.map(e => ({ ...e }));
}
function saveTermDB(data) { localStorage.setItem(TERM_KEY, JSON.stringify(data)); }

// ── Remotion 용어장 (사이드바 전용) ──────────────────
const GLOSSARY_KEY = 'remotion-glossary-v1';
const GLOSS_CATEGORIES = ['배경', '레이어', '텍스트', '전환', '오디오', '렌더', '에셋', 'Swishy', 'Lottie', 'Spring'];

const REMOTION_GLOSSARY = [
  {
    id: 'g01',
    phrase: '영상을 배경으로 깔고 싶다',
    term: 'background layer',
    codexExpr: '<OffthreadVideo> 또는 <Video>를 <AbsoluteFill> 안에 넣고 objectFit: "cover"로 화면 전체를 채워라.',
    pattern: `<AbsoluteFill>\n  <OffthreadVideo src={src} style={{ objectFit: 'cover' }} />\n</AbsoluteFill>`,
    caution: 'dirty-baked-text, dirty-scene-remnants 소재는 배경으로 쓰면 안 된다. swishy_manifest.json에서 category 확인 필수.',
    category: '배경',
  },
  {
    id: 'g02',
    phrase: '글자 뒤에 영상 효과를 살짝 얹고 싶다',
    term: 'overlay layer',
    codexExpr: 'SwishyLayer를 글자 레이어 아래 zIndex로 배치하고, opacity와 mixBlendMode로 투명도를 조절해라.',
    pattern: `<AbsoluteFill style={{ zIndex: 1, opacity: 0.4, mixBlendMode: 'screen' }}>\n  <SwishyLayer sampleId="..." />\n</AbsoluteFill>`,
    caution: 'mixBlendMode를 쓸 때 부모에 background가 없으면 효과가 이상하게 보인다. 검수된 sampleId만 사용할 것.',
    category: '레이어',
  },
  {
    id: 'g03',
    phrase: '특정 순간에만 전환 효과를 넣고 싶다',
    term: 'Sequence + transition layer',
    codexExpr: '<Sequence from={시작프레임} durationInFrames={길이}>로 SwishyTransition을 감싸고, zIndex를 높게 설정해라.',
    pattern: `<Sequence from={60} durationInFrames={15} style={{ zIndex: 10 }}>\n  <SwishyTransition sampleId="..." />\n</Sequence>`,
    caution: 'from 값은 fps 기준 프레임 수. 30fps 기준 2초 = 60프레임. durationInFrames가 너무 짧으면 끊겨 보인다.',
    category: '전환',
  },
  {
    id: 'g04',
    phrase: '화면을 꽉 채우고 싶다',
    term: 'AbsoluteFill + objectFit: cover',
    codexExpr: '<AbsoluteFill>로 감싸고 <OffthreadVideo>에 style={{ objectFit: "cover", width: "100%", height: "100%" }}을 줘라.',
    pattern: `<AbsoluteFill>\n  <OffthreadVideo\n    src={src}\n    style={{ width: '100%', height: '100%', objectFit: 'cover' }}\n  />\n</AbsoluteFill>`,
    caution: 'objectFit: "contain"을 쓰면 양옆에 여백이 생긴다. 쇼츠(9:16)와 원본 비율이 다를 경우 cover로 맞춰야 한다.',
    category: '배경',
  },
  {
    id: 'g05',
    phrase: '글자가 순서대로 나타나게 하고 싶다',
    term: 'staggered text / Sequence per word',
    codexExpr: '단어 배열을 map으로 돌려 각 항목에 <Sequence from={i * delay}>를 씌워 순차 등장시켜라.',
    pattern: `{words.map((w, i) => (\n  <Sequence key={i} from={i * 8} durationInFrames={dur - i * 8}>\n    <span style={{ opacity: interpolate(frame - i * 8, [0, 6], [0, 1], { extrapolateRight: 'clamp' }) }}>\n      {w}\n    </span>\n  </Sequence>\n))}`,
    caution: 'extrapolateRight: "clamp"를 빠뜨리면 opacity가 1을 초과한다. inputRange는 frame 기준임에 주의.',
    category: '텍스트',
  },
  {
    id: 'g06',
    phrase: '카드가 자연스럽게 튀어나오게 하고 싶다',
    term: 'spring animation',
    codexExpr: 'spring({ frame, fps, config: { damping: 12, stiffness: 120 } })로 0→1 값을 만들어 translateY 또는 scale에 적용해라.',
    pattern: `const progress = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });\nconst translateY = interpolate(progress, [0, 1], [40, 0]);\n// style={{ transform: \`translateY(\${translateY}px)\` }}`,
    caution: 'damping이 낮을수록 더 많이 튄다. stiffness가 높을수록 빠르게 도달한다. 쇼츠에서 너무 많이 튀면 산만해 보인다.',
    category: 'Spring',
  },
  {
    id: 'g07',
    phrase: '음악에 맞춰 이퀄라이저를 움직이고 싶다',
    term: 'audio visualization / getAudioData',
    codexExpr: 'useAudioData(src)로 오디오를 로드하고, visualizeAudio()로 frame별 주파수 배열을 얻어 막대 높이에 적용해라.',
    pattern: `const audioData = useAudioData(src);\nconst bars = audioData\n  ? visualizeAudio({ fps, frame, audioData, numberOfSamples: 32 })\n  : new Array(32).fill(0);\n// bars 배열의 각 값(0~1)을 막대 height로 변환`,
    caution: 'useAudioData는 비동기 로딩이라 처음엔 null이 반환된다. null 체크 없이 쓰면 에러. 렌더 시 --audio 플래그가 필요할 수 있다.',
    category: '오디오',
  },
  {
    id: 'g08',
    phrase: '렌더 명령어를 만들고 싶다',
    term: 'npx remotion render',
    codexExpr: 'npx remotion render src/index.ts {Composition명} --props-file data/{파일명}.json --codec h264 --output outputs/{경로}',
    pattern: `cd /d 개인 작업 폴더`,
    caution: 'Windows에서 cd는 백슬래시, remotion 인자 경로는 슬래시. --props-file 경로는 프로젝트 루트 기준 상대경로.',
    category: '렌더',
  },
  {
    id: 'g09',
    phrase: '기존 글자나 로고가 박힌 영상은 쓰고 싶지 않다',
    term: 'dirty-baked-text / hasLogo: true',
    codexExpr: 'swishy_manifest.json에서 category가 "dirty-baked-text" 또는 hasLogo: true인 sampleId는 절대 사용하지 마라.',
    pattern: `// swishy_manifest.json 확인 기준\n{\n  "sampleId": "swishy_xxx",\n  "category": "dirty-baked-text",  // ← 사용 금지\n  "hasLogo": true                   // ← 사용 금지\n}`,
    caution: 'baked-in text/logo는 제거 불가능하다. overlay를 덮어도 상업 영상에서 문제가 된다. usableAs 배열에 "background"가 있어야 배경으로 사용 가능.',
    category: '에셋',
  },
  {
    id: 'g10',
    phrase: '검수된 swishy sampleId만 쓰고 싶다',
    term: 'swishy_manifest.json / reviewed sampleId',
    codexExpr: 'swishy_manifest.json에서 category가 "clean-background" 또는 "overlay-light"이고 reviewStatus: "approved"인 항목만 골라라.',
    pattern: `// 사용 가능 sampleId 필터 기준\nmanifest.filter(s =>\n  ['clean-background', 'overlay-light', 'transition-only'].includes(s.category) &&\n  s.reviewStatus === 'approved' &&\n  !s.hasLogo\n)`,
    caution: 'reviewStatus가 "unreviewed"인 소재는 검수 전이다. 사용하려면 contact sheet에서 직접 확인 후 manifest를 업데이트해야 한다.',
    category: 'Swishy',
  },
];

function loadGlossaryDB() {
  try { const r = localStorage.getItem(GLOSSARY_KEY); if (r) return JSON.parse(r); } catch(e) {}
  return REMOTION_GLOSSARY.map(e => ({ ...e }));
}
function saveGlossaryDB(data) { localStorage.setItem(GLOSSARY_KEY, JSON.stringify(data)); }

// ── 초기 데이터 ──────────────────────────
const SEED = {
  "settings": {
    "ownerName": "크리에이터",
    "tasksNote": "국민연금 01:30 - 07:00\n네이버클립\n전자책 벤치하기",
    "dashNote": "클로드 철학명언 100개 작업하기\n네이버클립 n 네이버블로그 패션\n\n"
  },
  "projects": [
    {
      "id": "contest",
      "name": "공모전/이벤트",
      "nameEn": "Contest & Events",
      "emoji": "🏆",
      "description": "마감일 임박 공모전 및 이벤트 관리. 상금, 제출물, 진행 상태 추적.",
      "folder": "D:\\Projects\\공모전",
      "color": "#fd79a8",
      "status": "아이디어",
      "platforms": [],
      "nextAction": "진행 중인 공모전 마감일 확인",
      "links": [
        {
          "label": "공모전 허브 미니앱",
          "url": "file:///C:/Users/GALAXYBOOK%20ULTRA/Documents/Codex/2026-05-01/new-chat/contest-hub/index.html"
        }
      ],
      "note": "http://sajo.co.kr/prcenter/sajostoryView.asp?gi=2&idx=3378  사조 공모전 6월 14일 마감\n국민연금 2주 연장 6월8일? 마감"
    },
    {
      "id": "affiliate",
      "name": "어필리에이트",
      "nameEn": "Affiliate",
      "emoji": "🛒",
      "description": "쿠팡, 패션, 리뷰, 쇼핑 콘텐츠, 제휴 링크 운영 관리.",
      "folder": "D:\\Projects\\affiliate",
      "color": "#e17055",
      "status": "아이디어",
      "platforms": [
        "쿠팡 파트너스",
        "Naver",
        "YouTube"
      ],
      "nextAction": "어필리에이트 채널 기획 시작",
      "links": [
        {
          "label": "쿠팡 파트너스",
          "url": "https://partners.coupang.com"
        }
      ],
      "note": "ai툴 어필리에이트 카페 글 작성 에이전트"
    },
    {
      "id": "naverclip",
      "name": "네이버클립",
      "nameEn": "Naver Clip",
      "emoji": "📸",
      "description": "사진 기반 네이버클립 반자동화. 촬영 폴더, 장소명, 키워드 관리.",
      "folder": "D:\\Projects",
      "color": "#74b9ff",
      "status": "아이디어",
      "platforms": [
        "네이버 클립"
      ],
      "nextAction": "촬영 폴더 정리 및 업로드 스케줄 수립",
      "links": [
        {
          "label": "네이버 클립 관리 페이지",
          "url": "https://clip.naver.com"
        }
      ]
    },
    {
      "id": "after50lab",
      "name": "AFTER50LAB",
      "nameEn": "After 50 Lab",
      "emoji": "📚",
      "description": "오십이후연구소 전자책 원고, Book01 v01 템플릿, 표지/목차/챕터 디자인, PDF 출력 흐름 관리",
      "folder": "D:\\Projects\\after50lab",
      "color": "#0984e3",
      "status": "제작중",
      "platforms": [
        "전자책",
        "PDF"
      ],
      "nextAction": "2권 0장 테스트 HTML/PDF 확인",
      "links": [
        {
          "label": "D:\\Projects\\after50lab",
          "url": ""
        },
        {
          "label": "D:\\Projects\\after50lab\\templates",
          "url": ""
        },
        {
          "label": "D:\\Projects\\after50lab\\books\\001_ai_youtube_reality_guide",
          "url": ""
        },
        {
          "label": "Book01 v01",
          "url": ""
        },
        {
          "label": "ebook_template.html",
          "url": ""
        },
        {
          "label": "ebook_style.css",
          "url": ""
        },
        {
          "label": "extra-boxes.css",
          "url": ""
        },
        {
          "label": "cover-v2-candidate.html",
          "url": ""
        },
        {
          "label": "── 2권 ──",
          "url": ""
        },
        {
          "label": "D:\\Projects\\after50lab\\books\\002_chatgpt_basics",
          "url": "https://sell.smartstore.naver.com/#/judgment/list"
        },
        {
          "label": "D:\\Projects\\after50lab\\books\\002_chatgpt_basics\\source",
          "url": ""
        },
        {
          "label": "D:\\Projects\\after50lab\\books\\002_chatgpt_basics\\templates\\ebook_book02_v01",
          "url": ""
        }
      ]
    },
    {
      "id": "wisdomsource",
      "name": "지혜샘",
      "nameEn": "Wisdom Source",
      "emoji": "🌿",
      "description": "철학 롱폼, 니체 명언 쇼츠, 짜라투스트라 에피소드 관리.",
      "folder": "D:\\Projects\\nietzsche_project",
      "color": "#00b894",
      "status": "제작중",
      "platforms": [
        "YouTube",
        "YouTube Shorts",
        "Substack"
      ],
      "nextAction": "이번 주 에피소드 주제 선정",
      "links": [
        {
          "label": "YouTube 채널 (지혜샘)",
          "url": ""
        },
        {
          "label": "YouTube Shorts 채널",
          "url": ""
        },
        {
          "label": "Substack 대시보드",
          "url": ""
        }
      ]
    },
    {
      "id": "sticker",
      "name": "STICKER",
      "nameEn": "Sticker Lab",
      "emoji": "💬",
      "description": "카카오/라인/OGQ용 이모티콘, Moco & Lumi 캐릭터 스티커, 강아지 캐릭터, 시니어 리액션 스티커 실험 프로젝트",
      "folder": "D:\\Projects\\sticker-lab",
      "color": "#00cec9",
      "status": "아이디어",
      "platforms": [
        "Kakao",
        "LINE",
        "OGQ"
      ],
      "nextAction": "Moco & Lumi 또는 강아지 캐릭터로 24개 감정 슬롯 기획안 만들기",
      "links": [
        {
          "label": "캐릭터 컨셉",
          "url": ""
        },
        {
          "label": "24개 감정 슬롯",
          "url": ""
        },
        {
          "label": "문구 목록",
          "url": ""
        },
        {
          "label": "이미지 프롬프트",
          "url": ""
        },
        {
          "label": "결과 이미지 상태",
          "url": ""
        },
        {
          "label": "플랫폼별 제출 체크리스트",
          "url": ""
        }
      ]
    },
    {
      "id": "mocolumi",
      "name": "Moco & Lumi",
      "nameEn": "Moco & Lumi",
      "emoji": "🌙",
      "description": "Substack 연재 수면 동화. 영어 60화, 한글 20화 예정. 예약 발행 관리.",
      "folder": "D:\\Projects\\MocoandLumi",
      "color": "#a29bfe",
      "status": "제작중",
      "platforms": [
        "Substack",
        "YouTube"
      ],
      "nextAction": "다음 챕터 초안 작성",
      "links": [
        {
          "label": "Substack 대시보드",
          "url": "https://substack.com/dashboard"
        },
        {
          "label": "YouTube 채널",
          "url": ""
        }
      ]
    },
    {
      "id": "remotion_master",
      "name": "영상 제작 시스템",
      "nameEn": "Remotion Master",
      "emoji": "🎬",
      "description": "Remotion 템플릿, swishy 효과, 공용 영상 컴포넌트, 렌더 명령어를 관리하는 마스터 작업장",
      "folder": "D:\\Projects\\remotion_master",
      "color": "#6c5ce7",
      "status": "제작중",
      "platforms": [],
      "nextAction": "swishy 검수 샘플 정리 및 시크40 적용 테스트",
      "links": [
        {
          "label": "docs/ 문서 폴더",
          "url": ""
        },
        {
          "label": "src/components/ 컴포넌트",
          "url": ""
        },
        {
          "label": "src/data/swishy_manifest.json",
          "url": ""
        },
        {
          "label": "public/shared/swishy/raw/",
          "url": ""
        }
      ],
      "note": "배쌤, 앞서 나열해 드린 전문 용어 22가지에 대한 핵심 한 줄 설명을 덧붙여 드립니다.\n\n1. **스매시 컷 (Smash Cut):** 시공간이나 분위기를 예고 없이 극적으로 전환해 시청자에게 강한 시각적 충격을 주는 편집 기법입니다.\n2. **점프 컷 (Jump Cut):** 연속된 샷 중간을 잘라내어 시간의 흐름을 압축하고 영상 전개에 속도감을 부여하는 방식입니다.\n3. **패스트 커팅 (Fast Cutting / Rapid Montage):** 매우 짧은 길이의 샷들을 빠르게 이어 붙여 리듬감과 긴장감을 극대화하는 편집 기법입니다.\n4. **스피드 램핑 / 타임 리매핑 (Speed Ramping / Time Remapping):** 한 클립 내에서 영상의 재생 속도를 빠르고 느리게 교차 변경하여 특정 동작을 강조하는 효과입니다.\n5. **매치 컷 (Match Cut):** 피사체의 모양이나 움직임이 비슷한 두 장면을 이어 붙여 시각적 연속성과 의미를 자연스럽게 연결하는 기법입니다.\n6. **심리스 트랜지션 (Seamless Transition):** 장면과 장면이 넘어갈 때 끊어짐이 느껴지지 않도록 부드럽고 교묘하게 이어 붙이는 전환 방식입니다.\n7. **크로마키 합성 (Chroma Key Compositing):** 특정 색상(주로 녹색/파란색) 배경을 투명하게 빼내고 그 자리에 다른 영상이나 이미지를 합성하는 기술입니다.\n8. **스케일 컴포지팅 / 미니어처 합성 (Scale Compositing):** 인물이나 사물의 크기 비율을 비현실적으로 조절하여 거대한 오브제와 결합하는 시각 효과입니다.\n9. **클론 이펙트 / 다중 복제 (Multiplicity Effect / Clone Effect):** 촬영된 동일 인물을 한 화면에 여러 명으로 복제하여 다중 인물이 동시에 등장하는 것처럼 연출하는 기법입니다.\n10. **로토스코핑 (Rotoscoping):** 동영상의 각 프레임에서 인물이나 피사체의 외곽선을 직접 따서 배경과 분리해 내는 정밀한 마스킹 작업입니다.\n11. **모션 트래킹 (Motion Tracking):** 영상 속 움직이는 피사체의 경로를 추적하여 다른 그래픽 요소(텍스트, CG 등)가 그 움직임을 따라가게 하는 기술입니다.\n12. **3D 카메라 트래킹 (3D Camera Tracking):** 실제 촬영된 카메라의 움직임과 3D 공간의 데이터를 분석하여 가상의 CG 오브제를 자연스럽게 배치하는 작업입니다.\n13. **키네틱 타이포그래피 (Kinetic Typography):** 텍스트에 움직임과 애니메이션을 부여해 글자 자체가 마치 살아있는 것처럼 감정과 리듬을 전달하는 기법입니다.\n14. **3D 텍스트 오버레이 (3D Text Overlay):** 입체적인 3D 폰트를 영상의 공간감에 맞춰 화면 위에 얹어 메시지를 직관적으로 강조하는 효과입니다.\n15. **마스킹 및 알파 매트 (Masking & Alpha Matte):** 화면의 특정 영역만 보이게 하거나 가리기 위해 영역을 지정하여 두 개 이상의 영상을 합성하는 기법입니다.\n16. **네온 글로우 이펙트 (Neon Glow Effect):** 피사체나 텍스트 테두리에 형광빛이 뿜어져 나오는 듯한 발광 효과를 주어 팝(Pop)한 분위기를 연출합니다.\n17. **터널 줌 트랜지션 (Tunnel Zoom Transition):** 화면의 중앙으로 빨려 들어가거나 튀어나오는 듯한 강한 줌 효과를 주어 다음 장면으로 역동적으로 전환하는 기법입니다.\n18. **라이트 리크 (Light Leaks):** 카메라 렌즈로 빛이 새어 들어온 것처럼 화면 가장자리에 붉거나 노란 빛 번짐을 추가해 감성적인 느낌을 더하는 효과입니다.\n19. **렌즈 플레어 (Lens Flare):** 강한 광원이 렌즈에 반사되어 생기는 빛의 고리나 퍼짐 현상을 인위적으로 추가하여 공간감을 살리는 기법입니다.\n20. **디지털 카메라 무브먼트 (Digital Camera Movement):** 고정된 촬영 원본에 후반 작업을 통해 가상의 카메라 흔들림이나 패닝을 추가해 현장감과 역동성을 부여하는 기술입니다.\n21. **CGI 환경 합성 (CGI Environment Integration):** 3D 모델링으로 만든 가상의 환경(배경)을 실제 촬영본과 위화감 없이 결합하는 시각 효과입니다.\n22. **컬러 그레이딩 (Color Grading):** 영상의 전체적인 색감, 대비, 톤을 미세하게 조정하여 기획 의도에 맞는 특정한 시각적 분위기를 연출하는 색보정 작업입니다."
    },
    {
      "id": "chic40",
      "name": "시크40",
      "nameEn": "Chic 40",
      "emoji": "👗",
      "description": "40~70 여성 패션 쇼츠, 이미지/영상 프롬프트, Remotion 렌더링",
      "folder": "D:\\Projects\\chic40",
      "color": "#f2994a",
      "status": "제작중",
      "platforms": [
        "YouTube Shorts",
        "Instagram",
        "TikTok"
      ],
      "nextAction": "remotion 프로젝트 현황 확인 후 다음 쇼츠 주제 선정",
      "links": [
        {
          "label": "YouTube Shorts 채널",
          "url": ""
        },
        {
          "label": "Instagram 계정",
          "url": ""
        },
        {
          "label": "Remotion Studio",
          "url": ""
        }
      ]
    },
    {
      "id": "quote",
      "name": "철학/명언 숏폼",
      "nameEn": "QUOTE",
      "emoji": "📁",
      "description": "지혜샘 명언 쇼츠",
      "folder": "https://studio.youtube.com/channel/UCvUCBeLi0O4fSImwM7EGvpQ",
      "color": "#4285f4",
      "status": "제작중",
      "platforms": [
        "유튜브/네이버클립"
      ],
      "nextAction": "명언 쇼츠 에이전트에서 프롬프트 복사해서 클로드 가기",
      "links": [],
      "note": "",
      "createdAt": "2026-05-08T19:38:50.879Z",
      "updatedAt": "2026-05-08T19:38:50.879Z"
    }
  ],
  "tasks": [
    {
      "id": "jv38h32x",
      "title": "국민연금",
      "projectId": "contest",
      "status": "아이디어",
      "dueDate": "2026-05-21",
      "note": ""
    },
    {
      "id": "7h5ww1l6",
      "projectId": "mocolumi",
      "title": "Ch.2 The First Dream 영상 제작",
      "status": "제작중",
      "dueDate": "2026-05-09",
      "note": ""
    },
    {
      "id": "1z2ubypx",
      "projectId": "wisdomsource",
      "title": "짜라투스트라 서막 — 원고 1차 완성",
      "status": "제작중",
      "dueDate": "",
      "note": "800자 이내, 시니어 친화적 문체"
    }
  ],
  "links": [
    {
      "id": "e3oen598",
      "label": "YouTube Studio",
      "url": "https://studio.youtube.com",
      "category": "플랫폼"
    },
    {
      "id": "38yeehty",
      "label": "Substack 대시보드",
      "url": "https://substack.com/dashboard",
      "category": "플랫폼"
    },
    {
      "id": "se0jpdj7",
      "label": "ChatGPT",
      "url": "https://chatgpt.com",
      "category": "AI 도구"
    },
    {
      "id": "7bf5cogg",
      "label": "Swishy AI",
      "url": "https://www.swishy.ai/",
      "category": "AI 도구"
    },
    {
      "id": "arlfjds2",
      "label": "Google Drive",
      "url": "https://drive.google.com",
      "category": "자료 관리"
    },
    {
      "id": "dxu4enic",
      "label": "Notion",
      "url": "https://notion.so",
      "category": "자료 관리"
    },
    {
      "id": "j9m49ko2",
      "label": "네이버 클립",
      "url": "https://clip.naver.com",
      "category": "플랫폼"
    },
    {
      "id": "d7d90jr2",
      "label": "Instagram",
      "url": "https://www.instagram.com/",
      "category": "플랫폼"
    },
    {
      "id": "61m65k70",
      "label": "YouTube Studio - 지혜샘",
      "url": "https://studio.youtube.com/channel/UCm5j-Y347WAgYnE_JdF1xDg",
      "category": "영상/콘텐츠"
    },
    {
      "id": "l3woq9ye",
      "label": "YouTube Studio - Moco n Lumi",
      "url": "https://studio.youtube.com/channel/UCm5j-Y347WAgYnE_JdF1xDg",
      "category": "영상/콘텐츠"
    },
    {
      "id": "yuoqx1dy",
      "label": "YouTube Shorts - 시크40",
      "url": "https://studio.youtube.com/channel/UCD0qvubLN85zgpo_2XgtYJA",
      "category": "영상/콘텐츠"
    },
    {
      "id": "b7erv5ni",
      "label": "YouTube Studio - Slow Wisdom",
      "url": "https://studio.youtube.com/channel/UCpq0u1rWJ6QPoSPB1AZIpTA",
      "category": "영상/콘텐츠"
    },
    {
      "id": "83akv5za",
      "label": "Instagram - 브랜드 계정",
      "url": "",
      "category": "영상/콘텐츠"
    },
    {
      "id": "6yjt2v7q",
      "label": "TikTok Creator Center",
      "url": "",
      "category": "영상/콘텐츠"
    },
    {
      "id": "izww3tgj",
      "label": "TikTok 업로드 페이지",
      "url": "",
      "category": "영상/콘텐츠"
    },
    {
      "id": "xctj60u6",
      "label": "네이버 클립 업로드/관리 페이지",
      "url": "",
      "category": "영상/콘텐츠"
    },
    {
      "id": "z8ct3033",
      "label": "Swishy 홈",
      "url": "https://www.swishy.ai/",
      "category": "제작 도구"
    },
    {
      "id": "a3woh1xa",
      "label": "Swishy AI Text Animation",
      "url": "https://www.swishy.ai/ai-text-animation",
      "category": "제작 도구"
    },
    {
      "id": "zazflzku",
      "label": "Swishy AI Typeface",
      "url": "https://www.swishy.ai/ai-typeface",
      "category": "제작 도구"
    },
    {
      "id": "efl8l954",
      "label": "Swishy AI Animator",
      "url": "https://www.swishy.ai/ai-animator",
      "category": "제작 도구"
    },
    {
      "id": "qf1lyfxu",
      "label": "쿠팡체험단 등 상품리뷰",
      "url": "https://wrtn.ai/tools/67b2e7901b44a4d864b127b4",
      "category": "제작 도구"
    },
    {
      "id": "oxlns8c2",
      "label": "Canva 프로젝트 폴더 - 지혜샘",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "d4z22t4p",
      "label": "Canva 프로젝트 폴더 - chic_40",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "o4uxtznv",
      "label": "CapCut 웹 또는 앱 실행 링크",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "lpshf3yp",
      "label": "Google Drive 자료 폴더",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "1ov14ltr",
      "label": "Google Drive 영상 백업 폴더",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "7d38jc9i",
      "label": "Notion 콘텐츠 캘린더",
      "url": "",
      "category": "제작 도구"
    },
    {
      "id": "nqxlz9im",
      "label": "쿠팡 파트너스",
      "url": "https://partners.coupang.com/#affiliate/ws",
      "category": "수익/어필리에이트"
    },
    {
      "id": "cfqqwf49",
      "label": "마켓컬리 제휴/이벤트 관리 링크",
      "url": "",
      "category": "수익/어필리에이트"
    },
    {
      "id": "9x025o7z",
      "label": "AI Affiliate",
      "url": "https://cafe.naver.com/1939young",
      "category": "수익/어필리에이트"
    },
    {
      "id": "48z8ncm5",
      "label": "광고/협찬 문의 메일함",
      "url": "",
      "category": "운영 도구"
    }
  ],
  "chic40": {
    "renders": []
  },
  "mocolumi": {
    "chapters": [
      {
        "id": "qyeou494",
        "num": 1,
        "titleEn": "The First Dream",
        "titleKo": "첫 번째 꿈",
        "subtitleEn": "A journey begins under a silver moon",
        "subtitleKo": "은빛 달 아래 여정이 시작되다",
        "publishDate": "",
        "status": "제작중",
        "note": "수면 동화 1편. 달빛, 구름, 작은 숲 배경."
      },
      {
        "id": "fj79sbdc",
        "num": 2,
        "titleEn": "Moco Finds a Star",
        "titleKo": "모코의 별 찾기",
        "subtitleEn": "What happens when you follow a falling star?",
        "subtitleKo": "별똥별을 따라가면 어디로 갈까?",
        "publishDate": "",
        "status": "아이디어",
        "note": "2편. 별자리, 야행성 동물 등장 검토."
      }
    ]
  },
  "wisdomsource": {
    "episodes": [
      {
        "id": "uioo49cz",
        "num": 1,
        "title": "짜라투스트라 서막 — 산을 내려오다",
        "scriptStatus": "제작중",
        "videoStatus": "미시작",
        "uploadStatus": "미시작",
        "platform": "YouTube",
        "note": "롱폼 1편. 니체 초인 개념 도입부."
      },
      {
        "id": "fn8layl8",
        "num": 2,
        "title": "세 가지 변화 — 낙타, 사자, 어린아이",
        "scriptStatus": "미시작",
        "videoStatus": "미시작",
        "uploadStatus": "미시작",
        "platform": "YouTube",
        "note": "롱폼 2편 예정."
      }
    ]
  },
  "contest": {
    "entries": [
      {
        "id": "pdlhl3w2",
        "name": "서울지하철 사진공모전 ",
        "deadline": "",
        "prize": "",
        "submission": "영상",
        "status": "아이디어",
        "note": ""
      },
      {
        "id": "vdjda6bi",
        "sourceContestId": 6,
        "name": "2026 국민연금 대국민 영상 광고제",
        "deadline": "2026-05-08",
        "prize": "상금: 총 980만원",
        "submission": "영상",
        "status": "제작중",
        "note": "공모전 분야: 영상\n상금: 상금: 총 980만원\n참가 자격: 대한민국 국민 누구나, 개인 또는 팀 최대 5인\n마감일: 2026-05-08\n발표일: 2026-05-27\n공식 링크: https://www.mohw.go.kr/board.es?mid=a10501010100&bid=0003&act=view&list_no=1490079\n요강/PDF: https://www.mohw.go.kr/synap/doc.html?fn=202604141730177592.pdf&rs=/upload/result/202605/\n대표/참고 이미지: https://api.linkareer.com/attachments/815703\n[공모전 상세 메모]\n요강 요약:\n- 주제: 국민연금, 내가 확신하는 이유!\n- 분야: AI 영상 / 숏폼 영상\n- 접수: 2026-04-15 ~ 2026-05-08 17:00\n- 심사: 2026-05-11 ~ 2026-05-22\n- 발표: 2026-05-27\n\n참가 자격:\n- 대한민국 국민 누구나\n- 개인 또는 팀 최대 5인\n\n제출물:\n- 이메일 접수: goodmedia456@gmail.com\n- 신청서, 청렴 서약서, 작품 파일 각 1부\n\n출품 규격:\n- AI 영상: 3분 이내, 16:9, 1920x1080 이상, MP4/MOV 권장. AI 도구명, 적용 구간, 프롬프트 요지 작성 필요.\n- 숏폼 영상: 1분 내외, 9:16, 1920x1080 이상, 실제 촬영 영상 90% 이상.\n\n시상:\n- AI 영상 분야 총 490만원\n- 숏폼 영상 분야 총 490만원\n- 전체 총 980만원\n\n주의사항:\n- 1인 또는 1팀당 부문별 1작품 가능.\n- 표절, 도용, 대행, 타 공모전 수상작은 심사 제외 및 수상 취소 가능.\n- 수상작은 보건복지부 및 국민연금공단 홍보자료로 활용될 수 있음.\n\n내 작업 아이디어:\n- 국민연금을 미래의 나와 현재의 내가 서로 믿는 장치로 보여주는 1분 숏폼.\n- AI 영상으로는 국민연금을 든든한 히어로/안전망 이미지로 표현 가능.\n- 감정 과잉보다 실제 삶의 불안, 노후, 가족, 일상 안정감에 초점을 맞추기.\n\n[에이전트 요청 시 참고]\n- 공모전 요강과 심사 기준을 먼저 반영해줘.\n- 제출물 형식과 마감일을 기준으로 현실적인 제작안을 제안해줘.\n- 과장된 기술 자랑보다 심사위원이 이해하기 쉬운 콘셉트와 실행 가능성을 우선해줘."
      },
      {
        "id": "dmzjwd1n",
        "sourceContestId": 7,
        "name": "지방시대 숏폼 영상 공모전",
        "deadline": "2026-05-13",
        "prize": "상금: 총 600만원",
        "submission": "영상",
        "status": "제작중",
        "note": "공모전 분야: 영상\n상금: 상금: 총 600만원\n참가 자격: 국내 거주 내·외국인 누구나, 개인 또는 팀\n마감일: 2026-05-13\n발표일: 2026-06-30\n공식 링크: https://www.gaok.or.kr/front/viewAritcle.do?bbsId=BBS_0001&nttId=30375\n요강/PDF: https://www.gaok.or.kr/front/viewAritcle.do?bbsId=BBS_0001&nttId=30375\n대표/참고 이미지: https://api.linkareer.com/attachments/800542\n[공모전 상세 메모]\n요강 요약:\n- 공모명: 지방시대 숏폼 영상 공모전\n- 주최: 대한민국시도지사협의회\n- 접수: 2026-03-25 ~ 2026-05-13 18:00\n- 심사: 5월 중순\n- 공개검증: 6월 초, 소통24\n- 결과발표: 6월 중, 대한민국시도지사협의회 홈페이지\n\n참가 자격:\n- 국내 거주 내·외국인 누구나\n- 개인 또는 3명 이내 팀\n\n공모 주제:\n- 지방시대의 가치, 비전, 필요성, 우수정책 등\n- 우수정책: 지방정부 우수정책 소개\n- 필요성: 지방분권, 균형발전, 지방외교가 왜 필요한가\n- 가치: 내가 지방에서 사는 이유, 우리 동네가 좋은 이유\n- 비전: 5극3특, 행정통합 등 새로운 지방시대에 대한 기대\n\n제출물:\n- 개인 유튜브에 제작 영상 업로드\n- 네이버폼에 유튜브 링크와 인적사항, 제출서류 첨부\n- 네이버폼: https://naver.me/5WUg8kQd\n- 제출서류: 참가신청서, 참가자서약서, 개인정보 수집·이용 동의서\n\n출품 규격:\n- 세로형 숏폼 영상\n- 15~90초 내외\n- 9:16, 1080×1920 이상\n- AI 활용 가능\n- 필수 해시태그: #지방시대 #지방분권 #균형발전 #숏폼공모전 #대한민국시도지사협의회\n\n시상:\n- 총 11편 / 총 상금 600만원\n- 대상 1팀 200만원\n- 최우수상 1팀 100만원\n- 우수상 3팀 각 50만원\n- 장려상 6팀 각 25만원\n\n주의사항:\n- 유튜브 제목 또는 설명란에 필수 해시태그를 넣어야 함.\n- 수상작은 추후 원본 영상파일을 별도 제출하고 협의회 유튜브 채널에 게시될 수 있음.\n\n내 작업 아이디어:\n- 지방분권을 추상 설명하지 말고 한 사람의 생활 변화로 보여주기.\n- 지역 교통, 의료, 일자리, 돌봄, 청년 정착 같은 생활감 있는 사례가 좋음.\n- 15~30초 강한 숏폼으로 정책명보다 “왜 내 삶과 관계 있는가”를 먼저 보여주기.\n\n[에이전트 요청 시 참고]\n- 공모전 요강과 심사 기준을 먼저 반영해줘.\n- 제출물 형식과 마감일을 기준으로 현실적인 제작안을 제안해줘.\n- 과장된 기술 자랑보다 심사위원이 이해하기 쉬운 콘셉트와 실행 가능성을 우선해줘."
      },
      {
        "id": "gtb8mrb0",
        "sourceContestId": 9,
        "name": "2026 AX 아이디어 경진대회",
        "deadline": "2026-05-18",
        "prize": "상금: 총 9,100만원",
        "submission": "영상",
        "status": "제작중",
        "note": "공모전 분야: 아이디어\n상금: 상금: 총 9,100만원\n참가 자격: 대한민국 국민 누구나, 개인 또는 팀 최대 4인\n마감일: 2026-05-18\n\n공식 링크: https://www.konetic.or.kr/ecothon/content/guide.do\n[공모전 상세 메모]\n상세 메모 없음\n\n[에이전트 요청 시 참고]\n- 공모전 요강과 심사 기준을 먼저 반영해줘.\n- 제출물 형식과 마감일을 기준으로 현실적인 제작안을 제안해줘.\n- 과장된 기술 자랑보다 심사위원이 이해하기 쉬운 콘셉트와 실행 가능성을 우선해줘."
      },
      {
        "id": "7e3d56c9-3336-4bbf-aeea-ed40f0f79dc2",
        "sourceContestId": 20,
        "name": "2026 경북 국제 AI·메타버스 영상 공모전",
        "deadline": "2026-06-30",
        "prize": "상금: 총 1억원",
        "submission": "영상",
        "status": "아이디어",
        "note": "공모전 분야: 영상\n상금: 상금: 총 1억원\n참가 자격: 제한 없음\n마감일: 2026-06-30\n\n공식 링크: https://gamff.com/\n[공모전 상세 메모]\n상세 메모 없음\n\n[에이전트 요청 시 참고]\n- 공모전 요강과 심사 기준을 먼저 반영해줘.\n- 제출물 형식과 마감일을 기준으로 현실적인 제작안을 제안해줘.\n- 과장된 기술 자랑보다 심사위원이 이해하기 쉬운 콘셉트와 실행 가능성을 우선해줘."
      }
    ]
  },
  "naverclip": {
    "uploads": []
  },
  "sticker": {},
  "affiliate": {},
  "_activeView": "dashboard",
  "_contestMigrated": true,
  "_linksMigrated": true
};

function uid() { return Math.random().toString(36).slice(2, 10); }

let db = load();
ensureContestLink();
let activeView = db._activeView || 'dashboard';
let modalStack = [];      // { html, onSubmit }
let bannerDismissed = false;
let _dragHappened = false;
let codexSearch = '';
let codexProject = '';
let codexCategory = '';
let glossarySearch = '';
let glossaryCategory = '';
let contestFilter = 'actionable';
const expandedContestIds = new Set();

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return cloneData(SEED);
  try {
    const parsed = JSON.parse(saved);
    // 깊은 병합: SEED 구조 보장
    return syncSeedProjects(deepMerge(cloneData(SEED), parsed));
  } catch { return cloneData(SEED); }
}

function syncSeedProjects(data) {
  const existing = new Set((data.projects || []).map(p => p.id));
  SEED.projects.forEach(p => {
    if (!existing.has(p.id)) data.projects.push(cloneData(p));
  });
  return data;
}

function deepMerge(base, override) {
  for (const key of Object.keys(override)) {
    if (key in base && Array.isArray(base[key]) && Array.isArray(override[key])) {
      base[key] = override[key];
    } else if (key in base && typeof base[key] === 'object' && base[key] !== null && !Array.isArray(base[key])) {
      base[key] = deepMerge(base[key], override[key]);
    } else {
      base[key] = override[key];
    }
  }
  return base;
}

function save() {
  db._activeView = activeView;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function loadUserCodexPrompts() {
  try {
    const raw = localStorage.getItem(USER_CODEX_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.map(p => ({ ...p, userCreated: true })) : [];
  } catch {
    return [];
  }
}

function saveUserCodexPrompts(items) {
  localStorage.setItem(USER_CODEX_KEY, JSON.stringify(items.map(p => ({ ...p, userCreated: true }))));
}

function allCodexPrompts() {
  return [
    ...CODEX_PROMPTS.map(p => ({ ...p, userCreated: false })),
    ...loadUserCodexPrompts(),
  ];
}

function findCodexPrompt(id) {
  return allCodexPrompts().find(p => p.id === id);
}

function userPromptId() {
  return `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function go(view) {
  activeView = view;
  save();
  render();
}

// ── Icon helper ───────────────────────────
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  tasks:     '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  link:      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  settings:  '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  plus:      '<path d="M12 5v14"/><path d="M5 12h14"/>',
  edit:      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash:     '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  copy:      '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  export:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  import:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  folder:    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  external:  '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  check:     '<polyline points="20 6 9 17 4 12"/>',
  x:         '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  alert:     '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  terminal:  '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  book:      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
};

function icon(name, cls = 'icon') {
  return `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

// ── HTML helpers ──────────────────────────
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function chip(text, cls = '') {
  return `<span class="chip ${cls}">${esc(text)}</span>`;
}

function statusChip(status) {
  return chip(status, `status-${status}`);
}

function empty(msg) {
  return `<div class="empty">${msg}</div>`;
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

const CONTEST_HUB_STORAGE_KEYS = [
  'contestHub_v1',
  'contest-hub',
  'contestHub',
  'contestHubState',
  'contestEntries',
  'contests',
];

function parseContestHubStorage(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function findContestArrayFromState(state) {
  if (Array.isArray(state)) return state;
  if (!state || typeof state !== 'object') return [];

  const candidates = [
    state.entries,
    state.contests,
    state.items,
    state.data?.entries,
    state.state?.entries,
    state.contents,
  ];
  const sourceItems = candidates
    .filter(Array.isArray)
    .flat()
    .filter(item => item?.source === 'contest-hub');
  if (sourceItems.length) return sourceItems;
  return candidates.find(Array.isArray) || [];
}

function findContestHubStorageKey() {
  for (const key of CONTEST_HUB_STORAGE_KEYS) {
    const entries = findContestArrayFromState(parseContestHubStorage(localStorage.getItem(key)));
    if (entries.length) return key;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || CONTEST_HUB_STORAGE_KEYS.includes(key)) continue;
    const entries = findContestArrayFromState(parseContestHubStorage(localStorage.getItem(key)));
    if (entries.some(item => item?.source === 'contest-hub')) return key;
  }
  return '';
}

function readExternalContestHubEntries() {
  const key = findContestHubStorageKey();
  if (!key) return [];
  const state = parseContestHubStorage(localStorage.getItem(key));
  return findContestArrayFromState(state)
    .map(normalizeContestHubEntry)
    .filter(entry => entry.name);
}

function normalizeContestHubEntry(entry) {
  const title = entry?.title || entry?.name || entry?.contestName || '';
  const deadline = entry?.deadline || entry?.dueDate || entry?.endDate || entry?.closeDate || '';
  const workLink = entry?.workLink || entry?.url || entry?.link || entry?.officialLink || '';
  const memo = entry?.memo || entry?.note || entry?.description || '';
  return {
    id: `external-contest-${entry?.sourceContestId || entry?.id || title}`,
    name: title,
    title,
    status: entry?.status || '공모전 허브',
    deadline,
    dueDate: deadline,
    prize: entry?.prize || entry?.reward || entry?.award || '',
    submission: entry?.submission || entry?.type || entry?.category || '',
    workLink,
    url: workLink,
    memo,
    note: memo,
    nextAction: entry?.nextAction || '',
    source: 'contest-hub',
    sourceContestId: entry?.sourceContestId || entry?.id || '',
    external: true,
  };
}

function contestDuplicateKey(c) {
  const title = (c.name || c.title || '').trim().toLowerCase();
  const deadline = (c.deadline || c.dueDate || '').trim();
  const link = (c.workLink || c.url || c.link || '').trim().toLowerCase();
  return { title, deadline, link };
}

function isContestCopiedToHub(external) {
  const a = contestDuplicateKey(external);
  return db.contest.entries.some(internal => {
    const b = contestDuplicateKey(internal);
    return a.title && b.title === a.title && (
      (a.deadline && b.deadline === a.deadline) ||
      (a.link && b.link === a.link)
    );
  });
}

function copyExternalContestToHub(external) {
  if (isContestCopiedToHub(external)) {
    toast('이미 내 허브에 있는 공모전입니다.');
    return;
  }
  db.contest.entries.push({
    id: uid(),
    name: external.name,
    deadline: external.deadline,
    prize: external.prize,
    submission: external.submission,
    status: external.status || '아이디어',
    note: external.note,
    workLink: external.workLink,
    nextAction: external.nextAction,
    source: 'contest-hub-copy',
    sourceContestId: external.sourceContestId,
  });
  save();
  render();
  toast('내 허브에 복사했습니다.');
}

function contestDaysLeft(c, today = new Date().toISOString().slice(0, 10)) {
  if (!c.deadline) return null;
  return Math.ceil((new Date(c.deadline) - new Date(today)) / 86400000);
}

function getContestDashboardItems() {
  const externalItems = readExternalContestHubEntries().filter(c => !isContestCopiedToHub(c));
  return [
    ...db.contest.entries.map(c => ({ ...c, external: false })),
    ...externalItems,
  ];
}

function filterContestItems(items, filter, today = new Date().toISOString().slice(0, 10)) {
  return items.filter(c => {
    const daysLeft = contestDaysLeft(c, today);
    const status = c.status || '';
    const isDone = status === '완료' || status === '업로드완료';
    if (filter === 'within7') return daysLeft !== null && daysLeft >= 0 && daysLeft <= 7 && !isDone;
    if (filter === 'working') return /제작|작성|진행|검수|대본/.test(status) && !isDone;
    if (filter === 'expired') return daysLeft !== null && daysLeft < 0;
    if (filter === 'all') return true;
    return !isDone && (daysLeft === null || daysLeft >= 0);
  });
}

function sortContestItems(items, today = new Date().toISOString().slice(0, 10)) {
  return [...items].sort((a, b) => {
    const da = contestDaysLeft(a, today);
    const dbb = contestDaysLeft(b, today);
    const aLate = da !== null && da < 0;
    const bLate = dbb !== null && dbb < 0;
    if (aLate !== bLate) return aLate ? 1 : -1;
    return (a.deadline || '9999-99-99').localeCompare(b.deadline || '9999-99-99');
  });
}

function getContestByDisplayId(id) {
  return getContestDashboardItems().find(c => c.id === id);
}

function contestText(c) {
  return [c.note, c.memo, c.nextAction, c.workLink].filter(Boolean).join('\n');
}

function extractContestLinks(c, matcher) {
  const text = contestText(c);
  return [...new Set((text.match(/https?:\/\/[^\s)]+/g) || []).filter(matcher))];
}

function contestAgentReference(c) {
  const text = c.note || c.memo || '';
  const marker = '[에이전트 요청 시 참고]';
  const index = text.indexOf(marker);
  return index >= 0 ? text.slice(index).trim() : '';
}

function buildContestAgentPrompt(c, type) {
  const title = c.name || c.title || '';
  const dueDate = c.deadline || c.dueDate || '';
  const link = c.workLink || c.url || '';
  const memo = c.note || c.memo || '';
  const nextAction = c.nextAction || '';
  const headers = {
    search: '공모전 검색 리서처에게 줄 지시문',
    summary: '공모전 요강 요약 지시문',
    strategy: '공모전 혁신 기획가에게 줄 제출 전략 지시문',
    concept: '영상 콘셉트 지시문',
    copy: '공모전 카피라이터에게 줄 카피/제목 지시문',
  };
  const tasks = {
    search: '아래 공모전과 비슷한 조건의 추가 후보를 찾기 위한 검색 쿼리, 확인 사이트, 제외 기준을 만들어줘.',
    summary: '아래 공모전 요강을 심사 기준, 제출물, 마감일, AI 사용 가능 여부 중심으로 요약해줘.',
    strategy: '아래 공모전에 바로 제출 가능한 실행 전략을 제안해줘. 제작 난이도, 리스크, 오늘 할 일을 함께 정리해줘.',
    concept: '아래 공모전에 맞는 영상 콘셉트 5개와 가장 현실적인 1개안을 제안해줘.',
    copy: '아래 공모전에 맞는 제목 10개, 캐치프레이즈 10개, 짧은 훅 문장 10개를 만들어줘.',
  };
  return `${headers[type] || headers.strategy}

공모전명:
${title}

마감일:
${dueDate || '미정'}

공식 링크:
${link || '없음'}

다음 행동:
${nextAction || '미정'}

요청:
${tasks[type] || tasks.strategy}

메모/요강:
${memo || '없음'}`;
}

// ── Alert Banner ──────────────────────────
function alertBanner() {
  if (bannerDismissed) return '';
  const today = new Date().toISOString().slice(0, 10);
  const alerts = [];

  // 작업 마감일 기준
  db.tasks.forEach(t => {
    if (!t.dueDate || t.status === '완료') return;
    const diff = Math.ceil((new Date(t.dueDate) - new Date(today)) / 86400000);
    const p = db.projects.find(p => p.id === t.projectId);
    const label = p ? p.name : '';
    if (diff < 0) {
      alerts.push({ level: 'danger', text: `마감 지남 · ${label} — ${t.title}`, view: 'tasks' });
    } else if (diff === 0) {
      alerts.push({ level: 'danger', text: `오늘 마감 · ${label} — ${t.title}`, view: 'tasks' });
    } else if (diff <= 3) {
      alerts.push({ level: 'warn', text: `D-${diff} · ${label} — ${t.title}`, view: 'tasks' });
    }
  });

  // 공모전 마감일 기준
  const contestAlerts = [
    ...db.contest.entries,
    ...readExternalContestHubEntries().filter(c => !isContestCopiedToHub(c)),
  ];
  contestAlerts.forEach(c => {
    if (!c.deadline || c.status === '완료') return;
    const diff = Math.ceil((new Date(c.deadline) - new Date(today)) / 86400000);
    const sourceLabel = c.source === 'contest-hub' ? '공모전 허브 · ' : '';
    if (diff < 0) {
      alerts.push({ level: 'danger', text: `${sourceLabel}공모전 마감됨 · ${c.name}`, view: 'project-contest' });
    } else if (diff === 0) {
      alerts.push({ level: 'danger', text: `${sourceLabel}공모전 오늘 마감 · ${c.name}`, view: 'project-contest' });
    } else if (diff <= 3) {
      alerts.push({ level: 'warn', text: `${sourceLabel}공모전 D-${diff} · ${c.name}`, view: 'project-contest' });
    }
  });

  // Moco & Lumi 오늘 예약 발행
  db.mocolumi.chapters.forEach(c => {
    if (c.publishDate === today) {
      alerts.push({ level: 'info', text: `오늘 발행 예정 · Moco & Lumi Ch.${c.num} — ${c.titleEn}`, view: 'project-mocolumi' });
    } else if (c.publishDate && c.publishDate < today && c.status !== '완료' && c.status !== '업로드완료') {
      alerts.push({ level: 'warn', text: `발행일 지남 · Moco & Lumi Ch.${c.num} — ${c.titleEn}`, view: 'project-mocolumi' });
    }
  });

  // 지혜샘 에피소드 업로드 지연
  db.wisdomsource.episodes.forEach(e => {
    if (e.videoStatus === '완료' && e.uploadStatus === '미시작') {
      alerts.push({ level: 'info', text: `업로드 대기 · 지혜샘 Ep.${e.num} — ${e.title}`, view: 'project-wisdomsource' });
    }
  });

  if (!alerts.length) return '';

  const items = alerts.slice(0, 5).map(a => `
    <button class="alert-item alert-${a.level}" data-view="${a.view}">
      ${a.level === 'danger' ? '⚠' : a.level === 'warn' ? '◆' : '●'} ${esc(a.text)}
    </button>`).join('');

  return `
  <div class="alert-banner" id="alert-banner">
    <span class="alert-label">주의</span>
    <div class="alert-items">${items}</div>
    <button class="alert-dismiss" id="btn-dismiss-banner">✕</button>
  </div>`;
}

// ── Render engine ─────────────────────────
function render() {
  document.querySelector('#app').innerHTML = shell();
  bindEvents();
  renderModal();
}

function shell() {
  const nav = [
    { id: 'dashboard', label: '대시보드', iconName: 'dashboard' },
    { id: 'tasks',     label: '오늘 할 일',  iconName: 'tasks' },
    { id: 'links',     label: '자주 쓰는 링크', iconName: 'link' },
    { id: 'codex',    label: '명령어 보관함',  iconName: 'terminal' },
    { id: 'glossary',  label: 'Remotion 용어장', iconName: 'book' },
    { id: 'settings',  label: '설정',        iconName: 'settings' },
  ];
  const projectNav = db.projects.map(p => ({
    id: `project-${p.id}`,
    label: p.name,
    color: p.color,
  }));

  return `
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <strong>🗂 Creator Hub</strong>
        <span>${esc(db.settings.ownerName)}님의 운영실</span>
      </div>
      <nav class="nav">
        ${nav.map(n => `
          <button class="${activeView === n.id ? 'active' : ''}" data-view="${n.id}">
            ${icon(n.iconName)} ${esc(n.label)}
          </button>`).join('')}
        <div class="nav-section-label">프로젝트</div>
        ${projectNav.map(n => `
          <button class="${activeView === n.id ? 'active' : ''}" data-view="${n.id}" data-proj-id="${n.id.replace('project-','')}" draggable="true">
            <span class="drag-dots">⠿</span>
            <span class="project-dot" style="background:${n.color}"></span>
            <span>${esc(n.label)}</span>
          </button>`).join('')}
      </nav>
      <div class="side-footer">
        로그인 없음 · 로컬 저장<br>
        브라우저 파일로 바로 열기
      </div>
    </aside>
    <main class="main-content">
      ${alertBanner()}
      ${viewContent()}
    </main>
  </div>
  `;
}

function viewContent() {
  if (activeView === 'dashboard')   return dashboardView();
  if (activeView === 'tasks')       return tasksView();
  if (activeView === 'links')       return linksView();
  if (activeView === 'codex')       return codexView();
  if (activeView === 'glossary')    return glossaryView();
  if (activeView === 'settings')    return settingsView();
  if (activeView.startsWith('project-')) {
    const pid = activeView.replace('project-', '');
    return projectDetailView(pid);
  }
  return dashboardView();
}

// ── Dashboard ─────────────────────────────
function dashboardView() {
  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = db.tasks.filter(t => t.dueDate === today && t.status !== '완료');
  const activeTasks = db.tasks.filter(t => t.status !== '완료');
  const dueSoon = db.tasks
    .filter(t => t.dueDate && t.dueDate >= today && t.status !== '완료')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  return `
  <div class="topbar">
    <div>
      <h1>대시보드</h1>
      <p class="muted">오늘 ${new Date().toLocaleDateString('ko-KR', {month:'long', day:'numeric', weekday:'short'})} · 프로젝트 ${db.projects.length}개 운영 중</p>
    </div>
    <div class="btn-group">
      <button class="btn small" id="btn-add-project">${icon('plus')} 프로젝트 추가</button>
      <button class="btn secondary small" data-view="tasks">${icon('tasks')} 오늘 할 일</button>
    </div>
  </div>

  <div class="panel section">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <h3 style="margin:0">📝 메모</h3>
      <div>
        <span id="dash-memo-status" style="font-size:12px;color:var(--muted);margin-right:8px"></span>
        <button class="btn small" id="dash-memo-save">저장</button>
      </div>
    </div>
    <textarea id="dash-memo" style="width:100%;min-height:120px;resize:vertical;background:var(--panel-soft);border:1px solid var(--line);border-radius:8px;padding:12px;font-size:14px;line-height:1.7;color:var(--ink);font-family:inherit;box-sizing:border-box" placeholder="오늘의 메모를 입력하세요...">${esc(db.settings.dashNote || '')}</textarea>
  </div>

  <div class="grid cols-3 section">
    <div class="card metric-card">
      <div class="metric-value">${db.projects.length}</div>
      <div class="metric-label">운영 중 프로젝트</div>
    </div>
    <div class="card metric-card">
      <div class="metric-value">${todayTasks.length}</div>
      <div class="metric-label">오늘 할 일</div>
    </div>
    <div class="card metric-card">
      <div class="metric-value">${activeTasks.length}</div>
      <div class="metric-label">전체 진행 작업</div>
    </div>
  </div>

  <div class="grid cols-5 section">
    ${db.projects.map(p => projectCard(p)).join('')}
  </div>

  <div class="grid dash-grid section">
    <div class="panel">
      <h2>마감이 가까운 작업</h2>
      ${dueSoon.length
        ? `<div class="list">${dueSoon.map(t => taskRow(t, false)).join('')}</div>`
        : empty('마감일이 설정된 작업이 없습니다.')}
    </div>
    <div class="panel">
      <h2>빠른 링크</h2>
      <div class="links-grid">
        ${db.links.slice(0, 8).map(l => linkCard(l)).join('')}
      </div>
    </div>
  </div>
  `;
}

function projectCard(p) {
  const count = db.tasks.filter(t => t.projectId === p.id && t.status !== '완료').length;
  return `
  <div class="card project-card" style="border-top-color:${p.color}" data-view="project-${p.id}">
    <div class="card-header">
      <div class="card-title">
        ${projectBadge(p)}
        <h3>${esc(p.name)}</h3>
      </div>
      ${statusChip(p.status)}
    </div>
    <p class="desc">${esc(p.description)}</p>
    <div class="folder-path">${esc(p.folder)}</div>
    <div class="card-footer">
      <span class="next-action">${esc(p.nextAction)}</span>
      ${count > 0 ? chip(`${count}개 진행`, 'status-제작중') : ''}
    </div>
  </div>
  `;
}

function linkCard(l) {
  if (!l.url) return `
    <span class="link-card" style="cursor:default;opacity:0.55">
      ${icon('link')}
      <div><div>${esc(l.label)}</div></div>
    </span>`;
  return `
  <a class="link-card" href="${esc(l.url)}" target="_blank" rel="noopener">
    ${icon('external')}
    <div>
      <div>${esc(l.label)}</div>
      <div class="link-cat">${esc(l.category)}</div>
    </div>
  </a>`;
}

// ── Tasks View ────────────────────────────
function tasksView() {
  return `
  <div class="topbar">
    <div>
      <h1>오늘 할 일</h1>
      <p class="muted">전체 프로젝트 작업 목록. 상태를 업데이트하며 진행하세요.</p>
    </div>
    <button class="btn" id="btn-add-task">${icon('plus')} 작업 추가</button>
  </div>

  <div class="panel section">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <h3 style="margin:0">📝 메모</h3>
      <div>
        <span id="tasks-memo-status" style="font-size:12px;color:var(--green);margin-right:8px"></span>
        <button class="btn small" id="tasks-memo-save">저장</button>
      </div>
    </div>
    <textarea id="tasks-memo" class="memo-input" rows="3" style="width:100%;resize:vertical" placeholder="할 일 메모를 입력하세요...">${esc(db.settings.tasksNote || '')}</textarea>
  </div>

  <div class="toolbar">
    <select id="filter-project" class="btn secondary small" style="min-width:120px">
      <option value="">전체 프로젝트</option>
      ${db.projects.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}
    </select>
    <select id="filter-status" class="btn secondary small" style="min-width:100px">
      <option value="">전체 상태</option>
      ${TASK_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
    </select>
  </div>

  <div class="panel">
    <div class="list" id="task-list">
      ${renderTaskList('', '')}
    </div>
  </div>
  `;
}

function renderTaskList(filterProject, filterStatus) {
  let items = [...db.tasks];
  if (filterProject) items = items.filter(t => t.projectId === filterProject);
  if (filterStatus)  items = items.filter(t => t.status === filterStatus);
  if (!items.length) return empty('작업이 없습니다. 위의 [작업 추가] 버튼을 눌러 추가하세요.');
  return items.map(t => taskRow(t, true)).join('');
}

function taskRow(t, showDelete = true) {
  const p = db.projects.find(p => p.id === t.projectId);
  const today = new Date().toISOString().slice(0, 10);
  const isLate = t.dueDate && t.dueDate < today && t.status !== '완료';
  return `
  <div class="list-row" data-task-id="${t.id}" draggable="true">
    <div class="row-head">
      <div style="display:flex;align-items:center;gap:6px">
        <span class="drag-dots" title="드래그로 순서 변경">⠿</span>
        <div>
          <strong style="${t.status === '완료' ? 'text-decoration:line-through;opacity:0.5' : ''}">${esc(t.title)}</strong>
          <div class="row-meta" style="margin-top:4px">
            ${p ? `<span class="chip" style="background:${p.color}20;color:${p.color}">${esc(p.name)}</span>` : ''}
            ${statusChip(t.status)}
            ${t.dueDate ? `<span class="${isLate ? 'deadline-near' : 'deadline-ok'}">${isLate ? '⚠ ' : ''}${t.dueDate}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="row-actions">
        <select class="btn small secondary task-status-select" data-id="${t.id}">
          ${TASK_STATUSES.map(s => `<option ${t.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <button class="btn small secondary task-edit-btn" data-id="${t.id}">${icon('edit')}</button>
        ${showDelete ? `<button class="btn small danger task-delete-btn" data-id="${t.id}">${icon('trash')}</button>` : ''}
      </div>
    </div>
    ${t.note ? `<p style="font-size:13px;color:var(--muted);margin:0">${esc(t.note)}</p>` : ''}
  </div>`;
}

// ── Project Detail Views ──────────────────
function projectDetailView(pid) {
  const p = db.projects.find(p => p.id === pid);
  if (!p) return dashboardView();

  const views = {
    chic40:          chic40View,
    mocolumi:        mocolumi,
    wisdomsource:    wisdomsourceView,
    contest:         contestView,
    naverclip:       naverclipView,
    remotion_master: remotionMasterView,
  };
  const view = views[pid] ? views[pid](p) : genericProjectView(p);
  return projectHeader(p) + view;
}

function recommendedProjectPrompts(projectId) {
  return allCodexPrompts()
    .filter(p => p.project === projectId)
    .sort((a, b) => {
      const aa = a.category === '에이전트' ? 0 : 1;
      const bb = b.category === '에이전트' ? 0 : 1;
      if (aa !== bb) return aa - bb;
      return a.title.localeCompare(b.title, 'ko');
    })
    .slice(0, 6);
}

function projectPromptRecommendations(p) {
  const items = recommendedProjectPrompts(p.id);
  return `
  <div class="panel section">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px">
      <h3 style="margin:0">${icon('terminal')} 추천 에이전트 / 명령어</h3>
      <div class="btn-group">
        <button class="btn small project-agent-add-btn" data-project="${p.id}">${icon('plus')} 이 프로젝트 에이전트 추가</button>
        <button class="btn small secondary project-codex-more-btn" data-project="${p.id}">${icon('external')} 명령어 보관함에서 더 보기</button>
      </div>
    </div>
    ${items.length === 0
      ? `<p style="font-size:13px;color:var(--muted);margin:0">이 프로젝트에 연결된 추천 명령어가 없습니다.</p>`
      : `<div class="project-prompt-grid">
          ${items.map(item => `
            <button class="btn small secondary project-prompt-copy-btn" data-id="${esc(item.id)}" title="${esc(item.description || item.title)}">
              ${item.category === '에이전트' ? chip('에이전트') : chip(item.category)}
              <span>${esc(item.title)}</span>
            </button>
          `).join('')}
        </div>`}
  </div>`;
}

function projectHeader(p) {
  return `
  <div class="topbar">
    <div>
      <h1>${projectBadge(p)} ${esc(p.name)}</h1>
      <p class="muted">${esc(p.description)}</p>
    </div>
    <div class="btn-group">
      ${statusChip(p.status)}
      <button class="btn secondary small project-status-btn" data-id="${p.id}">${icon('edit')} 상태 변경</button>
    </div>
  </div>

  <div class="grid cols-2 section">
    <div class="panel">
      <h3>${icon('folder')} 로컬 폴더</h3>
      <div style="font-family:monospace;font-size:13px;background:var(--panel-soft);padding:10px 12px;border-radius:8px;border:1px solid var(--line);word-break:break-all">${esc(p.folder)}</div>
      <p style="font-size:12px;color:var(--muted);margin-top:6px">파일 탐색기에서 직접 열거나 VS Code / Codex 터미널에서 <code>cd ${esc(p.folder)}</code></p>
    </div>
    <div class="panel">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <h3 style="margin:0">${icon('link')} 프로젝트 링크</h3>
        <button class="btn small proj-link-add" data-pid="${p.id}">${icon('plus')} 링크 추가</button>
      </div>
      <div class="list">
        ${p.links.length === 0
          ? `<p style="font-size:13px;color:var(--muted);padding:8px 0 4px">등록된 링크가 없습니다. 링크를 추가해 주세요.</p>`
          : p.links.map((l, i) => {
              const name = l.title || l.label || '';
              return `
          <div style="display:flex;align-items:flex-start;gap:4px;margin-bottom:4px">
            ${l.url
              ? `<a href="${esc(l.url)}" target="_blank" class="btn small secondary" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${icon('external')} ${esc(name)}</a>`
              : name.startsWith('──')
                ? `<span style="flex:1;font-size:11px;font-weight:700;color:var(--muted);padding:4px 2px;letter-spacing:0.06em;align-self:center">${esc(name)}</span>`
                : `<span class="proj-link-path" style="flex:1">${esc(name)}</span>`}
            <button class="btn small secondary proj-link-edit" data-pid="${p.id}" data-idx="${i}" style="flex-shrink:0;margin-top:1px" title="수정">${icon('edit')}</button>
            <button class="btn small secondary proj-link-del" data-pid="${p.id}" data-idx="${i}" style="flex-shrink:0;margin-top:1px;color:#e17055" title="삭제">${icon('trash')}</button>
          </div>`;}).join('')}
      </div>
      <div class="next-action-row" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--line)">
        <p style="font-size:13px;margin:0"><strong>다음 할 일:</strong> ${esc(p.nextAction)}</p>
        <button class="btn small secondary proj-next-edit" data-id="${p.id}" style="margin-top:6px">${icon('edit')} 수정</button>
      </div>
    </div>
  </div>

  ${projectPromptRecommendations(p)}

  <div class="panel section">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <h3 style="margin:0">📝 메모</h3>
      <div>
        <span id="proj-memo-status-${p.id}" style="font-size:12px;color:var(--muted);margin-right:8px"></span>
        <button class="btn small" id="proj-memo-save-${p.id}">저장</button>
      </div>
    </div>
    <textarea id="proj-memo-${p.id}" style="width:100%;min-height:160px;resize:vertical;background:var(--panel-soft);border:1px solid var(--line);border-radius:8px;padding:12px;font-size:14px;line-height:1.7;color:var(--ink);font-family:inherit;box-sizing:border-box" placeholder="프로젝트 메모...">${esc(p.note || '')}</textarea>
  </div>
  `;
}

// 시크40 ─ Remotion 렌더 목록
// CMD: cd /d 경로는 백슬래시, remotion render 인자 경로는 슬래시 (기존 package.json 스크립트 형식 준수)
const CHIC40_PROJECT_DIR = '개인 Remotion 프로젝트 폴더';

function makeRenderCommand(r) {
  const composition = r.composition || 'Chic40SevenLooks';
  const propsArg    = r.propsFile   ? ` --props-file data/${r.propsFile}` : '';
  const outPath     = r.outputPath  ? r.outputPath.replace(/\\/g, '/') : '';
  const outputArg   = outPath       ? ` --output outputs/${outPath}` : '';
  return `cd /d ${CHIC40_PROJECT_DIR} && npx remotion render src/index.ts ${composition}${propsArg} --codec h264${outputArg}`;
}

function chic40View(p) {
  const items = db.chic40.renders;
  return `
  <div class="panel section">
    <div class="topbar" style="background:none;border:none;box-shadow:none;padding:0;margin-bottom:14px">
      <h2>Remotion 렌더 목록</h2>
      <button class="btn" id="btn-add-render">${icon('plus')} 렌더 추가</button>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-bottom:12px">
      프로젝트 폴더: <code style="font-size:12px">${CHIC40_PROJECT_DIR}</code>
      · Composition: <code style="font-size:12px">Chic40SevenLooks</code>
    </p>
    ${items.length === 0 ? empty('렌더 항목이 없습니다. [렌더 추가]를 눌러 쇼츠 항목을 등록하세요.') : `
    <table class="data-table">
      <thead><tr>
        <th>#</th><th>제목 / 주제</th><th>Composition</th><th>상태</th><th>출력 경로</th><th>명령어</th><th></th>
      </tr></thead>
      <tbody>
        ${items.map((r, i) => `
          <tr data-render-id="${r.id}">
            <td>${i + 1}</td>
            <td><strong>${esc(r.title)}</strong>${r.note ? `<br><small style="color:var(--muted)">${esc(r.note)}</small>` : ''}</td>
            <td style="font-size:12px;font-family:monospace">${esc(r.composition || 'Chic40SevenLooks')}</td>
            <td>${statusChip(r.status)}</td>
            <td style="font-size:12px;font-family:monospace;max-width:180px;word-break:break-all;color:var(--muted)">${esc(r.outputPath || '—')}</td>
            <td>
              <button class="btn small secondary render-copy-btn" data-id="${r.id}" title="명령어 복사">${icon('copy')} 복사</button>
            </td>
            <td class="row-actions">
              <button class="btn small secondary render-edit-btn" data-id="${r.id}">${icon('edit')}</button>
              <button class="btn small danger render-delete-btn" data-id="${r.id}">${icon('trash')}</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`}
  </div>
  `;
}

// Moco & Lumi ─ 챕터 목록
function mocolumi(p) {
  const items = db.mocolumi.chapters;
  return `
  <div class="panel section">
    <div class="topbar" style="background:none;border:none;box-shadow:none;padding:0;margin-bottom:14px">
      <h2>챕터 목록</h2>
      <button class="btn" id="btn-add-chapter">${icon('plus')} 챕터 추가</button>
    </div>
    ${items.length === 0 ? empty('챕터 항목이 없습니다. 추가해보세요.') : `
    <table class="data-table">
      <thead><tr>
        <th>#</th><th>제목 (영문)</th><th>제목 (한글)</th><th>부제목 (영문)</th><th>발행일</th><th>상태</th><th></th>
      </tr></thead>
      <tbody>
        ${items.sort((a,b) => a.num - b.num).map(c => `
          <tr data-chapter-id="${c.id}">
            <td><strong>${c.num}</strong></td>
            <td>${esc(c.titleEn)}</td>
            <td>${esc(c.titleKo)}</td>
            <td style="color:var(--muted);font-size:13px">${esc(c.subtitleEn)}</td>
            <td style="white-space:nowrap">${c.publishDate || '<span style="color:var(--muted)">미정</span>'}</td>
            <td>${statusChip(c.status)}</td>
            <td class="row-actions">
              <button class="btn small secondary chapter-edit-btn" data-id="${c.id}">${icon('edit')}</button>
              <button class="btn small danger chapter-delete-btn" data-id="${c.id}">${icon('trash')}</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`}
  </div>
  `;
}

// 지혜샘 ─ 에피소드 목록
function wisdomsourceView(p) {
  const items = db.wisdomsource.episodes;
  return `
  <div class="panel section">
    <div class="topbar" style="background:none;border:none;box-shadow:none;padding:0;margin-bottom:14px">
      <h2>에피소드 목록</h2>
      <button class="btn" id="btn-add-episode">${icon('plus')} 에피소드 추가</button>
    </div>
    ${items.length === 0 ? empty('에피소드 항목이 없습니다.') : `
    <table class="data-table">
      <thead><tr>
        <th>#</th><th>제목</th><th>원고</th><th>영상</th><th>업로드</th><th>플랫폼</th><th>메모</th><th></th>
      </tr></thead>
      <tbody>
        ${items.sort((a,b) => a.num - b.num).map(e => `
          <tr data-episode-id="${e.id}">
            <td><strong>${e.num}</strong></td>
            <td>${esc(e.title)}</td>
            <td>${statusChip(e.scriptStatus)}</td>
            <td>${statusChip(e.videoStatus)}</td>
            <td>${statusChip(e.uploadStatus)}</td>
            <td style="font-size:13px">${esc(e.platform)}</td>
            <td style="font-size:13px;color:var(--muted)">${esc(e.note)}</td>
            <td class="row-actions">
              <button class="btn small secondary episode-edit-btn" data-id="${e.id}">${icon('edit')}</button>
              <button class="btn small danger episode-delete-btn" data-id="${e.id}">${icon('trash')}</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`}
  </div>
  `;
}

// 공모전 ─ 공모전 목록
function contestView(p) {
  const externalKey = findContestHubStorageKey();
  const externalItems = readExternalContestHubEntries().filter(c => !isContestCopiedToHub(c));
  const today = new Date().toISOString().slice(0, 10);
  const allItems = getContestDashboardItems();
  const items = sortContestItems(filterContestItems(allItems, contestFilter, today), today);
  const filterLabels = [
    ['actionable', '진행 가능'],
    ['within7', 'D-7 이내'],
    ['working', '제작중'],
    ['expired', '마감 지남'],
    ['all', '전체'],
  ];
  return `
  <div class="panel section">
    <div class="topbar" style="background:none;border:none;box-shadow:none;padding:0;margin-bottom:14px">
      <div>
        <h2>공모전 실행 대시보드</h2>
        <p class="muted" style="margin:4px 0 0">
          ${externalKey ? `공모전 허브 연동: ${esc(externalKey)} · 외부 ${externalItems.length}건` : '공모전 허브 연동: 감지된 localStorage 키 없음'}
        </p>
      </div>
      <button class="btn" id="btn-add-contest">${icon('plus')} 공모전 추가</button>
    </div>
    <div class="chip-filter" style="margin-bottom:12px">
      ${filterLabels.map(([value, label]) => `
        <button class="chip contest-filter-btn ${contestFilter === value ? 'active' : ''}" data-filter="${value}">${label}</button>
      `).join('')}
    </div>
    ${items.length === 0 ? empty('이 필터에 해당하는 공모전이 없습니다.') : `
    <table class="data-table">
      <thead><tr>
        <th>공모전명</th><th>마감일</th><th>상금</th><th>제출물</th><th>상태</th><th>공식 링크</th><th>실행</th>
      </tr></thead>
      <tbody>
        ${items.map(c => {
          const daysLeft = contestDaysLeft(c, today);
          const isLate = daysLeft !== null && daysLeft < 0;
          const deadlineLabel = daysLeft === null ? '미정'
            : daysLeft < 0 ? `<span class="deadline-near">마감됨</span>`
            : daysLeft === 0 ? `<span class="deadline-near">⚠ 오늘!</span>`
            : daysLeft <= 3 ? `<span class="deadline-near">⚠ D-${daysLeft}</span>`
            : `D-${daysLeft}`;
          const detailOpen = expandedContestIds.has(c.id);
          const officialLink = c.workLink
            ? `<a href="${esc(c.workLink)}" target="_blank" rel="noopener">공식 링크</a>`
            : '<span style="color:var(--muted)">없음</span>';
          const guideLinks = extractContestLinks(c, url => /pdf|attach|download|synap|guide/i.test(url));
          const agentRef = contestAgentReference(c);
          const detailMemo = c.note || c.memo || '메모 없음';
          const detailRow = detailOpen ? `
          <tr class="contest-detail-row ${isLate ? 'contest-expired' : ''}">
            <td colspan="7">
              <div class="contest-detail-box">
                <div><strong>다음 행동</strong><p>${esc(c.nextAction || '미정')}</p></div>
                <div><strong>공식 링크</strong><p>${c.workLink ? `<a href="${esc(c.workLink)}" target="_blank" rel="noopener">${esc(c.workLink)}</a>` : '없음'}</p></div>
                <div><strong>요강/PDF</strong><p>${guideLinks.length ? guideLinks.map(url => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`).join('<br>') : '메모에서 별도 링크를 찾지 못했습니다.'}</p></div>
                <div><strong>에이전트 요청 참고</strong><p>${esc(agentRef || '별도 섹션 없음')}</p></div>
                <div><strong>메모 전문</strong><p>${esc(detailMemo)}</p></div>
              </div>
            </td>
          </tr>`
            : '';
          return `
          <tr data-contest-id="${esc(c.id)}" class="${isLate ? 'contest-expired' : ''}">
            <td>
              <strong>${esc(c.name)}</strong>
              ${c.external ? `<br>${chip('공모전 허브 연동')}` : ''}
              ${isLate ? `<br>${chip('마감 지남', 'status-완료')}` : ''}
            </td>
            <td style="white-space:nowrap">${c.deadline ? `${c.deadline}<br><small>${deadlineLabel}</small>` : '<span style="color:var(--muted)">미정</span>'}</td>
            <td style="white-space:nowrap">${esc(c.prize)}</td>
            <td style="font-size:13px">${esc(c.submission)}</td>
            <td>${statusChip(c.status)}</td>
            <td style="font-size:13px">${officialLink}</td>
            <td class="row-actions">
              <button class="btn small secondary contest-detail-btn" data-id="${esc(c.id)}">${detailOpen ? '상세 닫기' : '상세 보기'}</button>
              <select class="btn small secondary contest-agent-type" data-id="${esc(c.id)}" title="에이전트 지시문 종류">
                <option value="search">검색 프롬프트</option>
                <option value="summary">요강 요약</option>
                <option value="strategy">제출 전략</option>
                <option value="concept">영상 콘셉트</option>
                <option value="copy">카피/제목</option>
              </select>
              <button class="btn small secondary contest-agent-copy-btn" data-id="${esc(c.id)}">${icon('copy')} 지시문</button>
              ${c.external
                ? `<button class="btn small secondary contest-copy-btn" data-id="${esc(c.id)}">${icon('copy')} 내 허브에 복사</button>`
                : `<button class="btn small secondary contest-edit-btn" data-id="${esc(c.id)}">${icon('edit')}</button>
                   <button class="btn small danger contest-delete-btn" data-id="${esc(c.id)}">${icon('trash')}</button>`}
            </td>
          </tr>
          ${detailRow}`;
        }).join('')}
      </tbody>
    </table>`}
  </div>
  `;
}

// 네이버클립 ─ 업로드 목록
function naverclipView(p) {
  const items = db.naverclip.uploads;
  return `
  <div class="panel section">
    <div class="topbar" style="background:none;border:none;box-shadow:none;padding:0;margin-bottom:14px">
      <h2>업로드 목록</h2>
      <button class="btn" id="btn-add-clip">${icon('plus')} 클립 추가</button>
    </div>
    ${items.length === 0 ? empty('등록된 클립이 없습니다. 추가해보세요.') : `
    <table class="data-table">
      <thead><tr>
        <th>촬영 폴더</th><th>장소명</th><th>키워드</th><th>업로드 상태</th><th>메모</th><th></th>
      </tr></thead>
      <tbody>
        ${items.map(c => `
          <tr data-clip-id="${c.id}">
            <td style="font-size:12px;font-family:monospace;max-width:200px;word-break:break-all">${esc(c.folder)}</td>
            <td>${esc(c.place)}</td>
            <td style="font-size:13px;color:var(--muted)">${esc(c.keywords)}</td>
            <td>${statusChip(c.uploadStatus)}</td>
            <td style="font-size:13px;color:var(--muted)">${esc(c.note)}</td>
            <td class="row-actions">
              <button class="btn small secondary clip-edit-btn" data-id="${c.id}">${icon('edit')}</button>
              <button class="btn small danger clip-delete-btn" data-id="${c.id}">${icon('trash')}</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`}
  </div>
  `;
}

function remotionMasterView(p) {
  const keyPaths = [
    '개인 작업 폴더',
    '개인 작업 폴더',
    '개인 작업 폴더',
    '개인 작업 폴더',
    '개인 작업 폴더',
  ];
  const managedItems = [
    'SwishyLayer', 'SwishyTransition', 'SwishyTextRibbon',
    'SwishyGradientSweep', 'SwishyShapeTransition',
    'Remotion 용어장', 'Codex 명령어', '렌더 프리셋',
  ];
  const rules = [
    'remotion_master는 창고다. 실제 프로젝트 적용은 chic40 같은 작업 프로젝트 안에서 한다.',
    '외부 폴더 직접 import 금지. 필요한 컴포넌트와 에셋만 복사해서 사용한다.',
    'raw 영상은 manifest 기준으로 검수된 것만 사용한다.',
    'raw 파일은 절대 삭제·이동·재인코딩하지 않는다.',
    '기존 composition을 삭제하거나 수정하지 않는다.',
  ];
  return `
  <div class="grid cols-2 section">
    <div class="panel">
      <h3>${icon('folder')} 주요 경로</h3>
      <div class="list" style="gap:4px">
        ${keyPaths.map(p => `
          <div style="font-family:monospace;font-size:12px;background:var(--panel-soft);
            padding:5px 10px;border-radius:6px;border:1px solid var(--line);word-break:break-all">
            ${esc(p)}
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <h3>${icon('check')} 관리 항목</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
        ${managedItems.map(m => `<span class="chip" style="font-size:12px">${esc(m)}</span>`).join('')}
      </div>
      <h3 style="margin-top:0">${icon('edit')} 주의사항</h3>
      <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--muted);line-height:1.8">
        ${rules.map(r => `<li>${esc(r)}</li>`).join('')}
      </ul>
    </div>
  </div>

  <div class="panel section">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <h2 style="margin:0">Remotion 용어장</h2>
      <button class="btn small" id="btn-add-term">${icon('plus')} 항목 추가</button>
    </div>
    <div id="term-table">${renderTermTable()}</div>
  </div>
  `;
}

function renderTermTable() {
  const terms = loadTermDB();
  if (!terms.length) return `<p style="color:var(--muted);font-size:14px">항목이 없습니다.</p>`;
  return `
  <table class="data-table term-table">
    <thead><tr>
      <th style="width:28%">하고 싶은 말</th>
      <th style="width:20%">Remotion 용어</th>
      <th>코드 패턴</th>
      <th style="width:70px"></th>
    </tr></thead>
    <tbody>
      ${terms.map(t => `
      <tr>
        <td>${esc(t.phrase)}</td>
        <td style="font-weight:700;color:var(--indigo)">${esc(t.term)}</td>
        <td style="font-family:'Cascadia Code','Consolas',monospace;font-size:12px;color:var(--muted)">${esc(t.pattern)}</td>
        <td class="row-actions">
          <button class="btn small secondary term-edit-btn" data-id="${t.id}">${icon('edit')}</button>
          <button class="btn small danger term-delete-btn" data-id="${t.id}">${icon('trash')}</button>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>`;
}

function bindTermEvents() {
  document.querySelectorAll('.term-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = loadTermDB().find(x => x.id === el.dataset.id);
      if (t) openTermModal(t);
    });
  });
  document.querySelectorAll('.term-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('이 항목을 삭제하시겠습니까?')) return;
      saveTermDB(loadTermDB().filter(x => x.id !== el.dataset.id));
      const container = document.querySelector('#term-table');
      if (container) { container.innerHTML = renderTermTable(); bindTermEvents(); }
    });
  });
}

function openTermModal(entry) {
  const t = entry || { id: uid(), phrase: '', term: '', pattern: '' };
  openModal({
    title: entry ? '용어 수정' : '용어 추가',
    submitLabel: '저장',
    body: `
      <label>하고 싶은 말
        <input name="phrase" value="${esc(t.phrase)}" placeholder="예: 영상을 화면 전체에 깔아라" required>
      </label>
      <label>Remotion 용어
        <input name="term" value="${esc(t.term)}" placeholder="예: background layer" required>
      </label>
      <label>코드 패턴
        <textarea name="pattern" rows="3" style="font-family:'Cascadia Code','Consolas',monospace;font-size:13px"
          placeholder="예: &lt;AbsoluteFill&gt; + objectFit: 'cover'">${esc(t.pattern)}</textarea>
      </label>`,
  }, fd => {
    const terms = loadTermDB();
    const existing = terms.find(x => x.id === t.id);
    if (existing) {
      existing.phrase  = fd.get('phrase');
      existing.term    = fd.get('term');
      existing.pattern = fd.get('pattern');
    } else {
      terms.push({ id: t.id, phrase: fd.get('phrase'), term: fd.get('term'), pattern: fd.get('pattern') });
    }
    saveTermDB(terms);
    const container = document.querySelector('#term-table');
    if (container) { container.innerHTML = renderTermTable(); bindTermEvents(); }
  });
}

function genericProjectView(p) {
  return '';
}

// ── Links View ────────────────────────────
function linksView() {
  const byCategory = {};
  db.links.forEach(l => {
    (byCategory[l.category] = byCategory[l.category] || []).push(l);
  });
  const cats = Object.entries(byCategory);
  return `
  <div class="topbar">
    <div>
      <h1>자주 쓰는 링크</h1>
      <p class="muted">카테고리별 링크 모음. URL을 입력하면 바로 열 수 있습니다.</p>
    </div>
    <button class="btn" id="btn-add-link">${icon('plus')} 링크 추가</button>
  </div>
  ${cats.length === 0
    ? `<div class="panel section">${empty('등록된 링크가 없습니다. 위의 "링크 추가" 버튼을 눌러 추가해 주세요.')}</div>`
    : cats.map(([cat, links]) => `
    <div class="panel section">
      <h2>${esc(cat)}</h2>
      <div class="links-grid">
        ${links.map(l => `
          <div style="display:flex;align-items:center;gap:6px">
            ${linkCard(l)}
            <button class="btn small secondary link-edit-btn" data-id="${l.id}" style="flex-shrink:0">${icon('edit')}</button>
          </div>`).join('')}
      </div>
    </div>`).join('')}
  `;
}

// ── Codex 명령어 보관함 ───────────────────────
function codexView() {
  const prompts = allCodexPrompts();
  const projects  = [...new Set(prompts.map(p => p.project))].sort();
  const categories = [...new Set(prompts.map(p => p.category))].sort();

  return `
  <div class="topbar">
    <div>
      <h1>명령어 보관함</h1>
      <p class="muted">Codex · Claude Code에 붙여넣는 지시문 모음. 총 ${prompts.length}개</p>
    </div>
    <div class="btn-group">
      <button class="btn small" id="btn-add-codex-prompt">${icon('plus')} 명령어 추가</button>
      <button class="btn small secondary" id="btn-add-codex-agent">${icon('plus')} 에이전트 추가</button>
    </div>
  </div>

  <div class="toolbar">
    <input type="search" id="codex-search" placeholder="제목, 설명, 태그 검색..."
      value="${esc(codexSearch)}">
    <select id="codex-filter-project" class="btn secondary small" style="min-width:150px">
      <option value="">전체 프로젝트</option>
      ${projects.map(p => `<option value="${esc(p)}" ${codexProject === p ? 'selected' : ''}>${esc(p)}</option>`).join('')}
    </select>
    <select id="codex-filter-category" class="btn secondary small" style="min-width:130px">
      <option value="">전체 카테고리</option>
      ${categories.map(c => `<option value="${esc(c)}" ${codexCategory === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
    </select>
  </div>

  <div id="codex-cards" class="section">
    ${renderCodexCards()}
  </div>
  `;
}

function renderCodexCards() {
  const q = codexSearch.toLowerCase();
  let items = allCodexPrompts();
  if (q) items = items.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.project.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tags || []).some(t => t.toLowerCase().includes(q))
  );
  if (codexProject)  items = items.filter(p => p.project  === codexProject);
  if (codexCategory) items = items.filter(p => p.category === codexCategory);
  if (!items.length) return empty('검색 결과가 없습니다. 검색어나 필터를 바꿔보세요.');
  return `<div class="codex-grid">${items.map(codexCard).join('')}</div>`;
}

function codexCard(p) {
  const preview = esc(p.prompt.length > 150 ? p.prompt.slice(0, 150) + '…' : p.prompt);
  return `
  <div class="codex-card">
    <div class="codex-card-header">
      <h3 class="codex-title">${esc(p.title)}</h3>
      <div class="codex-chips">
        <span class="chip codex-chip-project">${esc(p.project)}</span>
        <span class="chip codex-chip-category">${esc(p.category)}</span>
        ${p.userCreated ? '<span class="chip">사용자 추가</span>' : ''}
      </div>
    </div>
    <p class="codex-desc">${esc(p.description)}</p>
    <div class="codex-prompt-preview">${preview}</div>
    <div class="codex-card-footer">
      <button class="btn small secondary prompt-view-btn" data-id="${p.id}">${icon('external')} 전체 보기</button>
      <button class="btn small prompt-copy-btn" data-id="${p.id}">${icon('copy')} 복사</button>
      ${p.userCreated ? `
        <button class="btn small secondary prompt-edit-btn" data-id="${p.id}">${icon('edit')} 수정</button>
        <button class="btn small danger prompt-delete-btn" data-id="${p.id}">${icon('trash')} 삭제</button>
      ` : ''}
    </div>
  </div>`;
}

function bindCodexCardEvents() {
  document.querySelectorAll('.prompt-copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const p = findCodexPrompt(el.dataset.id);
      if (!p) return;
      copyToClipboard(p.prompt, el, '프롬프트를 클립보드에 복사했습니다.');
    });
  });

  document.querySelectorAll('.prompt-view-btn').forEach(el => {
    el.addEventListener('click', () => {
      const p = findCodexPrompt(el.dataset.id);
      if (p) openPromptViewModal(p);
    });
  });
  document.querySelectorAll('.prompt-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const p = loadUserCodexPrompts().find(p => p.id === el.dataset.id);
      if (p) openUserCodexPromptModal(p.category === '에이전트' ? 'agent' : 'prompt', p);
    });
  });
  document.querySelectorAll('.prompt-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      const prompts = loadUserCodexPrompts();
      const p = prompts.find(p => p.id === el.dataset.id);
      if (!p || !confirm('이 사용자 추가 항목을 삭제하시겠습니까?')) return;
      saveUserCodexPrompts(prompts.filter(p => p.id !== el.dataset.id));
      render();
    });
  });
}

function openPromptViewModal(p) {
  const tags = (p.tags || []).map(t => `<span class="chip" style="font-size:11px">${esc(t)}</span>`).join('');
  openModal({
    title: esc(p.title),
    submitLabel: '닫기',
    body: `
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
        <span class="chip codex-chip-project">${esc(p.project)}</span>
        <span class="chip codex-chip-category">${esc(p.category)}</span>
        ${tags}
      </div>
      <p style="font-size:14px;color:var(--muted);margin-bottom:14px">${esc(p.description)}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <strong style="font-size:13px;color:var(--muted)">지시문 전문</strong>
        <button type="button" class="btn small" id="btn-copy-from-modal">${icon('copy')} 복사</button>
      </div>
      <textarea id="prompt-modal-area" readonly
        style="font-family:'Cascadia Code','Consolas',monospace;font-size:12px;min-height:240px;line-height:1.6;word-break:break-all"
      ></textarea>`,
  }, () => {});
  setTimeout(() => {
    const ta = document.querySelector('#prompt-modal-area');
    if (ta) ta.value = p.prompt;
    document.querySelector('#btn-copy-from-modal')?.addEventListener('click', e => {
      navigator.clipboard.writeText(p.prompt).then(() => {
        const orig = e.target.innerHTML;
        e.target.textContent = '✓ 복사됨';
        setTimeout(() => { if (e.target.isConnected) e.target.innerHTML = orig; }, 1800);
        toast('프롬프트를 클립보드에 복사했습니다.');
      }).catch(() => {
        if (ta) { ta.select(); ta.focus(); }
        toast('텍스트를 직접 선택해서 복사하세요 (Ctrl+A → Ctrl+C).');
      });
    });
  }, 60);
}

// ── Remotion 용어장 View ──────────────────
function glossaryView() {
  const terms = loadGlossaryDB();
  const allCats = ['전체', ...GLOSS_CATEGORIES];
  return `
  <div class="topbar">
    <div>
      <h1>Remotion 용어장</h1>
      <p class="muted">내가 하고 싶은 말 → Remotion 용어 변환. 총 ${terms.length}개</p>
    </div>
    <button class="btn" id="btn-add-gloss">${icon('plus')} 용어 추가</button>
  </div>

  <div class="toolbar gloss-toolbar">
    <input type="search" id="gloss-search" class="gloss-search-input"
      placeholder="하고 싶은 말, 용어, 코드 패턴 검색..."
      value="${esc(glossarySearch)}">
  </div>
  <div class="chip-filter section">
    ${allCats.map(c => {
      const val = c === '전체' ? '' : c;
      return `<button class="chip gloss-cat-btn ${glossaryCategory === val ? 'active' : ''}" data-cat="${val}">${c}</button>`;
    }).join('')}
  </div>

  <div id="gloss-cards" class="section">
    ${renderGlossaryCards()}
  </div>
  `;
}

function renderGlossaryCards() {
  const q = glossarySearch.toLowerCase();
  let items = loadGlossaryDB();
  if (q) items = items.filter(t =>
    t.phrase.toLowerCase().includes(q) ||
    t.term.toLowerCase().includes(q) ||
    (t.codexExpr || '').toLowerCase().includes(q) ||
    (t.pattern || '').toLowerCase().includes(q)
  );
  if (glossaryCategory) items = items.filter(t => t.category === glossaryCategory);
  if (!items.length) return empty('검색 결과가 없습니다. 검색어나 카테고리를 바꿔보세요.');
  return `<div class="gloss-grid">${items.map(glossaryCard).join('')}</div>`;
}

function glossaryCard(t) {
  return `
  <div class="gloss-card">
    <div class="gloss-card-top">
      <span class="chip gloss-cat-chip">${esc(t.category)}</span>
      <div class="row-actions">
        <button class="btn small secondary gloss-edit-btn" data-id="${t.id}">${icon('edit')}</button>
        <button class="btn small danger gloss-delete-btn" data-id="${t.id}">${icon('trash')}</button>
      </div>
    </div>
    <div class="gloss-phrase">${esc(t.phrase)}</div>
    <div class="gloss-term-row">
      <span class="gloss-label">Remotion 용어</span>
      <span class="gloss-term">${esc(t.term)}</span>
    </div>
    <div class="gloss-section">
      <div class="gloss-section-head">
        <span class="gloss-label">Codex 표현</span>
        <button class="btn small secondary gloss-copy-codex-btn" data-id="${t.id}">${icon('copy')} 복사</button>
      </div>
      <p class="gloss-codex-text">${esc(t.codexExpr)}</p>
    </div>
    <div class="gloss-section">
      <div class="gloss-section-head">
        <span class="gloss-label">코드 패턴</span>
        <button class="btn small secondary gloss-copy-code-btn" data-id="${t.id}">${icon('copy')} 복사</button>
      </div>
      <pre class="gloss-pattern">${esc(t.pattern)}</pre>
    </div>
    ${t.caution ? `<div class="gloss-caution">⚠ ${esc(t.caution)}</div>` : ''}
  </div>`;
}

function copyToClipboard(text, btn, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.textContent = '✓ 복사됨';
    setTimeout(() => { if (btn.isConnected) btn.innerHTML = orig; }, 1800);
    toast(successMsg);
  }).catch(() => {
    openModal({
      title: '직접 복사',
      submitLabel: '닫기',
      body: `
        <p style="font-size:13px;color:var(--muted);margin-bottom:8px">
          클립보드 접근이 차단됐습니다.<br>아래를 전체 선택(Ctrl+A) 후 복사하세요 (Ctrl+C).
        </p>
        <textarea id="copy-fallback-area" readonly
          style="font-family:'Cascadia Code','Consolas',monospace;font-size:12px;min-height:120px;word-break:break-all"
        ></textarea>`,
    }, () => {});
    setTimeout(() => {
      const ta = document.querySelector('#copy-fallback-area');
      if (ta) { ta.value = text; ta.select(); ta.focus(); }
    }, 60);
  });
}

function openGlossaryModal(entry) {
  const t = entry || { id: uid(), phrase: '', term: '', codexExpr: '', pattern: '', caution: '', category: '배경' };
  openModal({
    title: entry ? '용어 수정' : '용어 추가',
    submitLabel: '저장',
    body: `
      <div class="form-grid">
        <label>내가 하고 싶은 말 *
          <input name="phrase" required value="${esc(t.phrase)}" placeholder="예: 영상을 배경으로 깔고 싶다">
        </label>
        <div class="form-two">
          <label>Remotion 용어 *
            <input name="term" required value="${esc(t.term)}" placeholder="예: background layer">
          </label>
          <label>카테고리
            <select name="category">
              ${GLOSS_CATEGORIES.map(c => `<option ${t.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>Codex에게 줄 표현
          <textarea name="codexExpr" rows="3" placeholder="Codex에게 붙여넣을 한국어 설명">${esc(t.codexExpr)}</textarea>
        </label>
        <label>코드 패턴
          <textarea name="pattern" rows="4"
            style="font-family:'Cascadia Code','Consolas',monospace;font-size:13px"
            placeholder="실제 코드 예시">${esc(t.pattern)}</textarea>
        </label>
        <label>주의할 점
          <textarea name="caution" rows="2" placeholder="실수하기 쉬운 점">${esc(t.caution)}</textarea>
        </label>
      </div>`,
  }, fd => {
    const glossary = loadGlossaryDB();
    const existing = glossary.find(x => x.id === t.id);
    const data = {
      id: t.id,
      phrase: fd.get('phrase'),
      term: fd.get('term'),
      codexExpr: fd.get('codexExpr'),
      pattern: fd.get('pattern'),
      caution: fd.get('caution'),
      category: fd.get('category'),
    };
    if (existing) {
      Object.assign(existing, data);
    } else {
      glossary.push(data);
    }
    saveGlossaryDB(glossary);
    const container = document.querySelector('#gloss-cards');
    if (container) { container.innerHTML = renderGlossaryCards(); bindGlossaryCardEvents(); }
  });
}

function bindGlossaryEvents() {
  document.querySelector('#gloss-search')?.addEventListener('input', e => {
    glossarySearch = e.target.value;
    const container = document.querySelector('#gloss-cards');
    if (container) { container.innerHTML = renderGlossaryCards(); bindGlossaryCardEvents(); }
  });
  document.querySelectorAll('.gloss-cat-btn').forEach(el => {
    el.addEventListener('click', () => {
      glossaryCategory = el.dataset.cat;
      const container = document.querySelector('#gloss-cards');
      if (container) { container.innerHTML = renderGlossaryCards(); bindGlossaryCardEvents(); }
      document.querySelectorAll('.gloss-cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === glossaryCategory);
      });
    });
  });
  document.querySelector('#btn-add-gloss')?.addEventListener('click', () => openGlossaryModal());
  bindGlossaryCardEvents();
}

function bindGlossaryCardEvents() {
  document.querySelectorAll('.gloss-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = loadGlossaryDB().find(x => x.id === el.dataset.id);
      if (t) openGlossaryModal(t);
    });
  });
  document.querySelectorAll('.gloss-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('이 항목을 삭제하시겠습니까?')) return;
      saveGlossaryDB(loadGlossaryDB().filter(x => x.id !== el.dataset.id));
      const container = document.querySelector('#gloss-cards');
      if (container) { container.innerHTML = renderGlossaryCards(); bindGlossaryCardEvents(); }
    });
  });
  document.querySelectorAll('.gloss-copy-codex-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = loadGlossaryDB().find(x => x.id === el.dataset.id);
      if (t) copyToClipboard(t.codexExpr, el, 'Codex 표현을 복사했습니다.');
    });
  });
  document.querySelectorAll('.gloss-copy-code-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = loadGlossaryDB().find(x => x.id === el.dataset.id);
      if (t) copyToClipboard(t.pattern, el, '코드 패턴을 복사했습니다.');
    });
  });
}

// ── Settings View ─────────────────────────
function settingsView() {
  return `
  <div class="topbar">
    <div>
      <h1>설정</h1>
      <p class="muted">데이터 관리, 이름 설정, 내보내기/가져오기</p>
    </div>
  </div>

  <div class="grid cols-2">
    <div class="panel">
      <h2>기본 설정</h2>
      <div class="form-grid">
        <label>허브 이름 (사이드바에 표시됨)
          <input type="text" id="setting-name" value="${esc(db.settings.ownerName)}" placeholder="예: 김크리에이터">
        </label>
        <button class="btn primary" id="btn-save-settings">저장</button>
      </div>
    </div>

    <div class="panel">
      <h2>데이터 관리</h2>
      <p style="font-size:14px;color:var(--muted)">데이터는 이 브라우저의 로컬 저장소에 보관됩니다. 다른 컴퓨터나 브라우저에서도 쓰려면 JSON으로 내보낸 뒤 가져오세요.</p>
      <div class="btn-group" style="margin-top:12px">
        <button class="btn" id="btn-export">${icon('export')} JSON 내보내기</button>
        <button class="btn secondary" id="btn-import">${icon('import')} JSON 가져오기</button>
        <input type="file" id="file-import" accept=".json" style="display:none">
      </div>
    </div>
  </div>

  <div class="panel section" style="margin-top:16px">
    <h2>프로젝트 관리</h2>
    <div class="list">
      ${db.projects.map(p => `
        <div class="list-row">
          <div class="row-head">
            <div style="display:flex;align-items:center;gap:10px">
              ${projectBadge(p)}
              <div>
                <strong>${esc(p.name)}</strong>
                <div style="font-size:12px;color:var(--muted);font-family:monospace">${esc(p.folder)}</div>
              </div>
            </div>
            <div class="row-actions">
              ${statusChip(p.status)}
              <button class="btn small secondary project-edit-btn" data-id="${p.id}">${icon('edit')} 수정</button>
            </div>
          </div>
        </div>`).join('')}
    </div>
  </div>

  <div class="panel" style="margin-top:16px;border-top:3px solid var(--red)">
    <h2 style="color:var(--red)">위험 구역</h2>
    <p style="font-size:14px;color:var(--muted)">모든 데이터가 초기화됩니다. 내보내기로 먼저 백업하세요.</p>
    <button class="btn danger" id="btn-reset">전체 초기화</button>
  </div>
  `;
}

// ── Modals ────────────────────────────────
function openModal(html, onSubmit) {
  modalStack = [{ html, onSubmit }];
  renderModal();
}

function closeModal() {
  modalStack = [];
  renderModal();
}

function renderModal() {
  let overlay = document.querySelector('#modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  if (!modalStack.length) { overlay.innerHTML = ''; return; }
  const { html, onSubmit } = modalStack[0];
  overlay.innerHTML = `
    <div class="modal-overlay" id="modal-bg">
      <div class="modal">
        <div class="modal-header">
          <h2>${html.title || ''}</h2>
          <button class="btn secondary small" id="btn-close-modal">${icon('x')}</button>
        </div>
        <form id="modal-form">
          ${html.body}
          <div class="btn-group" style="margin-top:16px">
            <button type="submit" class="btn primary">${html.submitLabel || '저장'}</button>
            <button type="button" class="btn secondary" id="btn-cancel-modal">취소</button>
          </div>
        </form>
      </div>
    </div>
  `;
  overlay.querySelector('#btn-close-modal')?.addEventListener('click', closeModal);
  overlay.querySelector('#btn-cancel-modal')?.addEventListener('click', closeModal);
  overlay.querySelector('#modal-bg')?.addEventListener('click', e => { if (e.target.id === 'modal-bg') closeModal(); });
  overlay.querySelector('#modal-form')?.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit(new FormData(e.target));
    closeModal();
  });
}

// ── Task modal ────────────────────────────
function openTaskModal(task = null) {
  const isEdit = !!task;
  openModal({
    title: isEdit ? '작업 수정' : '작업 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>제목 *
          <input name="title" required value="${esc(task?.title || '')}" placeholder="작업 제목">
        </label>
        <div class="form-two">
          <label>프로젝트
            <select name="projectId">
              <option value="">없음</option>
              ${db.projects.map(p => `<option value="${p.id}" ${task?.projectId === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
            </select>
          </label>
          <label>상태
            <select name="status">
              ${TASK_STATUSES.map(s => `<option ${(task?.status || '아이디어') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>마감일
          <input type="date" name="dueDate" value="${esc(task?.dueDate || '')}">
        </label>
        <label>메모
          <textarea name="note">${esc(task?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = { title: fd.get('title'), projectId: fd.get('projectId'), status: fd.get('status'), dueDate: fd.get('dueDate'), note: fd.get('note') };
    if (isEdit) {
      Object.assign(task, data);
    } else {
      db.tasks.push({ id: uid(), ...data });
    }
    save();
    render();
  });
}

// ── Link modal ────────────────────────────
function openLinkModal(link = null) {
  const isEdit = !!link;
  openModal({
    title: isEdit ? '링크 수정' : '링크 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>이름 *
          <input name="label" required value="${esc(link?.label || '')}" placeholder="YouTube Studio">
        </label>
        <label>URL
          <input name="url" type="url" value="${esc(link?.url || '')}" placeholder="https://...">
        </label>
        <label>카테고리
          <input name="category" value="${esc(link?.category || '')}" placeholder="플랫폼 / AI 도구 / 자료 관리">
        </label>
      </div>`,
  }, (fd) => {
    const data = { label: fd.get('label'), url: fd.get('url'), category: fd.get('category') || '기타' };
    if (isEdit) Object.assign(link, data);
    else db.links.push({ id: uid(), ...data });
    save(); render();
  });
}

function projectOptions(selected = '') {
  return db.projects.map(p => `<option value="${esc(p.id)}" ${selected === p.id ? 'selected' : ''}>${esc(p.name)} (${esc(p.id)})</option>`).join('');
}

function tagsFromInput(value) {
  return String(value || '').split(',').map(t => t.trim()).filter(Boolean);
}

function promptSection(prompt, label) {
  const re = new RegExp(`${label}:\\n([\\s\\S]*?)(?=\\n\\n[^\\n]+:\\n|$)`);
  return prompt.match(re)?.[1]?.trim() || '';
}

function buildAgentPrompt({ title, role, specialty, tone, avoid, rules, basePrompt }) {
  return `너는 ${title}이다.\n\n역할:\n${role}\n\n전문 분야:\n${specialty}\n\n톤:\n${tone}\n\n피해야 할 것:\n${avoid}\n\n작업 규칙:\n${rules}\n\n기본 지시문:\n${basePrompt}`;
}

function upsertUserCodexPrompt(item) {
  const prompts = loadUserCodexPrompts();
  const idx = prompts.findIndex(p => p.id === item.id);
  if (idx >= 0) prompts[idx] = item;
  else prompts.push(item);
  saveUserCodexPrompts(prompts);
}

function openUserCodexPromptModal(kind = 'prompt', existing = null, defaultProject = '') {
  const isAgent = kind === 'agent';
  const isEdit = !!existing;
  const prompt = existing?.prompt || '';
  const role = promptSection(prompt, '역할');
  const specialty = promptSection(prompt, '전문 분야');
  const tone = promptSection(prompt, '톤');
  const avoid = promptSection(prompt, '피해야 할 것');
  const rules = promptSection(prompt, '작업 규칙');
  const basePrompt = promptSection(prompt, '기본 지시문');
  openModal({
    title: isAgent ? (isEdit ? '에이전트 수정' : '에이전트 추가') : (isEdit ? '명령어 수정' : '명령어 추가'),
    submitLabel: isEdit ? '저장' : '추가',
    body: isAgent ? `
      <div class="form-grid">
        <label>제목 *<input name="title" required value="${esc(existing?.title || '')}"></label>
        <label>프로젝트<select name="project">${projectOptions(existing?.project || defaultProject)}</select></label>
        <label>역할<input name="role" value="${esc(role)}"></label>
        <label>전문 분야<input name="specialty" value="${esc(specialty)}"></label>
        <label>톤<input name="tone" value="${esc(tone)}"></label>
        <label>피해야 할 것<textarea name="avoid" rows="2">${esc(avoid)}</textarea></label>
        <label>작업 규칙<textarea name="rules" rows="3">${esc(rules)}</textarea></label>
        <label>기본 지시문<textarea name="basePrompt" rows="6">${esc(basePrompt)}</textarea></label>
      </div>`
      : `
      <div class="form-grid">
        <label>제목 *<input name="title" required value="${esc(existing?.title || '')}"></label>
        <label>프로젝트<select name="project">${projectOptions(existing?.project || defaultProject)}</select></label>
        <label>카테고리<input name="category" value="${esc(existing?.category || '')}" placeholder="예: Remotion / 문서 / 백업"></label>
        <label>태그<input name="tags" value="${esc((existing?.tags || []).join(', '))}" placeholder="쉼표로 구분"></label>
        <label>설명<input name="description" value="${esc(existing?.description || '')}"></label>
        <label>프롬프트 전문<textarea name="prompt" rows="8">${esc(existing?.prompt || '')}</textarea></label>
      </div>`,
  }, (fd) => {
    const id = existing?.id || userPromptId();
    const title = fd.get('title');
    const project = fd.get('project');
    if (isAgent) {
      const role = fd.get('role') || '';
      const specialty = fd.get('specialty') || '';
      const item = {
        id,
        title,
        project,
        category: '에이전트',
        tags: ['agent', project, role, specialty].filter(Boolean),
        description: [role, specialty].filter(Boolean).join(' / '),
        prompt: buildAgentPrompt({
          title,
          role,
          specialty,
          tone: fd.get('tone') || '',
          avoid: fd.get('avoid') || '',
          rules: fd.get('rules') || '',
          basePrompt: fd.get('basePrompt') || '',
        }),
        userCreated: true,
      };
      upsertUserCodexPrompt(item);
    } else {
      upsertUserCodexPrompt({
        id,
        title,
        project,
        category: fd.get('category') || '기타',
        tags: tagsFromInput(fd.get('tags')),
        description: fd.get('description') || '',
        prompt: fd.get('prompt') || '',
        userCreated: true,
      });
    }
    render();
    toast(isAgent ? '에이전트를 저장했습니다.' : '명령어를 저장했습니다.');
  });
}

// ── Project edit modal ────────────────────
function openProjectModal(p) {
  openModal({
    title: `${p.name} 수정`,
    submitLabel: '저장',
    body: `
      <div class="form-grid">
        <label>상태
          <select name="status">
            ${TASK_STATUSES.map(s => `<option ${p.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </label>
        <label>다음 할 일
          <input name="nextAction" value="${esc(p.nextAction || '')}" placeholder="다음에 해야 할 일">
        </label>
        <label>폴더 경로
          <input name="folder" value="${esc(p.folder || '')}" placeholder="개인 작업 폴더">
        </label>
      </div>`,
  }, (fd) => {
    p.status = fd.get('status');
    p.nextAction = fd.get('nextAction');
    p.folder = fd.get('folder');
    save(); render();
  });
}

function slugProjectId(value) {
  const base = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';
  let id = base;
  let i = 2;
  while (db.projects.some(p => p.id === id)) {
    id = `${base}-${i++}`;
  }
  return id;
}

function parseProjectList(value) {
  return String(value || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
}

function parseProjectLinks(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [label = '', url = '', category = '', memo = ''] = line.split('|').map(v => v.trim());
      return {
        id: uid(),
        label,
        title: label,
        url,
        category,
        memo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    })
    .filter(link => link.label);
}

function openProjectCreateModal() {
  openModal({
    title: '프로젝트 추가',
    submitLabel: '추가',
    body: `
      <div class="form-grid">
        <label>프로젝트명 *
          <input name="name" required placeholder="예: 철학/명언 숏폼">
        </label>
        <label>영문/배지명
          <input name="nameEn" placeholder="예: QUOTE">
        </label>
        <label>상태
          <select name="status">
            ${TASK_STATUSES.map(s => `<option ${s === '제작중' ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </label>
        <label>폴더 경로
          <input name="folder" placeholder="개인 작업 폴더">
        </label>
        <label>설명
          <textarea name="description" rows="3" placeholder="프로젝트 설명"></textarea>
        </label>
        <label>다음 할 일
          <input name="nextAction" placeholder="다음에 해야 할 일">
        </label>
        <label>플랫폼
          <input name="platforms" placeholder="YouTube Shorts, Instagram Reels, TikTok">
        </label>
        <label>링크 목록
          <textarea name="links" rows="4" placeholder="한 줄에 하나씩: 링크 이름 | URL | 카테고리 | 메모"></textarea>
        </label>
      </div>`,
  }, (fd) => {
    const name = fd.get('name');
    const nameEn = fd.get('nameEn') || name;
    const project = {
      id: slugProjectId(nameEn || name),
      name,
      nameEn,
      emoji: '📁',
      description: fd.get('description') || '',
      folder: fd.get('folder') || '',
      color: '#4285f4',
      status: fd.get('status') || '아이디어',
      platforms: parseProjectList(fd.get('platforms')),
      nextAction: fd.get('nextAction') || '',
      links: parseProjectLinks(fd.get('links')),
      note: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.projects.push(project);
    activeView = `project-${project.id}`;
    save();
    render();
    toast('프로젝트를 추가했습니다.');
  });
}

// ── Proj link edit modal ──────────────────
function openProjLinkModal(p, idx) {
  const isEdit = (typeof idx === 'number' && idx >= 0 && idx < p.links.length);
  const l = isEdit ? p.links[idx] : null;
  openModal({
    title: isEdit ? '링크 수정' : '링크 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>링크 이름 *
          <input name="label" required value="${esc(l?.title || l?.label || '')}" placeholder="링크 이름">
        </label>
        <label>URL
          <input name="url" type="url" value="${esc(l?.url || '')}" placeholder="https://...">
        </label>
        <label>카테고리
          <input name="category" value="${esc(l?.category || '')}" placeholder="예: 문서, 영상, 도구">
        </label>
        <label>메모
          <textarea name="memo" rows="2" placeholder="간단한 메모">${esc(l?.memo || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const now = new Date().toISOString();
    const data = {
      id:        l?.id || uid(),
      label:     fd.get('label'),
      title:     fd.get('label'),
      url:       fd.get('url') || '',
      category:  fd.get('category') || '',
      memo:      fd.get('memo') || '',
      createdAt: l?.createdAt || now,
      updatedAt: now,
    };
    if (isEdit) {
      p.links[idx] = data;
    } else {
      p.links.push(data);
    }
    save(); render();
  });
}

// ── Data-specific modals ──────────────────
function openRenderModal(r = null) {
  const isEdit = !!r;
  openModal({
    title: isEdit ? '렌더 수정' : '렌더 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>제목 / 주제 *
          <input name="title" required value="${esc(r?.title || '')}" placeholder="예: W18 여름 상의 룩북">
        </label>
        <div class="form-two">
          <label>Composition 이름
            <input name="composition" value="${esc(r?.composition || 'Chic40SevenLooks')}" placeholder="Chic40SevenLooks">
          </label>
          <label>상태
            <select name="status">
              ${TASK_STATUSES.map(s => `<option ${(r?.status || '아이디어') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>Props 파일명 (data/ 기준)
          <input name="propsFile" value="${esc(r?.propsFile || '')}" placeholder="chic40_2026_W18_summer_tops.json">
        </label>
        <label>출력 파일 경로 (outputs/ 기준)
          <input name="outputPath" value="${esc(r?.outputPath || '')}" placeholder="2026_W18_summer_tops/chic40_W18_v01.mp4">
        </label>
        <label>메모
          <textarea name="note">${esc(r?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = {
      title: fd.get('title'),
      composition: fd.get('composition') || 'Chic40SevenLooks',
      propsFile: fd.get('propsFile'),
      outputPath: fd.get('outputPath'),
      status: fd.get('status'),
      note: fd.get('note'),
    };
    if (isEdit) Object.assign(r, data);
    else db.chic40.renders.push({ id: uid(), ...data });
    save(); render();
  });
}

function openChapterModal(c = null) {
  const isEdit = !!c;
  openModal({
    title: isEdit ? '챕터 수정' : '챕터 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <div class="form-two">
          <label>챕터 번호 *
            <input name="num" type="number" required value="${esc(c?.num || (db.mocolumi.chapters.length + 1))}" min="1">
          </label>
          <label>상태
            <select name="status">
              ${TASK_STATUSES.map(s => `<option ${(c?.status || '아이디어') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>제목 (영문) *
          <input name="titleEn" required value="${esc(c?.titleEn || '')}" placeholder="The First Dream">
        </label>
        <label>제목 (한글)
          <input name="titleKo" value="${esc(c?.titleKo || '')}" placeholder="첫 번째 꿈">
        </label>
        <label>부제목 (영문)
          <input name="subtitleEn" value="${esc(c?.subtitleEn || '')}" placeholder="...">
        </label>
        <div class="form-two">
          <label>부제목 (한글)
            <input name="subtitleKo" value="${esc(c?.subtitleKo || '')}" placeholder="...">
          </label>
          <label>예약 발행일
            <input type="date" name="publishDate" value="${esc(c?.publishDate || '')}">
          </label>
        </div>
        <label>메모
          <textarea name="note">${esc(c?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = {
      num: parseInt(fd.get('num')), titleEn: fd.get('titleEn'), titleKo: fd.get('titleKo'),
      subtitleEn: fd.get('subtitleEn'), subtitleKo: fd.get('subtitleKo'),
      publishDate: fd.get('publishDate'), status: fd.get('status'), note: fd.get('note'),
    };
    if (isEdit) Object.assign(c, data);
    else db.mocolumi.chapters.push({ id: uid(), ...data });
    save(); render();
  });
}

function openEpisodeModal(e = null) {
  const isEdit = !!e;
  const progressStatuses = ['미시작', '제작중', '완료', '업로드완료'];
  openModal({
    title: isEdit ? '에피소드 수정' : '에피소드 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <div class="form-two">
          <label>에피소드 번호 *
            <input name="num" type="number" required value="${esc(e?.num || (db.wisdomsource.episodes.length + 1))}" min="1">
          </label>
          <label>플랫폼
            <select name="platform">
              ${['YouTube', 'YouTube Shorts', 'Substack'].map(pl => `<option ${(e?.platform || 'YouTube') === pl ? 'selected' : ''}>${pl}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>제목 *
          <input name="title" required value="${esc(e?.title || '')}" placeholder="짜라투스트라 서막">
        </label>
        <div class="form-three">
          <label>원고 상태
            <select name="scriptStatus">
              ${progressStatuses.map(s => `<option ${(e?.scriptStatus || '미시작') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
          <label>영상 상태
            <select name="videoStatus">
              ${progressStatuses.map(s => `<option ${(e?.videoStatus || '미시작') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
          <label>업로드 상태
            <select name="uploadStatus">
              ${progressStatuses.map(s => `<option ${(e?.uploadStatus || '미시작') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </label>
        </div>
        <label>메모
          <textarea name="note">${esc(e?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = {
      num: parseInt(fd.get('num')), title: fd.get('title'), platform: fd.get('platform'),
      scriptStatus: fd.get('scriptStatus'), videoStatus: fd.get('videoStatus'),
      uploadStatus: fd.get('uploadStatus'), note: fd.get('note'),
    };
    if (isEdit) Object.assign(e, data);
    else db.wisdomsource.episodes.push({ id: uid(), ...data });
    save(); render();
  });
}

function openContestModal(c = null) {
  const isEdit = !!c;
  openModal({
    title: isEdit ? '공모전 수정' : '공모전 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>공모전명 *
          <input name="name" required value="${esc(c?.name || '')}" placeholder="공모전 이름">
        </label>
        <div class="form-two">
          <label>마감일
            <input type="date" name="deadline" value="${esc(c?.deadline || '')}">
          </label>
          <label>상금
            <input name="prize" value="${esc(c?.prize || '')}" placeholder="예: 100만원 / 없음">
          </label>
        </div>
        <label>제출물
          <input name="submission" value="${esc(c?.submission || '')}" placeholder="영상, 사진, 기획서 등">
        </label>
        <label>상태
          <select name="status">
            ${TASK_STATUSES.map(s => `<option ${(c?.status || '아이디어') === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </label>
        <label>메모
          <textarea name="note">${esc(c?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = {
      name: fd.get('name'), deadline: fd.get('deadline'),
      prize: fd.get('prize'), submission: fd.get('submission'),
      status: fd.get('status'), note: fd.get('note'),
    };
    if (isEdit) Object.assign(c, data);
    else db.contest.entries.push({ id: uid(), ...data });
    save(); render();
  });
}

function openClipModal(c = null) {
  const isEdit = !!c;
  openModal({
    title: isEdit ? '클립 수정' : '클립 추가',
    submitLabel: isEdit ? '저장' : '추가',
    body: `
      <div class="form-grid">
        <label>장소명 *
          <input name="place" required value="${esc(c?.place || '')}" placeholder="예: 경복궁, 광장시장">
        </label>
        <label>촬영 폴더
          <input name="folder" value="${esc(c?.folder || '')}" placeholder="D:\\Photos\\...">
        </label>
        <label>키워드 (쉼표로 구분)
          <input name="keywords" value="${esc(c?.keywords || '')}" placeholder="서울, 봄, 나들이">
        </label>
        <label>업로드 상태
          <select name="uploadStatus">
            ${['미시작', '준비중', '업로드완료'].map(s => `<option ${(c?.uploadStatus || '미시작') === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </label>
        <label>메모
          <textarea name="note">${esc(c?.note || '')}</textarea>
        </label>
      </div>`,
  }, (fd) => {
    const data = {
      place: fd.get('place'), folder: fd.get('folder'),
      keywords: fd.get('keywords'), uploadStatus: fd.get('uploadStatus'), note: fd.get('note'),
    };
    if (isEdit) Object.assign(c, data);
    else db.naverclip.uploads.push({ id: uid(), ...data });
    save(); render();
  });
}

// ── Event binding ─────────────────────────
function bindEvents() {
  // 알림 배너 dismiss — 세션 동안 다시 표시 안 함
  document.querySelector('#btn-dismiss-banner')?.addEventListener('click', () => {
    bannerDismissed = true;
    document.querySelector('#alert-banner')?.remove();
  });

  // 사이드바 / 네비게이션 (alert-item의 data-view 클릭도 여기서 한 번만 처리)
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', () => {
      if (_dragHappened) { _dragHappened = false; return; }
      go(el.dataset.view);
    });
  });

  // 프로젝트 카드 (대시보드 클릭)
  document.querySelectorAll('.project-card[data-view]').forEach(el => {
    el.style.cursor = 'pointer';
  });

  // 작업 상태 변경
  document.querySelectorAll('.task-status-select').forEach(el => {
    el.addEventListener('change', () => {
      const t = db.tasks.find(t => t.id === el.dataset.id);
      if (t) { t.status = el.value; save(); render(); }
    });
  });

  // 작업 편집
  document.querySelectorAll('.task-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = db.tasks.find(t => t.id === el.dataset.id);
      if (t) openTaskModal(t);
    });
  });

  // 작업 삭제
  document.querySelectorAll('.task-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('이 작업을 삭제하시겠습니까?')) return;
      db.tasks = db.tasks.filter(t => t.id !== el.dataset.id);
      save(); render();
    });
  });

  // 작업 추가
  document.querySelector('#btn-add-task')?.addEventListener('click', () => openTaskModal());
  document.querySelector('#btn-add-project')?.addEventListener('click', () => openProjectCreateModal());

  // 작업 필터
  document.querySelector('#filter-project')?.addEventListener('change', updateTaskFilter);
  document.querySelector('#filter-status')?.addEventListener('change', updateTaskFilter);

  // 링크 추가 / 편집
  document.querySelector('#btn-add-link')?.addEventListener('click', () => openLinkModal());
  document.querySelectorAll('.link-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const l = db.links.find(l => l.id === el.dataset.id);
      if (l) openLinkModal(l);
    });
  });

  // 프로젝트 링크 추가
  document.querySelectorAll('.proj-link-add').forEach(el => {
    el.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === el.dataset.pid);
      if (p) openProjLinkModal(p, -1);
    });
  });

  // 프로젝트 링크 편집
  document.querySelectorAll('.proj-link-edit').forEach(el => {
    el.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === el.dataset.pid);
      if (p) openProjLinkModal(p, parseInt(el.dataset.idx));
    });
  });

  // 프로젝트 링크 삭제
  document.querySelectorAll('.proj-link-del').forEach(el => {
    el.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === el.dataset.pid);
      if (!p) return;
      const idx = parseInt(el.dataset.idx);
      if (!confirm('이 링크를 삭제하시겠습니까?')) return;
      p.links.splice(idx, 1);
      save(); render();
    });
  });

  // 프로젝트 nextAction 편집
  document.querySelectorAll('.project-prompt-copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const p = findCodexPrompt(el.dataset.id);
      if (p) copyToClipboard(p.prompt, el, '추천 지시문을 복사했습니다.');
    });
  });
  document.querySelectorAll('.project-agent-add-btn').forEach(el => {
    el.addEventListener('click', () => {
      openUserCodexPromptModal('agent', null, el.dataset.project || '');
    });
  });
  document.querySelectorAll('.project-codex-more-btn').forEach(el => {
    el.addEventListener('click', () => {
      codexProject = el.dataset.project || '';
      codexCategory = '';
      codexSearch = '';
      go('codex');
    });
  });

  document.querySelectorAll('.proj-next-edit').forEach(el => {
    el.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === el.dataset.id);
      if (!p) return;
      openModal({
        title: '다음 할 일 수정',
        submitLabel: '저장',
        body: `<label>다음 할 일<input name="nextAction" value="${esc(p.nextAction || '')}"></label>`,
      }, (fd) => { p.nextAction = fd.get('nextAction'); save(); render(); });
    });
  });

  // 프로젝트 상태 변경
  document.querySelectorAll('.project-status-btn, .project-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === el.dataset.id);
      if (p) openProjectModal(p);
    });
  });

  // 시크40 렌더
  document.querySelector('#btn-add-render')?.addEventListener('click', () => openRenderModal());
  document.querySelectorAll('.render-edit-btn').forEach(el => {
    el.addEventListener('click', () => { const r = db.chic40.renders.find(r => r.id === el.dataset.id); if (r) openRenderModal(r); });
  });
  document.querySelectorAll('.render-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('삭제하시겠습니까?')) return;
      db.chic40.renders = db.chic40.renders.filter(r => r.id !== el.dataset.id);
      save(); render();
    });
  });
  document.querySelectorAll('.render-copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const r = db.chic40.renders.find(r => r.id === el.dataset.id);
      if (!r) return;
      const cmd = makeRenderCommand(r);
      navigator.clipboard.writeText(cmd).then(() => {
        const orig = el.innerHTML;
        el.textContent = '✓ 복사됨';
        setTimeout(() => { if (el.isConnected) el.innerHTML = orig; }, 1800);
        toast('렌더 명령어를 클립보드에 복사했습니다.');
      }).catch(() => {
        // file:// 또는 보안 정책으로 clipboard API 차단 시 → 모달에서 직접 선택
        openModal({
          title: '명령어 직접 복사',
          submitLabel: '닫기',
          body: `
            <p style="font-size:13px;color:var(--muted);margin-bottom:8px">
              클립보드 접근이 차단됐습니다.<br>
              아래 명령어를 전체 선택(Ctrl+A) 후 복사하세요 (Ctrl+C).
            </p>
            <textarea id="cmd-fallback-area" readonly
              style="font-family:'Cascadia Code','Consolas',monospace;font-size:12px;min-height:96px;word-break:break-all"
            ></textarea>`,
        }, () => {});
        // innerHTML 이후에 value 설정 (XSS 방지)
        setTimeout(() => {
          const ta = document.querySelector('#cmd-fallback-area');
          if (ta) { ta.value = cmd; ta.select(); ta.focus(); }
        }, 60);
      });
    });
  });

  // Moco 챕터
  document.querySelector('#btn-add-chapter')?.addEventListener('click', () => openChapterModal());
  document.querySelectorAll('.chapter-edit-btn').forEach(el => {
    el.addEventListener('click', () => { const c = db.mocolumi.chapters.find(c => c.id === el.dataset.id); if (c) openChapterModal(c); });
  });
  document.querySelectorAll('.chapter-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('삭제하시겠습니까?')) return;
      db.mocolumi.chapters = db.mocolumi.chapters.filter(c => c.id !== el.dataset.id);
      save(); render();
    });
  });

  // 지혜샘 에피소드
  document.querySelector('#btn-add-episode')?.addEventListener('click', () => openEpisodeModal());
  document.querySelectorAll('.episode-edit-btn').forEach(el => {
    el.addEventListener('click', () => { const e = db.wisdomsource.episodes.find(e => e.id === el.dataset.id); if (e) openEpisodeModal(e); });
  });
  document.querySelectorAll('.episode-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('삭제하시겠습니까?')) return;
      db.wisdomsource.episodes = db.wisdomsource.episodes.filter(e => e.id !== el.dataset.id);
      save(); render();
    });
  });

  // 공모전
  document.querySelector('#btn-add-contest')?.addEventListener('click', () => openContestModal());
  document.querySelectorAll('.contest-filter-btn').forEach(el => {
    el.addEventListener('click', () => {
      contestFilter = el.dataset.filter || 'actionable';
      render();
    });
  });
  document.querySelectorAll('.contest-detail-btn').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      if (expandedContestIds.has(id)) expandedContestIds.delete(id);
      else expandedContestIds.add(id);
      render();
    });
  });
  document.querySelectorAll('.contest-agent-copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const c = getContestByDisplayId(el.dataset.id);
      if (!c) return toast('공모전 항목을 다시 찾을 수 없습니다.');
      const type = el.parentElement?.querySelector('.contest-agent-type')?.value || 'strategy';
      copyToClipboard(buildContestAgentPrompt(c, type), el, '에이전트 지시문을 복사했습니다.');
    });
  });
  document.querySelectorAll('.contest-edit-btn').forEach(el => {
    el.addEventListener('click', () => { const c = db.contest.entries.find(c => c.id === el.dataset.id); if (c) openContestModal(c); });
  });
  document.querySelectorAll('.contest-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('삭제하시겠습니까?')) return;
      db.contest.entries = db.contest.entries.filter(c => c.id !== el.dataset.id);
      save(); render();
    });
  });
  document.querySelectorAll('.contest-copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const external = readExternalContestHubEntries().find(c => c.id === el.dataset.id);
      if (!external) return toast('공모전 허브 항목을 다시 찾을 수 없습니다.');
      if (!confirm('이 공모전을 내 허브에 복사할까요?')) return;
      copyExternalContestToHub(external);
    });
  });

  // 네이버클립
  document.querySelector('#btn-add-clip')?.addEventListener('click', () => openClipModal());
  document.querySelectorAll('.clip-edit-btn').forEach(el => {
    el.addEventListener('click', () => { const c = db.naverclip.uploads.find(c => c.id === el.dataset.id); if (c) openClipModal(c); });
  });
  document.querySelectorAll('.clip-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('삭제하시겠습니까?')) return;
      db.naverclip.uploads = db.naverclip.uploads.filter(c => c.id !== el.dataset.id);
      save(); render();
    });
  });

  // 설정 저장
  document.querySelector('#btn-save-settings')?.addEventListener('click', () => {
    db.settings.ownerName = document.querySelector('#setting-name')?.value || '크리에이터';
    save(); render(); toast('설정이 저장되었습니다.');
  });

  // JSON 내보내기
  document.querySelector('#btn-export')?.addEventListener('click', () => {
    const exportData = { ...db, userCodexPrompts: loadUserCodexPrompts() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `creator-hub-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    toast('JSON 파일로 내보냈습니다.');
  });

  // JSON 가져오기
  document.querySelector('#btn-import')?.addEventListener('click', () => {
    document.querySelector('#file-import')?.click();
  });
  document.querySelector('#file-import')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        if (confirm('기존 데이터를 덮어씁니다. 계속하시겠습니까?')) {
          if (Array.isArray(data.userCodexPrompts)) {
            saveUserCodexPrompts(data.userCodexPrompts);
            delete data.userCodexPrompts;
          }
          db = deepMerge(cloneData(SEED), data);
          save(); render(); toast('데이터를 가져왔습니다.');
        }
      } catch { alert('JSON 파일을 읽을 수 없습니다.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // 전체 초기화
  document.querySelector('#btn-reset')?.addEventListener('click', () => {
    if (!confirm('모든 데이터를 초기화합니다. 정말 계속하시겠습니까?')) return;
    if (!confirm('마지막 확인: 복구할 수 없습니다. 초기화하시겠습니까?')) return;
    localStorage.removeItem(STORAGE_KEY);
    db = load();
    render();
    toast('초기화되었습니다.');
  });

  // 용어장 (remotionMasterView 내 embedded 용어장)
  document.querySelector('#btn-add-term')?.addEventListener('click', () => openTermModal());
  bindTermEvents();

  // Remotion 용어장 (사이드바 전용)
  bindGlossaryEvents();

  // 명령어 보관함 필터
  document.querySelector('#btn-add-codex-prompt')?.addEventListener('click', () => openUserCodexPromptModal('prompt'));
  document.querySelector('#btn-add-codex-agent')?.addEventListener('click', () => openUserCodexPromptModal('agent'));
  document.querySelector('#codex-search')?.addEventListener('input', e => {
    codexSearch = e.target.value;
    document.querySelector('#codex-cards').innerHTML = renderCodexCards();
    bindCodexCardEvents();
  });
  document.querySelector('#codex-filter-project')?.addEventListener('change', e => {
    codexProject = e.target.value;
    document.querySelector('#codex-cards').innerHTML = renderCodexCards();
    bindCodexCardEvents();
  });
  document.querySelector('#codex-filter-category')?.addEventListener('change', e => {
    codexCategory = e.target.value;
    document.querySelector('#codex-cards').innerHTML = renderCodexCards();
    bindCodexCardEvents();
  });
  bindCodexCardEvents();

  // 대시보드 메모 저장
  document.querySelector('#dash-memo-save')?.addEventListener('click', () => {
    const ta = document.getElementById('dash-memo');
    if (!ta) return;
    db.settings.dashNote = ta.value;
    save();
    const s = document.getElementById('dash-memo-status');
    if (s) { s.textContent = '저장됨'; setTimeout(() => { s.textContent = ''; }, 1500); }
  });

  // 오늘 할 일 메모 저장
  document.querySelector('#tasks-memo-save')?.addEventListener('click', () => {
    const ta = document.getElementById('tasks-memo');
    if (!ta) return;
    db.settings.tasksNote = ta.value;
    save();
    const s = document.getElementById('tasks-memo-status');
    if (s) { s.textContent = '저장됨'; setTimeout(() => { s.textContent = ''; }, 1500); }
  });

  // 프로젝트 메모 저장
  document.querySelectorAll('[id^="proj-memo-save-"]').forEach(btn => {
    const pid = btn.id.replace('proj-memo-save-', '');
    btn.addEventListener('click', () => {
      const p = db.projects.find(p => p.id === pid);
      const ta = document.getElementById('proj-memo-' + pid);
      if (!p || !ta) return;
      p.note = ta.value;
      save();
      const status = document.getElementById('proj-memo-status-' + pid);
      if (status) { status.textContent = '저장됨'; setTimeout(() => { status.textContent = ''; }, 1500); }
    });
  });

  // 사이드바 프로젝트 드래그 정렬
  const navProjs = [...document.querySelectorAll('.nav button[data-proj-id]')];
  if (navProjs.length) setupDrag(navProjs, (from, to) => {
    const arr = db.projects;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    save(); render();
  });

  // 할 일 목록 드래그 정렬
  const taskRows = [...document.querySelectorAll('.list-row[data-task-id]')];
  if (taskRows.length) setupDrag(taskRows, (from, to) => {
    const arr = db.tasks;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    save(); updateTaskFilter();
  });
}

function updateTaskFilter() {
  const project = document.querySelector('#filter-project')?.value || '';
  const status  = document.querySelector('#filter-status')?.value  || '';
  const list = document.querySelector('#task-list');
  if (list) list.innerHTML = renderTaskList(project, status);
  bindTaskListEvents();
}

function bindTaskListEvents() {
  const taskRows = [...document.querySelectorAll('.list-row[data-task-id]')];
  if (taskRows.length) setupDrag(taskRows, (from, to) => {
    const arr = db.tasks;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    save(); updateTaskFilter();
  });

  document.querySelectorAll('.task-status-select').forEach(el => {
    el.addEventListener('change', () => {
      const t = db.tasks.find(t => t.id === el.dataset.id);
      if (t) { t.status = el.value; save(); updateTaskFilter(); }
    });
  });
  document.querySelectorAll('.task-edit-btn').forEach(el => {
    el.addEventListener('click', () => {
      const t = db.tasks.find(t => t.id === el.dataset.id);
      if (t) openTaskModal(t);
    });
  });
  document.querySelectorAll('.task-delete-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('이 작업을 삭제하시겠습니까?')) return;
      db.tasks = db.tasks.filter(t => t.id !== el.dataset.id);
      save();
      updateTaskFilter();
    });
  });
}

// ── Drag-and-drop helper ──────────────────
function setupDrag(items, onDrop) {
  let srcIdx = null;
  items.forEach((el, i) => {
    el.addEventListener('dragstart', e => {
      srcIdx = i;
      _dragHappened = true;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => el.classList.add('dragging'), 0);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      items.forEach(x => x.classList.remove('drag-over'));
      srcIdx = null;
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      items.forEach(x => x.classList.remove('drag-over'));
      if (srcIdx !== null && srcIdx !== i) el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      if (srcIdx === null || srcIdx === i) return;
      onDrop(srcIdx, i);
    });
  });
}

// ── Contest link URL 교정 ─────────────────
function ensureContestLink() {
  const p = db.projects.find(p => p.id === 'contest');
  if (!p) return;
  const CORRECT_URL = '';
  let changed = false;
  (p.links || []).forEach(l => {
    if ((l.label === '공모전 허브 미니앱' || l.label === '공모전 허브' || l.title === '공모전 허브 미니앱') && l.url !== CORRECT_URL) {
      l.url = CORRECT_URL;
      changed = true;
    }
  });
  if (changed) save();
}

// ── Bootstrap ─────────────────────────────
render();
