import React, { useEffect } from 'react';

const WistiaPlayer = ({
  mediaId = 'z5wwp3l7bv',
  aspectRatio = 1.8972332015810276,
  seo = false,
  className = '',
}) => {
  useEffect(() => {
    // Load Wistia script if not already loaded
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const script1 = document.createElement('script');
      script1.src = 'https://fast.wistia.com/player.js';
      script1.async = true;
      
      const script2 = document.createElement('script');
      script2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
      script2.async = true;
      script2.type = 'module';
      
      document.body.appendChild(script1);
      document.body.appendChild(script2);
    }
  }, [mediaId]);

  const paddingTop = 0;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ paddingTop }}>
      <style>
        {`
          wistia-player[media-id='${mediaId}']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
            display: block;
            filter: blur(5px);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      <wistia-player
        media-id={mediaId}
        seo={seo.toString()}
        aspect={aspectRatio}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default WistiaPlayer;