import { config } from "../../utils/config.js";
try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.API_URL}/api/user/all`, {
        method: 'GET',
        headers : {
            'Authorization' : `${token}`,
        }
    });
    const data = await response.json();
    if (data.ok) {
        const users = data.data;
        const usersTable = document.getElementById("user-table-body");
        for (const user of users){ 
            usersTable.innerHTML += `
            <tr class="user-row" data-email="${user.email}">
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${setUserRole(user.role)}</td>
            <td>
              <button class="btn btn-edit" data-id="${user.id}">تعديل الدور</button>
              <button class="btn btn-delete" data-id="${user.id}">حذف</button>
            </td>
          </tr>
            `
        };

    }else{
        console.log(data.msg);
    }
} catch (err) {
    console.log(err);
    console.log("Error fetching cars");
}

function setUserRole(role) {
    switch(role){
        case "ADMIN" :
            return `<span class="badge">مشرف</span>`;
        case "CLIENT" :
            return `<span class="badge">عميل</span>`;
        case "PAYMENT" :
            return `<span class="badge">مدير مدفوعات</span>`;
        case "SALES" :
            return `<span class="badge">مدير مبيعات</span>`;
    }
}