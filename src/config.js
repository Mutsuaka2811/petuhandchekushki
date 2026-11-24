'use strict';

// Все настройки сервера вынесены сюда, чтобы их можно было переопределить
// переменными окружения (необходимо для деплоя на Render и аналогах).
const num = (name, fallback) => {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
};

module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: num('PORT', 3000),

  maxConnections: num('MAX_CONNECTIONS', 400),
  maxRooms: num('MAX_ROOMS', 150),
  maxRoomSize: num('MAX_ROOM_SIZE', 15),
  maxNickLength: 14,

  // Как часто рассылаем позиции игроков (клиент шлёт state 20 раз в секунду).
  tickMs: num('TICK_MS', 100),

  // Тайминги игровых событий, секунды (переопределяются в тестах).
  tripWait: num('TRIP_WAIT', 20),
  tripCooldown: num('TRIP_COOLDOWN', 60),
  tripCancelCooldown: num('TRIP_CANCEL_COOLDOWN', 20),
  ritualWait: num('RITUAL_WAIT', 20),
  ritualCooldown: num('RITUAL_COOLDOWN', 60),
  bossTimeout: 10 * 60,
  partyLifetime: 10 * 60,
  recentLifetime: 2 * 60 * 1000,

  // Ограничения входящих данных.
  maxPayload: 16 * 1024,
  maxChatLength: 120,
  maxPassengers: 6,
};
