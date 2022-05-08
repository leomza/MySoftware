mysql -u root -e "create database blog"; 

CREATE TABLE users  (
    id          MEDIUMINT UNSIGNED  NOT NULL AUTO_INCREMENT,
    username    VARCHAR(100)        DEFAULT NULL,
    password    VARCHAR(100)        DEFAULT NULL,
    created_at  TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)  DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

INSERT INTO `blog`.`users`(`username`, `password`) VALUES ('Leonardo','123456');

CREATE TABLE posts  (
    id          MEDIUMINT UNSIGNED  NOT NULL AUTO_INCREMENT,
    title    VARCHAR(100)        DEFAULT NULL,
    body    VARCHAR(100)        DEFAULT NULL,
	username    VARCHAR(100)        DEFAULT NULL,
    created_at  TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
)  DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

INSERT INTO `blog`.`posts`(`title`, `body`,`username`) VALUES ('gergre','gregreg','ere')