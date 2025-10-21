const USE_MOCK = (import.meta.env.VITE_USE_EXTERNAL_MOCK ?? '1') !== '0';

const mockProfile = { fio: 'Иванов Иван', balance: 58 };
const mockRating = [
  { fio: 'Имя Фамилия', balance: 99, place: 1 },
  { fio: 'Жданов Евгений', balance: 75, place: 2 },
  { fio: 'Прохорова Анна', balance: 60, place: 3 },
  { fio: 'Петрова Екатерина', balance: 58, place: 4 },
  { fio: 'Крюков Валерий', balance: 21, place: 5 },
];
const mockTx = [
  { date: '2025-01-10', amount: +20, type: 'accrual', descr: 'Конкурс' },
  { date: '2025-01-12', amount: -15, type: 'purchase', descr: 'Кружка' },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function mock(fn) {
  await sleep(200);
  return fn();
}

export const externalApi = {
  async authRegister() { return USE_MOCK ? mock(() => ({ auth_jwt: 'mock' })) : Promise.resolve({}); },
  async authLogin()    { return USE_MOCK ? mock(() => ({ session_jwt: 'mock' })) : Promise.resolve({}); },
  async updateUser()   { return USE_MOCK ? mock(() => ({ ok: true })) : Promise.resolve({}); },

  async getProfile()       { return USE_MOCK ? mock(() => mockProfile) : Promise.resolve({}); },
  async getRating()        { return USE_MOCK ? mock(() => mockRating) : Promise.resolve([]); },
  async getTransactions()  { return USE_MOCK ? mock(() => mockTx) : Promise.resolve([]); },
};
