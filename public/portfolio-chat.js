(() => {
  const dialog = document.querySelector('.chat-dialog');
  const launch = document.querySelector('.chat-launch');
  const close = dialog.querySelector('.chat-close');
  const form = dialog.querySelector('.chat-form');
  const input = dialog.querySelector('#chat-input');
  const submit = form.querySelector('button');
  const log = dialog.querySelector('.chat-log');
  const mode = dialog.querySelector('#chat-mode');
  const suggestions = dialog.querySelector('.chat-suggestions');
  const knowledge = globalThis.portfolioAnswers;
  const knownSources = new Set(knowledge.documents.map(doc => doc.url));
  const history = [];
  let pending = false;

  function append(role, text, sources = []) {
    const message = document.createElement('article');
    message.className = 'chat-message chat-' + role;
    const label = document.createElement('strong');
    label.textContent = role === 'user' ? '나' : '챗봇';
    const body = document.createElement('p');
    body.textContent = text;
    message.append(label, body);
    const links = document.createElement('ul');
    for (const source of sources) {
      if (!knownSources.has(source.url)) continue;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = source.title;
      if (source.url.startsWith('/')) {
        link.href = new URL(source.url, dialog.dataset.root).href;
      } else {
        link.href = source.url;
      }
      item.append(link);
      links.append(item);
    }
    if (links.childElementCount) message.append(links);
    log.append(message);
    log.scrollTop = log.scrollHeight;
    return message;
  }

  async function getAnswer(question, context) {
    if (location.protocol !== 'file:') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, history: context }),
          signal: AbortSignal.timeout(20000),
        });
        if (response.ok) {
          const answer = await response.json();
          if (typeof answer.text === 'string' && Array.isArray(answer.sources)) return answer;
        }
      } catch {
        // The same public portfolio excerpts are available in the browser.
      }
    }
    return knowledge.fallback(question, context);
  }

  async function ask(question) {
    question = question.trim();
    if (!question || pending) return;
    pending = true;
    submit.disabled = true;
    const context = history.slice(-4);
    history.push({ role: 'user', content: question });
    input.value = '';
    append('user', question);
    const waiting = append('assistant', '답변을 찾고 있어요…');
    try {
      const answer = await getAnswer(question, context);
      waiting.remove();
      mode.textContent = answer.mode === 'ai' ? 'AI 답변 · 포트폴리오 기반' : '포트폴리오 자료 검색';
      append('assistant', answer.text, answer.sources);
      history.push({ role: 'assistant', content: answer.text });
    } finally {
      waiting.remove();
      pending = false;
      submit.disabled = false;
    }
  }

  launch.addEventListener('click', () => dialog.showModal());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => launch.focus());
  form.addEventListener('submit', event => {
    event.preventDefault();
    void ask(input.value);
  });
  suggestions.addEventListener('click', event => {
    if (event.target instanceof HTMLButtonElement) void ask(event.target.textContent);
  });
  launch.hidden = false;
})();
