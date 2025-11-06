import { useEffect } from 'react';

// Declarações TypeScript para os pixels
declare global {
  interface Window {
    fbq: any;
    ttq: any;
  }
}

interface PixelEventsProps {
  eventType: 'discord_click' | 'copy_invite' | 'page_view';
  eventData?: Record<string, any>;
}

export const PixelEvents: React.FC<PixelEventsProps> = ({ eventType, eventData = {} }) => {
  useEffect(() => {
    // Facebook Pixel Events
    if (typeof window !== 'undefined' && window.fbq) {
      switch (eventType) {
        case 'discord_click':
          window.fbq('track', 'Lead', {
            content_name: 'Discord Join',
            content_category: 'Community',
            value: 1,
            currency: 'BRL',
            ...eventData
          });
          break;
        case 'copy_invite':
          window.fbq('track', 'AddToWishlist', {
            content_name: 'Copy Discord Invite',
            content_category: 'Engagement',
            ...eventData
          });
          break;
        case 'page_view':
          window.fbq('track', 'ViewContent', {
            content_name: 'Landing Page',
            content_category: 'Gaming',
            ...eventData
          });
          break;
      }
    }

    // TikTok Pixel Events
    if (typeof window !== 'undefined' && window.ttq) {
      switch (eventType) {
        case 'discord_click':
          window.ttq.track('ClickButton', {
            content_type: 'discord_join',
            content_name: 'Discord Community',
            value: 1,
            currency: 'BRL',
            ...eventData
          });
          break;
        case 'copy_invite':
          window.ttq.track('Contact', {
            content_type: 'copy_invite',
            content_name: 'Discord Invite Copy',
            ...eventData
          });
          break;
        case 'page_view':
          window.ttq.track('ViewContent', {
            content_type: 'landing_page',
            content_name: 'Alto Astral RP Landing',
            ...eventData
          });
          break;
      }
    }
  }, [eventType, eventData]);

  return null;
};

// Hook personalizado para facilitar o uso
export const usePixelTracking = () => {
  const trackEvent = (eventType: 'discord_click' | 'copy_invite' | 'page_view', eventData?: Record<string, any>) => {
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      switch (eventType) {
        case 'discord_click':
          window.fbq('track', 'Lead', {
            content_name: 'Discord Join',
            content_category: 'Community',
            value: 1,
            currency: 'BRL',
            ...eventData
          });
          break;
        case 'copy_invite':
          window.fbq('track', 'AddToWishlist', {
            content_name: 'Copy Discord Invite',
            content_category: 'Engagement',
            ...eventData
          });
          break;
      }
    }

    // TikTok Pixel
    if (typeof window !== 'undefined' && window.ttq) {
      switch (eventType) {
        case 'discord_click':
          window.ttq.track('ClickButton', {
            content_type: 'discord_join',
            content_name: 'Discord Community',
            value: 1,
            currency: 'BRL',
            ...eventData
          });
          break;
        case 'copy_invite':
          window.ttq.track('Contact', {
            content_type: 'copy_invite',
            content_name: 'Discord Invite Copy',
            ...eventData
          });
          break;
      }
    }
  };

  return { trackEvent };
};