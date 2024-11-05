package services

import javax.inject.Inject
import models.User
import repositories.UserRepository

import scala.concurrent.{ExecutionContext, Future}


class UserService @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def get(id: Long): Future[User] =
    userRepository.get(id)
}
