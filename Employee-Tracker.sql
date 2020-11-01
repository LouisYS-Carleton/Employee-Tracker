-- Create the database seinfeld and specified it for use.

CREATE DATABASE employee_trackedb;

USE employee_trackerdb;

-- Create the table actors.
CREATE TABLE department (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  `id` INTEGER AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department.id
);

CREATE TABLE employee (
  `id` INTEGER AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` DECIMAL NOT NULL,
  `role_id` INTEGER NOT NULL,
  `manager_id` INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES role.id,
  FOREIGN KEY(manager_id) REFERENCES id
);

-- Insert a set of records.
INSERT INTO department (name)
VALUES ("", "", "");

-- INSERT INTO characters (name, coolness_points, attitude)
-- VALUES ("Elaine", 80, "righteous");

-- INSERT INTO characters (name, coolness_points, attitude)
-- VALUES ("Kramer", 20, "doofus");

-- INSERT INTO characters (name, coolness_points, attitude)
-- VALUES ("George", 70, "selfish");