import { checkUserAuthenticated } from "./auhenticated.js";
import {config} from "../utils/config.js"
 
let navLinks ='';
const data = await checkUserAuthenticated(`${config.API_URL}/api/user/auhtenticated`);
if(!data || !data.ok){
    navLinks = `<li><a href="./login.html">تسجيل الدخول</a></li>`;
    navLinks += document.getElementById('nav-links').innerHTML;
    document.getElementById('nav-links').innerHTML = navLinks;
}else {
    let link = "";
    switch(data.role){
        case "ADMIN" :
            link = "../dashboard/admin/dashboard.html";
            break;
        case "CLIENT" :
            link = "../dashboard/client/purchases.html";
            break;
        case "PAYMENT" :
            link = "../dashboard/payments_manager/dashboard.html";
            break;
        case "SALES" :
            link = "../dashboard/sales_manager/dashboard.html";
            break;
    }
    navLinks = `<li><a href="${link}">لوحة التحكم</a></li>`;
    navLinks += document.getElementById('nav-links').innerHTML;
    document.getElementById('nav-links').innerHTML = navLinks;   
}