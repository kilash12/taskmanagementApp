def set_auth_cookies(response, access, refresh):

    response.set_cookie(

        key="access_token",

        value=str(access),

        httponly=True,

        secure=False,

        samesite="Lax",

        max_age=900,

    )

    response.set_cookie(

        key="refresh_token",

        value=str(refresh),

        httponly=True,

        secure=False,

        samesite="Lax",

        max_age=604800,

    )

    return response