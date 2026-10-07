import React, { useState } from "react";

export const TerminalWindow: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const [copied, setCopied] = useState(false);

  const curlCommand = `curl -X POST https://shortking.app/api/v1/urls \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk_live_xyz99" \\
  -d '{"originalUrl": "https://example.com/very/long-path"}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Terminal Container with Ink Border & Shadow */}
      <div className="bg-[#080808] text-[#F8F7F1] rounded-2xl border-2 border-[#080808] shadow-[6px_6px_0px_#080808] overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Header Bar */}
        <div className="bg-[#1C2329] px-4 py-3 flex items-center justify-between border-b-2 border-[#080808]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E14942] border border-[#080808] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F5D84A] border border-[#080808] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#2B9348] border border-[#080808] inline-block" />
            <span className="ml-2 text-xs font-semibold text-[#8898A6]">bash — curl /api/v1/urls</span>
          </div>

          <button
            onClick={handleCopy}
            className="text-[11px] px-2.5 py-1 rounded bg-[#080808] hover:bg-[#2A3742] text-[#F5D84A] border border-[#3A4A57] transition-colors cursor-pointer font-bold"
          >
            {copied ? "✓ Copied" : "Copy cURL"}
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-[#8898A6] text-xs pb-1 select-none">
              <span className="text-[#F5D84A] font-bold">~</span>
              <span>$ REQUEST</span>
            </div>
            <pre className="text-[#8FC5E5] font-mono whitespace-pre-wrap break-all leading-relaxed">
              <span className="text-[#F5D84A]">POST</span> /api/v1/urls
              {"\n"}
              <span className="text-[#A4B8C7]">Content-Type: application/json</span>
              {"\n\n"}
              <span className="text-[#F8F7F1]">{`{\n  `}</span>
              <span className="text-[#F5D84A]">&quot;originalUrl&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#7BE495]">&quot;https://example.com/very/long-path?utm=ad&quot;</span>
              <span className="text-[#F8F7F1]">,</span>
              {"\n"}
              <span className="text-[#F5D84A]">  &quot;customAlias&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#7BE495]">&quot;demo&quot;</span>
              {"\n"}
              <span className="text-[#F8F7F1]">{`}`}</span>
            </pre>
          </div>

          <div className="border-t border-[#232E38] pt-3">
            <div className="flex items-center gap-2 text-[#8898A6] text-xs pb-1 select-none">
              <span className="text-[#2B9348] font-bold">●</span>
              <span>RESPONSE (201 Created • 12ms)</span>
            </div>
            <pre className="text-[#7BE495] font-mono whitespace-pre-wrap break-all leading-relaxed bg-[#11171D] p-3 rounded-lg border border-[#232E38]">
              <span className="text-[#F8F7F1]">{`{\n  `}</span>
              <span className="text-[#8FC5E5]">&quot;success&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#F5D84A]">true</span>
              <span className="text-[#F8F7F1]">,</span>
              {"\n"}
              <span className="text-[#8FC5E5]">  &quot;data&quot;</span>
              <span className="text-[#F8F7F1]">: {`{\n    `}</span>
              <span className="text-[#8FC5E5]">&quot;shortCode&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#F5D84A]">&quot;demo&quot;</span>
              <span className="text-[#F8F7F1]">,</span>
              {"\n"}
              <span className="text-[#8FC5E5]">    &quot;shortUrl&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#F5D84A] font-bold">&quot;https://shortking.app/demo&quot;</span>
              <span className="text-[#F8F7F1]">,</span>
              {"\n"}
              <span className="text-[#8FC5E5]">    &quot;clickCount&quot;</span>
              <span className="text-[#F8F7F1]">: </span>
              <span className="text-[#F8F7F1]">0</span>
              {"\n"}
              <span className="text-[#F8F7F1]">{`  }\n}`}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Hand-drawn sticky annotation note on terminal */}
      <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#F5D84A] border-2 border-[#080808] px-3 py-1 rounded-md shadow-[3px_3px_0px_#080808] rotate-3 select-none pointer-events-none">
        <span className="text-xs font-hand font-bold text-[#080808]">
          ⚡ Sub-millisecond!
        </span>
      </div>
    </div>
  );
};
