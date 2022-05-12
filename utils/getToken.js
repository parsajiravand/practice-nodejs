function getTokenFromHeader (request){
  if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Token' ||
      request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
    return request.headers.authorization.split(' ')[1];
  }

  return null;
}
module.exports = {getTokenFromHeader}