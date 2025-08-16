import React, { useEffect, useState, useRef } from 'react';
import PremiumCard from './PremiumCard';

interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export default function JourneySection(): JSX.Element {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps: JourneyStep[] = [
    {
      number: "01",
      title: "Глубокий аудит бизнеса",
      description: "Смотрим все аспекты и выявляем точки роста",
      icon: "🔍",
      duration: "3-5 дней"
    },
    {
      number: "02", 
      title: "Персональная стратегия развития",
      description: "Шаг за шагом к вашей цели",
      icon: "📈",
      duration: "2-3 дня"
    },
    {
      number: "03",
      title: "Разработка цифрового продукта",
      description: "Сайт, интернет-магазин или приложение, идеально подходящее бизнесу",
      icon: "💻",
      duration: "1-2 недели"
    },
    {
      number: "04",
      title: "Внедрение CRM и автоматизация",
      description: "Умные инструменты для общения с клиентами и повышения продаж",
      icon: "🤖",
      duration: "3-5 дней"
    },
    {
      number: "05",
      title: "Обучение и постоянная поддержка",
      description: "Вы спокойно развиваетесь, мы сопровождаем",
      icon: "🎓",
      duration: "Постоянно"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps((prev) => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const stepElements = sectionRef.current?.querySelectorAll('.journey-step');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="heading-luxury">
            Ваш простой путь к <span className="heading-gold">результату</span>
          </h2>
          <p className="section-subtitle">
            От идеи до готового решения за 2-4 недели
          </p>
        </div>

        <div className="journey-timeline">
          <div className="timeline-line" />
          
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`journey-step ${visibleSteps.includes(index) ? 'visible' : ''}`}
              data-step={index}
            >
              <div className="step-marker">
                <div className="marker-circle">
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="marker-line" />
              </div>

              <PremiumCard 
                glowColor={index === 2 ? 'gold' : 'blue'} 
                className="step-card"
                interactive={true}
              >
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-duration">
                    <span className="duration-icon">⏱️</span>
                    <span className="duration-text">{step.duration}</span>
                  </div>
                </div>
              </PremiumCard>
            </div>
          ))}
        </div>

        <div className="journey-cta">
          <p className="cta-text">
            Готовы начать свой путь к цифровой трансформации?
          </p>
          <button className="btn-luxury btn-large">
            <span>Начать с бесплатного аудита</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .journey-section {
          position: relative;
          padding: 120px 0;
          background: rgba(65, 54, 241, 0.02);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header h2 {
          font-size: clamp(36px, 5vw, 56px);
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-family: var(--font-body);
          font-size: 20px;
          color: var(--platinum-400);
        }

        .journey-timeline {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .timeline-line {
          position: absolute;
          left: 60px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            180deg,
            transparent,
            var(--platinum-600) 10%,
            var(--platinum-600) 90%,
            transparent
          );
        }

        .journey-step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .journey-step.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .journey-step:nth-child(2) { transition-delay: 0.1s; }
        .journey-step:nth-child(3) { transition-delay: 0.2s; }
        .journey-step:nth-child(4) { transition-delay: 0.3s; }
        .journey-step:nth-child(5) { transition-delay: 0.4s; }
        .journey-step:nth-child(6) { transition-delay: 0.5s; }

        .step-marker {
          position: relative;
          flex-shrink: 0;
          margin-right: 40px;
        }

        .marker-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--noir-800);
          border: 2px solid var(--platinum-600);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .journey-step.visible .marker-circle {
          border-color: var(--royal-gradient-start);
          box-shadow: 0 0 30px rgba(65, 54, 241, 0.3);
        }

        .step-number {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, var(--platinum-50), var(--platinum-400));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .marker-line {
          position: absolute;
          top: 120px;
          left: 59px;
          width: 2px;
          height: 100px;
          background: var(--platinum-600);
        }

        .journey-step:last-child .marker-line {
          display: none;
        }

        .step-card {
          flex: 1;
          margin-top: 20px;
        }

        .step-content {
          padding: 32px;
        }

        .step-icon {
          font-size: 48px;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 20px currentColor);
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          color: var(--platinum-50);
          margin-bottom: 16px;
        }

        .step-description {
          font-family: var(--font-body);
          font-size: 18px;
          color: var(--platinum-400);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .step-duration {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 100px;
          font-size: 14px;
          color: var(--gold-premium);
        }

        .duration-icon {
          font-size: 16px;
        }

        .journey-cta {
          text-align: center;
          margin-top: 80px;
        }

        .cta-text {
          font-size: 24px;
          color: var(--platinum-300);
          margin-bottom: 32px;
        }

        .btn-large {
          padding: 20px 48px;
          font-size: 18px;
        }

        .btn-arrow {
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .btn-luxury:hover .btn-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .timeline-line {
            left: 40px;
          }

          .marker-circle {
            width: 80px;
            height: 80px;
          }

          .step-number {
            font-size: 24px;
          }

          .marker-line {
            top: 80px;
            left: 39px;
          }

          .step-content {
            padding: 24px;
          }
        }

        @media (max-width: 768px) {
          .timeline-line {
            display: none;
          }

          .journey-step {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .step-marker {
            margin-right: 0;
            margin-bottom: 24px;
          }

          .marker-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}