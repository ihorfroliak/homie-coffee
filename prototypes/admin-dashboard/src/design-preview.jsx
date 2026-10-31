import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './design-preview.css';

// The reviewed export runs on the prototype's installed React, without CDN loaders.
// Keep its isolated document/runtime out of the operational dashboard.
async function bootDesign() {
  window.React = React;
  window.ReactDOM = { createRoot };
  await import('../../../design/sources/2026-10-30/browser-window.jsx');
  const SourceChromeWindow = window.ChromeWindow;
  if (new URLSearchParams(location.search).has('reference')) {
    document.body.classList.add('source-reference');
  } else {
    window.ChromeWindow = function PreviewFrame(props) {
      return <div className="design-frame" style={{ maxWidth: props.width }}><SourceChromeWindow {...props} width="100%" /></div>;
    };
  }
  await import('../../../design/sources/2026-10-30/image-slot.js');
  await import('../../../design/sources/2026-10-30/support.js');
}
bootDesign().catch((error) => {
  console.error(error);
  const message = document.createElement('p');
  message.setAttribute('role', 'alert');
  message.textContent = 'Nie udało się uruchomić podglądu. Odśwież stronę lub wróć do pracowni.';
  document.body.prepend(message);
});
