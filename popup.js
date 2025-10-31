document.getElementById("summarize").addEventListener("click", async () => {
    await handleAction("summarizePage");
  });
  
  document.getElementById("simplifyBtn").addEventListener("click", async () => {
    await handleAction("simplifyPage");
  });
  
  document.getElementById("checkBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkAIApis
    });
    const output = document.getElementById("output");
    output.innerHTML = result;
    output.classList.add("visible");
  });
  
  document.getElementById("copyBtn").addEventListener("click", () => {
    const text = document.getElementById("output").innerText;
    navigator.clipboard.writeText(text);
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy Summary"), 1500);
  });
  
  async function handleAction(funcName) {
    const output = document.getElementById("output");
    const copyBtn = document.getElementById("copyBtn");
    const readingTime = document.getElementById("readingTime");
  
    output.innerHTML = "Processing...";
    output.classList.remove("visible");
    copyBtn.style.display = "none";
    readingTime.innerHTML = "";
  
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: funcName === "summarizePage" ? summarizePage : simplifyPage
    });
  
    output.innerHTML = result;
    output.classList.add("visible");
    copyBtn.style.display = "block";
  
    const text = output.innerText;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    readingTime.innerHTML = `Approx. ${minutes} min read`;
  }
  
  async function summarizePage() {
    try {
      const paragraphs = Array.from(document.querySelectorAll("article p, main p"))
        .map(p => p.innerText.trim())
        .filter(
          p =>
            p.length > 60 &&
            !/^“|^"/.test(p) &&
            !p.startsWith("Tweet") &&
            !p.includes("http") &&
            !p.toLowerCase().includes("related") &&
            !p.toLowerCase().includes("read more") &&
            !p.toLowerCase().includes("you may also like") &&
            !p.toLowerCase().includes("advertisement")
        );
  
      const text =
        paragraphs.join(" ").slice(0, 8000) ||
        Array.from(document.querySelectorAll("p"))
          .map(p => p.innerText)
          .join(" ")
          .slice(0, 8000);
  
      let summary;
      if (window.ai && ai.summarizer) {
        const summarizer = await ai.summarizer.create();
        const result = await summarizer.summarize(text);
        summary = `<strong>Gemini Nano Summary</strong><br><br>${result}`;
      } else {
        const cleanText = text.replace(/\s+/g, " ").trim();
        const sentences = cleanText.split(/[.!?]\s/).slice(0, 4).join(". ") + "...";
        summary = `<strong>Fallback Summary</strong><br><br>${sentences}`;
      }
  
      return summary;
    } catch (error) {
      return `<p style="color:red;">Error: ${error.message}</p>`;
    }
  }
  
  async function simplifyPage() {
    try {
      const level = document.getElementById("readingLevel")?.value || "balanced";
      const paragraphs = Array.from(document.querySelectorAll("article p, main p"))
        .map(p => p.innerText.trim())
        .filter(
          p =>
            p.length > 60 &&
            !/^“|^"/.test(p) &&
            !p.startsWith("Tweet") &&
            !p.includes("http") &&
            !p.toLowerCase().includes("related") &&
            !p.toLowerCase().includes("read more") &&
            !p.toLowerCase().includes("you may also like") &&
            !p.toLowerCase().includes("advertisement")
        );
  
      const text =
        paragraphs.join(" ").slice(0, 6000) ||
        Array.from(document.querySelectorAll("p"))
          .map(p => p.innerText)
          .join(" ")
          .slice(0, 6000);
  
      let simplified;
      if (window.ai && ai.rewriter) {
        const rewriter = await ai.rewriter.create();
        const result = await rewriter.rewrite(text, { tone: level });
        simplified = `<strong>Gemini Nano Simplified (${level})</strong><br><br>${result}`;
      } else {
        const simpleSentences =
          text
            .replace(/\([^)]*\)/g, "")
            .replace(/[,;:]/g, ".")
            .split(/[.!?]\s/)
            .map(s => s.trim())
            .filter(s => s.length > 20)
            .slice(0, 5)
            .join(". ") + ".";
        simplified = `<strong>Fallback Simplified (${level})</strong><br><br>${simpleSentences}`;
      }
  
      return simplified;
    } catch (error) {
      return `<p style="color:red;">Error: ${error.message}</p>`;
    }
  }
  
  function checkAIApis() {
    const available = [];
    if (window.ai) {
      if (ai.summarizer) available.push("Summarizer");
      if (ai.rewriter) available.push("Rewriter");
      if (ai.prompt) available.push("Prompt");
      if (ai.writer) available.push("Writer");
    }
  
    if (available.length > 0) {
      document.body.style.borderTop = "4px solid #34a853";
      return `<strong>Available APIs:</strong> ${available.join(", ")}`;
    } else {
      document.body.style.borderTop = "4px solid #ea4335";
      return `<strong>Gemini Nano not detected.</strong><br>
              Please use Chrome Canary and ensure the AI on Device Model is installed (chrome://components).`;
    }
  }
  