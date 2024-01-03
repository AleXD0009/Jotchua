import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) {
    throw `_*IA - BOT*_\n\n*Proporciona un texto.*\n\n*Ejemplo:* _${usedPrefix + command} Hola bot, ¿cómo estás?_`;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const API_URL = `https://vihangayt.me/tools/bard?q=${encodeURIComponent(text)}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status && data.data) {
      const respuestaAPI = data.data;
      conn.reply(m.chat, respuestaAPI, m);
    } else {
      throw '_*IA - BOT*_\n\n*No se pudo obtener una respuesta válida.*';
    }
  } catch (error) {
    throw `_*IA - BOT*_\n\n*Ocurrió un error. Por favor, inténtalo de nuevo más tarde.*`;
  }
};

handler.command = /^bot$/i;

export default handler;
