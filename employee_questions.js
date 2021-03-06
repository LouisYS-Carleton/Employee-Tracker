// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");

// Connecting to mysql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "P0pinahat!",
  database: "employee_trackerdb"
}); 

let roles;
let departments;
let employees;

// Testing connection with sql and checking tables
connection.connect(function (err) {  
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected as ID " + connection.threadId);

    connection.query("SELECT * FROM role", function (error, res) {
        roles = res.map(role => ({ name: role.title, value: role.id }))
    })

    connection.query("SELECT * FROM department", function (error, res) {
        departments = res.map(dep => ({ name: dep.name, value: dep.id }))
    })

    connection.query("SELECT * from employee", function (error, res) {
        employees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    })
    showMenu();
})

// Display menu to user
function showMenu() {
    inquirer
    .prompt
        ({
            type: "list",
            message: "Please select an option.",
            name: "choices",
            choices: 
        [{
            name: "View all employees",
            value: "viewEmployees"
        },
		{
			name: "View all employees by department",
			value: "viewEmployeesDepartment"
		},
		{	 
		    name: "View all employees by manager",
			value: "viewEmployeesManager"
		},
        {
            name: "Add an employee",
            value: "addEmployee"
        },
		{
            name: "Remove an employee",
            value: "removeEmployee"
        },
        {
            name: "Update employee role",
            value: "updateRole"
        },
        {
            name: "View all departments",
            value: "viewDepartments"
        },
        {
            name: "View all roles",
            value: "viewAllRoles"
        },
        {
            name: "Add new department",
            value: "addDept"
        },
        {
            name: "Add new role",
            value: "addRole"
        },
        {
            name: "Quit",
            value: "quit"
        }]
        })
        .then(function (res) {
            menu(res.choices)
        })
}

function menu(option) {
    switch (option) {
        case "viewEmployees":
            viewAllEmployees();
            break;
        case "viewEmployeesDepartment":
            viewEmployeesDepartment();
            break;
        case "viewEmployeesManager":
            viewEmployeesManager();
            break;  
        case "viewDepartments":
            viewAllDepartments();
            break;
        case "viewAllRoles":
            viewAllRoles();
            break;
        case "removeEmployee":
            removeEmployee();
            break;
        case "addEmployee":
            addEmployee();
            break;
        case "addDept":
            addDept();
            break;
        case "addRole":
            addRole();
            break;
        case "updateRole":
            updateRole();
            break;
        case "quit":
            end();
    }
}


// Prompts
// View all employees
function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

// View dept employees
function viewEmployeesDepartment() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Please enter department name.",
            name: "name",
            choices: departments	
        }
        ])
        .then(function (response) {
        console.log("View employees by department")

        connection.query("SELECT distinct(employee.id),employee.first_name,employee.last_name from employee, role, department where employee.role_id = role.id and role.department_id = ?", [response.name], function (error, res) {
            console.table(res);
            endOrMenu();
        })
        })
}

// View manager employees
function viewEmployeesManager() {
    inquirer
    .prompt([
    {
        type: "list",
        message: "Please select manager.",
        name: "name",
        choices: employees
    }
    ])
    .then(function (response) {
    console.log("View Employees")
    connection.query("SELECT employee.first_name,employee.last_name FROM employee WHERE manager_id = ?", [response.name], 
    function (error, res) {
        console.table(res);
        endOrMenu();
    })
    })
}

// Add employee
    // Get info
function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Please enter first name.",
            name: "firstName",
        },
        {
            type: "input",
            message: "Please enter last name.",
            name: "lastName",
        },
        {
            type: "list",
            message: "Please enter employee's title.",
            name: "title",
            choices: roles
        },
        {
            type: "list",
            message: "Please enter employee's manager.",
            name: "manager",
            choices: employees,
        }
    ]).then(function (response) {
        addEmployees(response)
    })
}

    // Add info to employee
function addEmployees(data) {
    connection.query("INSERT INTO employee SET ?",
    {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.title,
        manager_id: data.manager
    }, function (error, res) {
        if (error) throw error;
    })
    endOrMenu();
}


// Remove employee
function removeEmployee(){
    inquirer
    .prompt([
      {
        type: "list",
        message: "Please enter employee's name.",
        name: "name",
        choices: employees
      }
    ])
    .then(function (response) {
        console.log("View Employees")
        connection.query("DELETE FROM employee WHERE id = ?", [response.name], function (error, res) {
            console.log("Employee has been deleted.");
            endOrMenu();
        })
    })
}

// View all departments
function viewAllDepartments() {
    console.log("view all departments")
    connection.query("SELECT * from department", function (error, res) {
      console.table(res);
      endOrMenu();
    })
}
  
// View all roles
function viewAllRoles() {
    console.log("view all roles")
    connection.query("SELECT * from role", function (error, res) {
        console.table(res);
        endOrMenu();
    })
}
  
  // Add a new department
      // get info
function addDept() {
    inquirer
    .prompt([
    {
        type: "input",
        message: "Please enter name of new department.",
        name: "name"
    }
    ])
    .then(function (response) {
        addDepartment(response);
    })
}
    // add dept
function addDepartment(data) {
    connection.query("INSERT INTO department SET ?", { name: data.name },
    function (error, res) {
        if (error) throw error;
    });
    endOrMenu();
}
  

// Add new role info
function addRole() {
    inquirer
    .prompt([
    {
        type: "input",
        message: "Please enter name of new employee role.",
        name: "title"
    },
    {
        type: "input",
        message: "Please enter new role's salary.",
        name: "salary"
    },
    {
        type: "list",
        message: "Please enter the department this role falls under.",
        name: "id",
        choices: departments
    }
    ])
    .then(function (response) {
    addEmployeeRole(response);
    })
}

// Add new employee role collected
function addEmployeeRole(data) {
    connection.query("INSERT INTO role SET ?", {
      title: data.title,
      salary: data.salary,
      department_id: data.id
    }, function (error, res) {
      if (error) throw error;
    });
    endOrMenu();
}
  

// Update employee role
    // Ask role
function updateRole() {
    inquirer
    .prompt([
    {
        type: "list",
        message: "Please select which employee whose role you wish to change.",
        name: "empID",
        choices: employees
    },
    {
        type: "list",
        message: "Please enter employee's new role.",
        name: "titleID",
        choices: roles
    }
    ])
    .then(function (response) {
    updateEmployeeRole(response);
    })
}
      
     // Add collected info to employee role
function updateEmployeeRole(data) {
    connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
    function (error, res) {
        if (error) throw error;
    });
    endOrMenu();
}

// Continue prompt
function endOrMenu() {
    confirm("Would you like to continue?")
    .then(function confirmed() { 
            showMenu(); 
        }, 
        function cancelled() { 
                end(); 
        });
}

// Final message
function end() {
    console.log("Thank you for using Employee Tracker!");
    connection.end();
    process.exit();
}