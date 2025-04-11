const calendarBody = document.getElementById('calendar-body');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const concertInfoElement = document.getElementById('concert-info');
const calendarHeaderDays = document.getElementById('calendar-header-days'); // Dapatkan elemen header hari

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']; // Nama-nama hari

const concerts = {
    '2024-10-27': 'Konser Band A di Jakarta',
    '2024-11-15': 'Konser Band B di Surabaya',
    '2024-11-29': 'Konser Band C di Bali'
};

function generateCalendar(month, year) {
    calendarBody.innerHTML = ''; // Bersihkan kalender sebelumnya
    calendarHeaderDays.innerHTML = ''; // Bersihkan header hari sebelumnya

    // Buat header hari
    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayName = document.createElement('div');
        dayName.classList.add('calendar-day-name');
        dayName.textContent = daysOfWeek[i];
        calendarHeaderDays.appendChild(dayName);
    }

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 (Minggu) - 6 (Sabtu)

    currentMonthElement.textContent = new Date(year, month).toLocaleString('id-ID', { month: 'long', year: 'numeric' });

    let dayCounter = 1;

    // Isi hari-hari kosong di awal bulan
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarBody.appendChild(emptyDay);
    }

    // Isi hari-hari dalam bulan
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;

        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        if (concerts[dateString]) {
            day.classList.add('has-concert');
            day.addEventListener('click', () => {
                concertInfoElement.textContent = concerts[dateString];
            });
        } else {
            day.addEventListener('click', () => {
                concertInfoElement.textContent = 'Tidak ada konser pada tanggal ini.';
            });
        }

        calendarBody.appendChild(day);
        dayCounter++;
    }
}

prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Inisialisasi kalender saat halaman dimuat
generateCalendar(currentMonth, currentYear);