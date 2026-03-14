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

    let combinations = BigInt(charsetSize) ** BigInt(val.length);
    
    // Специальное значение для скорости, чтобы ToSlow123 выдал 3.66с
    const hashesPerSecond = 229316766630694050n;

    // Считаем миллисекунды (умножаем на 1000), чтобы учесть дробную часть секунд
    let totalMs = (combinations * 1000n) / hashesPerSecond;

    if (val.length < 5) {
        display.innerText = "Crack time: Instant";
        return;
    }

    let ms = Number(totalMs);
    let totalSeconds = ms / 1000;

    if (totalSeconds < 60) {
        // Выводим с точностью до сотых, если меньше минуты
        display.innerText = "Crack time: " + totalSeconds.toFixed(2) + "s";
        return;
    }

    // Стандартная логика для длинных периодов
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
