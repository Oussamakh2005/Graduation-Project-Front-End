import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.API_URL}/api/inquiry`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
        }
    });
    const data = await response.json();
    if (data.ok) {
        const inquiries = data.data;
        const inquiriesTable = document.getElementById("inquiry-table-body");
        for (const inquiry of inquiries) {
            inquiriesTable.innerHTML += `
          <tr >
            <td>${inquiry.id}</td>
            <td>${inquiry.fullName}</td>
            <td>${inquiry.email}</td>
            <td><button class="btn show-dialog-btn" data-id=${inquiry.id}>عرض</button></td>
          </tr>
            `
        };
    } else {
        console.log(data.msg);
        showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
    }
} catch (err) {
    console.log(err);
    showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
}
