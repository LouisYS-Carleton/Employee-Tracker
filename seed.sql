USE employee_trackerdb;

INSERT INTO department (name)
VALUES ('Main Office'), ('Sales'), ('IT'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
	('CEO', 200000, 1),
	('Sales Lead', 100000, 2), 
	('Salesperson', 80000, 2), 
	('Lead Engineer', 150000, 3), 
	('Software Engineer', 120000, 3), 
	('Accountant', 125000, 2), 
	('Legal Team Lead', 250000, 4), 
	('Lawyer', 190000, 4)
;

INSERT INTO 
employee (first_name, last_name, role_id, manager_id) 
VALUES 
	('John', 'Jackson', 1, null), 
    ('Philip', 'Hover', 4, 1), 
    ('Bill', 'Realies', 6, 1), 
    ('Omar', 'Mohammed', 2, 1), 
    ('Louis', 'Troullion', 2, 1),
	('Peter', 'Nguyen', 3, 2)
;
