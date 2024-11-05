package models

import anorm.Macro.ColumnNaming
import anorm.Macro

import play.api.libs.json.Json


case class User(
  id: Long,
  firstName: String,
)

object User {
  implicit val format = Json.format[User]
  implicit val parser = Macro.namedParser[User](ColumnNaming.SnakeCase)
}
