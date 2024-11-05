from flask import Flask, jsonify
from flask_cors import CORS

from services.user_service import UserService


app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/users/<user_id>")
def get_user(user_id):
    return jsonify(UserService.get_user(user_id))


if __name__ == '__main__':
    app.run(port=9000, debug=True)
