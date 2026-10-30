import { useEffect, useRef } from "react";

export function Gist({ id, file }: { id: string; file?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;

  useEffect(() => {
    const doc = iframeRef.current?.contentWindow?.document;
    if (!doc) {
      return;
    }
    const gistUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`;
    const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
    doc.open();
    doc.writeln(
      `<html><head><base target="_parent"><style>*{font-size:12px;}</style></head><body ${resizeScript}><script type="text/javascript" src="${gistUrl}"></script></body></html>`
    );
    doc.close();
  }, [id, file, elementId]);

  return (
    <iframe ref={iframeRef} id={elementId} title={elementId} width="100%" className="border-0" />
  );
}
