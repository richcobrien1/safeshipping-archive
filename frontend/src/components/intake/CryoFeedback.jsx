import React from 'react';
import { t } from '../../locales/index'; // ✅ Assuming consistent t()
import { useAuth } from '../../auth/AuthContext';

const CryoFeedback = ({ status, emoji, animation }) => {
  const { language } = useAuth(); // 💡 this grabs the current language
  
  return (
    <div className={`cryo-feedback ${status}`}>
      <span className={`emoji ${animation}`}>{emoji}</span>
      <span className="feedback-text">
        {status === 'success'
          ? t("cryo.feedback.success", language)
          : t("cryo.feedback.error", language)}
      </span>
    </div>
  );
};

export default CryoFeedback;
