/*
 * 사이트의 주요 내용은 이 파일에서 관리합니다.
 * 영문 버전을 추가할 때 같은 구조의 `portfolioDataEn`을 만들면 됩니다.
 */
window.portfolioData = {
  cvUrl: "./assets/Park_So_Yeong_CV.pdf",
  showDrafts: false,

  research: [
    {
      number: "01",
      period: "2025 — Present",
      status: "Journal Accepted",
      title: "다중 한국어 음성 코퍼스 기반 Qwen3-ASR 평가",
      summary:
        "공개 다국어 ASR 모델이 서로 다른 한국어 음성 데이터에서도 안정적으로 동작하도록 추론 파라미터를 비교·분석했습니다.",
      points: [
        "연구 설계, 실험 구현, 결과 분석 및 논문 작성 수행",
        "복수 한국어 음성 코퍼스에서 모델 규모와 추론 조건별 성능 비교",
        "한국음향학회지 게재 승인"
      ],
      tags: ["Qwen3-ASR", "ASR", "Korean Speech", "Inference Analysis"]
    },
    {
      number: "02",
      period: "2026 — Present",
      status: "Ongoing",
      title: "DCASE 2026 Task 6 · Audio Moment Retrieval",
      summary:
        "자연어 질의와 대응하는 오디오의 시간 구간을 찾는 언어 기반 오디오 이해 문제를 연구하고 있습니다.",
      points: [
        "공개 베이스라인 구현 및 전체 평가 파이프라인 재현",
        "공식 베이스라인과 유사한 수준의 결과 확인",
        "오디오·언어 표현과 시간 구간 탐색 모델의 결합 실험"
      ],
      tags: ["DCASE", "Audio-Language", "MS-CLAP", "QD-DETR"]
    },
    {
      number: "03",
      period: "2025",
      status: "Awarded Research",
      title: "대학 학사규정 QA를 위한 학습 데이터 설계",
      summary:
        "대학 학사규정 질의응답에서 근거와 답변의 일치성을 높이기 위해 루브릭 기반 학습 데이터셋을 설계하고 구축했습니다.",
      points: [
        "학사규정 문서 기반 질의응답 데이터 구축과 품질 기준 설계",
        "답변 오류를 유형화하고 평가 가능한 루브릭으로 구조화",
        "스마트미디어학회 우수논문상 및 한국데이터사이언스학회 장려논문상"
      ],
      tags: ["sLLM", "QA", "Dataset", "Reliable AI"]
    }
  ],

  publications: [
    {
      year: "2026",
      type: "journal",
      typeLabel: "학술지 · Accepted",
      title: "다중 한국어 음성 코퍼스에서의 Qwen3-ASR 평가 및 추론 파라미터 분석",
      venue: "한국음향학회지",
      role: "제1저자",
      note: "Accepted 2026.08.25 · in press"
    },
    {
      year: "2026",
      type: "poster",
      typeLabel: "학술대회 · Poster",
      title: "다중 한국어 음성 코퍼스 기반 Qwen3-ASR 범용 추론 파라미터 최적화",
      venue: "대한전자공학회",
      role: "제1저자",
      note: "포스터 발표"
    },
    {
      year: "2026",
      type: "poster",
      typeLabel: "학술대회 · Poster",
      title: "공개 다국어 ASR 모델의 한국어 음성인식을 위한 모델 규모별 추론 파라미터 최적화",
      venue: "한국음성학회",
      role: "제1저자",
      note: "포스터 발표"
    },
    {
      year: "2026",
      type: "paper",
      typeLabel: "학술대회 논문",
      title: "학사 규정 질의응답 모델의 오류 검토·교정 학습을 위한 합성 데이터셋 구축",
      venue: "한국데이터사이언스학회 하계종합학술대회",
      role: "제1저자",
      note: "장려논문상 · 2026.06.19"
    },
    {
      year: "2025",
      type: "paper",
      typeLabel: "학술대회 논문",
      title: "루브릭 기반 대학 학사규정에 대한 학습 데이터셋 설계 및 구축",
      venue: "스마트미디어학회 학술대회",
      role: "제1저자",
      note: "우수논문상"
    },
    {
      year: "2025",
      type: "paper",
      typeLabel: "국제학술대회 논문",
      title: "Low-Latency Deep Learning-Based Denoising of Self-Generated Footstep Noise in Quadruped Robots for Remote Acoustic Situational Awareness",
      venue: "16th International Conference on Theoretical and Computational Acoustics (ICTCA 2025)",
      role: "제3저자",
      note: "Busan · 2025.08"
    }
  ],

  awards: [
    {
      year: "2025.11",
      title: "우수논문상",
      detail: "루브릭 기반 대학 학사규정에 대한 학습 데이터셋 설계 및 구축",
      organization: "스마트미디어학회",
      category: "research"
    },
    {
      year: "2026.06",
      title: "장려논문상",
      detail: "학사 규정 질의응답 모델의 오류 검토·교정 학습을 위한 합성 데이터셋 구축",
      organization: "한국데이터사이언스학회",
      category: "research"
    },
    {
      year: "2025.08",
      title: "우수논문상",
      detail: "AI 기반 장애인과 시니어 보조기기 및 복지용구 서비스 전달 체계 개선 방안",
      organization: "대한산업경영학회",
      category: "research"
    },
    {
      year: "2025.10",
      title: "최우수상",
      detail: "2025 강촌 엘리시안 AI 해커톤",
      organization: "SW중심대학협의회",
      category: "competition"
    },
    {
      year: "2025.11",
      title: "대상",
      detail: "한신대학교 AI 페스티벌 일반부",
      organization: "한신대학교",
      category: "competition"
    },
    {
      year: "2025.05",
      title: "대상",
      detail: "고려대학교 AI/블록체인 창업경진대회",
      organization: "고려대학교 SW중심대학사업단",
      category: "competition"
    },
    {
      year: "2024.09",
      title: "최우수상",
      detail: "U10 경기권 대학 연합 기업분석경진대회",
      organization: "한신대학교",
      category: "competition"
    },
    {
      year: "2025.07 — 졸업",
      title: "일주학술문화재단 33기 장학생",
      detail: "장학 지원과 주 1회 초등학생 대상 교육봉사",
      organization: "일주학술문화재단 · 태광그룹",
      category: "scholarship"
    }
  ],

  activities: [
    {
      period: "2026.06 — Present",
      title: "AIUX Lab Leader",
      text: "학부 연구 커뮤니티의 정기 활동과 구성원 간 연구 교류를 운영하고 있습니다.",
      label: "Leadership"
    },
    {
      period: "2026 Fall",
      title: "딥러닝 응용 수업 조교",
      text: "수업 운영과 학습 활동을 지원했습니다.",
      label: "Teaching"
    },
    {
      period: "2026 Spring",
      title: "AI·SW 수학 수업 조교",
      text: "수업 운영과 학생들의 기초 학습을 지원했습니다.",
      label: "Teaching"
    },
    {
      period: "2026.01",
      title: "CES 2026 참가",
      text: "교내 선발을 통해 세계 최대 규모의 기술 박람회인 CES 2026을 참관했습니다.",
      label: "Selected Activity"
    },
    {
      period: "Weekly",
      title: "초등학생 대상 교육봉사",
      text: "일주학술문화재단 장학생 활동으로 주 1회 교육봉사에 참여하고 있습니다.",
      label: "Service"
    }
  ],

  skills: [
    {
      title: "Programming & ML",
      items: ["Python", "PyTorch", "Transformers", "vLLM"]
    },
    {
      title: "Speech & Audio",
      items: ["Qwen3-ASR", "Whisper", "MS-CLAP", "QD-DETR"]
    },
    {
      title: "Data & Experiment",
      items: ["QLoRA", "CER/WER Evaluation", "Dataset Validation", "Experiment Tracking"]
    },
    {
      title: "Tools",
      items: ["Linux", "Git", "Reproducible Pipelines"]
    }
  ]
};
