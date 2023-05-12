export const user = {
  id: 1,
  username: 'ginderick',
  email: 'ginderick@gmail.com',
  hashed_password: '$2b$10$HZZ71ccbvhImsgYt/SO7TOfFKKkwvu0viguSFbWNL0du95o6hJMo.',
};

export const loginPayload = {
  username: 'ginderick',
  password: 'yahoomail123',
};

export const product = {
  id: 1,
  sku: '123',
  name: 'shoes',
  category: 'shoes',
  quantity: 123,
  price: 123,
};

export const productPayload = {
  sku: '12345678',
  name: 'shirt',
  category: 'clothes',
  quantity: 2,
  price: 132,
};

export const invalidProductPayload = {
  sku: '12345678',
  name: 'shirt',
  category: 'clothes',
  quantity: '2',
  price: '132',
};
