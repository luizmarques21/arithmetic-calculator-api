CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `user` (username, password, status, balance)
VALUES('janedoe@mail.com', '$2b$10$c2cko5xN3U6QW3CH2c12/OcKE0Bb.qD3dzm/wrD3sQNq2yf/wQBxe', 1, 10);

INSERT INTO `user` (username, password, status, balance)
VALUES('mr_t@mail.com', '$2b$10$c2cko5xN3U6QW3CH2c12/OcKE0Bb.qD3dzm/wrD3sQNq2yf/wQBxe', 2, 10);

INSERT INTO `user` (username, password, status, balance)
VALUES('johndoe@mail.com', '$2b$10$c2cko5xN3U6QW3CH2c12/OcKE0Bb.qD3dzm/wrD3sQNq2yf/wQBxe', 1, 10);

CREATE TABLE `operation` (
  `id` int(11) NOT NULL,
  `type` varchar(14) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO operation (id, `type`, cost) VALUES(1, 'addition', 1);
INSERT INTO operation (id, `type`, cost) VALUES(2, 'subtraction', 1);
INSERT INTO operation (id, `type`, cost) VALUES(3, 'multiplication', 2);
INSERT INTO operation (id, `type`, cost) VALUES(4, 'division', 2);
INSERT INTO operation (id, `type`, cost) VALUES(5, 'square_root', 3);
INSERT INTO operation (id, `type`, cost) VALUES(6, 'random_string', 3);

CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_balance` int(11) DEFAULT NULL,
  `operation_response` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_record_operation` (`operation_id`),
  KEY `fk_record_user` (`user_id`),
  CONSTRAINT `fk_record_operation` FOREIGN KEY (`operation_id`) REFERENCES `operation` (`id`),
  CONSTRAINT `fk_record_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);