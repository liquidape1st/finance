import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RiskWarningDisclosureProps {
  variant?: 'full' | 'compact';
}

export function RiskWarningDisclosure({ variant = 'full' }: RiskWarningDisclosureProps) {
  const { t } = useTranslation();

  if (variant === 'compact') {
    return (
      <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
        <AlertTriangle className="size-4 sm:size-5 text-red-400 shrink-0 mt-0.5" />
        <p className="text-red-300 text-xs sm:text-sm leading-relaxed">
          <strong>{t('resources.riskDisclosure.compact.label')}</strong> {t('resources.riskDisclosure.compact.text')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 sm:p-8">
      <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="bg-red-500 p-2 sm:p-3 rounded-lg">
          <AlertTriangle className="size-5 sm:size-6 text-white" />
        </div>
        <div>
          <h3 className="text-red-300 text-lg sm:text-xl mb-1 sm:mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t('resources.riskDisclosure.full.title')}
          </h3>
          <p className="text-red-200 text-xs sm:text-sm">
            {t('resources.riskDisclosure.full.subtitle')}
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 text-red-200 text-xs sm:text-sm leading-relaxed">
        <p>
          <strong>{t('resources.riskDisclosure.full.paragraph1.strong')}</strong>
          {' '}{t('resources.riskDisclosure.full.paragraph1.text')}
        </p>

        <p>
          {t('resources.riskDisclosure.full.paragraph2')}
        </p>

        <p>
          <strong>{t('resources.riskDisclosure.full.paragraph3.strong')}</strong>
          {' '}{t('resources.riskDisclosure.full.paragraph3.text')}
        </p>

        <p>
          {t('resources.riskDisclosure.full.paragraph4')}
        </p>

        <p className="pt-3 sm:pt-4 border-t border-red-800/50">
          <strong>{t('resources.riskDisclosure.full.paragraph5.strong')}</strong>
          {' '}{t('resources.riskDisclosure.full.paragraph5.text')}
        </p>
      </div>
    </div>
  );
}