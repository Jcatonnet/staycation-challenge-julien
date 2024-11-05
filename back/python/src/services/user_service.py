from db import fetch_one


class UserService:
    @staticmethod
    def get_user(user_id):
        return fetch_one("SELECT * FROM users WHERE id = %s" % user_id)
