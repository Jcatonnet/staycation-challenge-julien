name := "test-api"
organization := "co.staycation"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.7"

libraryDependencies ++= Seq(
  jdbc,
  guice,
  "org.playframework.anorm" %% "anorm" % "2.6.4",
  "org.playframework.anorm" %% "anorm-postgres" % "2.6.4",
  "org.postgresql" % "postgresql" % "42.2.4",
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
)
