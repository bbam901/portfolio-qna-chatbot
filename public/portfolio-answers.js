(() => {
  const infra = '/work/infra-ai-ops-lab/';
  const helpdesk = '/work/ai-helpdesk-manual-assistant/';
  const documents = [
    {
      id: 'profile', title: '서범규 소개', url: '/about/',
      keywords: '누구 이름 소개 경력 경험 직무 강점 자기소개 운영 자동화 서범규',
      text: '서범규는 군 통신망과 사내 IT 인프라를 운영했습니다. 통신 장애 대응, 사용자 지원, 대응 절차 문서화와 반복 업무 자동화 경험이 있습니다.',
    },
    {
      id: 'military', title: '군 통신망 운영 경험', url: '/about/',
      keywords: '군 군에 군대 군복무 군경력 소대장 중대장 통신망 인터넷 국방망 cctv 복구 교육 매뉴얼',
      text: '군 통신소대장과 본부중대장으로 근무하며 인터넷·국방망·CCTV 등 통신망을 운영했습니다. 장애 원인을 분석하고 긴급 복구와 재발 방지 조치를 했으며, 대응 매뉴얼을 작성해 사용자 교육에 활용했습니다.',
    },
    {
      id: 'internal', title: '사내 IT 운영 경험', url: '/about/',
      keywords: '사내 전산 전산정보팀 네트워크 방화벽 서버 vpn mssql 데이터 보안 개인정보 helpdesk 지원',
      text: '전산정보팀에서 사내 서버, 네트워크 장비, VPN, 방화벽을 운영했습니다. MSSQL 데이터와 사내 프로그램을 유지보수하고 사용자 문의와 개인정보보호 관련 보안점검에 대응했습니다.',
    },
    {
      id: 'automation', title: '업무 자동화 경험', url: '/about/',
      keywords: '엑셀 excel 수식 자동화 보고 인원 물자 효율 감정서 검수 업무',
      text: 'Excel 수식으로 인원·물자 보고 업무를 자동화했습니다. 감정서 검수와 보고서 자동 작성을 위한 AI 개발에도 참여했습니다. 이 포트폴리오에는 정량 성과의 산정 근거가 공개되어 있지 않습니다.',
    },
    {
      id: 'projects', title: '대표 프로젝트', url: '/work/',
      keywords: '프로젝트 대표 추천 목록 두개 작업 작업물 포트폴리오',
      text: '대표 프로젝트는 인프라 모니터링 랩과 매뉴얼 기반 AI 헬프데스크입니다. 모니터링 랩에는 Grafana 화면과 샘플 장애 리포트, 헬프데스크에는 가상 프린터 장애에 대한 조치와 근거 화면이 있습니다.',
    },
    {
      id: 'infra', title: '인프라 모니터링 랩', url: infra,
      keywords: '인프라 모니터링 랩 관측성 ops lab grafana prometheus loki alertmanager 메트릭 로그 장애 구성 재현 직접 기술',
      text: 'Docker Compose로 FastAPI와 Nginx를 구성하고 Prometheus, Grafana, Loki, Alertmanager를 연결한 개인 실습입니다. 5xx와 응답 지연을 재현하고 메트릭·로그·알림을 확인했습니다. 시나리오와 장애 리포트 생성 스크립트, 런북을 작성했습니다.',
    },
    {
      id: 'report', title: '샘플 장애 리포트', url: 'https://github.com/bbam901/infra-ai-ops-lab/blob/main/reports/sample_incident_report.md',
      keywords: '리포트 보고서 샘플 runbook 런북 gemini markdown 규칙 알림 원인 판단 5xx promql',
      text: '모니터링 랩은 요청 수, 오류율, 응답 시간과 로그를 조회해 Markdown 장애 리포트를 만듭니다. Gemini API 키가 없을 때에는 규칙 기반 리포트를 생성할 수 있습니다. Grafana 패널에 데이터가 없을 때는 실제 레이블을 확인해 PromQL을 수정했습니다.',
    },
    {
      id: 'helpdesk', title: '매뉴얼 기반 AI 헬프데스크', url: helpdesk,
      keywords: '헬프데스크 helpdesk itsm pdf 매뉴얼 프린터 티켓 next postgresql prisma docker 직접 구현',
      text: '개인 MVP에서 Next.js·TypeScript로 대시보드를 만들고, PDF 파싱과 단락 검색, 티켓 조회·처리 흐름을 구현했습니다. PostgreSQL과 Docker를 연결하고 Docker 볼륨으로 PDF 원본과 DB 데이터가 컨테이너를 다시 만들어도 유지되도록 했습니다.',
    },
    {
      id: 'search', title: '헬프데스크 검색과 근거 표시', url: helpdesk,
      keywords: '검색 기준 가중치 유사어 단락 점수 출처 근거 rag 임베딩 벡터 llm 로컬 키워드 응답 헬프데스크 매뉴얼 찾아 찾는',
      text: '헬프데스크는 유사어로 질문을 확장하고, 제목 일치와 키워드 포함 여부를 기준으로 단락의 점수를 매깁니다. 조치 단계와 PDF 근거 문장을 함께 보여주며, 점수가 낮으면 헬프데스크 연락 경로를 안내합니다. 벡터 검색과 로컬 LLM은 향후 계획입니다.',
    },
    {
      id: 'scope', title: '프로젝트 검증 범위', url: '/work/',
      keywords: '실무 실습 차이 운영환경 회사 실제 적용 배포 실서버 프로덕션 테스트 검증 개인 mvp',
      text: '인프라 모니터링 랩의 검증 범위는 로컬 실습입니다. 헬프데스크는 가상 매뉴얼과 모의 로그인을 사용하는 개인 MVP입니다. 포트폴리오에는 실제 운영 환경에 배포했다는 근거가 공개되어 있지 않습니다.',
    },
    {
      id: 'contact', title: '연락처와 공개 프로필', url: '/about/',
      keywords: '연락 연락처 메일 이메일 email 문의 깃허브 github 노션 notion',
      text: '이메일 주소는 소개 페이지와 사이트 하단에 표시되어 있습니다. 같은 위치에서 GitHub와 Notion 포트폴리오 링크를 찾을 수 있습니다.',
    },
  ];

  function rank(question) {
    const normalized = question.toLowerCase().normalize('NFKC');
    const tokens = normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
    return documents.map(doc => {
      const keys = doc.keywords.split(' ');
      const score = keys.reduce((total, key) => {
        if (tokens.includes(key)) return total + (key.length > 2 ? 4 : 3);
        if (key === '군에' && tokens.some(token => token.startsWith(key))) return total + 3;
        if (key.length >= 2 && normalized.includes(key)) return total + (key.length > 2 ? 3 : 1);
        return total;
      }, 0);
      return { doc, score };
    }).filter(item => item.score >= 3).sort((a, b) => b.score - a.score);
  }

  function fallback(question, history = []) {
    let matches = rank(question);
    if (!matches.length && /그건|그거|그건요|그럼|더 자세|조금 더/.test(question)) {
      const previous = history.filter(message => message.role === 'user').at(-1);
      if (previous) matches = rank(previous.content);
    }
    const entries = matches.slice(0, 2).filter(item => item.score >= matches[0].score * 0.65);
    if (!entries.length) {
      return {
        text: '공개된 포트폴리오에서 이 질문의 답을 찾지 못했어요. 서범규님의 경력, 인프라 모니터링 랩, AI 헬프데스크에 대해 물어보세요.',
        sources: [],
        mode: 'search',
      };
    }
    return {
      text: entries.map(({ doc }) => doc.text).join('\n\n'),
      sources: [...new Map(entries.map(({ doc }) => [doc.url, { title: doc.title, url: doc.url }])).values()],
      mode: 'search',
    };
  }

  globalThis.portfolioAnswers = { documents, rank, fallback };
})();
