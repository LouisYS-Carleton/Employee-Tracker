USE employee_trackerdb;

INSERT INTO department(name)
	VALUES	('Main Office'),
			('IT'),
			('Sales'),
            ('Finance'),
			('Legal')
;
        
INSERT INTO role(title, salary, department_id)
	VALUES	('CEO', 250000, 1),
			('Back-end Developer', 50000, 2),
			('Front-end Developer', 45000, 2),
			('Sales Supervisor', 35000, 3),
			('Salesperson', 30000, 3),
			('Accounts Manager', 45000, 4),
			('Head of legal', 90000, 5),
            ('Legal Assistant', 40000, 5)
;

-- Managers
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES	('Danny', 'Dewar', 1, NULL),
			('Jack', 'Jones', 3, NULL),
			('Bill', 'Billson', 5, NULL),
			('Stacy', 'Sourier', 7, NULL)
;

-- Employees
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUES	('Bella', 'Godwin', 2, 1),
			('Roman', 'Fored', 4, 2),
			('Miranda', 'Steinfeld', 6, 3),
			('Felisha', 'Marrie', 8, 4)
;