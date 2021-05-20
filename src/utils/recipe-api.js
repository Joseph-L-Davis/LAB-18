import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    // superagent considers 400 errors
    .ok(res => res.status < 500) 
    .send(credentials);

  // re-throw any bad request
  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getRecipes(search) {
  const response = await request
    .get('/api/recipes')
    .query({ search: search })
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function getRecipe(id) {
  const response = await request
    .get(`/api/recipes/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function addFavorite(favorite) {
  const response = await request
    .post('/api/favorites')
    .send(favorite)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteFavorite(id) {
  const response = await request
    .delete(`/api/favorites/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}