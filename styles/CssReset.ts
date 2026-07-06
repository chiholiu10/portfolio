import { createGlobalStyle, keyframes } from "styled-components";
import theme from "./Theme";

const wave1 = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0.1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
`;

const wave2 = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(2.2);
    opacity: 0.05;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
`;

const wave3 = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.25;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.08;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.25;
  }
`;

const wavePulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    box-shadow: 0 0 40px rgba(14, 165, 233, 0.1);
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 80px rgba(14, 165, 233, 0.3);
  }
`;

const floatWave = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-45%, -55%) rotate(3deg);
  }
  75% {
    transform: translate(-55%, -45%) rotate(-3deg);
  }
`;

const orbitSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const orbitSpinReverse = keyframes`
  to { transform: rotate(-360deg); }
`;

export const CSSreset = createGlobalStyle`
    html {
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
    }
    body {
      position: relative;
      isolation: isolate;
      margin: 0;
      overflow-x: hidden;
      font-family: ${theme.typoGraphy.fonts.body};
      color: ${theme.colors.white};
      max-width: 100vw;
      background:
        radial-gradient(
          ellipse at 50% -15%,
          rgba(56, 189, 248, 0.11) 0%,
          transparent 48%
        ),
        radial-gradient(
          ellipse at 30% 40%, 
          rgba(14, 165, 233, 0.05) 0%, 
          transparent 60%
        ),
        radial-gradient(
          ellipse at 70% 60%, 
          rgba(56, 189, 248, 0.03) 0%, 
          transparent 50%
        ),
        radial-gradient(
          circle,
          rgba(186, 230, 253, 0.22) 0 0.7px,
          transparent 1.2px
        ),
        ${theme.colors.black || "#0a1929"};

      background-size:
        auto,
        auto,
        auto,
        170px 170px,
        auto;
      background-position:
        center,
        center,
        center,
        23px 41px,
        center;
      background-attachment: fixed;
      
      &::before {
        content: '';
        position: fixed;
        top: -360px;
        left: -300px;
        width: 980px;
        height: 980px;
        z-index: 0;
        pointer-events: none;
        border-radius: 50%;
        opacity: 0.65;
        background:
          radial-gradient(circle, transparent 44%, rgba(56, 189, 248, 0.08) 44.15%, transparent 44.4%),
          radial-gradient(circle, transparent 63%, rgba(255, 255, 255, 0.045) 63.1%, transparent 63.35%),
          conic-gradient(
            from 25deg,
            transparent 0 13%,
            rgba(56, 189, 248, 0.16) 13.2% 13.45%,
            transparent 13.7% 61%,
            rgba(56, 189, 248, 0.08) 61.2% 61.35%,
            transparent 61.6%
          );
        -webkit-mask: radial-gradient(
          circle,
          transparent 0 72%,
          #000 72.2% 72.5%,
          transparent 72.7%
        );
        mask: radial-gradient(circle, transparent 0 72%, #000 72.2% 72.5%, transparent 72.7%);
        animation: ${orbitSpin} 90s linear infinite;
      }
      
      &::after {
        content: '';
        position: fixed;
        right: -330px;
        bottom: -280px;
        width: 860px;
        height: 860px;
        z-index: 0;
        pointer-events: none;
        border-radius: 50%;
        opacity: 0.55;
        background:
          radial-gradient(circle, transparent 53%, rgba(56, 189, 248, 0.06) 53.15%, transparent 53.4%),
          radial-gradient(circle at 16% 50%, #38bdf8 0 4px, transparent 5px),
          radial-gradient(circle at 84% 50%, rgba(255, 255, 255, 0.6) 0 3px, transparent 4px);
        box-shadow:
          inset 0 0 100px rgba(56, 189, 248, 0.025),
          0 0 80px rgba(14, 165, 233, 0.025);
        animation: ${orbitSpinReverse} 110s linear infinite;
      }

      @media (max-width: 639px) {
        &::before {
          width: 650px;
          height: 650px;
          top: -260px;
          left: -330px;
          opacity: 0.42;
        }
        &::after {
          width: 580px;
          height: 580px;
          right: -360px;
          bottom: -180px;
          opacity: 0.38;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        &::before,
        &::after { animation: none; }
      }
    }

    #__next {
      position: relative;
      z-index: 1;
      min-height: 100vh;

      &::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        background:
          radial-gradient(circle at 12% 24%, rgba(56, 189, 248, 0.55) 0 2px, transparent 3px),
          radial-gradient(circle at 82% 18%, rgba(255, 255, 255, 0.32) 0 1px, transparent 2px),
          radial-gradient(circle at 68% 72%, rgba(56, 189, 248, 0.35) 0 1.5px, transparent 2.5px),
          radial-gradient(circle at 21% 81%, rgba(255, 255, 255, 0.22) 0 1px, transparent 2px),
          radial-gradient(circle at 92% 55%, rgba(56, 189, 248, 0.3) 0 1px, transparent 2px);
        filter: drop-shadow(0 0 7px rgba(56, 189, 248, 0.45));
      }

      @media (max-width: 639px) {
        &::after { opacity: 0.55; }
      }
    }

    #root {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      
      &::before {
        content: '';
        position: fixed;
        top: 45%;
        left: 45%;
        width: 250px;
        height: 250px;
        z-index: -1;
        pointer-events: none;
        border-radius: 50%;
        
        background: radial-gradient(
          circle at center,
          rgba(99, 102, 241, 0.2) 0%,
          rgba(99, 102, 241, 0.08) 30%,
          rgba(99, 102, 241, 0.02) 60%,
          transparent 80%
        );
        
        border: 2px solid rgba(99, 102, 241, 0.1);
        box-shadow: 
          0 0 50px rgba(99, 102, 241, 0.1),
          inset 0 0 50px rgba(99, 102, 241, 0.04);
        
        animation: 
          ${wave3} 3s ease-in-out infinite 0.5s,
          ${floatWave} 8s ease-in-out infinite 1s;
      }
    
    &::after {
      content: '';
      position: fixed;
      top: 50%;
      left: 50%;
      width: 120px;
      height: 120px;
      z-index: -1;
      pointer-events: none;
      border-radius: 50%;
      
      background: radial-gradient(
        circle at center,
        rgba(14, 165, 233, 0.25) 0%,
        rgba(14, 165, 233, 0.08) 40%,
        transparent 70%
      );
      
      border: 1px solid rgba(56, 189, 248, 0.2);
      
      animation: ${wavePulse} 3s ease-in-out infinite;
    }
    html,
    body {
      width: 100%;
      height: 100%;
    }
    main {
      display: block;
      height: 100%;
    }
    hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
    }
    pre {
      font-family: monospace, monospace;
      font-size: 1em;
    }
    a {
      background-color: transparent;
    }
    abbr[title] {
      border-bottom: none;
      text-decoration: underline;
      -webkit-text-decoration: underline dotted;
      text-decoration: underline dotted;
    }
    b,
    strong {
      font-weight: bolder;
    }
    code,
    kbd,
    samp {
      font-family: monospace, monospace;
      font-size: 1em;
    }
    small {
      font-size: 80%;
    }
    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    sub {
      bottom: -0.25em;
    }
    sup {
      top: -0.5em;
    }
    img {
      border-style: none;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
    }
    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      text-align: inherit;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;
    }
    button,
    input {
      overflow: visible;
    }
    button,
    select {
      text-transform: none;
    }
    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }
    fieldset {
      padding: 0.35em 0.75em 0.625em;
    }
    legend {
      box-sizing: border-box;
      color: inherit;
      display: table;
      max-width: 100%;
      padding: 0;
      white-space: normal;
    }
    progress {
      vertical-align: baseline;
    }
    textarea {
      overflow: auto;
    }
    [type="checkbox"],
    [type="radio"] {
      box-sizing: border-box;
      padding: 0;
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none !important;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    [type="search"] {
      -webkit-appearance: textfield;
      outline-offset: -2px;
    }
    [type="search"]::-webkit-search-decoration {
      -webkit-appearance: none !important;
    }
    ::-webkit-file-upload-button {
      -webkit-appearance: button;
      font: inherit;
    }
    details {
      display: block;
    }
    summary {
      display: list-item;
    }
    template {
      display: none;
    }
    [hidden] {
      display: none !important;
    }
    html {
      box-sizing: border-box;
      font-family: sans-serif;
    }
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    p,
    pre {
      margin: 0;
    }
    button {
      background: transparent;
      padding: 0;
    }
    fieldset {
      margin: 0;
      padding: 0;
    }
    ol,
    ul {
      margin: 0;
      padding: 0;
    }
    html {
      font-family: ${theme.typoGraphy.fonts.body};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizelegibility;
    }
    hr {
      border-top-width: 1px;
    }
    textarea {
      resize: vertical;
    }
    button,
    [role="button"] {
      cursor: pointer;
    }
    button::-moz-focus-inner {
      border: 0 !important;
    }
    table {
      border-collapse: collapse;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      font-weight: inherit;
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      padding: 0;
      line-height: inherit;
      color: inherit;
    }
    pre,
    code,
    kbd,
    samp {
      font-family: ${theme.typoGraphy.fonts.body};
    }
    img,
    svg,
    video,
    canvas,
    audio,
    iframe,
    embed,
    object {
      display: block;
    }
    img,
    video {
      max-width: 100%;
      height: auto;
    }
    // Disable Auto Zoom in form tags - Safari on iPhone
    select,
    textarea,
    input[type="text"],
    input[type="password"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="date"],
    input[type="month"],
    input[type="time"],
    input[type="week"],
    input[type="number"],
    input[type="email"],
    input[type="url"],
    input[type="search"],
    input[type="tel"],
    input[type="color"] {
      font-size: 16px;
    }
  `;
