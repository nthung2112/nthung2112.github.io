'use client';

import React, { useEffect, useRef } from 'react';

interface GistProps {
  id: string;
  file?: string;
}

const Gist: React.FC<GistProps> = ({ id, file }) => {
  const iframeNode = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const defineUrl = (): string => {
      const fileArg = file ? `?file=${file}` : '';
      return `https://gist.github.com/${id}.js${fileArg}`;
    };

    const updateIframeContent = (): void => {
      const iframe = iframeNode.current;

      let doc = iframe?.contentDocument;
      if (iframe?.contentWindow) doc = iframe.contentWindow.document;

      const gistLink = defineUrl();
      const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
      const styles = '<style>*{font-size:12px;}</style>';
      const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
      const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
      const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;

      doc?.open();
      doc?.writeln(iframeHtml);
      doc?.close();
    };

    updateIframeContent();
  }, [id, file]);

  return (
    <iframe
      ref={(n) => {
        iframeNode.current = n;
      }}
      width="100%"
      frameBorder={0}
      id={file ? `gist-${id}-${file}` : `gist-${id}`}
    />
  );
};

export default Gist;
