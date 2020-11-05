CREATE DATABASE employee_trackedb;
USE employee_trackerdb;


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
  CONSTRAINT fk_department FOREIGN KEY (department_id) References department(id) on delete cascade
);

CREATE TABLE employee (
  `id` INTEGER AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` DECIMAL NOT NULL,
  `role_id` INTEGER NOT NULL,
  `manager_id` INTEGER NOT NULL,
  PRIMARY KEY(id),
  role_id INT NOT NULL,
  manager_id INT,
  CONSTRAINT fk_department FOREIGN KEY (manager_id) References employee(id) on delete set null
);


INSERT INTO department (name)
VALUES ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Development", 23000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Dewar"); 

--

INSERT INTO department (name)
VALUES ("Main Office");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Jones");

-- 

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Head of marketing", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Bobinson");

--

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 35000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Billson");

--

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Debugging", 28000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Bobinson", );


