import Highlight, { defaultProps, Language } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import github from "prism-react-renderer/themes/github"
import rangeParser from "parse-numeric-range"
import { useTheme } from "./Theme"
import { useRef } from "react"

// To pass Lighthouse accessibility check
const nightOwlWithEnhancedCommentsContrast = {
  plain: { ...nightOwl.plain },
  styles: nightOwl.styles.map(record =>
    record.types.includes("comment")
      ? {
          ...record,
          style: {
            ...record["style"],
            color: "rgb(147, 165, 165)",
          },
        }
      : record,
  ),
}

const githubWithLighterBackground = Object.assign(github, {
  plain: { ...github.plain, backgroundColor: "rgb(246, 248, 250)" },
})

type HighlightProps = {
  language: Language
  codeString: string
  lines: string
}

const HighlightedCode = ({ codeString = "", language, lines = "" }: HighlightProps) => {
  const { theme } = useTheme()
  const snippetRef = useRef<HTMLPreElement>(null)

  const highlightedLines = rangeParser(lines)
  const linesToHighlight = new Set(highlightedLines)

  const toggleShowActions = () => {}

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme === "light" ? githubWithLighterBackground : nightOwlWithEnhancedCommentsContrast}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={("group " + className).trimEnd()}
          style={style}
          ref={snippetRef}
          tw="relative"
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            return (
              <div
                key={i}
                {...lineProps}
                className={
                  linesToHighlight.has(i + 1)
                    ? `${lineProps.className} line_highlight`
                    : lineProps.className
                }
              >
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          })}
          <button
            tw="absolute top-3 right-4 px-2 py-1 rounded text-sm font-semibold font-base opacity-0 pointer-events-none transition-all bg-primary group-hover:(opacity-100 pointer-events-auto)"
            onClick={() => {
              let snippet = snippetRef.current
              let area = document.createElement("textarea")
              area.value = snippet.innerText
              area.select()
              area.setSelectionRange(0, 99999)
              navigator.clipboard.writeText(area.value)
            }}
          >
            Copy
          </button>
        </pre>
      )}
    </Highlight>
  )
}

export default HighlightedCode
