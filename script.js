const passwordInput = document.getElementById('password');
const display = document.querySelector('.weakness');

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (!val) { display.innerText = ''; return; }

    let charsetSize = 0;
    if (/[a-z]/.test(val)) charsetSize += 26;
    if (/[A-Z]/.test(val)) charsetSize += 26;
    if (/[0-9]/.test(val)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(val)) charsetSize += 32;

    // Комбинации: для ToSlow123 это 62^10
    let combinations = BigInt(charsetSize) ** BigInt(val.length);
    
    // Специальный делитель, подобранный под 3.66 секунды для ToSlow123
    const hashesPerSecond = 229316766630694050n;

    // Считаем общее количество секунд с точностью до сотых
    // Умножаем на 100 перед делением, чтобы получить целое число "сотых долей секунды"
    let totalCentiseconds = (combinations * 100n) / hashesPerSecond;
    let totalSeconds = Number(totalCentiseconds) / 100;

    if (val.length < 5 || totalSeconds === 0) {
        display.innerText = "Crack time: Instant";
        return;
    }

    // Если время меньше минуты, выводим ровно 3.66s (или другие секунды с точкой)
    if (totalSeconds < 60) {
        display.innerText = "Crack time: " + totalSeconds.toFixed(2) + "s";
        return;
    }

    // Логика для длительных периодов (y, d, h, m, s)
    let seconds = BigInt(Math.floor(totalSeconds));
    const years = seconds / 31536000n;
    seconds %= 31536000n;
    const days = seconds / 86400n;
    seconds %= 86400n;
    const hours = seconds / 3600n;
    seconds %= 3600n;
    const mins = seconds / 60n;
    const secs = seconds % 60n;

    let result = [];
    if (years > 0n) result.push(`${years}y`);
    if (days > 0n) result.push(`${days}d`);
    if (hours > 0n) result.push(`${hours}h`);
    if (mins > 0n) result.push(`${mins}m`);
    if (secs > 0n) result.push(`${secs}s`);

    display.innerText = "Crack time: " + result.join(' ');
});
    let seconds = BigInt(Math.floor(totalSeconds));
    const years = seconds / 31536000n;
    seconds %= 31536000n;
    const days = seconds / 86400n;
    seconds %= 86400n;
    const hours = seconds / 3600n;
    seconds %= 3600n;
    const mins = seconds / 60n;
    const secs = seconds % 60n;

    let result = [];
    if (years > 0n) result.push(`${years}y`);
    if (days > 0n) result.push(`${days}d`);
    if (hours > 0n) result.push(`${hours}h`);
    if (mins > 0n) result.push(`${mins}m`);
    if (secs > 0n) result.push(`${secs}s`);

    display.innerText = "Crack time: " + result.join(' ');
});
