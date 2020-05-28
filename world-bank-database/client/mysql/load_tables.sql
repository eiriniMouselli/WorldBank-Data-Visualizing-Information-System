CREATE DATABASE metrics_db;
USE metrics_db;

CREATE TABLE IF NOT EXISTS COUNTRIES (
	id	   INT,
    c_code VARCHAR(50) UNIQUE NOT NULL,
    c_name VARCHAR(50),
    KEY (c_code),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS INDICATORS (
    i_id VARCHAR(50),
    i_name VARCHAR(50),
    PRIMARY KEY (i_id)
);

CREATE TABLE IF NOT EXISTS YEARS (
    i_year INT,
    five_year_period VARCHAR(20),
    ten_year_period VARCHAR(20),
    twenty_year_period VARCHAR(20),
    PRIMARY KEY (i_year)
);

CREATE TABLE IF NOT EXISTS M (
    c_code VARCHAR(50),
    i_code VARCHAR(50),
    i_year INT,
    measurement FLOAT,
    PRIMARY KEY (c_code , i_code , i_year),
    FOREIGN KEY (c_code)
        REFERENCES COUNTRIES (c_code)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (i_code)
        REFERENCES INDICATORS (i_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (i_year)
        REFERENCES YEARS (i_year)
        ON UPDATE CASCADE ON DELETE CASCADE
);

LOAD DATA LOCAL INFILE './world-bank-database/mysql/INDICATORS.csv' INTO TABLE INDICATORS FIELDS TERMINATED BY ',' ENCLOSED BY '"' IGNORE 1 LINES ;
LOAD DATA LOCAL  INFILE './world-bank-database/mysql/Countries.csv' INTO TABLE COUNTRIES FIELDS TERMINATED BY ',' IGNORE 1 LINES ;
LOAD DATA LOCAL  INFILE './world-bank-database/mysql/Years.csv' INTO TABLE YEARS FIELDS TERMINATED BY ',' IGNORE 2 LINES ;
LOAD DATA LOCAL  INFILE './world-bank-database/mysql/M.csv' INTO TABLE M FIELDS TERMINATED BY ',' IGNORE 1 LINES ;
