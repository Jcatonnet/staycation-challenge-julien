package repositories

import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import models.User

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class UserRepository @Inject()(database: Database)(implicit ec: ExecutionContext) {

  def get(id: Long): Future[User] = Future {
    database.withConnection { implicit c =>
      SQL"SELECT * FROM users WHERE id = $id".as(User.parser.single)
    }
  }
}
