CREATE TABLE luminus.dragons (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age int NOT NULL,
    foods VARCHAR(100) NULL,
    location_id INT NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

CREATE TABLE luminus.locations (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

INSERT INTO luminus.locations (name) VALUES ('location 1'), ('location 2'), ('location 3');