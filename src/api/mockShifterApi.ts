import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const customers = await import('@/api/customers.json')
const bicycles = await import('@/api/bicycles.json')

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/api/customers').reply(200, customers.default);
mock.onGet('/api/bicycles').reply(200, bicycles.default);