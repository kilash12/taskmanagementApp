from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        print("=" * 50)
        print("Cookies:", request.COOKIES)

        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get("access_token")
        else:
            raw_token = self.get_raw_token(header)

        print("Raw Token:", raw_token)

        if raw_token is None:
            print("Token Not Found")
            return None

        validated_token = self.get_validated_token(raw_token)
        user = self.get_user(validated_token)

        print("Authenticated User:", user.email)

        return (user, validated_token)