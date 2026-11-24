import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import './public/portfolio-answers.js';

const knowledge = globalThis.portfolioAnswers;
const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/portfolio-answers.js', ['portfolio-answers.js', 'text/javascript']],
  ['/portfolio-chat.js', ['portfolio-chat.js', 'text/javascript']],
]);
const port = Number(process.env.PORTFOLIO_CHAT_PORT || 3000);

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

async function answer(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'POST 요청이 필요합니다.' });
  if (Number(request.headers['content-length']) > 16000) {
    return sendJson(response, 413, { error: '질문이 너무 깁니다.' });
  }
  let data = '';
  request.setEncoding('utf8');
  for await (const chunk of request) {
    if (data.length + chunk.length > 16000) return sendJson(response, 413, { error: '질문이 너무 깁니다.' });
    data += chunk;
  }
  let body;
  try {
    body = JSON.parse(data);
  } catch {
    return sendJson(response, 400, { error: '질문을 읽을 수 없습니다.' });
  }
  const question = typeof body?.question === 'string' ? body.question.trim() : '';
  if (!question || question.length > 500) {
    return sendJson(response, 400, { error: '질문을 1~500자로 입력해 주세요.' });
  }
  const history = Array.isArray(body.history)
    ? body.history.slice(-4).filter(item => item?.role === 'user' && typeof item.content === 'string')
      .map(item => ({ role: 'user', content: item.content.slice(0, 500) }))
    : [];
  return sendJson(response, 200, knowledge.fallback(question, history));
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname === '/api/chat') return await answer(request, response);
    const file = files.get(pathname);
    if (!file) {
      response.writeHead(404).end('페이지를 찾을 수 없습니다.');
      return;
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end();
      return;
    }
    const [name, type] = file;
    const content = await readFile(new URL('./public/' + name, import.meta.url));
    response.writeHead(200, { 'Content-Type': type + '; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    if (!response.headersSent) response.writeHead(500);
    response.end();
  }
});

server.listen(port, '127.0.0.1', () => console.log('http://127.0.0.1:' + port));
