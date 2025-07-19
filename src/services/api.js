const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return await response.json();
};