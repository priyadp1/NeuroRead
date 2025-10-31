# Neurodiverse Reader Lite
### Chrome Built-in AI Challenge 2025 Submission

**Neurodiverse Reader Lite** is a privacy-focused Chrome extension that helps users, especially those with neurodiverse reading patterns (such as ADHD, dyslexia, or cognitive fatigue), comprehend web articles more easily.  
It uses **Gemini Nano**, Chrome’s on-device AI model, through built-in APIs such as the **Summarizer** and **Rewriter**, to summarize or simplify text locally. No data ever leaves the device.

---

## Features

- **Summarize Articles** – Generates concise summaries of main content while ignoring headlines, ads, and sidebars.  
- **Simplify Text** – Rewrites articles at adjustable reading levels:  
  - *Basic* (simpler language)  
  - *Balanced* (default, general audience)  
  - *Detailed* (keeps nuance)  
- **Offline and Private** – Runs locally with Gemini Nano; no internet access required.  
- **Fallback Mode** – Uses a lightweight local summarizer when Gemini Nano is unavailable.  
- **AI Availability Check** – Displays which APIs (Summarizer, Rewriter, Prompt, Writer) are currently active.  
- **Reading Time Estimator** – Displays approximate reading time for generated summaries.  
- **Copy Summary** – Easily copy results with one click.

---

## Tech Stack

- **Chrome Built-in AI APIs:** Summarizer, Rewriter, Prompt  
- **Gemini Nano (on-device LLM)**  
- **JavaScript (ES6)** for core logic  
- **HTML/CSS** for interface  
- No external libraries or backend servers

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/NeurodiverseReaderLite.git
   cd NeurodiverseReaderLite
   ```

2. **Open Chrome Canary (v144+)** or a Chrome version that supports Gemini Nano.

3. **Enable these flags in `chrome://flags`:**
   - `#prompt-api-for-gemini-nano`  
   - `#rewriter-api-for-gemini-nano`  
   - `#summarization-api-for-gemini-nano`  
   - `#proofreader-api-for-gemini-nano`

4. **Load the extension:**
   - Go to `chrome://extensions`
   - Enable **Developer Mode**
   - Click **Load Unpacked**
   - Select the `NeurodiverseReaderLite` folder

5. **Test on any article page**, for example:  
   https://www.thedailybeast.com/chilling-new-york-times-cover-goes-viral-after-trump-confirms-its-worst-fears/


7. **Click the extension icon**, then choose:  
   - *Summarize This Page*  
   - *Simplify Based on Reading Level*  
   - *Check AI Availability*

---

## How It Works

| Step | Function | Description |
|------|-----------|-------------|
| 1 | `summarizePage()` | Extracts article paragraphs (`article p, main p`) and ignores headlines, ads, and quotes. |
| 2 | `ai.summarizer.create()` | Summarizes text locally using Gemini Nano. |
| 3 | `simplifyPage()` | Rewrites content with `ai.rewriter` using the selected tone (simple, balanced, or detailed). |
| 4 | Fallback | Uses a local JavaScript summarizer when APIs are unavailable. |
| 5 | Output | Displays summary, estimated reading time, and a copy button. |

---

## Example Use Cases

- Students summarizing academic or research articles  
- Neurodiverse readers simplifying complex content  
- Professionals scanning news articles efficiently  
- Users in low-connectivity areas needing offline summarization  

---

## Project Structure

```plaintext
NeurodiverseReaderLite/
│
├── manifest.json
├── popup.html
├── popup.js
├── icons/
└── README.md
```

---

## Author

**Prisha Priyadarshini**  
- Email: [prishapriya31@gmail.com](mailto:prishapriya31@gmail.com)  
- LinkedIn: [linkedin.com/in/prisha-priyadarshini](https://www.linkedin.com/in/prisha-priyadarshini/)

---

## License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with attribution.
