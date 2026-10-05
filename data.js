// Homepage content. Add public project links after reviewing their destinations.
window.portfolioData = {
  showDrafts: false,

  research: [
    {
      number: "01",
      period: "2026",
      status: "Journal accepted",
      title: "Evaluating Qwen3-ASR for Korean Speech Recognition",
      summary: "Evaluated how model size and inference settings affect recognition accuracy across Korean speech datasets.",
      points: [
        "Compared Qwen3-ASR 0.6B and 1.7B on 10 Korean evaluation sets.",
        "Analyzed language settings, maximum generation length, temperature, and repetition penalty using character error rate.",
        "Designed the study, implemented experiments, analyzed results, and wrote the paper."
      ],
      tags: ["Qwen3-ASR", "Korean speech", "Evaluation"]
    },
    {
      number: "02",
      period: "2026 — Present",
      status: "Ongoing",
      title: "DCASE 2026 Task 6 · Audio Moment Retrieval",
      summary: "Studying how to locate audio segments that match natural-language queries.",
      points: [
        "Reproduced the official baseline and its full evaluation pipeline.",
        "Experimenting with MS-CLAP audio-language representations and DETR-based temporal localization models."
      ],
      tags: ["DCASE", "Audio-language", "Temporal localization"]
    },
    {
      number: "03",
      period: "2025 — 2026",
      status: "Conference awards",
      title: "Academic-Regulation QA Data & Error-Correction Training",
      summary: "Built and evaluated training data for question answering grounded in university academic regulations.",
      points: [
        "Designed a rubric-based dataset for academic-regulation questions and answers in 2025.",
        "Designed and reviewed 9,958 synthetic examples labeled PASS, FAIL, and OOS; fine-tuned Qwen2.5-7B-Instruct and Llama-3.1-8B with 4-bit QLoRA.",
        "Measured a FAIL correction rate of 0.9897 when ground-truth review signals were supplied; identified error review as a bottleneck in end-to-end inference."
      ],
      tags: ["Question answering", "Dataset", "Reliable AI"]
    }
  ],

  publications: [
    {
      year: "2026", type: "journal", typeLabel: "Journal · Accepted",
      title: "Evaluation of Qwen3-ASR and Analysis of Inference Parameters across Multiple Korean Speech Corpora",
      venue: "The Journal of the Acoustical Society of Korea, 45(5)",
      role: "First author", note: "Accepted Aug 25, 2026 · In press"
    },
    {
      year: "2026", type: "poster", typeLabel: "Poster presentation",
      title: "Constructing a Synthetic Dataset for Error Review and Correction Training in Academic-Regulation Question Answering Models",
      venue: "Korean Association of Data Science Summer Conference",
      role: "First author", note: "Paper Encouragement Award"
    },
    {
      year: "2026", type: "poster", typeLabel: "Poster presentation",
      title: "Inference Parameter Optimization of Qwen3-ASR across Multiple Korean Speech Corpora",
      venue: "Institute of Electronics and Information Engineers Summer Conference · P4-80",
      role: "First author", note: "2026"
    },
    {
      year: "2026", type: "poster", typeLabel: "Poster presentation",
      title: "Inference Parameter Optimization of a Public Multilingual ASR Model for Korean Speech Recognition",
      venue: "Joint Spring Conference · Korean Society of Speech Sciences & Phonology-Morphology Circle of Korea",
      role: "First author", note: "Jun 13, 2026"
    },
    {
      year: "2025", type: "poster", typeLabel: "Poster presentation",
      title: "Design and Construction of a Rubric-Based Training Dataset for University Academic Regulations",
      venue: "Korean Institute of Smart Media Fall Conference",
      role: "First author", note: "Outstanding Paper Award"
    },
    {
      year: "2025", type: "paper", typeLabel: "International conference",
      title: "Low-Latency Deep Learning-Based Denoising of Self-Generated Footstep Noise in Quadruped Robots for Remote Acoustic Situational Awareness",
      venue: "16th International Conference on Theoretical and Computational Acoustics (ICTCA 2025)",
      role: "Third author", note: "Busan · Aug 2025"
    }
  ],

  awards: [
    {
      year: "Jun 2026", title: "Paper Encouragement Award",
      detail: "Synthetic dataset for error review and correction training in academic-regulation QA",
      organization: "Korean Association of Data Science", category: "Research"
    },
    {
      year: "Nov 2025", title: "Outstanding Paper Award",
      detail: "Rubric-based training dataset for university academic regulations",
      organization: "Korean Institute of Smart Media", category: "Research"
    },
    {
      year: "Nov 2025", title: "Grand Prize",
      detail: "Hanshin University AI Festival, General Division",
      organization: "Hanshin University", category: "Competition"
    },
    {
      year: "Oct 2025", title: "Top Excellence Award",
      detail: "2025 Elysian Gangchon AI Hackathon",
      organization: "SW-Centered University Council", category: "Competition"
    },
    {
      year: "Aug 2025", title: "Outstanding Paper Award",
      detail: "Improving service delivery for AI-based assistive devices and welfare equipment for people with disabilities and older adults",
      organization: "DAEHAN Society of Industrial Management", category: "Research"
    },
    {
      year: "May 2025", title: "Grand Prize",
      detail: "AI/Blockchain Startup Competition",
      organization: "Korea University SW-Centered University Program", category: "Competition"
    }
  ],

  scholarships: [
    {
      year: "During studies", title: "Academic Excellence Scholarship",
      detail: "Awarded every semester for academic excellence.",
      organization: "Hanshin University", category: "Scholarship"
    },
    {
      year: "Jul 2025 — Graduation", title: "ILJU Academy and Culture Foundation",
      detail: "Selected for the 33rd cohort of scholars.",
      organization: "Taekwang Group", category: "Scholarship"
    }
  ],

  activities: [
    {
      period: "Jun 2026 — Present", title: "AIUX Lab Leader",
      text: "Organize regular activities and research exchange for an undergraduate research community.",
      label: "Leadership"
    },
    {
      period: "400+ hours in total", title: "Volunteer Service",
      text: "More than 400 cumulative volunteer hours across activities. I tutor elementary school students weekly as an ILJU scholar.",
      label: "Service"
    },
    {
      period: "Spring & Fall 2026", title: "Teaching Assistant",
      text: "Supported Mathematics for AI & SW and Applied Deep Learning courses.",
      label: "Teaching"
    },
    {
      period: "Jan 2026", title: "CES 2026 Participant",
      text: "Selected by Hanshin University to attend CES 2026.",
      label: "Selected activity"
    }
  ]
};
