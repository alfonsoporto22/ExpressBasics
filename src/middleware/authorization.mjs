export function authorizedMiddleware( request, response, next ){
    if ( request.headers.authorized === true ) {
        next()
    }  else {
        response.sendStatus(401)
    }
}

