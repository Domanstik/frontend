import { externalAuth, externalHttp } from './http';

// AUTH
export const extRegister = (payload) => externalAuth.register(payload);
export const extLogin = () => externalAuth.login();
export const extEnsureSession = () => externalAuth.ensureSession();

// PROFILE / RATING / BALANCE
export const extUpdateUser = (payload) => externalHttp.post('/api/user/update', payload);
export const extGetProfile = () => externalHttp.post('/api/user/profile'); // {fio, balance}
export const extGetRating = () => externalHttp.post('/api/rating'); // [{fio, balance, place}]
export const extGetTransactions = () => externalHttp.post('/api/transactions'); // [{date, amount, type?, descr}]
export const extAccrual = (payload) => externalHttp.post('/api/accrual', payload); // {balance}
export const extPurchase = (payload) => externalHttp.post('/api/purchase', payload); // {balance}
