import React, { useState, useEffect } from 'react';
import { IoShareSocial } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLink, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.share-button-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setIsOpen(true);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-[#1877F2]" />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-[#1DA1F2]" />,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-[#25D366]" />,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank')
    },
    {
      name: t('copyLink'),
      icon: <FaLink className="text-[#00B4D8]" />,
      action: () => {
        navigator.clipboard.writeText(url);
        alert(t('linkCopied'));
      }
    }
  ];

  return (
    <div className="share-button-container relative">
      <button
        onClick={handleNativeShare}
        style={{
          width: 42,
          height: 42,
          minWidth: 42,
          minHeight: 42,
          borderRadius: '50%',
          background: 'linear-gradient(90deg, #00B4D8 0%, #0096C7 100%)',
          boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        aria-label={t('share')}
      >
        <IoShareSocial style={{ color: '#fff', width: 24, height: 24, display: 'block' }} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:absolute md:inset-auto md:right-0 md:mt-2 md:bg-transparent">
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl md:bottom-auto md:w-64 shadow-xl transform transition-transform duration-300 ease-in-out md:animate-fadeIn">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('share')}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-2">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl flex items-center space-x-3 transition-colors duration-200"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {option.icon}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton; 