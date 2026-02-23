// ─── DEPARTMENT COLORS ───────────────────────────────────────────────────────
export const DEPT_COLORS = {
  Engineering: '#f59e0b',
  Design:      '#ec4899',
  Marketing:   '#8b5cf6',
  HR:          '#10b981',
  Finance:     '#3b82f6',
};

// ─── CITY COORDINATES ────────────────────────────────────────────────────────
export const CITY_COORDS = {
  Mumbai:    [19.0760, 72.8777],
  Delhi:     [28.7041, 77.1025],
  Bangalore: [12.9716, 77.5946],
  Pune:      [18.5204, 73.8567],
  Hyderabad: [17.3850, 78.4867],
  Chennai:   [13.0827, 80.2707],
  Kolkata:   [22.5726, 88.3639],
  Jaipur:    [26.9124, 75.7873],
};

// ─── FALLBACK EMPLOYEE DATA ───────────────────────────────────────────────────
export const FALLBACK_EMPLOYEES = [
  { id:1,  name:'Arjun Sharma',    email:'arjun@jotish.in',   phone:'9811234567', city:'Mumbai',    salary:85000,  department:'Engineering', gender:'Male',   age:28, joinDate:'2021-03-15' },
  { id:2,  name:'Priya Mehta',     email:'priya@jotish.in',   phone:'9822345678', city:'Delhi',     salary:72000,  department:'Design',      gender:'Female', age:26, joinDate:'2022-01-10' },
  { id:3,  name:'Rohit Verma',     email:'rohit@jotish.in',   phone:'9833456789', city:'Bangalore', salary:95000,  department:'Engineering', gender:'Male',   age:31, joinDate:'2020-07-20' },
  { id:4,  name:'Sneha Patel',     email:'sneha@jotish.in',   phone:'9844567890', city:'Pune',      salary:68000,  department:'Marketing',   gender:'Female', age:24, joinDate:'2023-02-05' },
  { id:5,  name:'Vikram Singh',    email:'vikram@jotish.in',  phone:'9855678901', city:'Hyderabad', salary:110000, department:'Engineering', gender:'Male',   age:35, joinDate:'2019-11-01' },
  { id:6,  name:'Ananya Iyer',     email:'ananya@jotish.in',  phone:'9866789012', city:'Chennai',   salary:78000,  department:'HR',          gender:'Female', age:29, joinDate:'2021-08-14' },
  { id:7,  name:'Karan Gupta',     email:'karan@jotish.in',   phone:'9877890123', city:'Kolkata',   salary:62000,  department:'Finance',     gender:'Male',   age:27, joinDate:'2022-06-19' },
  { id:8,  name:'Divya Nair',      email:'divya@jotish.in',   phone:'9888901234', city:'Mumbai',    salary:88000,  department:'Design',      gender:'Female', age:30, joinDate:'2020-12-03' },
  { id:9,  name:'Aditya Kumar',    email:'aditya@jotish.in',  phone:'9899012345', city:'Bangalore', salary:105000, department:'Engineering', gender:'Male',   age:33, joinDate:'2019-04-22' },
  { id:10, name:'Meera Joshi',     email:'meera@jotish.in',   phone:'9810123456', city:'Delhi',     salary:76000,  department:'Marketing',   gender:'Female', age:25, joinDate:'2023-01-08' },
  { id:11, name:'Siddharth Bose',  email:'sid@jotish.in',     phone:'9821234567', city:'Pune',      salary:91000,  department:'Engineering', gender:'Male',   age:32, joinDate:'2020-09-17' },
  { id:12, name:'Kavya Reddy',     email:'kavya@jotish.in',   phone:'9832345678', city:'Hyderabad', salary:83000,  department:'Design',      gender:'Female', age:28, joinDate:'2021-05-29' },
  { id:13, name:'Nikhil Tiwari',   email:'nikhil@jotish.in',  phone:'9843456789', city:'Chennai',   salary:67000,  department:'HR',          gender:'Male',   age:26, joinDate:'2022-10-11' },
  { id:14, name:'Pooja Choudhary', email:'pooja@jotish.in',   phone:'9854567890', city:'Jaipur',    salary:59000,  department:'Finance',     gender:'Female', age:23, joinDate:'2023-07-04' },
  { id:15, name:'Rahul Pandey',    email:'rahul@jotish.in',   phone:'9865678901', city:'Kolkata',   salary:97000,  department:'Engineering', gender:'Male',   age:34, joinDate:'2019-06-30' },
];

// ─── API CONFIG ───────────────────────────────────────────────────────────────
export const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';
export const API_BODY = { username: 'test', password: '123456' };