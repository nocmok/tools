'use client'

import { useState } from 'react';
import Image from 'next/image'
import Editor from '@monaco-editor/react';

function prettifyJson(code: string): string {
  return JSON.stringify(JSON.parse(code), null, '\t')
}

export default function Home() {
  const [code, setCode] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);

  const editor = <Editor
    value={code}
    onChange={(value) => setCode(value)}
    defaultLanguage='json'
    options={{
      lineNumbers: 'off',
      folding: false,
      minimap: {
        enabled: false,
      },
      quickSuggestions: false,
      renderLineHighlight: 'none',
      matchBrackets: 'never',
      codeLens: false,
      autoIndent: 'none',
      cursorBlinking: 'solid',
      guides: {
        bracketPairs: false,
        bracketPairsHorizontal: false,
        highlightActiveBracketPair: false,
        highlightActiveIndentation: false,
        indentation: false,
      },
      hover: {
        enabled: false,
      },
      stickyScroll: {
        enabled: false,
      },
      // scrollbar: {
      // vertical: 'hidden',
      // horizontal: 'hidden'
      // },
      glyphMargin: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      scrollBeyondLastLine: false,
      occurrencesHighlight: 'off',
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      fontSize: 16,
    }}
    onMount={(_, monaco) => {
      monaco.editor.defineTheme('custom', {
        base: 'vs-dark',
        rules: [
          { token: '', foreground: '#ffffffff' },
          // { token: 'number', foreground: '#09885A' },

          { token: 'string.key.json', foreground: '#14d9e3ff' },
          { token: 'string.value.json', foreground: '#0c59b2ff' },

          // { token: 'string', foreground: '#0c59b2ff' },


          // { token: 'string', foreground: '#A31515' },
          { token: 'keyword.json', foreground: '#8a63ffff' },
        ],
        colors: {
          'editor.background': '#11141e',
          'editor.foreground': '#ffffffff',
        },
        inherit: true,
      })
      monaco.editor.setTheme('custom')
      setEditorLoaded(true)
    }}
  />

  function handleBadJson() {
    // todo highlight editor
    console.log("Bad json")
  }

  return (
    <div style={{
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'gap': '30px',
    }}>
      <Image src={'/tools/logo.png'} alt={'Logo'} width={200} height={200}></Image>

      <div style={{
        'display': 'flex',
        'flexDirection': 'row',
        'gap': '10px',
      }}>
        <button className='button' onClick={() => {
          try {
            setCode(prettifyJson(code))
          } catch {
            handleBadJson()
          }
        }
        }>
          Prettify
        </button>
        <button className='button' onClick={() => {
          navigator.clipboard.writeText(code)
        }}>
          Copy
        </button>
      </div>

      <div hidden={!editorLoaded} style={{
        'borderRadius': '20px',
        'overflow': 'hidden',
        'width': '800px',
        'height': '600px',
        'padding': '10px',
        'backgroundColor': '#11141e',
      }}>
        {editor}
      </div>
    </div>
  );
}
