export function setSessionItem(user) {

  sessionStorage.setItem('@fc.user', JSON.stringify(user));
}

export function getSessionItem() {
  const user = JSON.parse(sessionStorage.getItem('@fc.user'));
  return user;
}

export function removeSessionItem() {
  sessionStorage.removeItem('@fc.user');
}